import { NextRequest, NextResponse } from "next/server";
import razorpay from "@/lib/razorpay";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { getProductBySlug } from "@/lib/product-data";

interface ShippingInput {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  apartment?: string;
  city: string;
  state: string;
  pincode: string;
  phone?: string;
}

type OrderLine = { product: NonNullable<ReturnType<typeof getProductBySlug>>; quantity: number };

function canBePurchased(product: NonNullable<ReturnType<typeof getProductBySlug>>): boolean {
  return product.price > 0 || !!product.showZeroRupee;
}

function buildLinesFromBody(body: {
  items?: { product_slug: string; quantity: number }[];
  product_slug?: string;
  quantity?: number;
}): OrderLine[] | NextResponse {
  if (Array.isArray(body.items) && body.items.length > 0) {
    const lines: OrderLine[] = [];
    for (const row of body.items) {
      if (!row.product_slug || !row.quantity || row.quantity < 1) {
        return NextResponse.json({ error: "Invalid product or quantity" }, { status: 400 });
      }
      const product = getProductBySlug(row.product_slug);
      if (!product) {
        return NextResponse.json({ error: "Product not found" }, { status: 404 });
      }
      if (!canBePurchased(product)) {
        return NextResponse.json({ error: "Product not available for purchase" }, { status: 400 });
      }
      lines.push({ product, quantity: row.quantity });
    }
    return lines;
  }
  const { product_slug, quantity } = body;
  if (!product_slug || !quantity || quantity < 1) {
    return NextResponse.json({ error: "Invalid product or quantity" }, { status: 400 });
  }
  const product = getProductBySlug(product_slug);
  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }
  if (!canBePurchased(product)) {
    return NextResponse.json({ error: "Product not available for purchase" }, { status: 400 });
  }
  return [{ product, quantity }];
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { shipping_method, shipping } = body as {
      shipping_method: "standard" | "express";
      shipping: ShippingInput;
    };

    if (!shipping?.email || !shipping?.firstName || !shipping?.address || !shipping?.city || !shipping?.state || !shipping?.pincode) {
      return NextResponse.json({ error: "Incomplete shipping information" }, { status: 400 });
    }

    const linesOrError = buildLinesFromBody(body);
    if (linesOrError instanceof NextResponse) {
      return linesOrError;
    }
    const lines = linesOrError;

    const subtotal = lines.reduce((s, line) => s + line.product.price * line.quantity, 0);
    const shippingCost = shipping_method === "express" ? 29.99 : 0;
    const taxRate = 0.08;
    const tax = subtotal * taxRate;
    const total = subtotal + shippingCost + tax;
    const amountInPaise = Math.round(total * 100);

    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    const admin = createAdminClient();
    const receipt = `rcpt_${lines[0].product.sku}_${Date.now()}`;

    let addressId: string | null = null;
    if (user) {
      const { data: addr } = await admin
        .from("addresses")
        .insert({
          user_id: user.id,
          type: "shipping",
          line1: shipping.address,
          line2: shipping.apartment || null,
          city: shipping.city,
          state: shipping.state,
          postal_code: shipping.pincode,
          country: "IN",
        })
        .select("id")
        .single();
      addressId = addr?.id ?? null;
    }

    const addressSnapshot = {
      first_name: shipping.firstName,
      last_name: shipping.lastName,
      line1: shipping.address,
      line2: shipping.apartment || null,
      city: shipping.city,
      state: shipping.state,
      postal_code: shipping.pincode,
      country: "IN",
      phone: shipping.phone || null,
    };

    const { data: order, error: orderError } = await admin
      .from("orders")
      .insert({
        user_id: user?.id ?? null,
        status: "pending",
        payment_status: "pending",
        currency: "INR",
        subtotal_amount: Math.round(subtotal * 100),
        shipping_amount: Math.round(shippingCost * 100),
        tax_amount: Math.round(tax * 100),
        total_amount: amountInPaise,
        receipt,
        shipping_address_id: addressId,
        contact_email: shipping.email,
        contact_phone: shipping.phone || null,
        guest_email: user ? null : shipping.email,
        guest_phone: user ? null : (shipping.phone || null),
        idempotency_key: `${lines.map((l) => `${l.product.slug}_${l.quantity}`).join("__")}_${Date.now()}`,
        customer_first_name: shipping.firstName,
        customer_last_name: shipping.lastName,
        shipping_address_snapshot: addressSnapshot,
      })
      .select("id")
      .single();

    if (orderError || !order) {
      console.error("Order insert error:", orderError);
      return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
    }

    for (const line of lines) {
      const lineSubtotal = line.product.price * line.quantity;
      const { error: itemError } = await admin.from("order_items").insert({
        order_id: order.id,
        product_id: line.product.slug,
        product_sku: line.product.sku,
        product_name: line.product.name,
        unit_price: Math.round(line.product.price * 100),
        quantity: line.quantity,
        line_total: Math.round(lineSubtotal * 100),
      });

      if (itemError) {
        console.error("Order item insert failed:", itemError);
        await admin.from("orders").delete().eq("id", order.id);
        return NextResponse.json({ error: "Failed to create order items" }, { status: 500 });
      }
    }

    if (amountInPaise === 0) {
      const { data: updatedOrder, error: updateError } = await admin
        .from("orders")
        .update({
          status: "paid",
          payment_status: "captured",
          paid_at: new Date().toISOString(),
        })
        .eq("id", order.id)
        .select("id")
        .single();

      if (updateError || !updatedOrder) {
        console.error("Failed to mark free order as paid:", updateError);
        return NextResponse.json({ error: "Failed to process free order" }, { status: 500 });
      }

      await admin.from("payment_events").insert({
        order_id: order.id,
        provider: "internal",
        event_type: "free_order.completed",
        event_id: `FREE_${order.id}`,
        payload: { note: "Zero-amount order, no payment required" },
      });

      const { fetchOrderAndSendEmails } = await import("@/lib/email");
      fetchOrderAndSendEmails(order.id, `FREE_${order.id}`).catch((err) =>
        console.error("Email send error (free order):", err)
      );

      return NextResponse.json({
        order_id: order.id,
        zero_amount: true,
        email_triggered: true,
      });
    }

    let rzpOrder;
    try {
      rzpOrder = await razorpay.orders.create({
        amount: amountInPaise,
        currency: "INR",
        receipt,
        notes: {
          order_id: order.id,
          product_name: lines.map((l) => l.product.name).join(", "),
          quantity: lines.map((l) => String(l.quantity)).join(","),
        },
      });
    } catch (rzpError: unknown) {
      console.error("Razorpay API error:", rzpError);
      await admin.from("orders").update({ status: "failed", payment_status: "failed" }).eq("id", order.id);

      const rzpErrorObj =
        typeof rzpError === "object" && rzpError !== null && "error" in rzpError
          ? (rzpError as Record<string, { description?: string; code?: string }>).error
          : null;

      if (rzpErrorObj?.code === "BAD_REQUEST_ERROR" && rzpErrorObj.description?.includes("Amount exceeds maximum")) {
        return NextResponse.json(
          {
            error: `Order total of ₹${(amountInPaise / 100).toLocaleString("en-IN")} exceeds your Razorpay account's maximum transaction limit. Please activate your Razorpay account (complete KYC) at dashboard.razorpay.com to increase the limit.`,
          },
          { status: 400 },
        );
      }

      const rzpMessage =
        rzpError instanceof Error
          ? rzpError.message
          : rzpErrorObj
            ? JSON.stringify(rzpErrorObj)
            : "Razorpay order creation failed";
      return NextResponse.json({ error: rzpMessage }, { status: 502 });
    }

    await admin
      .from("orders")
      .update({ razorpay_order_id: rzpOrder.id })
      .eq("id", order.id);

    return NextResponse.json({
      order_id: order.id,
      razorpay_order: {
        id: rzpOrder.id,
        amount: rzpOrder.amount,
        currency: rzpOrder.currency,
      },
    });
  } catch (error: unknown) {
    console.error("Create-order error (full):", error);
    const message =
      error instanceof Error
        ? error.message
        : typeof error === "string"
          ? error
          : JSON.stringify(error) ?? "Failed to create order";
    console.error("Create-order error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { createAdminClient } from "@/lib/supabase/admin";
import { fetchOrderAndSendEmails } from "@/lib/email";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json(
        { error: "Missing payment verification fields" },
        { status: 400 },
      );
    }

    const secret = process.env.RAZORPAY_KEY_SECRET;
    if (!secret) {
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 },
      );
    }

    const expectedSignature = crypto
      .createHmac("sha256", secret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return NextResponse.json(
        { error: "Payment verification failed", verified: false },
        { status: 400 },
      );
    }

    const admin = createAdminClient();

    const { data: order } = await admin
      .from("orders")
      .update({
        status: "paid",
        payment_status: "captured",
        razorpay_payment_id,
        paid_at: new Date().toISOString(),
      })
      .eq("razorpay_order_id", razorpay_order_id)
      .is("paid_at", null)
      .select("id")
      .single();

    const { error: paymentEventError } = await admin
      .from("payment_events")
      .insert({
        order_id: order?.id ?? null,
        provider: "razorpay",
        event_type: "payment.verified",
        event_id: razorpay_payment_id,
        payload: {
          razorpay_order_id,
          razorpay_payment_id,
          source: "client_verify",
        },
      });
    if (paymentEventError && paymentEventError.code !== "23505") {
      console.error("payment_events insert:", paymentEventError);
    }

    if (order?.id) {
      fetchOrderAndSendEmails(order.id, razorpay_payment_id).catch((err) =>
        console.error("Email send error (verify):", err)
      );
    }

    return NextResponse.json({
      verified: true,
      order_id: order?.id ?? null,
      payment_id: razorpay_payment_id,
    });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Verification failed";
    console.error("Verify-payment error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { createAdminClient } from "@/lib/supabase/admin";
import { fetchOrderAndSendEmails } from "@/lib/email";

export async function POST(req: NextRequest) {
  const text = await req.text();
  const signature = req.headers.get("x-razorpay-signature");

  const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
  if (!secret) {
    console.error("RAZORPAY_WEBHOOK_SECRET not configured");
    return NextResponse.json({ error: "Not configured" }, { status: 500 });
  }

  const expected = crypto
    .createHmac("sha256", secret)
    .update(text)
    .digest("hex");

  if (signature !== expected) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  const event = JSON.parse(text);
  const admin = createAdminClient();

  try {
    const paymentEntity = event.payload?.payment?.entity;
    const eventId =
      paymentEntity?.id ??
      event.payload?.order?.entity?.id ??
      `evt_${Date.now()}`;

    const { error: dupError } = await admin.from("payment_events").insert({
      provider: "razorpay",
      event_type: event.event,
      event_id: eventId,
      payload: event.payload,
    });

    if (dupError?.code === "23505") {
      return NextResponse.json({ received: true, duplicate: true });
    }

    if (event.event === "payment.captured" && paymentEntity) {
      const { data: updated } = await admin
        .from("orders")
        .update({
          status: "paid",
          payment_status: "captured",
          razorpay_payment_id: paymentEntity.id,
          paid_at: new Date().toISOString(),
        })
        .eq("razorpay_order_id", paymentEntity.order_id)
        .is("paid_at", null)
        .select("id")
        .single();

      const orderId =
        updated?.id ??
        (
          await admin
            .from("orders")
            .select("id")
            .eq("razorpay_order_id", paymentEntity.order_id)
            .single()
        ).data?.id;

      if (orderId) {
        await admin
          .from("payment_events")
          .update({ order_id: orderId })
          .eq("event_id", paymentEntity.id)
          .eq("provider", "razorpay");

        if (updated) {
          fetchOrderAndSendEmails(orderId, paymentEntity.id).catch((err) =>
            console.error("Email send error (webhook):", err)
          );
        }
      }
    } else if (event.event === "payment.failed" && paymentEntity) {
      await admin
        .from("orders")
        .update({ status: "failed", payment_status: "failed" })
        .eq("razorpay_order_id", paymentEntity.order_id)
        .eq("status", "pending");
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook processing error:", error);
    return NextResponse.json({ received: true, error: "Processing error" });
  }
}

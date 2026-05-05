import { NextResponse } from "next/server";
import { sendCustomerOrderConfirmation, type OrderEmailData } from "@/lib/email";

export async function POST() {
  if (process.env.NODE_ENV !== "development") {
    return NextResponse.json({ error: "Only available in development" }, { status: 403 });
  }

  const testOrder: OrderEmailData = {
    id: "test-order-id",
    receipt: "TEST_RECEIPT_001",
    customer_first_name: "Test",
    customer_last_name: "Customer",
    contact_email: process.env.ADMIN_EMAIL || "gunalan@r-tech.in",
    contact_phone: "+91 1234567890",
    shipping_address_snapshot: {
      first_name: "Test",
      last_name: "Customer",
      line1: "123 Test Street",
      city: "Mumbai",
      state: "Maharashtra",
      postal_code: "400001",
      country: "IN",
    },
    total_amount: 10000,
    subtotal_amount: 9000,
    shipping_amount: 500,
    tax_amount: 500,
    currency: "INR",
    razorpay_payment_id: "TEST_PAYMENT_ID",
    items: [
      {
        product_name: "Test Product",
        quantity: 1,
        unit_price: 9000,
        line_total: 9000,
      },
    ],
  };

  try {
    await sendCustomerOrderConfirmation(testOrder);
    return NextResponse.json({ success: true, message: "Test email sent" });
  } catch (error) {
    console.error("Test email failed:", error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}

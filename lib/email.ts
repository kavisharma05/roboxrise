import { Resend } from "resend";

if (process.env.NODE_ENV === "production" && !process.env.RESEND_API_KEY) {
  console.error(
    "CRITICAL: RESEND_API_KEY not set in production. Order emails will NOT be sent."
  );
}

if (process.env.NODE_ENV === "production" && !process.env.EMAIL_FROM) {
  console.warn("EMAIL_FROM not set. Using default sender (may have delivery issues).");
}

function getResend(): Resend | null {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  return new Resend(key);
}

const FROM_EMAIL = process.env.EMAIL_FROM || "RoboRise Orders <orders@yourdomain.com>";
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "";

interface OrderItemData {
  product_name: string;
  quantity: number;
  unit_price: number;
  line_total: number;
}

interface AddressSnapshot {
  first_name?: string;
  last_name?: string;
  line1: string;
  line2?: string | null;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  phone?: string | null;
}

export interface OrderEmailData {
  id: string;
  receipt: string;
  customer_first_name: string | null;
  customer_last_name: string | null;
  contact_email: string;
  contact_phone: string | null;
  shipping_address_snapshot: AddressSnapshot | null;
  total_amount: number;
  subtotal_amount: number;
  shipping_amount: number;
  tax_amount: number;
  currency: string;
  razorpay_payment_id: string | null;
  items: OrderItemData[];
}

function formatAmount(paise: number, currency = "INR"): string {
  const amount = paise / 100;
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency,
  }).format(amount);
}

function formatAddress(addr: AddressSnapshot | null): string {
  if (!addr) return "Not provided";
  const parts = [addr.line1];
  if (addr.line2) parts.push(addr.line2);
  parts.push(`${addr.city}, ${addr.state} ${addr.postal_code}`);
  parts.push(addr.country);
  return parts.join(", ");
}

function buildItemsHtml(items: OrderItemData[], currency: string): string {
  return items
    .map(
      (item) =>
        `<tr>
          <td style="padding:8px 12px;border-bottom:1px solid #eee;">${item.product_name}</td>
          <td style="padding:8px 12px;border-bottom:1px solid #eee;text-align:center;">${item.quantity}</td>
          <td style="padding:8px 12px;border-bottom:1px solid #eee;text-align:right;">${formatAmount(item.unit_price, currency)}</td>
          <td style="padding:8px 12px;border-bottom:1px solid #eee;text-align:right;">${formatAmount(item.line_total, currency)}</td>
        </tr>`
    )
    .join("");
}

export async function sendAdminOrderNotification(
  order: OrderEmailData
): Promise<void> {
  if (!ADMIN_EMAIL) {
    console.warn("ADMIN_EMAIL not set — skipping admin notification");
    return;
  }

  const resendClient = getResend();
  if (!resendClient) {
    console.warn("RESEND_API_KEY not set — skipping admin notification");
    return;
  }

  const customerName =
    [order.customer_first_name, order.customer_last_name]
      .filter(Boolean)
      .join(" ") || "Guest";

  const html = `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
      <div style="background:#ff6b35;padding:20px 24px;border-radius:8px 8px 0 0;">
        <h1 style="color:#fff;margin:0;font-size:20px;">New Order Received</h1>
      </div>
      <div style="padding:24px;border:1px solid #e5e5e5;border-top:none;border-radius:0 0 8px 8px;">
        <h2 style="margin:0 0 16px;font-size:16px;color:#333;">Order ${order.receipt}</h2>
        
        <table style="width:100%;margin-bottom:20px;font-size:14px;">
          <tr><td style="padding:4px 0;color:#666;width:140px;">Customer</td><td style="padding:4px 0;">${customerName}</td></tr>
          <tr><td style="padding:4px 0;color:#666;">Email</td><td style="padding:4px 0;">${order.contact_email}</td></tr>
          <tr><td style="padding:4px 0;color:#666;">Phone</td><td style="padding:4px 0;">${order.contact_phone || "Not provided"}</td></tr>
          <tr><td style="padding:4px 0;color:#666;">Payment ID</td><td style="padding:4px 0;">${order.razorpay_payment_id || "N/A"}</td></tr>
          <tr><td style="padding:4px 0;color:#666;">Order ID</td><td style="padding:4px 0;font-size:12px;">${order.id}</td></tr>
        </table>

        <h3 style="margin:0 0 8px;font-size:14px;color:#333;">Shipping Address</h3>
        <p style="margin:0 0 20px;font-size:14px;color:#555;">${formatAddress(order.shipping_address_snapshot)}</p>

        <h3 style="margin:0 0 8px;font-size:14px;color:#333;">Items</h3>
        <table style="width:100%;border-collapse:collapse;font-size:14px;margin-bottom:20px;">
          <thead>
            <tr style="background:#f9f9f9;">
              <th style="padding:8px 12px;text-align:left;">Product</th>
              <th style="padding:8px 12px;text-align:center;">Qty</th>
              <th style="padding:8px 12px;text-align:right;">Price</th>
              <th style="padding:8px 12px;text-align:right;">Total</th>
            </tr>
          </thead>
          <tbody>${buildItemsHtml(order.items, order.currency)}</tbody>
        </table>

        <table style="width:100%;font-size:14px;margin-bottom:8px;">
          <tr><td style="padding:2px 0;color:#666;">Subtotal</td><td style="padding:2px 0;text-align:right;">${formatAmount(order.subtotal_amount, order.currency)}</td></tr>
          <tr><td style="padding:2px 0;color:#666;">Shipping</td><td style="padding:2px 0;text-align:right;">${formatAmount(order.shipping_amount, order.currency)}</td></tr>
          <tr><td style="padding:2px 0;color:#666;">Tax</td><td style="padding:2px 0;text-align:right;">${formatAmount(order.tax_amount, order.currency)}</td></tr>
          <tr><td style="padding:6px 0;font-weight:bold;border-top:2px solid #333;">Total</td><td style="padding:6px 0;text-align:right;font-weight:bold;border-top:2px solid #333;">${formatAmount(order.total_amount, order.currency)}</td></tr>
        </table>
      </div>
    </div>
  `;

  try {
    await resendClient.emails.send({
      from: FROM_EMAIL,
      to: [ADMIN_EMAIL],
      subject: `New Order ${order.receipt} — ${customerName}`,
      html,
    });
  } catch (err) {
    console.error("Failed to send admin order notification:", err);
  }
}

export async function sendCustomerOrderConfirmation(
  order: OrderEmailData
): Promise<void> {
  const resendClient = getResend();
  if (!resendClient) {
    console.warn("RESEND_API_KEY not set — skipping customer confirmation");
    return;
  }

  const customerName =
    [order.customer_first_name, order.customer_last_name]
      .filter(Boolean)
      .join(" ") || "Customer";

  const html = `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
      <div style="background:#ff6b35;padding:20px 24px;border-radius:8px 8px 0 0;">
        <h1 style="color:#fff;margin:0;font-size:20px;">Order Confirmed!</h1>
      </div>
      <div style="padding:24px;border:1px solid #e5e5e5;border-top:none;border-radius:0 0 8px 8px;">
        <p style="font-size:16px;color:#333;margin:0 0 16px;">Hi ${customerName},</p>
        <p style="font-size:14px;color:#555;margin:0 0 20px;">Thank you for your order! We've received your payment and your order is being processed.</p>
        
        <div style="background:#f8f8f8;padding:16px;border-radius:6px;margin-bottom:20px;">
          <p style="margin:0 0 4px;font-size:13px;color:#666;">Order Reference</p>
          <p style="margin:0;font-size:16px;font-weight:bold;color:#333;">${order.receipt}</p>
        </div>

        <h3 style="margin:0 0 8px;font-size:14px;color:#333;">Order Summary</h3>
        <table style="width:100%;border-collapse:collapse;font-size:14px;margin-bottom:20px;">
          <thead>
            <tr style="background:#f9f9f9;">
              <th style="padding:8px 12px;text-align:left;">Product</th>
              <th style="padding:8px 12px;text-align:center;">Qty</th>
              <th style="padding:8px 12px;text-align:right;">Total</th>
            </tr>
          </thead>
          <tbody>
            ${order.items
              .map(
                (item) =>
                  `<tr>
                    <td style="padding:8px 12px;border-bottom:1px solid #eee;">${item.product_name}</td>
                    <td style="padding:8px 12px;border-bottom:1px solid #eee;text-align:center;">${item.quantity}</td>
                    <td style="padding:8px 12px;border-bottom:1px solid #eee;text-align:right;">${formatAmount(item.line_total, order.currency)}</td>
                  </tr>`
              )
              .join("")}
          </tbody>
        </table>

        <table style="width:100%;font-size:14px;margin-bottom:20px;">
          <tr><td style="padding:2px 0;color:#666;">Subtotal</td><td style="padding:2px 0;text-align:right;">${formatAmount(order.subtotal_amount, order.currency)}</td></tr>
          <tr><td style="padding:2px 0;color:#666;">Shipping</td><td style="padding:2px 0;text-align:right;">${formatAmount(order.shipping_amount, order.currency)}</td></tr>
          <tr><td style="padding:2px 0;color:#666;">Tax</td><td style="padding:2px 0;text-align:right;">${formatAmount(order.tax_amount, order.currency)}</td></tr>
          <tr><td style="padding:6px 0;font-weight:bold;border-top:2px solid #333;">Total</td><td style="padding:6px 0;text-align:right;font-weight:bold;border-top:2px solid #333;">${formatAmount(order.total_amount, order.currency)}</td></tr>
        </table>

        <h3 style="margin:0 0 8px;font-size:14px;color:#333;">Shipping To</h3>
        <p style="margin:0 0 20px;font-size:14px;color:#555;">${formatAddress(order.shipping_address_snapshot)}</p>

        <p style="font-size:13px;color:#999;margin:0;">If you have any questions about your order, reply to this email or contact us at support@roborise.com</p>
      </div>
    </div>
  `;

  try {
    await resendClient.emails.send({
      from: FROM_EMAIL,
      to: [order.contact_email],
      subject: `Order Confirmed — ${order.receipt}`,
      html,
    });
  } catch (err) {
    console.error("Failed to send customer order confirmation:", err);
  }
}

export async function fetchOrderAndSendEmails(
  orderId: string,
  razorpayPaymentId: string
): Promise<void> {
  const { createAdminClient } = await import("@/lib/supabase/admin");
  const admin = createAdminClient();

  const { data: order } = await admin
    .from("orders")
    .select("*")
    .eq("id", orderId)
    .single();

  if (!order) {
    console.error("fetchOrderAndSendEmails: order not found", orderId);
    return;
  }

  const { data: items } = await admin
    .from("order_items")
    .select("product_name, quantity, unit_price, line_total")
    .eq("order_id", orderId);

  const emailData: OrderEmailData = {
    id: order.id,
    receipt: order.receipt,
    customer_first_name: order.customer_first_name,
    customer_last_name: order.customer_last_name,
    contact_email: order.contact_email,
    contact_phone: order.contact_phone,
    shipping_address_snapshot: order.shipping_address_snapshot,
    total_amount: order.total_amount,
    subtotal_amount: order.subtotal_amount,
    shipping_amount: order.shipping_amount,
    tax_amount: order.tax_amount,
    currency: order.currency,
    razorpay_payment_id: razorpayPaymentId,
    items: items || [],
  };

  try {
    await Promise.all([
      sendAdminOrderNotification(emailData),
      sendCustomerOrderConfirmation(emailData),
    ]);

    await admin
      .from("orders")
      .update({
        email_sent_at: new Date().toISOString(),
        email_failed_at: null,
        email_error: null,
      })
      .eq("id", orderId);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown email error";
    console.error("Email send failed for order", orderId, errorMessage);

    await admin
      .from("orders")
      .update({
        email_failed_at: new Date().toISOString(),
        email_error: errorMessage,
      })
      .eq("id", orderId);

    throw error;
  }
}

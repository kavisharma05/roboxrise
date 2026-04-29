"use client";

import Link from "next/link";
import type { Order } from "@/lib/types/order";
import styles from "./Admin.module.css";

interface PaymentEvent {
  id: string;
  event_type: string;
  event_id: string | null;
  created_at: string;
  payload: Record<string, unknown>;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

function formatAmount(paise: number, currency = "INR") {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency,
  }).format(paise / 100);
}

function formatAddress(
  snap: Order["shipping_address_snapshot"]
): string {
  if (!snap) return "Not available";
  const parts = [snap.line1];
  if (snap.line2) parts.push(snap.line2);
  parts.push(`${snap.city}, ${snap.state} ${snap.postal_code}`);
  parts.push(snap.country);
  return parts.join(", ");
}

export default function AdminOrderDetail({
  order,
  paymentEvents,
}: {
  order: Order;
  paymentEvents: PaymentEvent[];
}) {
  const customerName =
    [order.customer_first_name, order.customer_last_name]
      .filter(Boolean)
      .join(" ") || "Guest";

  return (
    <>
      <div className={styles.detailHeader}>
        <Link href="/admin/orders" className={styles.backBtn}>
          &larr; Orders
        </Link>
        <h1 className={styles.detailTitle}>
          {order.receipt ?? order.id.slice(0, 8)}
        </h1>
        <span
          className={`${styles.statusBadge} ${
            styles[`status_${order.status}`] ?? ""
          }`}
        >
          {order.status}
        </span>
      </div>

      <div className={styles.detailGrid}>
        {/* Customer info */}
        <div className={styles.detailCard}>
          <h3 className={styles.detailCardTitle}>Customer</h3>
          <div className={styles.infoRow}>
            <span className={styles.infoLabel}>Name</span>
            <span className={styles.infoValue}>{customerName}</span>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.infoLabel}>Email</span>
            <span className={styles.infoValue}>{order.contact_email}</span>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.infoLabel}>Phone</span>
            <span className={styles.infoValue}>
              {order.contact_phone || "Not provided"}
            </span>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.infoLabel}>User ID</span>
            <span className={styles.infoValue}>
              {order.user_id ? order.user_id.slice(0, 12) + "..." : "Guest"}
            </span>
          </div>
        </div>

        {/* Shipping address */}
        <div className={styles.detailCard}>
          <h3 className={styles.detailCardTitle}>Shipping Address</h3>
          {order.shipping_address_snapshot ? (
            <>
              <div className={styles.infoRow}>
                <span className={styles.infoLabel}>Name</span>
                <span className={styles.infoValue}>
                  {[
                    order.shipping_address_snapshot.first_name,
                    order.shipping_address_snapshot.last_name,
                  ]
                    .filter(Boolean)
                    .join(" ") || customerName}
                </span>
              </div>
              <div className={styles.infoRow}>
                <span className={styles.infoLabel}>Address</span>
                <span className={styles.infoValue}>
                  {formatAddress(order.shipping_address_snapshot)}
                </span>
              </div>
              {order.shipping_address_snapshot.phone && (
                <div className={styles.infoRow}>
                  <span className={styles.infoLabel}>Phone</span>
                  <span className={styles.infoValue}>
                    {order.shipping_address_snapshot.phone}
                  </span>
                </div>
              )}
            </>
          ) : (
            <p style={{ color: "#999", fontSize: 14 }}>
              Address snapshot not available (order placed before this feature).
            </p>
          )}
        </div>

        {/* Order items */}
        <div className={`${styles.detailCard} ${styles.detailCardFull}`}>
          <h3 className={styles.detailCardTitle}>Items</h3>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Product</th>
                <th>SKU</th>
                <th style={{ textAlign: "center" }}>Qty</th>
                <th style={{ textAlign: "right" }}>Unit Price</th>
                <th style={{ textAlign: "right" }}>Line Total</th>
              </tr>
            </thead>
            <tbody>
              {order.order_items?.map((item) => (
                <tr key={item.id}>
                  <td style={{ fontWeight: 500 }}>{item.product_name}</td>
                  <td style={{ color: "#999", fontSize: 12 }}>
                    {item.product_sku || "—"}
                  </td>
                  <td style={{ textAlign: "center" }}>{item.quantity}</td>
                  <td style={{ textAlign: "right" }}>
                    {formatAmount(item.unit_price, order.currency)}
                  </td>
                  <td style={{ textAlign: "right", fontWeight: 600 }}>
                    {formatAmount(item.line_total, order.currency)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Payment summary */}
        <div className={styles.detailCard}>
          <h3 className={styles.detailCardTitle}>Payment</h3>
          <div className={styles.infoRow}>
            <span className={styles.infoLabel}>Subtotal</span>
            <span className={styles.infoValue}>
              {formatAmount(order.subtotal_amount, order.currency)}
            </span>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.infoLabel}>Shipping</span>
            <span className={styles.infoValue}>
              {formatAmount(order.shipping_amount, order.currency)}
            </span>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.infoLabel}>Tax</span>
            <span className={styles.infoValue}>
              {formatAmount(order.tax_amount, order.currency)}
            </span>
          </div>
          <div className={`${styles.infoRow} ${styles.totalRow}`}>
            <span className={styles.infoLabel}>Total</span>
            <span className={styles.infoValue}>
              {formatAmount(order.total_amount, order.currency)}
            </span>
          </div>
          <div className={styles.infoRow} style={{ marginTop: 12 }}>
            <span className={styles.infoLabel}>Payment Status</span>
            <span
              className={`${styles.statusBadge} ${
                styles[`status_${order.payment_status}`] ?? ""
              }`}
            >
              {order.payment_status}
            </span>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.infoLabel}>Razorpay Payment ID</span>
            <span className={styles.infoValue} style={{ fontSize: 12 }}>
              {order.razorpay_payment_id || "—"}
            </span>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.infoLabel}>Razorpay Order ID</span>
            <span className={styles.infoValue} style={{ fontSize: 12 }}>
              {order.razorpay_order_id || "—"}
            </span>
          </div>
          {order.paid_at && (
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>Paid At</span>
              <span className={styles.infoValue}>
                {formatDate(order.paid_at)}
              </span>
            </div>
          )}
        </div>

        {/* Timeline */}
        <div className={styles.detailCard}>
          <h3 className={styles.detailCardTitle}>Timeline</h3>
          {paymentEvents.length === 0 ? (
            <p style={{ color: "#999", fontSize: 14 }}>No events recorded.</p>
          ) : (
            <div className={styles.timeline}>
              {paymentEvents.map((evt) => (
                <div key={evt.id} className={styles.timelineItem}>
                  <div className={styles.timelineDot} />
                  <div className={styles.timelineContent}>
                    <p className={styles.timelineEvent}>{evt.event_type}</p>
                    <p className={styles.timelineDate}>
                      {formatDate(evt.created_at)}
                      {evt.event_id && (
                        <span style={{ marginLeft: 8, color: "#bbb" }}>
                          {evt.event_id}
                        </span>
                      )}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

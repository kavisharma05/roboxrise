"use client";

import Link from "next/link";
import ScrollAnimation from "./ScrollAnimation";
import styles from "./OrderDetailPage.module.css";
import type { Order } from "@/lib/types/order";

const STATUS_LABELS: Record<string, string> = {
  pending: "Pending",
  paid: "Paid",
  failed: "Failed",
  cancelled: "Cancelled",
  refunded: "Refunded",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatAmount(paise: number) {
  return `\u20B9${(paise / 100).toLocaleString("en-IN", { minimumFractionDigits: 2 })}`;
}

export default function OrderDetailPage({ order }: { order: Order }) {
  const addr = order.addresses;

  return (
    <>
      <section className={styles.heroSection}>
        <div className={styles.heroBg} />
        <div className={styles.heroInner}>
          <ScrollAnimation>
            <Link href="/orders" className={styles.backLink}>
              &larr; All Orders
            </Link>
          </ScrollAnimation>
          <ScrollAnimation>
            <h1 className={styles.heroHeading}>Order Details</h1>
          </ScrollAnimation>
          <ScrollAnimation>
            <p className={styles.heroDescription}>
              Order placed on {formatDate(order.created_at)}
            </p>
          </ScrollAnimation>
        </div>
      </section>

      <section className={styles.detailSection}>
        <div className="padding-global padding-section-large">
          <div className="container-large">
            <div className={styles.grid}>
              {/* Left column — items + address */}
              <div className={styles.mainColumn}>
                {/* Status card */}
                <ScrollAnimation>
                  <div className={styles.card}>
                    <div className={styles.statusRow}>
                      <span
                        className={`${styles.statusBadge} ${
                          styles[`status_${order.status}`] ?? ""
                        }`}
                      >
                        {STATUS_LABELS[order.status] ?? order.status}
                      </span>
                      {order.paid_at && (
                        <span className={styles.paidDate}>
                          Paid {formatDate(order.paid_at)}
                        </span>
                      )}
                    </div>
                    {order.razorpay_payment_id && (
                      <div className={styles.metaRow}>
                        <span className={styles.metaLabel}>Payment ID</span>
                        <span className={styles.metaValue}>
                          {order.razorpay_payment_id}
                        </span>
                      </div>
                    )}
                    <div className={styles.metaRow}>
                      <span className={styles.metaLabel}>Order ID</span>
                      <span className={styles.metaValue}>
                        {order.id.slice(0, 8).toUpperCase()}
                      </span>
                    </div>
                  </div>
                </ScrollAnimation>

                {/* Items */}
                <ScrollAnimation>
                  <div className={styles.card}>
                    <h2 className={styles.cardTitle}>Items</h2>
                    <div className={styles.itemsList}>
                      {order.order_items?.map((item) => (
                        <div key={item.id} className={styles.itemRow}>
                          <div className={styles.itemInfo}>
                            <span className={styles.itemName}>
                              {item.product_name.split("–")[0].trim()}
                            </span>
                            <span className={styles.itemMeta}>
                              SKU: {item.product_sku ?? "—"} &middot; Qty:{" "}
                              {item.quantity}
                            </span>
                          </div>
                          <span className={styles.itemPrice}>
                            {formatAmount(item.line_total)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </ScrollAnimation>

                {/* Shipping address */}
                {addr && (
                  <ScrollAnimation>
                    <div className={styles.card}>
                      <h2 className={styles.cardTitle}>Shipping Address</h2>
                      <p className={styles.addressText}>
                        {addr.line1}
                        {addr.line2 && <>, {addr.line2}</>}
                        <br />
                        {addr.city}, {addr.state} {addr.postal_code}
                        <br />
                        {addr.country}
                      </p>
                    </div>
                  </ScrollAnimation>
                )}
              </div>

              {/* Right column — totals */}
              <div className={styles.sideColumn}>
                <ScrollAnimation>
                  <div className={styles.totalsCard}>
                    <h3 className={styles.totalsTitle}>Order Summary</h3>
                    <div className={styles.totalsLines}>
                      <div className={styles.totalsLine}>
                        <span>Subtotal</span>
                        <span>{formatAmount(order.subtotal_amount)}</span>
                      </div>
                      <div className={styles.totalsLine}>
                        <span>Shipping</span>
                        <span>
                          {order.shipping_amount === 0
                            ? "Free"
                            : formatAmount(order.shipping_amount)}
                        </span>
                      </div>
                      <div className={styles.totalsLine}>
                        <span>Tax</span>
                        <span>{formatAmount(order.tax_amount)}</span>
                      </div>
                    </div>
                    <div className={styles.totalsDivider} />
                    <div className={styles.totalsTotal}>
                      <span>Total</span>
                      <span>{formatAmount(order.total_amount)}</span>
                    </div>
                    <div className={styles.totalsContact}>
                      <span className={styles.metaLabel}>Contact</span>
                      <p className={styles.metaValue}>{order.contact_email}</p>
                      {order.contact_phone && (
                        <p className={styles.metaValue}>{order.contact_phone}</p>
                      )}
                    </div>
                  </div>
                </ScrollAnimation>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

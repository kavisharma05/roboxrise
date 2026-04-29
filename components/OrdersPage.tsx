"use client";

import Link from "next/link";
import ScrollAnimation from "./ScrollAnimation";
import styles from "./OrdersPage.module.css";
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
  });
}

function formatAmount(paise: number) {
  return `\u20B9${(paise / 100).toLocaleString("en-IN", { minimumFractionDigits: 2 })}`;
}

export default function OrdersPage({ orders }: { orders: Order[] }) {
  return (
    <>
      <section className={styles.heroSection}>
        <div className={styles.heroBg} />
        <div className={styles.heroInner}>
          <ScrollAnimation>
            <div className={styles.heroPill}>
              <span className={styles.heroPillDot} />
              <span>Account</span>
            </div>
          </ScrollAnimation>
          <ScrollAnimation>
            <h1 className={styles.heroHeading}>My Orders</h1>
          </ScrollAnimation>
          <ScrollAnimation>
            <p className={styles.heroDescription}>
              Track your purchases, view receipts, and check delivery status.
            </p>
          </ScrollAnimation>
        </div>
      </section>

      <section className={styles.listSection}>
        <div className="padding-global padding-section-large">
          <div className="container-large">
            {orders.length === 0 ? (
              <ScrollAnimation>
                <div className={styles.emptyState}>
                  <PackageIcon />
                  <h2 className={styles.emptyHeading}>No orders yet</h2>
                  <p className={styles.emptyText}>
                    When you make a purchase, your orders will appear here.
                  </p>
                  <Link href="/products" className={styles.emptyBtn}>
                    Browse Products
                  </Link>
                </div>
              </ScrollAnimation>
            ) : (
              <div className={styles.orderGrid}>
                {orders.map((order) => {
                  const itemCount =
                    order.order_items?.reduce((s, i) => s + i.quantity, 0) ?? 0;

                  return (
                    <ScrollAnimation key={order.id}>
                      <Link
                        href={`/orders/${order.id}`}
                        className={styles.orderCard}
                      >
                        <div className={styles.cardTop}>
                          <time className={styles.cardDate}>
                            {formatDate(order.created_at)}
                          </time>
                          <span
                            className={`${styles.statusBadge} ${
                              styles[`status_${order.status}`] ?? ""
                            }`}
                          >
                            {STATUS_LABELS[order.status] ?? order.status}
                          </span>
                        </div>

                        <p className={styles.cardItems}>
                          {itemCount} {itemCount === 1 ? "item" : "items"}
                        </p>

                        {order.order_items && order.order_items.length > 0 && (
                          <p className={styles.cardProductName}>
                            {order.order_items[0].product_name.split("–")[0].trim()}
                            {order.order_items.length > 1 &&
                              ` + ${order.order_items.length - 1} more`}
                          </p>
                        )}

                        <div className={styles.cardBottom}>
                          <span className={styles.cardTotal}>
                            {formatAmount(order.total_amount)}
                          </span>
                          <span className={styles.cardArrow}>
                            View Order &rarr;
                          </span>
                        </div>
                      </Link>
                    </ScrollAnimation>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

function PackageIcon() {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16.5 9.4l-9-5.19M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
      <line x1="12" y1="22.08" x2="12" y2="12" />
    </svg>
  );
}

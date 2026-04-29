"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import type { Order } from "@/lib/types/order";
import styles from "./Admin.module.css";

type FilterStatus = "all" | "paid" | "pending" | "failed";

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

export default function AdminOrdersList({ orders }: { orders: Order[] }) {
  const [filter, setFilter] = useState<FilterStatus>("all");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    let list = orders;
    if (filter !== "all") {
      list = list.filter((o) => o.status === filter);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (o) =>
          o.contact_email?.toLowerCase().includes(q) ||
          o.receipt?.toLowerCase().includes(q) ||
          o.customer_first_name?.toLowerCase().includes(q) ||
          o.customer_last_name?.toLowerCase().includes(q) ||
          o.id.toLowerCase().includes(q)
      );
    }
    return list;
  }, [orders, filter, search]);

  const stats = useMemo(() => {
    const paid = orders.filter((o) => o.status === "paid");
    return {
      total: orders.length,
      paid: paid.length,
      revenue: paid.reduce((s, o) => s + o.total_amount, 0),
      pending: orders.filter((o) => o.status === "pending").length,
    };
  }, [orders]);

  return (
    <>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Orders</h1>
        <p className={styles.pageSubtitle}>
          Manage and track all customer orders
        </p>
      </div>

      <div className={styles.statsRow}>
        <div className={styles.statCard}>
          <p className={styles.statLabel}>Total Orders</p>
          <p className={styles.statValue}>{stats.total}</p>
        </div>
        <div className={styles.statCard}>
          <p className={styles.statLabel}>Paid</p>
          <p className={styles.statValue}>{stats.paid}</p>
        </div>
        <div className={styles.statCard}>
          <p className={styles.statLabel}>Revenue</p>
          <p className={styles.statValue}>{formatAmount(stats.revenue)}</p>
        </div>
        <div className={styles.statCard}>
          <p className={styles.statLabel}>Pending</p>
          <p className={styles.statValue}>{stats.pending}</p>
        </div>
      </div>

      <div style={{ display: "flex", gap: 12, marginBottom: 16, flexWrap: "wrap" }}>
        {(["all", "paid", "pending", "failed"] as FilterStatus[]).map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            style={{
              padding: "6px 16px",
              borderRadius: 8,
              border: filter === s ? "2px solid #ff6b35" : "1px solid #ddd",
              background: filter === s ? "#fff4ed" : "#fff",
              color: filter === s ? "#ff6b35" : "#555",
              fontWeight: filter === s ? 600 : 400,
              fontSize: 13,
              cursor: "pointer",
              textTransform: "capitalize",
            }}
          >
            {s === "all" ? "All" : s}
          </button>
        ))}
        <input
          type="text"
          placeholder="Search by name, email, receipt..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            marginLeft: "auto",
            padding: "6px 14px",
            borderRadius: 8,
            border: "1px solid #ddd",
            fontSize: 13,
            width: 260,
            outline: "none",
          }}
        />
      </div>

      <div className={styles.tableWrap}>
        {filtered.length === 0 ? (
          <div className={styles.emptyTable}>No orders found.</div>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Date</th>
                <th>Customer</th>
                <th>Items</th>
                <th>Total</th>
                <th>Status</th>
                <th>Receipt</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((order) => {
                const name =
                  [order.customer_first_name, order.customer_last_name]
                    .filter(Boolean)
                    .join(" ") || "Guest";
                const itemCount =
                  order.order_items?.reduce((s, i) => s + i.quantity, 0) ?? 0;

                return (
                  <tr key={order.id}>
                    <td>{formatDate(order.created_at)}</td>
                    <td>
                      <div className={styles.customerName}>{name}</div>
                      <div className={styles.customerEmail}>
                        {order.contact_email}
                      </div>
                    </td>
                    <td>
                      {itemCount} {itemCount === 1 ? "item" : "items"}
                    </td>
                    <td style={{ fontWeight: 600 }}>
                      {formatAmount(order.total_amount)}
                    </td>
                    <td>
                      <span
                        className={`${styles.statusBadge} ${
                          styles[`status_${order.status}`] ?? ""
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td style={{ fontSize: 12, color: "#999" }}>
                      {order.receipt}
                    </td>
                    <td>
                      <Link
                        href={`/admin/orders/${order.id}`}
                        style={{
                          color: "#ff6b35",
                          fontWeight: 600,
                          fontSize: 13,
                          textDecoration: "none",
                        }}
                      >
                        View &rarr;
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}

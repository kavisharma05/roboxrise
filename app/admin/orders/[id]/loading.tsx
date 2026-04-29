"use client";

import { PageHeaderSkeleton, OrderSkeleton } from "@/components/Skeleton";

export default function Loading() {
  return (
    <div style={{ padding: "2rem" }}>
      <PageHeaderSkeleton />
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        <OrderSkeleton />
      </div>
    </div>
  );
}

"use client";

import { PageHeaderSkeleton, OrdersSkeleton } from "@/components/Skeleton";

export default function Loading() {
  return (
    <div style={{ padding: "2rem" }}>
      <PageHeaderSkeleton />
      <OrdersSkeleton count={5} />
    </div>
  );
}

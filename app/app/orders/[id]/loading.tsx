"use client";

import Navbar from "@/components/Navbar";
import { PageHeaderSkeleton, OrderSkeleton } from "@/components/Skeleton";

export default function Loading() {
  return (
    <>
      <Navbar />
      <main className="main-wrapper">
        <PageHeaderSkeleton />
        <div style={{ maxWidth: "800px", margin: "0 auto", padding: "0 2rem 2rem" }}>
          <OrderSkeleton />
        </div>
      </main>
    </>
  );
}

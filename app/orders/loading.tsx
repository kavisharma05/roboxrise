"use client";

import Navbar from "@/components/Navbar";
import { PageHeaderSkeleton, OrdersSkeleton } from "@/components/Skeleton";

export default function Loading() {
  return (
    <>
      <Navbar />
      <main className="main-wrapper">
        <PageHeaderSkeleton />
        <OrdersSkeleton count={3} />
      </main>
    </>
  );
}

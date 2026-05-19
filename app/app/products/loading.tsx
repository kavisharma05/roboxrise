"use client";

import Navbar from "@/components/Navbar";
import { PageHeaderSkeleton, ProductGridSkeleton } from "@/components/Skeleton";

export default function Loading() {
  return (
    <>
      <Navbar />
      <main className="main-wrapper">
        <PageHeaderSkeleton />
        <ProductGridSkeleton count={6} />
      </main>
    </>
  );
}

"use client";

import Navbar from "@/components/Navbar";
import { ProductDetailSkeleton } from "@/components/Skeleton";

export default function Loading() {
  return (
    <>
      <Navbar />
      <main className="main-wrapper" style={{ paddingTop: "2rem" }}>
        <ProductDetailSkeleton />
      </main>
    </>
  );
}

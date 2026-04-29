"use client";

import Navbar from "@/components/Navbar";
import { PageHeaderSkeleton, CartSkeleton } from "@/components/Skeleton";

export default function Loading() {
  return (
    <>
      <Navbar />
      <main className="main-wrapper">
        <PageHeaderSkeleton />
        <CartSkeleton />
      </main>
    </>
  );
}

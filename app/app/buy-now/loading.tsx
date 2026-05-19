"use client";

import Navbar from "@/components/Navbar";
import { BuyNowSkeleton } from "@/components/Skeleton";

export default function Loading() {
  return (
    <>
      <Navbar />
      <main className="main-wrapper">
        <BuyNowSkeleton />
      </main>
    </>
  );
}

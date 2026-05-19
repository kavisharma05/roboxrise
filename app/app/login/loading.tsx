"use client";

import Navbar from "@/components/Navbar";
import { LoginSkeleton } from "@/components/Skeleton";

export default function Loading() {
  return (
    <>
      <Navbar />
      <main className="main-wrapper">
        <LoginSkeleton />
      </main>
    </>
  );
}

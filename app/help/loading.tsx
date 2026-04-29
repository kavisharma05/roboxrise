"use client";

import Navbar from "@/components/Navbar";
import { PageHeaderSkeleton, SectionSkeleton, FAQSkeleton } from "@/components/Skeleton";

export default function Loading() {
  return (
    <>
      <Navbar />
      <main className="main-wrapper">
        <PageHeaderSkeleton />
        <SectionSkeleton title={false} subtitle={false}>
          <FAQSkeleton count={8} />
        </SectionSkeleton>
      </main>
    </>
  );
}

"use client";

import Navbar from "@/components/Navbar";
import { PageHeaderSkeleton, SectionSkeleton, SkeletonText } from "@/components/Skeleton";

export default function Loading() {
  return (
    <>
      <Navbar />
      <main className="main-wrapper">
        <PageHeaderSkeleton />
        <SectionSkeleton title={false} subtitle={false}>
          <div style={{ maxWidth: "800px", margin: "0 auto", padding: "0 2rem" }}>
            <SkeletonText lines={20} gap="1rem" lastLineWidth="80%" />
          </div>
        </SectionSkeleton>
      </main>
    </>
  );
}

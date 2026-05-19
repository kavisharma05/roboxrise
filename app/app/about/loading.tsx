"use client";

import Navbar from "@/components/Navbar";
import {
  PageHeaderSkeleton,
  SectionSkeleton,
  CardGridSkeleton,
  SkeletonText,
  Skeleton,
} from "@/components/Skeleton";

export default function Loading() {
  return (
    <>
      <Navbar />
      <main className="main-wrapper">
        <PageHeaderSkeleton />
        <SectionSkeleton title subtitle>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem", maxWidth: "80rem", margin: "0 auto", padding: "0 2rem" }}>
            <Skeleton width="100%" height="400px" borderRadius="1.25rem" />
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <SkeletonText lines={6} />
            </div>
          </div>
        </SectionSkeleton>
        <SectionSkeleton title subtitle>
          <CardGridSkeleton count={4} />
        </SectionSkeleton>
      </main>
    </>
  );
}

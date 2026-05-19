"use client";

import Navbar from "@/components/Navbar";
import {
  HeroSkeleton,
  SectionSkeleton,
  CardGridSkeleton,
  TeamGridSkeleton,
  FAQSkeleton,
} from "@/components/Skeleton";

export default function Loading() {
  return (
    <>
      <Navbar />
      <main className="main-wrapper">
        <HeroSkeleton />
        <SectionSkeleton title subtitle>
          <CardGridSkeleton count={4} />
        </SectionSkeleton>
        <SectionSkeleton title subtitle>
          <TeamGridSkeleton count={4} />
        </SectionSkeleton>
        <SectionSkeleton title subtitle>
          <CardGridSkeleton count={4} />
        </SectionSkeleton>
        <SectionSkeleton title subtitle>
          <FAQSkeleton count={5} />
        </SectionSkeleton>
      </main>
    </>
  );
}

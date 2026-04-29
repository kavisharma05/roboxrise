"use client";

import Navbar from "@/components/Navbar";
import { PageHeaderSkeleton, SectionSkeleton, ContactFormSkeleton } from "@/components/Skeleton";

export default function Loading() {
  return (
    <>
      <Navbar />
      <main className="main-wrapper">
        <PageHeaderSkeleton />
        <SectionSkeleton title={false} subtitle={false}>
          <ContactFormSkeleton />
        </SectionSkeleton>
      </main>
    </>
  );
}

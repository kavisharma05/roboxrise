import { Suspense } from "react";
import { Skeleton } from "@/components/BoneyardSkeleton";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import BuyNowPage from "@/components/BuyNowPage";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Checkout | RoboRise",
  description: "Complete your purchase — secure checkout with free shipping on all RoboRise robotics kits.",
};

export default function BuyNow() {
  return (
    <>
      <Navbar />
      <main className="main-wrapper">
        <Skeleton name="checkout-page" loading={false}>
          <Suspense>
            <BuyNowPage />
          </Suspense>
        </Skeleton>
      </main>
      <Footer />
    </>
  );
}

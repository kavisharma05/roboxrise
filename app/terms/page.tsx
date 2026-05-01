import type { Metadata } from "next";
import { Skeleton } from "@/components/BoneyardSkeleton";
import Navbar from "@/components/Navbar";
import TermsPage from "@/components/TermsPage";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
    title: "Terms of Service",
    description:
        "Review the RoboxRise terms covering product usage, orders, payments, returns, warranties, and service responsibilities.",
};

export default function Terms() {
    return (
        <>
            <Navbar />
            <main className="main-wrapper">
                <Skeleton name="terms-page" loading={false}>
                    <TermsPage />
                </Skeleton>
            </main>
            <Footer />
        </>
    );
}

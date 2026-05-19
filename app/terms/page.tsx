import type { Metadata } from "next";
import { Skeleton } from "@/components/BoneyardSkeleton";
import Navbar from "@/components/Navbar";
import TermsPage from "@/components/TermsPage";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
    title: "Terms of Service | RoboxRise",
    description:
        "Review the RoboxRise terms covering product usage, orders, payments, returns, warranties, and service responsibilities.",
    alternates: {
        canonical: "https://roboxrise.in/terms",
    },
    openGraph: {
        title: "Terms of Service | RoboxRise",
        url: "https://roboxrise.in/terms",
        images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "RoboxRise", type: "image/jpeg" }],
    },
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

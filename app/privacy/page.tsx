import type { Metadata } from "next";
import { Skeleton } from "@/components/BoneyardSkeleton";
import Navbar from "@/components/Navbar";
import PrivacyPage from "@/components/PrivacyPage";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
    title: "Privacy Policy",
    description:
        "Read RoboxRise privacy practices, including data collection, usage, security, and your rights as a customer or learner.",
};

export default function Privacy() {
    return (
        <>
            <Navbar />
            <main className="main-wrapper">
                <Skeleton name="privacy-page" loading={false}>
                    <PrivacyPage />
                </Skeleton>
            </main>
            <Footer />
        </>
    );
}

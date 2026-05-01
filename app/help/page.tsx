import type { Metadata } from "next";
import { Skeleton } from "@/components/BoneyardSkeleton";
import Navbar from "@/components/Navbar";
import HelpPage from "@/components/HelpPage";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
    title: "Help Center",
    description:
        "Browse RoboxRise help topics, FAQs, and support resources for orders, warranties, product setup, and technical assistance.",
};

export default function Help() {
    return (
        <>
            <Navbar />
            <main className="main-wrapper">
                <Skeleton name="help-page" loading={false}>
                    <HelpPage />
                </Skeleton>
            </main>
            <Footer />
        </>
    );
}

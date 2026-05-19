import type { Metadata } from "next";
import { Skeleton } from "@/components/BoneyardSkeleton";
import Navbar from "@/components/Navbar";
import ContactPage from "@/components/ContactPage";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
    title: "Contact RoboxRise | Get a Demo or Quote",
    description:
        "Reach the RoboxRise team for product demos, institutional pricing, and curriculum support. We respond within 24 hours.",
    keywords: [
        "contact RoboxRise",
        "robotics demo india",
        "buy robotics kit inquiry",
        "institutional robotics pricing",
    ],
    alternates: {
        canonical: "https://roboxrise.in/contact",
    },
    openGraph: {
        title: "Contact RoboxRise | Get a Demo or Quote",
        description:
            "Reach the RoboxRise team for product demos, institutional pricing, and curriculum support. We respond within 24 hours.",
        url: "https://roboxrise.in/contact",
        images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "RoboxRise", type: "image/jpeg" }],
    },
};

export default function Contact() {
    return (
        <>
            <Navbar />
            <main className="main-wrapper">
                <Skeleton name="contact-page" loading={false}>
                    <ContactPage />
                </Skeleton>
            </main>
            <Footer />
        </>
    );
}

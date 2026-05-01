import type { Metadata } from "next";
import { Skeleton } from "@/components/BoneyardSkeleton";
import Navbar from "@/components/Navbar";
import ContactPage from "@/components/ContactPage";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
    title: "Contact",
    description:
        "Contact RoboxRise for demos, pricing, curriculum partnerships, and institutional robotics deployment support.",
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

import type { Metadata } from "next";
import { Skeleton } from "@/components/BoneyardSkeleton";
import Navbar from "@/components/Navbar";
import AboutPage from "@/components/AboutPage";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
    title: "About RoboxRise | India's Educational Robotics Platform",
    description:
        "Learn about RoboxRise, our mission, and how we deliver industry-aligned robotics and AI education for institutions across India.",
    keywords: [
        "RoboxRise company",
        "WLKATA india distributor",
        "robotics education company india",
        "indore robotics company",
    ],
    alternates: {
        canonical: "https://roboxrise.in/about",
    },
    openGraph: {
        title: "About RoboxRise | India's Educational Robotics Platform",
        description:
            "Learn about RoboxRise, our mission, and how we deliver industry-aligned robotics and AI education for institutions across India.",
        url: "https://roboxrise.in/about",
        images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "RoboxRise", type: "image/jpeg" }],
    },
};

export default function About() {
    return (
        <>
            <Navbar />
            <main className="main-wrapper">
                <Skeleton name="about-page" loading={false}>
                    <AboutPage />
                </Skeleton>
            </main>
            <Footer />
        </>
    );
}

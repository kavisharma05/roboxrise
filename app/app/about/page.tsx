import type { Metadata } from "next";
import { Skeleton } from "@/components/BoneyardSkeleton";
import Navbar from "@/components/Navbar";
import AboutPage from "@/components/AboutPage";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
    title: { absolute: "About RoboxRise | Robotics & AI Education Platform" },
    description:
        "Learn about RoboxRise's mission to deliver industrial-grade robotics and AI education for schools, universities, and training institutions.",
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
        title: "About RoboxRise | Robotics & AI Education Platform",
        description:
            "Learn about RoboxRise's mission to deliver industrial-grade robotics and AI education for schools, universities, and training institutions.",
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

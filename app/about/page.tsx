import type { Metadata } from "next";
import { Skeleton } from "@/components/BoneyardSkeleton";
import Navbar from "@/components/Navbar";
import AboutPage from "@/components/AboutPage";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
    title: "About",
    description:
        "Learn about RoboxRise, our mission, and how we deliver industry-aligned robotics and AI education for institutions.",
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

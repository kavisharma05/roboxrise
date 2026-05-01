import type { Metadata } from "next";
import { Skeleton } from "@/components/BoneyardSkeleton";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Discover from "@/components/Discover";
import Services from "@/components/Services";
import Team from "@/components/Team";
import Testimonials from "@/components/Testimonials";
import AppPromo from "@/components/AppPromo";
import Contact from "@/components/Contact";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import WhoItsFor from "@/components/WhoItsFor";

export const metadata: Metadata = {
    title: "Robotics Kits for Universities & Schools",
    description:
        "Build real robots and teach real AI with RoboxRise classroom-ready kits, mini factory cells, and educator support programs.",
};

export default function Home() {
    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
            {
                "@type": "Question",
                name: "Is this suitable for beginners?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes. Our systems are designed for progressive learning from basic motion control to advanced automation and AI.",
                },
            },
            {
                "@type": "Question",
                name: "What software platforms are supported?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "RoboxRise products support ROS, ROS2, Python, Arduino, and open APIs for educational and lab workflows.",
                },
            },
            {
                "@type": "Question",
                name: "Can these be used in schools and universities?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "Absolutely. RoboxRise systems are built for classrooms, labs, training centers, and research environments.",
                },
            },
            {
                "@type": "Question",
                name: "Can I purchase in bulk for institutions?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes. We offer academic and bulk pricing for institutions. Contact our team for custom packages.",
                },
            },
        ],
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(faqSchema),
                }}
            />
            <Navbar />
            <main className="main-wrapper">
                <Skeleton name="homepage" loading={false}>
                    <Hero />
                    <Discover />
                    <Team />
                    <Services />
                    <WhoItsFor />
                    <Testimonials />
                    <AppPromo />
                    <Contact />
                    <FAQ />
                </Skeleton>
            </main>
            <Footer />
        </>
    );
}

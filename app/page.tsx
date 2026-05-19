import type { Metadata } from "next";
import { Skeleton } from "@/components/BoneyardSkeleton";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Discover from "@/components/Discover";
import Services from "@/components/Services";
import Team from "@/components/Team";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import WhoItsFor from "@/components/WhoItsFor";

export const metadata: Metadata = {
    title: "Robotics & AI Kits for Schools & Universities | RoboxRise",
    description:
        "Build real robots and teach real AI with RoboxRise classroom-ready kits, mini factory cells, and educator support programs.",
    keywords: [
        "robotics kits india",
        "educational robotic arm",
        "AI STEM education",
        "ROS2 robotics",
        "school robotics lab",
        "STEM lab equipment",
        "robotic arm india",
        "robotics for universities",
    ],
    alternates: {
        canonical: "https://roboxrise.in/",
    },
    openGraph: {
        title: "Robotics & AI Kits for Schools & Universities | RoboxRise",
        description:
            "Build real robots and teach real AI with RoboxRise classroom-ready kits, mini factory cells, and educator support programs.",
        url: "https://roboxrise.in/",
        type: "website",
        images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "RoboxRise — Robotics & AI Kits for Schools and Universities", type: "image/jpeg" }],
    },
    twitter: {
        card: "summary_large_image",
        title: "Robotics & AI Kits for Schools & Universities | RoboxRise",
        description: "Build real robots and teach real AI with RoboxRise classroom-ready kits, mini factory cells, and educator support programs.",
        images: ["/og-image.jpg"],
    },
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
                    text: "Yes. Our systems are designed for progressive learning — from basic motion control to advanced automation and AI. Each product includes guided experiments and setup resources to help beginners get started quickly.",
                },
            },
            {
                "@type": "Question",
                name: "What software platforms are supported?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "RoboxRise products support ROS / ROS2, Python, Arduino, and open APIs — making them compatible with most educational and lab workflows.",
                },
            },
            {
                "@type": "Question",
                name: "Are learning materials included?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes. Every system comes with curriculum guides, experiment manuals, and setup tutorials. Educational kits also include structured lesson plans.",
                },
            },
            {
                "@type": "Question",
                name: "Can these be used in schools and universities?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "Absolutely. RoboxRise systems are built specifically for classrooms, labs, training centers, and research environments.",
                },
            },
            {
                "@type": "Question",
                name: "Do you provide technical support?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes. We offer documentation, video guides, and direct support to help you through setup, projects, and troubleshooting.",
                },
            },
            {
                "@type": "Question",
                name: "Can I purchase in bulk for institutions?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes — we offer academic and bulk pricing. Contact our team for custom packages.",
                },
            },
        ],
    };

    const localBusinessSchema = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        name: "RoboxRise",
        image: "https://roboxrise.in/og-image.jpg",
        url: "https://roboxrise.in",
        telephone: "+91-81200-07474",
        email: "sales@roboxrise.in",
        address: {
            "@type": "PostalAddress",
            streetAddress: "156, Krishna Market, Near Parmanu Nagar, CAT Road",
            addressLocality: "Indore",
            addressRegion: "Madhya Pradesh",
            postalCode: "452012",
            addressCountry: "IN",
        },
        openingHoursSpecification: [
            {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                opens: "09:00",
                closes: "18:00",
            },
        ],
        priceRange: "₹₹₹",
        areaServed: "IN",
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(faqSchema),
                }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(localBusinessSchema),
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
                    {/* FAQ first, then Contact below it — Fix #18 */}
                    <FAQ />
                    <Contact />
                </Skeleton>
            </main>
            <Footer />
        </>
    );
}


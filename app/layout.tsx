import type { Metadata, Viewport } from "next";
import { Montserrat, Inter } from "next/font/google";
import "./globals.css";
import "@/bones/registry";
import RoboxRiseIntroLoader from "@/components/RoboxRiseIntroLoader";
import SmoothScroll from "@/components/SmoothScroll";
import Providers from "@/components/Providers";

const montserrat = Montserrat({
    subsets: ["latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
    variable: "--font-montserrat",
    display: "swap",
});

const inter = Inter({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
    variable: "--font-inter",
    display: "swap",
});

export const metadata: Metadata = {
    metadataBase: new URL("https://roboxrise.in"),
    title: {
        default: "RoboxRise | Robotics Kits for Universities & Schools | AI STEM Education",
        template: "%s | RoboxRise",
    },
    description:
        "RoboxRise delivers industrial-grade robotic arms and AI kits designed for universities, schools, and labs. Trusted by 100+ institutions.",
    keywords: [
        "robotics kits for universities",
        "educational robotic arm",
        "AI STEM education",
        "ROS2 robotics",
        "school robotics lab",
        "STEM lab equipment",
        "robotic arm India",
    ],
    authors: [{ name: "RoboxRise" }],
    creator: "RoboxRise",
    publisher: "RoboxRise",
    icons: {
        icon: [
            { url: "/icon", sizes: "32x32", type: "image/png" },
            { url: "/roboriselogo.svg", type: "image/svg+xml" },
        ],
        apple: [{ url: "/apple-icon", sizes: "180x180", type: "image/png" }],
    },
    robots: {
        index: true,
        follow: true,
    },
    alternates: {
        canonical: "/",
        languages: {
            en: "/",
            "en-IN": "/",
        },
    },
    openGraph: {
        title: "RoboxRise | Robotics & AI Kits for Schools & Universities",
        description:
            "Hands-on robotics kits with curriculum, certification, and support for classrooms, labs, and future engineers.",
        type: "website",
        url: "https://roboxrise.in",
        siteName: "RoboxRise",
        images: [
            {
                url: "/roboriselogo.svg",
                width: 1200,
                height: 630,
                alt: "RoboxRise",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "RoboxRise | Robotics Education Platform",
        description:
            "Industrial-grade robotic arms and AI kits for STEM classrooms, labs, and universities.",
        images: ["/roboriselogo.svg"],
    },
    other: {
        "geo.region": "IN",
        "geo.placename": "India",
    },
};

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const organizationSchema = {
        "@context": "https://schema.org",
        "@type": ["Organization", "EducationalOrganization"],
        name: "RoboxRise",
        url: "https://roboxrise.in",
        logo: "https://roboxrise.in/roboriselogo.svg",
        description:
            "Industrial-grade robotic arms and AI kits for universities, schools, and STEM labs.",
        areaServed: "IN",
    };

    return (
        <html
            lang="en"
            className={`${montserrat.variable} ${inter.variable}`}
            suppressHydrationWarning
        >
            <head>
                <script
                    dangerouslySetInnerHTML={{
                        __html: `(function(){try{var k='roborise-intro-loader-seen';if(!sessionStorage.getItem(k))document.documentElement.classList.add('intro-loader-active');}catch(e){}})();`,
                    }}
                />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(organizationSchema),
                    }}
                />
            </head>
            <body>
                <RoboxRiseIntroLoader />
                <Providers>
                    <SmoothScroll>
                        <div className="page-wrapper is-main">{children}</div>
                    </SmoothScroll>
                </Providers>
            </body>
        </html>
    );
}

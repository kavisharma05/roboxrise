import type { Metadata } from "next";
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
    title: "RoboRise - Robotics & AI Education Platform",
    description:
        "Embodied AI robotics kits and mini industrial arms designed for classrooms, labs, and future engineers. Build real robots. Teach real AI.",
    openGraph: {
        title: "RoboRise - Robotics & AI Education Platform",
        description:
            "Embodied AI robotics kits and mini industrial arms designed for classrooms, labs, and future engineers. Build real robots. Teach real AI.",
        type: "website",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
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

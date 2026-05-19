import type { Metadata } from "next";
import { Skeleton } from "@/components/BoneyardSkeleton";
import Navbar from "@/components/Navbar";
import ProductsPage from "@/components/ProductsPage";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
    title: "Educational Robotics Kits & Systems | RoboxRise",
    description:
        "Explore RoboxRise robotics kits, mini factory systems, AI modules, and classroom-ready automation learning platforms.",
    keywords: [
        "buy robotics kit india",
        "educational robot arm price",
        "6 axis robotic arm india",
        "ROS2 robot kit",
        "MATLAB robotics",
        "industrial robot for education",
        "STEM lab equipment india",
    ],
    alternates: {
        canonical: "https://roboxrise.in/products",
    },
    openGraph: {
        title: "Educational Robotics Kits & Systems | RoboxRise",
        description:
            "Explore RoboxRise robotics kits, mini factory systems, AI modules, and classroom-ready automation learning platforms.",
        url: "https://roboxrise.in/products",
        images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "RoboxRise", type: "image/jpeg" }],
    },
};

export default function Products() {
    return (
        <>
            <Navbar />
            <main className="main-wrapper">
                <Skeleton name="products-page" loading={false}>
                    <ProductsPage />
                </Skeleton>
            </main>
            <Footer />
        </>
    );
}

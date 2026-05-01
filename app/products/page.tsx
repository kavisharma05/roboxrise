import type { Metadata } from "next";
import { Skeleton } from "@/components/BoneyardSkeleton";
import Navbar from "@/components/Navbar";
import ProductsPage from "@/components/ProductsPage";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
    title: "Products",
    description:
        "Explore RoboxRise robotics kits, mini factory systems, AI modules, and classroom-ready automation learning platforms.",
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

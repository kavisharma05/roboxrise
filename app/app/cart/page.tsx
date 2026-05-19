import { Skeleton } from "@/components/BoneyardSkeleton";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import CartPage from "@/components/CartPage";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
    title: "Your Cart | RoboxRise",
    description: "Review the items in your cart before checkout.",
};

export default function Cart() {
    return (
        <>
            <Navbar />
            <main className="main-wrapper">
                <Skeleton name="cart-page" loading={false}>
                    <CartPage />
                </Skeleton>
            </main>
            <Footer />
        </>
    );
}

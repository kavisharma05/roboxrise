import { Skeleton } from "@/components/BoneyardSkeleton";
import Navbar from "@/components/Navbar";
import ProductsPage from "@/components/ProductsPage";
import Footer from "@/components/Footer";

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

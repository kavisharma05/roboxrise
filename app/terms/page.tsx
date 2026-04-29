import { Skeleton } from "@/components/BoneyardSkeleton";
import Navbar from "@/components/Navbar";
import TermsPage from "@/components/TermsPage";
import Footer from "@/components/Footer";

export default function Terms() {
    return (
        <>
            <Navbar />
            <main className="main-wrapper">
                <Skeleton name="terms-page" loading={false}>
                    <TermsPage />
                </Skeleton>
            </main>
            <Footer />
        </>
    );
}

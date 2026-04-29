import { Skeleton } from "@/components/BoneyardSkeleton";
import Navbar from "@/components/Navbar";
import PrivacyPage from "@/components/PrivacyPage";
import Footer from "@/components/Footer";

export default function Privacy() {
    return (
        <>
            <Navbar />
            <main className="main-wrapper">
                <Skeleton name="privacy-page" loading={false}>
                    <PrivacyPage />
                </Skeleton>
            </main>
            <Footer />
        </>
    );
}

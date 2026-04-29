import { Skeleton } from "@/components/BoneyardSkeleton";
import Navbar from "@/components/Navbar";
import HelpPage from "@/components/HelpPage";
import Footer from "@/components/Footer";

export default function Help() {
    return (
        <>
            <Navbar />
            <main className="main-wrapper">
                <Skeleton name="help-page" loading={false}>
                    <HelpPage />
                </Skeleton>
            </main>
            <Footer />
        </>
    );
}

import { Skeleton } from "@/components/BoneyardSkeleton";
import Navbar from "@/components/Navbar";
import AboutPage from "@/components/AboutPage";
import Footer from "@/components/Footer";

export default function About() {
    return (
        <>
            <Navbar />
            <main className="main-wrapper">
                <Skeleton name="about-page" loading={false}>
                    <AboutPage />
                </Skeleton>
            </main>
            <Footer />
        </>
    );
}

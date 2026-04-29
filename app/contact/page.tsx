import { Skeleton } from "@/components/BoneyardSkeleton";
import Navbar from "@/components/Navbar";
import ContactPage from "@/components/ContactPage";
import Footer from "@/components/Footer";

export default function Contact() {
    return (
        <>
            <Navbar />
            <main className="main-wrapper">
                <Skeleton name="contact-page" loading={false}>
                    <ContactPage />
                </Skeleton>
            </main>
            <Footer />
        </>
    );
}

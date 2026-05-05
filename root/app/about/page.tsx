import Navbar from "@/components/Navbar";
import AboutPage from "@/components/AboutPage";
import Footer from "@/components/Footer";

export default function About() {
    return (
        <>
            <Navbar />
            <main className="main-wrapper">
                <AboutPage />
            </main>
            <Footer />
        </>
    );
}

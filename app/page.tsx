import { Skeleton } from "@/components/BoneyardSkeleton";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Discover from "@/components/Discover";
import Services from "@/components/Services";
import Team from "@/components/Team";
import Testimonials from "@/components/Testimonials";
import AppPromo from "@/components/AppPromo";
import Contact from "@/components/Contact";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import WhoItsFor from "@/components/WhoItsFor";

export default function Home() {
    return (
        <>
            <Navbar />
            <main className="main-wrapper">
                <Skeleton name="homepage" loading={false}>
                    <Hero />
                    <Discover />
                    <Team />
                    <Services />
                    <WhoItsFor />
                    <Testimonials />
                    <AppPromo />
                    <Contact />
                    <FAQ />
                </Skeleton>
            </main>
            <Footer />
        </>
    );
}

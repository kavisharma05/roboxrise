"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./Hero.module.css";
import HeroContactForm from "./HeroContactForm";

export default function Hero() {
    const [isDesktop, setIsDesktop] = useState(false);
    const [isDesktopFormOpen, setIsDesktopFormOpen] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia("(min-width: 992px)");
        const syncDesktopState = () => {
            const desktopView = mediaQuery.matches;
            setIsDesktop(desktopView);
            if (!desktopView) {
                setIsDesktopFormOpen(true);
            } else {
                setIsDesktopFormOpen(false);
            }
        };

        syncDesktopState();
        mediaQuery.addEventListener("change", syncDesktopState);

        return () => {
            mediaQuery.removeEventListener("change", syncDesktopState);
        };
    }, []);

    const isFormVisible = !isDesktop || isDesktopFormOpen;

    return (
        <section className={styles.sectionFull}>
            {/* Centered Hero Text */}
            <div className={styles.heroContent}>
                <div className={styles.fullWrap}>
                    <div className={styles.tagline}>
                        <span className={styles.taglineDot} />
                        <span>Robotics &amp; AI Education Platform</span>
                    </div>
                    <h1 className={styles.heading}>
                        Build Real Robots.
                        <br />
                        Teach Real AI.
                    </h1>
                    <div className={styles.fullDescription}>
                        <div>
                            Embodied AI robotics kits and mini industrial arms designed for classrooms, labs, and future engineers.
                        </div>
                    </div>
                    <div className={styles.ctaGroup}>
                        <Link href="/products" className={styles.ctaPrimary}>
                            Explore Products
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </Link>
                        <button
                            type="button"
                            className={`${styles.ctaSecondary} ${styles.ctaSecondaryButton}`}
                            onClick={() => setIsDesktopFormOpen((open) => !open)}
                            aria-expanded={isFormVisible}
                            aria-controls="hero-contact-form"
                        >
                            Book a Demo
                        </button>
                    </div>
                    <div className={styles.trustBadge}>
                        <span className={styles.trustIcon}>✦</span>
                        <span>Trusted by educators, labs, and innovators worldwide</span>
                    </div>
                </div>
            </div>

            {/* Contact Form - Bottom Right */}
            <div
                id="hero-contact-form"
                className={`${styles.heroFormWrap} ${!isFormVisible ? styles.heroFormWrapHidden : ""}`}
            >
                <HeroContactForm />
            </div>

            {/* Background */}
            <div className={styles.bg}>
                <div className={styles.bgImg}>
                    {/* Mobile Image - shown on tablet and below */}
                    <img
                        src="https://wubflow-shield.NOCODEXPORT.DEV/6824160149c9e88dc8ac7225/68280095df66237566c73810_mobile.webp"
                        alt=""
                        className={`${styles.imageMain} ${styles.showTablet}`}
                    />
                    {/* Desktop Video - hidden on tablet and below */}
                    <div className={styles.hideTablet}>
                        <video
                            autoPlay
                            muted
                            loop
                            playsInline
                            className={styles.imageMain}
                        >
                            <source
                                src="https://res.cloudinary.com/dixayfqq8/video/upload/v1770155966/hero-roborise_ukt8hi.mp4"
                                type="video/mp4"
                            />
                        </video>
                    </div>
                </div>
                {/* Bottom gradient overlay for form readability */}
                <div className={styles.bgGradientBottom} />
            </div>
        </section>
    );
}

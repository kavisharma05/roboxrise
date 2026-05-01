"use client";

import Link from "next/link";
import styles from "./Hero.module.css";
import HeroContactForm from "./HeroContactForm";

export default function Hero() {
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
                        <Link
                            href="/contact"
                            className={`${styles.ctaSecondary} ${styles.ctaSecondaryButton}`}
                        >
                            Book a Demo
                        </Link>
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
                className={styles.heroFormWrap}
            >
                <HeroContactForm />
            </div>

            {/* Background */}
            <div className={styles.bg}>
                <div className={styles.bgImg}>
                    {/* Mobile Image - shown on tablet and below */}
                    <img
                        src="https://res.cloudinary.com/dixayfqq8/image/upload/v1770269617/section1a_okfphc.jpg"
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

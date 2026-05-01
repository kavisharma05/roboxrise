"use client";

import { useState } from "react";
import Link from "next/link";
import ScrollAnimation from "./ScrollAnimation";
import styles from "./HelpPage.module.css";

const helpTopics = [
    {
        title: "Getting Started",
        href: "/contact?topic=getting-started",
        description: "New to RoboxRise? Learn how to set up your first robotics kit and begin your journey.",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
        ),
    },
    {
        title: "Orders & Shipping",
        href: "/orders",
        description: "Track your order, view shipping options, estimated delivery times, and more.",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                <rect x="1" y="3" width="15" height="13" />
                <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                <circle cx="5.5" cy="18.5" r="2.5" />
                <circle cx="18.5" cy="18.5" r="2.5" />
            </svg>
        ),
    },
    {
        title: "Returns & Refunds",
        href: "/contact?topic=returns-and-refunds",
        description: "Understand our return policy, initiate a return, or request a refund for your purchase.",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="1 4 1 10 7 10" />
                <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
            </svg>
        ),
    },
    {
        title: "Product Support",
        href: "/contact?topic=product-support",
        description: "Troubleshoot issues with your robotics kits, access manuals, and get technical help.",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
            </svg>
        ),
    },
    {
        title: "Account & Billing",
        href: "/login",
        description: "Manage your account settings, update payment methods, and view billing history.",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
            </svg>
        ),
    },
    {
        title: "Warranties",
        href: "/contact?topic=warranty-support",
        description: "Learn about warranty coverage, how to file a claim, and what's included.",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
        ),
    },
];

const faqs = [
    {
        question: "How long does shipping take?",
        answer: "Standard shipping within India typically takes 5–7 business days. Express shipping options are available at checkout for 2–3 business day delivery. All orders include a tracking number so you can monitor your package in real time.",
    },
    {
        question: "What is your return policy?",
        answer: "We offer a 30-day return policy for all unopened and unused products. If you've opened your kit but encountered a defect, we'll replace it free of charge. Simply initiate a return from your account dashboard or contact our support team.",
    },
    {
        question: "What does the warranty cover?",
        answer: "All RoboxRise robotics kits come with a 1-year manufacturer's warranty covering defects in materials and workmanship. This includes replacement of faulty components such as motors, sensors, and controller boards. The warranty does not cover damage from misuse or modifications.",
    },
    {
        question: "Do you offer bulk ordering for schools?",
        answer: "Yes! We offer special pricing for educational institutions ordering 10 or more kits. Bulk orders include dedicated onboarding support, teacher training materials, and a curriculum integration guide. Contact our education team at education@roborise.com for a custom quote.",
    },
    {
        question: "How do I get technical support for my kit?",
        answer: "Our technical support team is available Monday–Saturday, 9 AM to 6 PM IST. You can reach us via email at support@roborise.com, through WhatsApp, or by using the contact form on our website. We also have a comprehensive video tutorial library accessible from your product dashboard.",
    },
];

export default function HelpPage() {
    const [openFaq, setOpenFaq] = useState<number | null>(null);
    const [searchValue, setSearchValue] = useState("");

    return (
        <>
            {/* Hero */}
            <section className={styles.pageHero}>
                <div className={styles.heroBg} />
                <div className="padding-global">
                    <div className="container-large">
                        <ScrollAnimation className={styles.heroInner}>
                            <span className={styles.badge}>
                                <span className={styles.badgeDot} />
                                Help Center
                            </span>
                            <h1 className={styles.pageTitle}>
                                How Can We <span className={styles.titleAccent}>Help?</span>
                            </h1>
                            <p className={styles.pageDescription}>
                                Find answers to your questions about our robotics kits, orders, shipping, and more. We&apos;re here to support your learning journey.
                            </p>
                        </ScrollAnimation>
                    </div>
                </div>
            </section>

            {/* Search Bar */}
            <section className={styles.searchSection}>
                <div className="padding-global">
                    <div className="container-large">
                        <ScrollAnimation className={styles.searchWrapper}>
                            <div className={styles.searchBar}>
                                <svg className={styles.searchIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="11" cy="11" r="8" />
                                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                                </svg>
                                <input
                                    type="text"
                                    className={styles.searchInput}
                                    placeholder="Search for help articles, topics, or questions..."
                                    value={searchValue}
                                    onChange={(e) => setSearchValue(e.target.value)}
                                />
                            </div>
                        </ScrollAnimation>
                    </div>
                </div>
            </section>

            {/* Help Topics Grid */}
            <section className={styles.topicsSection}>
                <div className="padding-global">
                    <div className="container-large">
                        <ScrollAnimation>
                            <h2 className={styles.sectionTitle}>Browse Help Topics</h2>
                        </ScrollAnimation>
                        <div className={styles.topicsGrid}>
                            {helpTopics.map((topic, i) => (
                                <ScrollAnimation key={topic.title} delay={i * 50}>
                                    <div className={styles.topicCard}>
                                        <div className={styles.topicIconWrap}>
                                            {topic.icon}
                                        </div>
                                        <h3 className={styles.topicTitle}>{topic.title}</h3>
                                        <p className={styles.topicDescription}>{topic.description}</p>
                                        <Link href={topic.href} className={styles.topicLink}>
                                            Learn More
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M5 12h14" />
                                                <path d="m12 5 7 7-7 7" />
                                            </svg>
                                        </Link>
                                    </div>
                                </ScrollAnimation>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className={styles.faqSection}>
                <div className="padding-global">
                    <div className="container-large">
                        <ScrollAnimation>
                            <h2 className={styles.sectionTitle}>Frequently Asked Questions</h2>
                        </ScrollAnimation>
                        <div className={styles.faqList}>
                            {faqs.map((faq, i) => (
                                <ScrollAnimation key={i} delay={i * 40}>
                                    <div className={`${styles.faqItem} ${openFaq === i ? styles.faqOpen : ""}`}>
                                        <button
                                            className={styles.faqQuestion}
                                            onClick={() => setOpenFaq(openFaq === i ? null : i)}
                                            aria-expanded={openFaq === i}
                                        >
                                            <span>{faq.question}</span>
                                            <svg className={styles.faqChevron} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <polyline points="6 9 12 15 18 9" />
                                            </svg>
                                        </button>
                                        <div className={styles.faqAnswer}>
                                            <p>{faq.answer}</p>
                                        </div>
                                    </div>
                                </ScrollAnimation>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className={styles.ctaSection}>
                <div className="padding-global">
                    <div className="container-large">
                        <ScrollAnimation>
                            <div className={styles.ctaCard}>
                                <h2 className={styles.ctaTitle}>Still Need Help?</h2>
                                <p className={styles.ctaText}>
                                    Our support team is ready to assist you with any questions or concerns. Reach out and we&apos;ll get back to you within 24 hours.
                                </p>
                                <Link href="/contact" className={styles.ctaButton}>
                                    <span>Contact Support</span>
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M5 12h14" />
                                        <path d="m12 5 7 7-7 7" />
                                    </svg>
                                </Link>
                            </div>
                        </ScrollAnimation>
                    </div>
                </div>
            </section>
        </>
    );
}

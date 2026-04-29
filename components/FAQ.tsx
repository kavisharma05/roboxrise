"use client";

import { useState } from "react";
import ScrollAnimation from "./ScrollAnimation";
import styles from "./FAQ.module.css";

const faqItems = [
    {
        question: "Is this suitable for beginners?",
        answer:
            "Yes. Our systems are designed for progressive learning — from basic motion control to advanced automation and AI. Each product includes guided experiments and setup resources to help beginners get started quickly.",
    },
    {
        question: "What software platforms are supported?",
        answer:
            "Roborise products support ROS / ROS2, Python, Arduino, and open APIs — making them compatible with most educational and lab workflows.",
    },
    {
        question: "Are learning materials included?",
        answer:
            "Yes. Every system comes with curriculum guides, experiment manuals, and setup tutorials. Educational kits also include structured lesson plans.",
    },
    {
        question: "Can these be used in schools and universities?",
        answer:
            "Absolutely. Roborise systems are built specifically for classrooms, labs, training centers, and research environments.",
    },
    {
        question: "Do you provide technical support?",
        answer:
            "Yes. We offer documentation, video guides, and direct support to help you through setup, projects, and troubleshooting.",
    },
    {
        question: "Can I purchase in bulk for institutions?",
        answer:
            "Yes — we offer academic and bulk pricing. Contact our team for custom packages.",
    },
];

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleItem = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className={styles.sectionFaq}>
            <div className="padding-global padding-section-medium">
                <div className="container-large">
                    <div className={styles.faqContent}>
                        {/* Header */}
                        <div className={styles.headerWrap}>
                            <ScrollAnimation>
                                <span className={styles.sectionTag}>FAQ</span>
                            </ScrollAnimation>
                            <ScrollAnimation>
                                <h2 className={styles.sectionHeading}>
                                    Frequently Asked Questions
                                </h2>
                            </ScrollAnimation>
                            <ScrollAnimation>
                                <p className={styles.sectionDescription}>
                                    Everything you need to know about the product and billing.
                                </p>
                            </ScrollAnimation>
                        </div>

                        {/* FAQ List */}
                        <ScrollAnimation>
                            <div className={styles.faqList}>
                                {faqItems.map((item, index) => (
                                    <div
                                        key={index}
                                        className={styles.faqItem}
                                        onClick={() => toggleItem(index)}
                                    >
                                        <div className={styles.faqTop}>
                                            <span className={styles.faqQuestion}>{item.question}</span>
                                            <div
                                                className={`${styles.faqIcon} ${openIndex === index ? styles.open : ""
                                                    }`}
                                            >
                                                <svg
                                                    width="24"
                                                    height="24"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M6 9L12 15L18 9"
                                                        stroke="currentColor"
                                                        strokeWidth="1.5"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                </svg>
                                            </div>
                                        </div>
                                        <div
                                            className={`${styles.faqBottomWrap} ${openIndex === index ? styles.open : ""
                                                }`}
                                        >
                                            <div className={styles.faqBottom}>
                                                <p className={styles.faqAnswer}>{item.answer}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </ScrollAnimation>
                    </div>
                </div>
            </div>
        </section>
    );
}

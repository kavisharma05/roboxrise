"use client";

import ScrollAnimation from "./ScrollAnimation";
import styles from "./WhoItsFor.module.css";

// Icons
const TextbookIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
);

const VideoIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="5 3 19 12 5 21 5 3" />
    </svg>
);

const ExperimentIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 2v7.31" />
        <path d="M14 2v7.31" />
        <path d="M8.5 2h7" />
        <path d="M14 9.3a6.5 6.5 0 1 1-4 0" />
    </svg>
);

const CertificationIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="6" />
        <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
    </svg>
);

const leftItems = [
    {
        label: "Textbooks",
        description: "Curriculum guides covering robotics fundamentals, programming, and assembly instructions",
        icon: <TextbookIcon />
    },
    {
        label: "Video Guides",
        description: "Step-by-step video tutorials led by expert educators, making complex robotics concepts easy to understand and follow along",
        icon: <VideoIcon />
    },
];

const rightItems = [
    {
        label: "Experiments",
        description: "50+ hands-on experiments and projects that reinforce learning through practical application and real-world problem solving",
        icon: <ExperimentIcon />
    },
    {
        label: "Certification",
        description: "Industry-recognized certification upon completion, validating skills in robotics, coding, and STEM competencies",
        icon: <CertificationIcon />
    },
];

export default function WhoItsFor() {
    return (
        <section className={styles.sectionWho}>
            <div className="padding-global padding-section-small">
                <div className="container-large">
                    <div className={styles.container}>
                        {/* Section Header */}
                        <div className={styles.header}>
                            <ScrollAnimation>
                                <h2 className={styles.heading}>Every Kit Includes<br />Complete Learning Resources</h2>
                            </ScrollAnimation>
                            <ScrollAnimation delay={100}>
                                <p className={styles.subHeading}>
                                    Our kits come with everything students need to master robotics — from structured
                                    textbooks to hands-on experiments and professional certification.
                                </p>
                            </ScrollAnimation>
                        </div>

                        {/* Center Image Grid Layout */}
                        <div className={styles.centerGrid}>

                            {/* Left Column */}
                            <div className={styles.sideColumn}>
                                {leftItems.map((item, index) => (
                                    <ScrollAnimation key={index} delay={index * 100} className={styles.cardItem}>
                                        <div className={styles.iconWrap}>
                                            {item.icon}
                                        </div>
                                        <div className={styles.cardContent}>
                                            <span className={styles.itemLabel}>{item.label}</span>
                                            <span className={styles.itemDescription}>{item.description}</span>
                                        </div>
                                    </ScrollAnimation>
                                ))}
                            </div>

                            {/* Center Image */}
                            <ScrollAnimation delay={200} className={styles.centerImageWrap}>
                                <img
                                    src="https://res.cloudinary.com/dixayfqq8/image/upload/v1770551161/freepik__a-robotic-arm-with-an-orange-upper-arm-and-black-f__26064_oc2sm5.png"
                                    alt="Student learning with robotics kit"
                                    className={styles.centerImage}
                                />
                            </ScrollAnimation>

                            {/* Right Column */}
                            <div className={styles.sideColumn}>
                                {rightItems.map((item, index) => (
                                    <ScrollAnimation key={index} delay={(index + 2) * 100} className={styles.cardItem}>
                                        <div className={styles.iconWrap}>
                                            {item.icon}
                                        </div>
                                        <div className={styles.cardContent}>
                                            <span className={styles.itemLabel}>{item.label}</span>
                                            <span className={styles.itemDescription}>{item.description}</span>
                                        </div>
                                    </ScrollAnimation>
                                ))}
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}

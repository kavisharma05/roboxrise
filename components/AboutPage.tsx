"use client";

import Link from "next/link";
import ScrollAnimation from "./ScrollAnimation";
import styles from "./AboutPage.module.css";

/* ─── SVG Icons ─── */
const InnovationIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 24 24" fill="none" className="icon-1x1-medium">
        <path d="M12 2v1M12 21v1M4.22 4.22l.71.71M18.36 18.36l.71.71M2 12h1M21 12h1M4.22 19.78l.71-.71M18.36 5.64l.71-.71" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M12 7v5l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const HandsOnIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 24 24" fill="none" className="icon-1x1-medium">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const IndustryIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 24 24" fill="none" className="icon-1x1-medium">
        <path d="M2 20h20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M5 20V8l5 3V8l5 3V4h4a1 1 0 0 1 1 1v15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9 20v-2a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

/* ─── Data ─── */
const values = [
    {
        icon: <InnovationIcon />,
        title: "Innovation First",
        description:
            "We design products that push boundaries — bringing real industrial robotics concepts into educational environments with cutting-edge hardware and software.",
        dark: false,
    },
    {
        icon: <HandsOnIcon />,
        title: "Hands-On Learning",
        description:
            "Theory meets practice. Every kit is built to be assembled, programmed, and experimented with — because real engineering starts with real tools.",
        dark: true,
    },
    {
        icon: <IndustryIcon />,
        title: "Industry Ready",
        description:
            "Our robotic systems mirror real-world industrial automation, preparing students for careers in robotics, AI, and manufacturing engineering.",
        dark: false,
    },
];

const learningEcosystem = [
    {
        title: "Hardware + Software in Sync",
        body: "Students learn on real robotic systems with integrated control software, AI modules, and simulation workflows that mirror modern labs.",
    },
    {
        title: "Curriculum That Scales",
        body: "From beginner workshops to advanced automation tracks, institutions can roll out structured robotics programs with clear outcomes at each level.",
    },
    {
        title: "Faculty & Lab Enablement",
        body: "We support educators with training, implementation guidance, and deployment playbooks so robotics programs run smoothly from day one.",
    },
];

const credibilityStats = [
    { label: "Universities", value: "100+" },
    { label: "Countries", value: "60+" },
    { label: "Global Platform", value: "WLKATA Robotics" },
];

export default function AboutPage() {
    return (
        <>
            {/* ═══ Section 1: Page Hero ═══ */}
            <section className={styles.heroSection}>
                <div className={styles.heroBg}>
                    <img
                        src="https://res.cloudinary.com/dixayfqq8/image/upload/v1770269617/section1a_okfphc.jpg"
                        alt="RoboRise team working on robotics"
                    />
                </div>
                <div className={styles.heroInner}>
                    <ScrollAnimation>
                        <div className={styles.heroPill}>
                            <span className={styles.heroPillDot} />
                            <span>Who We Are</span>
                        </div>
                    </ScrollAnimation>
                    <ScrollAnimation>
                        <h1 className={styles.heroHeading}>About RoboRise</h1>
                    </ScrollAnimation>
                    <ScrollAnimation>
                        <p className={styles.heroDescription}>
                            Empowering the next generation of engineers through hands-on,
                            industrial-grade robotics education and AI-driven learning platforms.
                        </p>
                    </ScrollAnimation>
                </div>
            </section>

            {/* ═══ Section 2: Collaboration & Credibility ═══ */}
            <section className={styles.collaborationSection}>
                <div className="padding-global padding-section-large">
                    <div className="container-large">
                        <div className={styles.collaborationGrid}>
                            <div className={styles.collaborationContent}>
                                <ScrollAnimation>
                                    <div className={styles.sectionTag}>
                                        <span className={styles.sectionTagDot} />
                                        Collaboration & Credibility
                                    </div>
                                </ScrollAnimation>
                                <ScrollAnimation>
                                    <h2 className={styles.sectionHeading}>
                                        Collaboration & Credibility - WLKATA Robotics
                                    </h2>
                                </ScrollAnimation>
                                <ScrollAnimation>
                                    <p className={styles.sectionBody}>
                                        RoboxRise solutions are powered by WLKATA Robotics, a globally
                                        recognized educational robotics platform trusted by universities and
                                        institutions worldwide. With deployments in 100+ universities across
                                        60+ countries, WLKATA has built strong credibility in bridging
                                        academic learning with industrial skill development.
                                    </p>
                                </ScrollAnimation>
                                <ScrollAnimation>
                                    <p className={styles.sectionBody}>
                                        Leading institutions such as the University of Michigan, Imperial
                                        College London, and TU Delft have adopted WLKATA systems for
                                        robotics and AI education. Unlike traditional industrial robot
                                        manufacturers, WLKATA is designed for education-first flexibility and
                                        open programming across platforms like Python, ROS, and AI
                                        frameworks.
                                    </p>
                                </ScrollAnimation>
                                <ScrollAnimation>
                                    <p className={styles.sectionBody}>
                                        This collaboration enables RoboxRise to deliver global-standard
                                        technology with localized implementation, helping Indian institutions
                                        build future-ready, scalable, and industry-aligned robotics learning
                                        ecosystems.
                                    </p>
                                </ScrollAnimation>
                            </div>

                            <div className={styles.collaborationAside}>
                                <ScrollAnimation className={styles.credibilityCard}>
                                    <div className={styles.credibilityStatsGrid}>
                                        {credibilityStats.map((stat) => (
                                            <div key={stat.label} className={styles.credibilityStatItem}>
                                                <div className={styles.credibilityStatValue}>{stat.value}</div>
                                                <div className={styles.credibilityStatLabel}>{stat.label}</div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className={styles.credibilityInstitutions}>
                                        <span className={styles.credibilityInstitutionsLabel}>
                                            Adopted by leading institutions:
                                        </span>
                                        <ul className={styles.credibilityInstitutionList}>
                                            <li>University of Michigan</li>
                                            <li>Imperial College London</li>
                                            <li>TU Delft</li>
                                        </ul>
                                    </div>
                                </ScrollAnimation>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══ Section 3: Mission & Vision ═══ */}
            <section className={styles.missionSection}>
                <div className="padding-global padding-section-large">
                    <div className="container-large">
                        <div className={styles.missionGrid}>
                            {/* Text */}
                            <div className={styles.missionTextBlock}>
                                <ScrollAnimation>
                                    <div className={styles.sectionTag}>
                                        <span className={styles.sectionTagDot} />
                                        Our Mission
                                    </div>
                                </ScrollAnimation>
                                <ScrollAnimation>
                                    <h2 className={styles.sectionHeading}>
                                        Making real robotics accessible to every learner
                                    </h2>
                                </ScrollAnimation>
                                <ScrollAnimation>
                                    <p className={styles.sectionBody}>
                                        At RoboRise, we believe robotics education should be more than
                                        simulations and theory. Our mission is to put real, industrial-quality
                                        robotic systems into the hands of students, educators, and makers —
                                        bridging the gap between academic learning and industry-ready skills.
                                    </p>
                                </ScrollAnimation>
                                <ScrollAnimation>
                                    <p className={styles.sectionBody}>
                                        We design and manufacture edu-industrial robotic arms, mini factory
                                        cells, and AI-powered learning kits that teach motion control,
                                        kinematics, programming, and intelligent automation through direct,
                                        hands-on experience.
                                    </p>
                                </ScrollAnimation>
                            </div>

                            {/* Image */}
                            <ScrollAnimation>
                                <div className={styles.missionImage}>
                                    <img
                                        src="https://res.cloudinary.com/dixayfqq8/image/upload/v1770269622/section1b_pmqjf3.jpg"
                                        alt="Students working with RoboRise kits"
                                    />
                                </div>
                            </ScrollAnimation>
                        </div>

                        {/* Vision */}
                        <div className={styles.visionBlock}>
                            <ScrollAnimation>
                                <div className={styles.sectionTag}>
                                    <span className={styles.sectionTagDot} />
                                    Our Vision
                                </div>
                            </ScrollAnimation>
                            <ScrollAnimation>
                                <h2 className={styles.sectionHeading}>
                                    A world where every student can build, program, and deploy real robots
                                </h2>
                            </ScrollAnimation>
                            <ScrollAnimation>
                                <p className={styles.sectionBody}>
                                    We envision a future where robotics education is as fundamental as
                                    computer science — where every institution has access to the tools that
                                    prepare students for the automation-driven world ahead.
                                </p>
                            </ScrollAnimation>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══ Section 4: Values ═══ */}
            <section className={styles.valuesSection}>
                <div className="padding-global padding-section-large">
                    <div className="container-large">
                        <div className={styles.valuesHeader}>
                            <ScrollAnimation>
                                <div className={styles.sectionTag}>
                                    <span className={styles.sectionTagDot} />
                                    Why RoboRise
                                </div>
                            </ScrollAnimation>
                            <ScrollAnimation>
                                <h2 className={styles.sectionHeading}>
                                    What drives everything we build
                                </h2>
                            </ScrollAnimation>
                            <ScrollAnimation>
                                <p className={styles.valuesHeaderDescription}>
                                    Three core principles guide our product design, curriculum, and
                                    partnerships — ensuring every RoboRise system delivers real impact.
                                </p>
                            </ScrollAnimation>
                        </div>

                        <div className={styles.valuesGrid}>
                            {values.map((value, index) => (
                                <ScrollAnimation
                                    key={value.title}
                                    delay={index * 100}
                                    className={`${styles.valueCard} ${value.dark ? styles.valueCardDark : ""}`}
                                >
                                    <div className={styles.valueIconWrap}>{value.icon}</div>
                                    <div className={styles.valueTitle}>{value.title}</div>
                                    <p className={styles.valueDescription}>{value.description}</p>
                                </ScrollAnimation>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══ Section 5: Learning Ecosystem ═══ */}
            <section className={styles.ecosystemSection}>
                <div className="padding-global padding-section-large">
                    <div className="container-large">
                        <div className={styles.ecosystemHeader}>
                            <ScrollAnimation>
                                <div className={styles.sectionTag}>
                                    <span className={styles.sectionTagDot} />
                                    Learning Ecosystem
                                </div>
                            </ScrollAnimation>
                            <ScrollAnimation>
                                <h2 className={styles.sectionHeading}>
                                    Built for classrooms, labs, and future-ready careers
                                </h2>
                            </ScrollAnimation>
                            <ScrollAnimation>
                                <p className={styles.ecosystemHeaderDescription}>
                                    RoboRise combines products, curriculum, and institution support into a
                                    complete ecosystem that helps learners move from fundamentals to
                                    real-world robotics applications.
                                </p>
                            </ScrollAnimation>
                        </div>

                        <div className={styles.ecosystemGrid}>
                            {learningEcosystem.map((item, index) => (
                                <ScrollAnimation
                                    key={item.title}
                                    delay={index * 100}
                                    className={styles.ecosystemCard}
                                >
                                    <div className={styles.ecosystemCardIndex}>
                                        {(index + 1).toString().padStart(2, "0")}
                                    </div>
                                    <div className={styles.ecosystemCardTitle}>{item.title}</div>
                                    <p className={styles.ecosystemCardBody}>{item.body}</p>
                                </ScrollAnimation>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══ Section 6: CTA Banner ═══ */}
            <section className={styles.ctaSection}>
                <div className="padding-global padding-section-large">
                    <div className="container-large">
                        <ScrollAnimation>
                            <div className={styles.ctaInner}>
                                <h2 className={styles.ctaHeading}>
                                    Ready to build the future?
                                </h2>
                                <p className={styles.ctaDescription}>
                                    Explore our robotics systems, book a demo for your institution,
                                    or get in touch — let&apos;s make real robotics education happen.
                                </p>
                                <div className={styles.ctaButtons}>
                                    <Link href="/products" className={styles.ctaPrimary}>
                                        Explore Products
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M5 12h14M12 5l7 7-7 7" />
                                        </svg>
                                    </Link>
                                    <Link href="/contact" className={styles.ctaSecondary}>
                                        Contact Us
                                    </Link>
                                </div>
                            </div>
                        </ScrollAnimation>
                    </div>
                </div>
            </section>
        </>
    );
}

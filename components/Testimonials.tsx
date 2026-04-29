"use client";

import ScrollAnimation from "./ScrollAnimation";
import styles from "./Testimonials.module.css";

const testimonials = [
    {
        name: "Dr. Sarah Chen",
        role: "Professor, MIT Robotics Lab",
        text: "Roborise bridges theory and industry perfectly. Our students now graduate with hands-on experience that employers actually value.",
        image: "https://wubflow-shield.NOCODEXPORT.DEV/6824160149c9e88dc8ac7225/682417fddfe626eeef3918c5_image1.webp",
    },
    {
        name: "Michael Torres",
        role: "Director of Innovation, TechEd Institute",
        text: "The modular approach to teaching robotics fundamentals has transformed how we deliver our curriculum. Student engagement is at an all-time high.",
        image: "https://wubflow-shield.NOCODEXPORT.DEV/6824160149c9e88dc8ac7225/682417fddfe626eeef3918c8_image2.webp",
    },
    {
        name: "Emily Rodriguez",
        role: "STEM Coordinator, Valley Schools",
        text: "Finally, an educational robotics platform that doesn't feel like a toy. Our students are learning real-world skills from day one.",
        image: "https://wubflow-shield.NOCODEXPORT.DEV/6824160149c9e88dc8ac7225/682417fddfe626eeef3918ce_image3.webp",
    },
];

// Logo placeholders for trusted institutions
const trustedLogos = [
    { name: "Stanford", initials: "SU" },
    { name: "MIT", initials: "MIT" },
    { name: "Harvard", initials: "HU" },
    { name: "Carnegie Mellon", initials: "CMU" },
    { name: "Georgia Tech", initials: "GT" },
    { name: "Berkeley", initials: "UCB" },
];

export default function Testimonials() {
    return (
        <section className={styles.sectionSocialProof}>
            <div className="padding-global padding-section-small">
                <div className="container-large">
                    <div className={styles.socialProofContent}>
                        {/* Section Header */}
                        <div className={styles.headerWrap}>
                            <ScrollAnimation>
                                <h2 className={styles.sectionHeading}>
                                    Trusted by 3,000+ Educators and Innovators
                                </h2>
                            </ScrollAnimation>
                        </div>

                        {/* Logo Strip */}
                        <ScrollAnimation className={styles.logoStrip}>
                            {trustedLogos.map((logo, index) => (
                                <div key={index} className={styles.logoItem}>
                                    <div className={styles.logoPlaceholder}>
                                        {logo.initials}
                                    </div>
                                </div>
                            ))}
                        </ScrollAnimation>

                        {/* Testimonials Grid */}
                        <div className={styles.testimonialsGrid}>
                            {testimonials.map((testimonial, index) => (
                                <ScrollAnimation
                                    key={index}
                                    className={styles.testimonialCard}
                                    delay={index * 100}
                                >
                                    <div className={styles.quoteIcon}>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="32"
                                            height="32"
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                        >
                                            <path d="M11.192 15.757c0-.88-.23-1.618-.69-2.217-.326-.412-.768-.683-1.327-.812-.55-.128-1.07-.137-1.54-.028-.16-.95.1-1.956.76-3.022.66-1.065 1.515-1.867 2.558-2.403L9.373 5c-.8.396-1.56.898-2.26 1.505-.71.607-1.34 1.305-1.9 2.094s-.98 1.68-1.25 2.69-.346 2.04-.217 3.1c.168 1.4.62 2.52 1.356 3.35.735.84 1.652 1.26 2.748 1.26.965 0 1.766-.29 2.4-.878.628-.576.94-1.365.94-2.368l.002.003zm9.124 0c0-.88-.23-1.618-.69-2.217-.326-.42-.77-.692-1.327-.817-.56-.124-1.074-.13-1.54-.022-.16-.94.09-1.95.75-3.02.66-1.06 1.514-1.86 2.557-2.4L18.49 5c-.8.396-1.555.898-2.26 1.505-.708.607-1.34 1.305-1.894 2.094-.556.79-.97 1.68-1.24 2.69-.273 1-.345 2.04-.217 3.1.168 1.4.62 2.52 1.356 3.35.735.84 1.652 1.26 2.748 1.26.965 0 1.766-.29 2.4-.878.628-.576.94-1.365.94-2.368l-.007.003z" />
                                        </svg>
                                    </div>
                                    <p className={styles.testimonialText}>
                                        &ldquo;{testimonial.text}&rdquo;
                                    </p>
                                    <div className={styles.authorSection}>
                                        <img
                                            src={testimonial.image}
                                            alt={testimonial.name}
                                            className={styles.authorImage}
                                        />
                                        <div className={styles.authorInfo}>
                                            <span className={styles.authorName}>
                                                {testimonial.name}
                                            </span>
                                            <span className={styles.authorRole}>
                                                {testimonial.role}
                                            </span>
                                        </div>
                                    </div>
                                </ScrollAnimation>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

"use client";

import ScrollAnimation from "./ScrollAnimation";
import styles from "./Discover.module.css";

export default function Discover() {
    return (
        <section className={styles.sectionDiscover}>
            <div className="padding-global">
                <div className="container-large">
                    <div className={styles.discoverWrap}>
                        {/* Text Content */}
                        <div className={styles.discoverContent}>
                            <ScrollAnimation>
                                <h2 className={styles.heading}>
                                    Learn robotics the real way, from first motion to intelligent automation.
                                </h2>
                            </ScrollAnimation>

                            <div className={styles.statsWrapper}>
                                <ScrollAnimation className={styles.statsItem} delay={100}>
                                    <div className={styles.statsNumber}>
                                        50000<span className={styles.statsSymbol}>+</span>
                                    </div>
                                    <div className={styles.statsLabel}>Students Trained Globally</div>
                                </ScrollAnimation>

                                <ScrollAnimation className={styles.statsItem} delay={200}>
                                    <div className={styles.statsNumber}>
                                        100<span className={styles.statsSymbol}>+</span>
                                    </div>
                                    <div className={styles.statsLabel}>Partnered Universities</div>
                                </ScrollAnimation>

                                <ScrollAnimation className={styles.statsItem} delay={300}>
                                    <div className={styles.statsNumber}>
                                        15<span className={styles.statsSymbol}>+</span>
                                    </div>
                                    <div className={styles.statsLabel}>Robotics Learning Modules</div>
                                </ScrollAnimation>
                            </div>
                        </div>

                        {/* Image Composition */}
                        <div className={styles.discoverImages} aria-hidden="true">
                            {/* Main Large Image */}
                            <div className={`${styles.imageWrapper} ${styles.imgMain}`}>
                                <ScrollAnimation delay={200}>
                                    <img
                                        src="https://res.cloudinary.com/dixayfqq8/image/upload/v1770269617/section1a_okfphc.jpg"
                                        alt="RoboxRise robotics kit"
                                    />
                                </ScrollAnimation>
                            </div>

                            {/* Overlapping Secondary Image */}
                            <div className={`${styles.imageWrapper} ${styles.imgSecondary}`}>
                                <ScrollAnimation delay={300}>
                                    <img
                                        src="https://res.cloudinary.com/dixayfqq8/image/upload/v1770269622/section1b_pmqjf3.jpg"
                                        alt="RoboxRise in action"
                                    />
                                </ScrollAnimation>
                            </div>

                            {/* Accent Image (Optional third or just decorative) */}
                            <div className={`${styles.imageWrapper} ${styles.imgAccent}`}>
                                <ScrollAnimation delay={400}>
                                    <img
                                        src="https://res.cloudinary.com/dixayfqq8/image/upload/v1770269618/section1c_fvuwyb.jpg"
                                        alt="RoboxRise robotics education"
                                    />
                                </ScrollAnimation>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

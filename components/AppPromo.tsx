"use client";

import Link from "next/link";
import ScrollAnimation from "./ScrollAnimation";
import styles from "./AppPromo.module.css";

export default function AppPromo() {
    return (
        <section className={styles.sectionApp}>
            <div className="padding-global padding-section-mini">
                <div className="container-large">
                    <ScrollAnimation className={styles.appContentWrapper}>
                        <div className={styles.appContent}>
                            <div className={styles.appContentInformationWrapper}>
                                <div className={styles.appContentInformation}>
                                    <h3 className="app-display">
                                        RoboRise, your partner <br />
                                        in robotics education.
                                    </h3>
                                    <div className={styles.appTextWrap}>
                                        <div className="text-color-alternate">
                                            Comprehensive robotics kits with textbooks, video guides,
                                            hands-on experiments, and certification for students of all ages.
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <Link href="/products" className={styles.exploreButton}>
                                        Explore Kits
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                                    </Link>
                                </div>
                            </div>
                        </div>

                        <div className={styles.appVisual}>
                            <img
                                src="https://res.cloudinary.com/dixayfqq8/image/upload/v1770617233/freepik__conceptual-educational-product-photography-featuri__46856_m71jx3.png"
                                alt=""
                                className="image"
                            />
                        </div>
                    </ScrollAnimation>
                </div>
            </div>
        </section>
    );
}

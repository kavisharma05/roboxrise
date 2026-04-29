"use client";

import Link from "next/link";
import ScrollAnimation from "./ScrollAnimation";
import styles from "./Team.module.css";

const products = [
    {
        name: "Haro380 Advanced Kit 6-Axis Industrial Grade, PLC ROS2 MATLAB Voice Control",
        subtitle: "6-Axis Industrial Grade Arm",
        tagline: "PLC · ROS2 · MATLAB · Voice Control",
        href: "/products/haro380-advanced-kit",
        image:
            "https://res.cloudinary.com/dxdfzkz64/image/upload/v1776161389/44_2_nuy4nl.png",
    },
    {
        name: "Mirobot Education Kit  6 Axis Robotic Arm Ros and Matlab Simulation Teaching ROBOXRISE",
        subtitle: "6 Axis Robotic Arm",
        tagline: "ROS · Matlab · Simulation Teaching",
        href: "/products/mirobot-education-kit",
        image:
            "https://res.cloudinary.com/dxdfzkz64/image/upload/v1776158692/1_1_ele0mv.png",
    },
    {
        name: "MT4 Edu Kit - 0.1mm Repeatability Metal 4 Axis Robotic Arm, ROS ROBOXRISE",
        subtitle: "0.1mm Repeatability 4 Axis Arm",
        tagline: "Metal Build · ROS · Educational Robotics",
        href: "/products/mt4-edu-kit",
        image:
            "https://res.cloudinary.com/dxdfzkz64/image/upload/v1776161313/2_5_bo01l4.png",
    },
];

export default function Team() {
    return (
        <section className={styles.sectionTeam}>
            <div className="padding-global padding-section-small">
                <div className="container-large">
                    <div className={styles.teamContent}>
                        {/* Mobile Title */}
                        <div className={`${styles.topComponent} ${styles.isTablet}`}>
                            <div className={styles.topContent}>
                                <ScrollAnimation>
                                    <div className="text-color-secondary">Our Products</div>
                                </ScrollAnimation>
                                <ScrollAnimation>
                                    <h2 className="text-6xl">Featured Robotics Systems</h2>
                                </ScrollAnimation>
                            </div>
                        </div>

                        <div className={styles.teamComponent}>
                            {/* Info Card */}
                            <ScrollAnimation className={`${styles.teamCard} dark-context`}>
                                <div className={styles.teamItemContent}>
                                    <h3 className="text-4xl">Featured Robotics Systems</h3>
                                    <div className="text-color-secondary">
                                        <p className={styles.marginBottomSmall}>
                                            <strong>Real Robots. Real Automation. Real Learning.</strong>
                                        </p>
                                        <p className={styles.marginBottomSmall}>
                                            Explore Roborise’s edu-industrial robotic arms and mini
                                            factories — built to teach motion control, AI, and
                                            automation through hands-on experience.
                                        </p>
                                        <p>Perfect for classrooms, labs, and future engineers.</p>
                                    </div>
                                </div>
                                <div className="z-index-2">
                                    <Link href="/products" className={`button ${styles.browseButton}`}>
                                        Browse All Products
                                    </Link>
                                </div>

                            </ScrollAnimation>

                            {/* Product Cards */}
                            <ScrollAnimation className={styles.teamListWrap} delay={100}>
                                <div className={styles.teamList}>
                                    {products.map((product) => (
                                        <div key={product.name} className={styles.teamItem}>
                                            <Link href={product.href} className={styles.teamItemCard}>
                                                <div className={styles.teamItemImage}>
                                                    <img
                                                        src={product.image}
                                                        alt={product.name}
                                                        className="image"
                                                    />
                                                </div>
                                                <div className={styles.teamMemberName}>
                                                    <div className={`text-xl ${styles.productName}`}>
                                                        {product.name}
                                                    </div>
                                                    <div className={styles.productSubtitle}>
                                                        {product.subtitle}
                                                    </div>
                                                    <div className={styles.productTagline}>
                                                        {product.tagline}
                                                    </div>
                                                    <div className={styles.linkView}>
                                                        <span className="text-weight-medium">
                                                            View Product
                                                        </span>
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            </ScrollAnimation>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

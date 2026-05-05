"use client";

import Link from "next/link";
import ScrollAnimation from "./ScrollAnimation";
import styles from "./Team.module.css";

const products = [
    {
        name: "Haro380 Advanced Kit – 6-Axis Industrial Grade, PLC ROS2 MATLAB Voice Control",
        subtitle: "6-Axis Industrial Grade Arm",
        tagline: "PLC · ROS2 · MATLAB · Voice Control",
        highlights: [
            "±0.05 mm · 500 g payload · 434 mm reach",
            "ROS2, MATLAB, Python · multi-protocol I/O",
        ],
        href: "/products/haro380-advanced-kit",
        image:
            "https://res.cloudinary.com/dxdfzkz64/image/upload/v1776161389/44_2_nuy4nl.png",
    },
    {
        name: "Mirobot Education Kit – 6-Axis Robotic Arm, ROS & MATLAB Simulation",
        subtitle: "6-Axis Robotic Arm",
        tagline: "ROS · MATLAB · Simulation",
        highlights: [
            "±0.2 mm · 250 g · ~1.5 kg classroom arm",
            "Blockly & Python · ROS / MATLAB capable",
        ],
        href: "/products/mirobot-education-kit",
        image:
            "https://res.cloudinary.com/dxdfzkz64/image/upload/v1776158692/1_1_ele0mv.png",
    },
    {
        name: "MT4 Edu Kit – 4-Axis Metal Robotic Arm (0.1mm Repeatability, ROS)",
        subtitle: "0.1 mm Repeatability Metal 4-Axis Arm",
        tagline: "Metal build · ROS · Educational robotics",
        highlights: [
            "±0.1 mm · 500 g · CNC rebuildable metal arm",
            "ROS2 & Arduino · voice control box included",
        ],
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
                                            Explore RoboxRise&apos;s edu-industrial robotic arms and mini
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
                                                    <ul className={styles.productHighlights}>
                                                        {product.highlights.map((line) => (
                                                            <li key={line}>{line}</li>
                                                        ))}
                                                    </ul>
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

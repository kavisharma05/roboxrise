"use client";

import Link from "next/link";
import ScrollAnimation from "./ScrollAnimation";
import styles from "./TermsPage.module.css";

const sections = [
    { id: "acceptance", title: "Acceptance of Terms" },
    { id: "use-of-service", title: "Use of Service" },
    { id: "products-pricing", title: "Products & Pricing" },
    { id: "orders-payment", title: "Orders & Payment" },
    { id: "shipping-delivery", title: "Shipping & Delivery" },
    { id: "returns-refunds", title: "Returns & Refunds" },
    { id: "intellectual-property", title: "Intellectual Property" },
    { id: "limitation-liability", title: "Limitation of Liability" },
    { id: "governing-law", title: "Governing Law" },
    { id: "contact-information", title: "Contact Information" },
];

export default function TermsPage() {
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
                                Legal
                            </span>
                            <h1 className={styles.pageTitle}>Terms of Service</h1>
                            <p className={styles.pageDescription}>
                                Last updated: March 2026
                            </p>
                        </ScrollAnimation>
                    </div>
                </div>
            </section>

            {/* Content */}
            <section className={styles.contentSection}>
                <div className="padding-global">
                    <div className="container-large">
                        <div className={styles.contentLayout}>
                            {/* Sidebar */}
                            <ScrollAnimation>
                                <aside className={styles.sidebar}>
                                    <span className={styles.sidebarLabel}>On this page</span>
                                    <nav className={styles.sidebarNav}>
                                        {sections.map((s) => (
                                            <a key={s.id} href={`#${s.id}`} className={styles.sidebarLink}>
                                                {s.title}
                                            </a>
                                        ))}
                                    </nav>
                                </aside>
                            </ScrollAnimation>

                            {/* Main Content */}
                            <div className={styles.mainContent}>
                                <ScrollAnimation>
                                    <div className={styles.introBlock}>
                                        <p>
                                            Welcome to RoboxRise. These Terms of Service (&quot;Terms&quot;) govern your access to and use of the RoboxRise website, products, and services. By accessing or using our platform, you agree to be bound by these Terms. If you do not agree to these Terms, please do not use our services.
                                        </p>
                                    </div>
                                </ScrollAnimation>

                                <ScrollAnimation>
                                    <div className={styles.policySection} id="acceptance">
                                        <h2 className={styles.sectionHeading}>1. Acceptance of Terms</h2>
                                        <p>By creating an account, placing an order, or otherwise using the RoboxRise website and services, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service, as well as our <Link href="/privacy" className={styles.inlineLink}>Privacy Policy</Link>.</p>
                                        <p>You must be at least 18 years of age to use our services independently. If you are under 18, you may only use our services with the involvement and consent of a parent or legal guardian. Educational institutions may purchase on behalf of minors in accordance with their established procurement processes.</p>
                                    </div>
                                </ScrollAnimation>

                                <ScrollAnimation>
                                    <div className={styles.policySection} id="use-of-service">
                                        <h2 className={styles.sectionHeading}>2. Use of Service</h2>
                                        <p>You agree to use the RoboxRise platform only for lawful purposes and in accordance with these Terms. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.</p>
                                        <p>You agree not to:</p>
                                        <ul className={styles.list}>
                                            <li>Use our services for any illegal or unauthorized purpose</li>
                                            <li>Attempt to gain unauthorized access to our systems or other users&apos; accounts</li>
                                            <li>Interfere with or disrupt the integrity or performance of our website or services</li>
                                            <li>Reproduce, duplicate, copy, sell, or resell any part of our services without express written permission</li>
                                            <li>Use automated tools, bots, or scrapers to access our platform without prior authorization</li>
                                            <li>Transmit any viruses, malware, or other harmful code through our services</li>
                                        </ul>
                                        <p>We reserve the right to suspend or terminate your account if we determine that you have violated these Terms.</p>
                                    </div>
                                </ScrollAnimation>

                                <ScrollAnimation>
                                    <div className={styles.policySection} id="products-pricing">
                                        <h2 className={styles.sectionHeading}>3. Products & Pricing</h2>
                                        <p>All product descriptions, images, and specifications on our website are provided for informational purposes and are as accurate as possible. However, we do not warrant that product descriptions or other content on our site are error-free, complete, or current. Colors may vary slightly from what is displayed on your screen.</p>
                                        <p>Prices for our robotics kits and educational materials are listed in Indian Rupees (INR) and are subject to change without prior notice. All prices are inclusive of applicable taxes unless otherwise stated. We reserve the right to modify pricing at any time, but changes will not affect orders that have already been confirmed.</p>
                                        <p>In the event of a pricing error, we reserve the right to cancel the order and issue a full refund. We will notify you promptly if this occurs.</p>
                                    </div>
                                </ScrollAnimation>

                                <ScrollAnimation>
                                    <div className={styles.policySection} id="orders-payment">
                                        <h2 className={styles.sectionHeading}>4. Orders & Payment</h2>
                                        <p>When you place an order through our website, you are making an offer to purchase the selected products. We reserve the right to accept or decline any order at our discretion, including orders that appear to be placed by dealers, resellers, or distributors.</p>
                                        <p>Payment must be completed at the time of placing your order. We accept major credit cards, debit cards, UPI, net banking, and select digital wallets. All payment transactions are processed through secure, PCI-DSS compliant payment gateways.</p>
                                        <p>Upon successful placement of your order, you will receive an email confirmation with your order details and a unique order number. This confirmation does not constitute acceptance of your order — acceptance occurs when we ship the product and send you a shipping confirmation.</p>
                                    </div>
                                </ScrollAnimation>

                                <ScrollAnimation>
                                    <div className={styles.policySection} id="shipping-delivery">
                                        <h2 className={styles.sectionHeading}>5. Shipping & Delivery</h2>
                                        <p>We strive to ensure your RoboxRise kits reach you safely and efficiently. <strong>Shipping & Delivery details, including costs and estimated timelines, should be checked at the time of the checkout.</strong> These details are dynamically calculated based on your specific delivery address, selected shipping method, and current logistics availability.</p>
                                        <p>Once an order is placed, you will receive a tracking number to monitor your shipment&apos;s progress. Please ensure that the shipping information provided at checkout is accurate to avoid any delays in delivery.</p>
                                    </div>
                                </ScrollAnimation>

                                <ScrollAnimation>
                                    <div className={styles.policySection} id="returns-refunds">
                                        <h2 className={styles.sectionHeading}>6. Returns & Refunds</h2>
                                        <p>At RoboxRise, we take immense pride in the quality and educational value of our robotics kits and curriculum materials. Due to the nature of our products and the specialized educational resources included, all sales are final. <strong>These products are not returnable or refundable.</strong></p>
                                        <p>We encourage our customers to review product specifications and requirements carefully before completing a purchase. In the rare event of a manufacturing defect or missing components, please contact our support team within 48 hours of delivery for assistance with a replacement.</p>
                                    </div>
                                </ScrollAnimation>

                                <ScrollAnimation>
                                    <div className={styles.policySection} id="intellectual-property">
                                        <h2 className={styles.sectionHeading}>7. Intellectual Property</h2>
                                        <p>All content on the RoboxRise website — including text, graphics, logos, images, product designs, curriculum materials, video tutorials, software code, and the overall look and feel of the site — is the intellectual property of RoboxRise Education Pvt. Ltd. and is protected by Indian and international copyright, trademark, and other intellectual property laws.</p>
                                        <p>Our educational materials (textbooks, guides, worksheets, and video content) are licensed for personal or institutional educational use only. You may not reproduce, distribute, modify, or create derivative works from our content without express written permission.</p>
                                        <p>The RoboxRise name, logo, and product names are registered trademarks. You may not use these marks without our prior written consent.</p>
                                    </div>
                                </ScrollAnimation>

                                <ScrollAnimation>
                                    <div className={styles.policySection} id="limitation-liability">
                                        <h2 className={styles.sectionHeading}>8. Limitation of Liability</h2>
                                        <p>To the maximum extent permitted by applicable law, RoboxRise Education Pvt. Ltd., its officers, directors, employees, and agents shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or in connection with your use of our website, products, or services.</p>
                                        <p>Our total liability to you for any claim arising from or related to these Terms or your use of our services shall not exceed the amount you paid to us for the specific product or service that gave rise to the claim.</p>
                                        <p>RoboxRise robotics kits are educational tools. While we design them with safety in mind, we are not liable for injuries or damages resulting from improper use, modification, or disregard of safety guidelines included with each product. Adult supervision is recommended for users under 14 years of age.</p>
                                    </div>
                                </ScrollAnimation>

                                <ScrollAnimation>
                                    <div className={styles.policySection} id="governing-law">
                                        <h2 className={styles.sectionHeading}>9. Governing Law</h2>
                                        <p>These Terms of Service shall be governed by and construed in accordance with the laws of India. Any disputes arising out of or relating to these Terms or your use of our services shall be subject to the exclusive jurisdiction of the courts in Indore, Madhya Pradesh, India.</p>
                                        <p>If any provision of these Terms is found to be invalid, illegal, or unenforceable, the remaining provisions shall continue in full force and effect. Our failure to enforce any right or provision of these Terms shall not be deemed a waiver of such right or provision.</p>
                                    </div>
                                </ScrollAnimation>

                                <ScrollAnimation>
                                    <div className={styles.policySection} id="contact-information">
                                        <h2 className={styles.sectionHeading}>10. Contact Information</h2>
                                        <p>If you have any questions about these Terms of Service, please contact us:</p>
                                        <div className={styles.contactBlock}>
                                            <p><strong>RoboxRise AI Lab Solutions</strong></p>
                                            <p>(A unit of Raghavendar Tech Excellence Pvt. Ltd.)</p>
                                            <p>Halka No. 38, Sanwer Road, Sector A Industrial Area</p>
                                            <p>Tigaria Badsha, Indore - 452015, India</p>
                                            <p>Email: <a href="mailto:gunalan@r-tech.in" className={styles.inlineLink}>gunalan@r-tech.in</a></p>
                                            <p>Phone: <a href="tel:8120007474" className={styles.inlineLink}>+91 81200 07474</a></p>
                                        </div>
                                        <p>
                                            You may also reach out via our{" "}
                                            <Link href="/contact" className={styles.inlineLink}>Contact Page</Link>.
                                        </p>
                                    </div>
                                </ScrollAnimation>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

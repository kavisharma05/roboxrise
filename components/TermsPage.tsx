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
                                        <p>We ship to addresses across India. Standard shipping typically takes 5–7 business days, while express shipping options are available for 2–3 business day delivery. Shipping times are estimates and not guaranteed.</p>
                                        <p>Shipping costs are calculated at checkout based on the delivery address and selected shipping method. Free standard shipping is available on orders above the qualifying threshold displayed on our website.</p>
                                        <p>Risk of loss and title for products pass to you upon delivery to the carrier. We are not responsible for delays caused by the carrier, customs, weather events, or other circumstances beyond our control. If your package is lost or damaged during transit, please contact us within 7 days of the expected delivery date and we will work with the carrier to resolve the issue.</p>
                                    </div>
                                </ScrollAnimation>

                                <ScrollAnimation>
                                    <div className={styles.policySection} id="returns-refunds">
                                        <h2 className={styles.sectionHeading}>6. Returns & Refunds</h2>
                                        <p>We want you to be completely satisfied with your purchase. Our return policy allows you to return products within 30 days of delivery, subject to the following conditions:</p>
                                        <ul className={styles.list}>
                                            <li><strong>Unopened Products:</strong> Products in their original, sealed packaging may be returned for a full refund.</li>
                                            <li><strong>Defective Products:</strong> If you receive a product with a manufacturing defect, we will replace it free of charge or issue a full refund at your choice.</li>
                                            <li><strong>Opened Products:</strong> Products that have been opened and used may be returned if they are defective. Products opened for reasons other than defect may be subject to a restocking fee of up to 15%.</li>
                                            <li><strong>Digital Content:</strong> Downloadable educational materials, video courses, and software licenses are non-refundable once accessed or downloaded.</li>
                                        </ul>
                                        <p>To initiate a return, contact our support team at gunalan@r-tech.in or through your account dashboard. Refunds are typically processed within 7–10 business days after we receive and inspect the returned product.</p>
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
                                            <p><strong>RoboxRise Education Pvt. Ltd.</strong></p>
                                            <p>156, Krishna Market, Near Parmanu Nagar</p>
                                            <p>CAT Road, Indore 452012, India</p>
                                            <p>Email: <a href="mailto:gunalan@r-tech.in" className={styles.inlineLink}>gunalan@r-tech.in</a></p>
                                            <p>Phone: <a href="tel:6264941006" className={styles.inlineLink}>+91 62649 41006</a></p>
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

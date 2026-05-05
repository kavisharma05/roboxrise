"use client";

import Link from "next/link";
import ScrollAnimation from "./ScrollAnimation";
import styles from "./PrivacyPage.module.css";

const sections = [
    { id: "information-we-collect", title: "Information We Collect" },
    { id: "how-we-use", title: "How We Use Your Information" },
    { id: "information-sharing", title: "Information Sharing" },
    { id: "data-security", title: "Data Security" },
    { id: "cookies", title: "Cookies & Tracking" },
    { id: "your-rights", title: "Your Rights" },
    { id: "childrens-privacy", title: "Children\u2019s Privacy" },
    { id: "changes", title: "Changes to This Policy" },
    { id: "contact-us", title: "Contact Us" },
];

export default function PrivacyPage() {
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
                            <h1 className={styles.pageTitle}>Privacy Policy</h1>
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
                                            At RoboxRise (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;), we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website, purchase our robotics education kits, or use our services. By using our platform, you consent to the practices described in this policy.
                                        </p>
                                    </div>
                                </ScrollAnimation>

                                <ScrollAnimation>
                                    <div className={styles.policySection} id="information-we-collect">
                                        <h2 className={styles.sectionHeading}>1. Information We Collect</h2>
                                        <p>We collect information that you provide directly to us, as well as information collected automatically when you use our services.</p>
                                        <h3 className={styles.subHeading}>Personal Information</h3>
                                        <p>When you create an account, place an order, or contact us, we may collect your name, email address, phone number, shipping and billing address, payment information, and any other details you choose to provide.</p>
                                        <h3 className={styles.subHeading}>Educational Information</h3>
                                        <p>For school and institutional partnerships, we may collect the name of the institution, teacher or administrator contact details, grade levels, and student count (aggregated, non-identifiable) to tailor our educational robotics programs.</p>
                                        <h3 className={styles.subHeading}>Automatically Collected Information</h3>
                                        <p>When you visit our website, we automatically collect certain information including your IP address, browser type and version, operating system, referring URLs, pages viewed, time spent on pages, and other standard web analytics data.</p>
                                    </div>
                                </ScrollAnimation>

                                <ScrollAnimation>
                                    <div className={styles.policySection} id="how-we-use">
                                        <h2 className={styles.sectionHeading}>2. How We Use Your Information</h2>
                                        <p>We use the information we collect for the following purposes:</p>
                                        <ul className={styles.list}>
                                            <li>Processing and fulfilling your orders for robotics kits and educational materials</li>
                                            <li>Sending order confirmations, shipping updates, and delivery notifications</li>
                                            <li>Providing customer support and responding to inquiries about our products</li>
                                            <li>Personalizing your experience and recommending products based on your interests and learning level</li>
                                            <li>Sending educational content, product updates, and promotional materials (with your consent)</li>
                                            <li>Improving our website, products, and services through analytics</li>
                                            <li>Detecting, preventing, and addressing technical issues and fraudulent activity</li>
                                            <li>Complying with legal obligations and enforcing our terms of service</li>
                                        </ul>
                                    </div>
                                </ScrollAnimation>

                                <ScrollAnimation>
                                    <div className={styles.policySection} id="information-sharing">
                                        <h2 className={styles.sectionHeading}>3. Information Sharing</h2>
                                        <p>We do not sell your personal information. We may share your information with the following third parties only as necessary:</p>
                                        <ul className={styles.list}>
                                            <li><strong>Shipping Partners:</strong> We share your name, address, and contact details with courier services to deliver your orders.</li>
                                            <li><strong>Payment Processors:</strong> Payment information is processed securely through PCI-DSS compliant payment gateways. We do not store your full credit card details on our servers.</li>
                                            <li><strong>Analytics Providers:</strong> We use services like Google Analytics to understand how visitors use our website. This data is aggregated and anonymized.</li>
                                            <li><strong>Legal Requirements:</strong> We may disclose your information if required to do so by law, court order, or government regulation.</li>
                                        </ul>
                                    </div>
                                </ScrollAnimation>

                                <ScrollAnimation>
                                    <div className={styles.policySection} id="data-security">
                                        <h2 className={styles.sectionHeading}>4. Data Security</h2>
                                        <p>We implement industry-standard security measures to protect your personal information. This includes SSL/TLS encryption for all data transmitted between your browser and our servers, encrypted storage for sensitive data, regular security audits and vulnerability assessments, and access controls limiting employee access to personal information on a need-to-know basis.</p>
                                        <p>While we strive to protect your information, no method of transmission over the Internet or electronic storage is 100% secure. We cannot guarantee absolute security but will notify you promptly in the unlikely event of a data breach.</p>
                                    </div>
                                </ScrollAnimation>

                                <ScrollAnimation>
                                    <div className={styles.policySection} id="cookies">
                                        <h2 className={styles.sectionHeading}>5. Cookies & Tracking</h2>
                                        <p>We use cookies and similar tracking technologies to enhance your browsing experience:</p>
                                        <ul className={styles.list}>
                                            <li><strong>Essential Cookies:</strong> Required for the website to function, including session management, shopping cart functionality, and security features.</li>
                                            <li><strong>Analytics Cookies:</strong> Help us understand how visitors interact with our website so we can improve the user experience.</li>
                                            <li><strong>Preference Cookies:</strong> Remember your settings and preferences for a more personalized experience.</li>
                                            <li><strong>Marketing Cookies:</strong> Used to deliver relevant advertisements and measure the effectiveness of our marketing campaigns. These are only placed with your explicit consent.</li>
                                        </ul>
                                        <p>You can manage your cookie preferences through your browser settings. Disabling certain cookies may affect the functionality of our website.</p>
                                    </div>
                                </ScrollAnimation>

                                <ScrollAnimation>
                                    <div className={styles.policySection} id="your-rights">
                                        <h2 className={styles.sectionHeading}>6. Your Rights</h2>
                                        <p>Depending on your jurisdiction, you may have the following rights regarding your personal data:</p>
                                        <ul className={styles.list}>
                                            <li><strong>Right to Access:</strong> Request a copy of the personal information we hold about you.</li>
                                            <li><strong>Right to Rectification:</strong> Request correction of inaccurate or incomplete personal data.</li>
                                            <li><strong>Right to Erasure:</strong> Request deletion of your personal data, subject to legal retention requirements.</li>
                                            <li><strong>Right to Restriction:</strong> Request that we limit the processing of your personal data in certain circumstances.</li>
                                            <li><strong>Right to Data Portability:</strong> Request your data in a structured, machine-readable format.</li>
                                            <li><strong>Right to Opt-Out:</strong> Unsubscribe from marketing communications at any time via the link in our emails.</li>
                                        </ul>
                                        <p>To exercise any of these rights, please contact us at gunalan@r-tech.in. We will respond to your request within 30 days.</p>
                                    </div>
                                </ScrollAnimation>

                                <ScrollAnimation>
                                    <div className={styles.policySection} id="childrens-privacy">
                                        <h2 className={styles.sectionHeading}>7. Children&apos;s Privacy</h2>
                                        <p>RoboxRise products are designed for learners of all ages, but our website and e-commerce services are not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13 without verifiable parental consent.</p>
                                        <p>For our school and institutional programs, all student data is collected and managed through the educational institution, which is responsible for obtaining appropriate parental consent. We comply with applicable regulations including COPPA and similar child privacy laws.</p>
                                        <p>If you believe we have inadvertently collected information from a child under 13, please contact us immediately and we will promptly delete the information.</p>
                                    </div>
                                </ScrollAnimation>

                                <ScrollAnimation>
                                    <div className={styles.policySection} id="changes">
                                        <h2 className={styles.sectionHeading}>8. Changes to This Policy</h2>
                                        <p>We may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements, or other factors. When we make material changes, we will notify you by posting the updated policy on our website with a revised &quot;Last Updated&quot; date and, where appropriate, by sending a notification to your registered email address.</p>
                                        <p>We encourage you to review this page periodically to stay informed about how we protect your information. Your continued use of our services after any changes constitutes acceptance of the updated policy.</p>
                                    </div>
                                </ScrollAnimation>

                                <ScrollAnimation>
                                    <div className={styles.policySection} id="contact-us">
                                        <h2 className={styles.sectionHeading}>9. Contact Us</h2>
                                        <p>If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:</p>
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

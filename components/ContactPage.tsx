"use client";

import { useForm, ValidationError } from "@formspree/react";
import ScrollAnimation from "./ScrollAnimation";
import styles from "./ContactPage.module.css";

export default function ContactPage() {
    const [state, handleSubmit] = useForm("mpqbwznl");

    return (
        <>
            {/* ═══ Section 1: Hero ═══ */}
            <section className={styles.heroSection}>
                <div className={styles.heroBg}>
                    <img
                        src="https://res.cloudinary.com/dixayfqq8/image/upload/v1770269622/section1b_pmqjf3.jpg"
                        alt="RoboxRise contact"
                    />
                </div>
                <div className={styles.heroInner}>
                    <ScrollAnimation>
                        <div className={styles.heroPill}>
                            <span className={styles.heroPillDot} />
                            <span>Contact</span>
                        </div>
                    </ScrollAnimation>
                    <ScrollAnimation>
                        <h1 className={styles.heroHeading}>
                            Contact RoboxRise
                        </h1>
                    </ScrollAnimation>
                    <ScrollAnimation>
                        <p className={styles.heroDescription}>
                            Have a question about our robotics kits, STEM
                            programs, or workshop partnerships? Drop us a
                            line — we&apos;d love to hear from you.
                        </p>
                    </ScrollAnimation>
                </div>
            </section>

            {/* ═══ Section 2: Form + Info ═══ */}
            <section className={styles.contentSection}>
                <div className="padding-global padding-section-large">
                    <div className="container-large">
                        {/* Section Header */}
                        <div className={styles.sectionHeader}>
                            <ScrollAnimation>
                                <div className={styles.sectionTag}>
                                    <span className={styles.sectionTagDot} />
                                    Get In Touch
                                </div>
                            </ScrollAnimation>
                            <ScrollAnimation>
                                <h2 className={styles.sectionHeading}>
                                    We&apos;re here to help you get started
                                </h2>
                            </ScrollAnimation>
                            <ScrollAnimation>
                                <p className={styles.sectionBody}>
                                    Whether you need a product demo, bulk pricing,
                                    or curriculum consultation — our team is ready to assist.
                                </p>
                            </ScrollAnimation>
                        </div>

                        <div className={styles.contentGrid}>
                            {/* ── Form Card ── */}
                            <ScrollAnimation>
                                <div className={styles.formCard}>
                                    <div className={styles.formHeader}>
                                        <h3 className={styles.formTitle}>
                                            Send a Message
                                        </h3>
                                        <p className={styles.formSubtitle}>
                                            Fill out the form and our team will
                                            get back to you within 24 hours.
                                        </p>
                                    </div>

                                    <form
                                        onSubmit={handleSubmit}
                                        className={styles.formGrid}
                                    >
                                        <input type="hidden" name="source" value="contact-page" />
                                        <div className="form_field-wrapper">
                                            <label htmlFor="cp-name" className="form_label">
                                                Full Name
                                            </label>
                                            <input
                                                type="text"
                                                id="cp-name"
                                                name="name"
                                                className="form_input"
                                                placeholder="Your name"
                                                required
                                            />
                                        </div>

                                        <div className="form_field-wrapper">
                                            <label htmlFor="cp-email" className="form_label">
                                                Email Address
                                            </label>
                                            <input
                                                type="email"
                                                id="cp-email"
                                                name="email"
                                                className="form_input"
                                                placeholder="you@example.com"
                                                required
                                            />
                                            <ValidationError
                                                prefix="Email"
                                                field="email"
                                                errors={state.errors}
                                            />
                                        </div>

                                        <div className={`form_field-wrapper ${styles.fullWidth}`}>
                                            <label htmlFor="cp-phone" className="form_label">
                                                Phone Number{" "}
                                                <span style={{ opacity: 0.5, fontWeight: 400 }}>
                                                    (optional)
                                                </span>
                                            </label>
                                            <input
                                                type="tel"
                                                id="cp-phone"
                                                name="phone"
                                                className="form_input"
                                                placeholder="+91 00000 00000"
                                            />
                                        </div>

                                        <div className={`form_field-wrapper ${styles.fullWidth}`}>
                                            <label htmlFor="cp-subject" className="form_label">
                                                Subject
                                            </label>
                                            <input
                                                type="text"
                                                id="cp-subject"
                                                name="subject"
                                                className="form_input"
                                                placeholder="What is this regarding?"
                                                required
                                            />
                                        </div>

                                        <div className={`form_field-wrapper ${styles.fullWidth}`}>
                                            <label htmlFor="cp-message" className="form_label">
                                                Message
                                            </label>
                                            <textarea
                                                id="cp-message"
                                                name="message"
                                                className="form_input is-text-area"
                                                placeholder="Tell us about your project or question..."
                                                required
                                                rows={5}
                                            />
                                            <ValidationError
                                                prefix="Message"
                                                field="message"
                                                errors={state.errors}
                                            />
                                        </div>

                                        <button
                                            type="submit"
                                            className={styles.submitButton}
                                            disabled={state.submitting}
                                        >
                                            <span>{state.submitting ? "Sending..." : "Send Message"}</span>
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <line x1="22" y1="2" x2="11" y2="13" />
                                                <polygon points="22 2 15 22 11 13 2 9 22 2" />
                                            </svg>
                                        </button>

                                        {Boolean(state.errors) && (
                                            <div className={styles.successMsg}>
                                                There was an issue sending your message. Please review the fields and try again.
                                            </div>
                                        )}

                                        {state.succeeded && (
                                            <div className={styles.successMsg}>
                                                <svg className={styles.successIcon} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                    <polyline points="20 6 9 17 4 12" />
                                                </svg>
                                                Message sent! We&apos;ll be in touch shortly.
                                            </div>
                                        )}
                                    </form>
                                </div>
                            </ScrollAnimation>

                            {/* ── Info Column ── */}
                            <div className={styles.infoColumn}>
                                <ScrollAnimation delay={50}>
                                    <div className={styles.infoCard}>
                                        <div className={styles.infoIconWrap}>
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                                                <circle cx="12" cy="10" r="3" />
                                            </svg>
                                        </div>
                                        <div className={styles.infoContent}>
                                            <span className={styles.infoLabel}>Visit Us</span>
                                            <span className={styles.infoValue}>156, Krishna Market</span>
                                            <span className={styles.infoValueSecondary}>
                                                Near Parmanu Nagar, CAT Road, Indore 452012
                                            </span>
                                        </div>
                                    </div>
                                </ScrollAnimation>

                                <ScrollAnimation delay={100}>
                                    <div className={styles.infoCard}>
                                        <div className={styles.infoIconWrap}>
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                                            </svg>
                                        </div>
                                        <div className={styles.infoContent}>
                                            <span className={styles.infoLabel}>Call Us</span>
                                            <a href="tel:6264941006" className={styles.infoValue}>
                                                +91 62649 41006
                                            </a>
                                            <span className={styles.infoValueSecondary}>
                                                Also available on WhatsApp
                                            </span>
                                        </div>
                                    </div>
                                </ScrollAnimation>

                                <ScrollAnimation delay={150}>
                                    <div className={styles.infoCard}>
                                        <div className={styles.infoIconWrap}>
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                                                <rect x="2" y="4" width="20" height="16" rx="2" />
                                                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                                            </svg>
                                        </div>
                                        <div className={styles.infoContent}>
                                            <span className={styles.infoLabel}>Email Us</span>
                                            <a href="mailto:hello@roborise.com" className={styles.infoValue}>
                                                hello@roborise.com
                                            </a>
                                            <span className={styles.infoValueSecondary}>
                                                We reply within 24 hours
                                            </span>
                                        </div>
                                    </div>
                                </ScrollAnimation>

                                <ScrollAnimation delay={200}>
                                    <div className={styles.infoCard}>
                                        <div className={styles.infoIconWrap}>
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                                                <circle cx="12" cy="12" r="10" />
                                                <polyline points="12 6 12 12 16 14" />
                                            </svg>
                                        </div>
                                        <div className={styles.infoContent}>
                                            <span className={styles.infoLabel}>Business Hours</span>
                                            <span className={styles.infoValue}>Mon – Sat: 9 AM – 6 PM</span>
                                            <span className={styles.infoValueSecondary}>
                                                Sunday: Closed
                                            </span>
                                        </div>
                                    </div>
                                </ScrollAnimation>

                                {/* WhatsApp CTA Card */}
                                <ScrollAnimation delay={250}>
                                    <div className={styles.ctaCard}>
                                        <h3 className={styles.ctaTitle}>
                                            Prefer a Quick Chat?
                                        </h3>
                                        <p className={styles.ctaText}>
                                            Reach us directly on WhatsApp for
                                            instant support and quick answers.
                                        </p>
                                        <a
                                            href="https://wa.me/916264941006"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={styles.ctaButton}
                                        >
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                            </svg>
                                            <span>Chat on WhatsApp</span>
                                        </a>
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

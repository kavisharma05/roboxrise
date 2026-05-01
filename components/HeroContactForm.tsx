"use client";

import { useForm, ValidationError } from "@formspree/react";
import styles from "./HeroContactForm.module.css";

export default function HeroContactForm() {
    const [state, handleSubmit] = useForm("mpqbwznl");

    return (
        <div className={styles.formCard}>
            {/* Decorative top accent */}
            <div className={styles.topAccent} />

            <div className={styles.formHeader}>
                <h2 className={styles.formTitle}>Get in Touch</h2>
                <p className={styles.formSubtitle}>
                    Send us a message and we&apos;ll get back to you shortly.
                </p>
            </div>

            {state.succeeded ? (
                <div className={styles.successMessage}>
                    <div className={styles.successIconWrap}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12" />
                        </svg>
                    </div>
                    <div>
                        <div className={styles.successTitle}>Message Sent!</div>
                        <div className={styles.successText}>We&apos;ll get back to you soon.</div>
                    </div>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className={styles.form}>
                    <input type="hidden" name="source" value="hero-form" />
                    <input type="hidden" name="subject" value="Demo Request" />
                    <div className={styles.inputGroup}>
                        <input
                            type="text"
                            name="name"
                            placeholder="Your Name"
                            required
                            className={styles.input}
                        />
                        <svg className={styles.inputIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                            <circle cx="12" cy="7" r="4" />
                        </svg>
                    </div>

                    <div className={styles.inputGroup}>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email Address"
                            required
                            className={styles.input}
                        />
                        <ValidationError
                            prefix="Email"
                            field="email"
                            errors={state.errors}
                        />
                        <svg className={styles.inputIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="2" y="4" width="20" height="16" rx="2" />
                            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                        </svg>
                    </div>

                    <div className={styles.inputGroup}>
                        <input
                            type="tel"
                            name="phone"
                            placeholder="Phone Number"
                            className={styles.input}
                        />
                        <svg className={styles.inputIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                        </svg>
                    </div>

                    <div className={styles.inputGroup}>
                        <textarea
                            name="message"
                            placeholder="Your Message"
                            required
                            rows={3}
                            className={`${styles.input} ${styles.textarea}`}
                        />
                        <ValidationError
                            prefix="Message"
                            field="message"
                            errors={state.errors}
                        />
                        <svg className={`${styles.inputIcon} ${styles.textareaIcon}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                        </svg>
                    </div>

                    <button type="submit" className={styles.submitBtn} disabled={state.submitting}>
                        <span>{state.submitting ? "Sending..." : "Send Message"}</span>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="22" y1="2" x2="11" y2="13" />
                            <polygon points="22 2 15 22 11 13 2 9 22 2" />
                        </svg>
                    </button>
                    {state.errors && state.errors.length > 0 && (
                        <div className={styles.successText}>Unable to submit right now. Please check your details and try again.</div>
                    )}
                </form>
            )}
        </div>
    );
}

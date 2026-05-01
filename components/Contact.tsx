"use client";

import { useState } from "react";
import ScrollAnimation from "./ScrollAnimation";
import styles from "./Contact.module.css";

export default function Contact() {
    const [formData, setFormData] = useState({
        email: "",
        message: "",
    });
    const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate form submission
        setStatus("success");
        setFormData({ email: "", message: "" });
        setTimeout(() => setStatus("idle"), 3000);
    };

    return (
        <section className={styles.sectionContact}>
            <div className="padding-global padding-section-mini">
                <div className="container-large">
                    <div className={styles.contactContent}>
                        {/* Image */}
                        <ScrollAnimation className={styles.contactVisual}>
                            <img
                                src="https://res.cloudinary.com/dixayfqq8/image/upload/v1770551507/freepik__a-studio-shot-features-three-robotic-arms-lined-up__26065_hyzxzu.png"
                                alt=""
                                className="image"
                            />
                        </ScrollAnimation>

                        {/* Form */}
                        <ScrollAnimation className={styles.contactForm} delay={100}>
                            <div className={styles.contactTop}>
                                <div className="text-5xl">Get in touch.</div>
                                <div className="text-color-secondary">
                                    Get in touch with our team for demos, pricing, curriculum
                                    partnerships, or institutional deployment support.
                                </div>
                            </div>

                            <div className="form_component">
                                <form className="form_form" onSubmit={handleSubmit}>
                                    <div className="form_field-wrapper">
                                        <label htmlFor="email" className="form_label">
                                            Email (required)
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            className="form_input"
                                            placeholder="Email"
                                            required
                                            value={formData.email}
                                            onChange={(e) =>
                                                setFormData({ ...formData, email: e.target.value })
                                            }
                                        />
                                    </div>
                                    <div className="form_field-wrapper">
                                        <label htmlFor="message" className="form_label">
                                            Message (required)
                                        </label>
                                        <input
                                            type="text"
                                            id="message"
                                            className="form_input is-text-area"
                                            placeholder="Message"
                                            value={formData.message}
                                            onChange={(e) =>
                                                setFormData({ ...formData, message: e.target.value })
                                            }
                                        />
                                    </div>
                                    <button type="submit" className={styles.submitButton}>
                                        Send Message
                                    </button>
                                </form>

                                {status === "success" && (
                                    <div className="form_message-success">
                                        Thank you! Your submission has been received!
                                    </div>
                                )}
                                {status === "error" && (
                                    <div className="form_message-error">
                                        Oops! Something went wrong while submitting the form.
                                    </div>
                                )}
                            </div>
                        </ScrollAnimation>
                    </div>
                </div>
            </div>
        </section>
    );
}

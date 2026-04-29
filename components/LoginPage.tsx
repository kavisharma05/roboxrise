"use client";

import {
  useState,
  useRef,
  type FormEvent,
  type KeyboardEvent,
  type ClipboardEvent,
} from "react";
import { useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import ScrollAnimation from "./ScrollAnimation";
import styles from "./LoginPage.module.css";

type Step = "email" | "otp";

const OTP_LENGTH = 8;

export default function LoginPage() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const supabase = createClient();
  const isAuthAvailable = Boolean(supabase);

  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  const startCooldown = () => {
    setResendCooldown(60);
    const interval = setInterval(() => {
      setResendCooldown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleSendOtp = async (e: FormEvent) => {
    e.preventDefault();
    if (!supabase) {
      setError("Authentication is not configured. Please contact support.");
      return;
    }
    setError("");
    setSuccess("");
    setLoading(true);

    const { error: otpError } = await supabase.auth.signInWithOtp({
      email,
      options: { shouldCreateUser: true },
    });
    setLoading(false);

    if (otpError) {
      setError(otpError.message);
      return;
    }

    setStep("otp");
    setSuccess("We\u2019ve sent a verification code to your email.");
    startCooldown();
    setTimeout(() => otpRefs.current[0]?.focus(), 100);
  };

  const handleVerifyOtp = async (code?: string) => {
    if (!supabase) {
      setError("Authentication is not configured. Please contact support.");
      return;
    }
    const token = code || otp.join("");
    if (token.length !== OTP_LENGTH) {
      setError(`Please enter the full ${OTP_LENGTH}-digit code.`);
      return;
    }
    setError("");
    setSuccess("");
    setLoading(true);

    const { error: verifyError } = await supabase.auth.verifyOtp({
      email,
      token,
      type: "email",
    });

    if (verifyError) {
      setLoading(false);
      setError(verifyError.message);
      return;
    }

    window.location.href = callbackUrl;
  };

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    if (value && index < OTP_LENGTH - 1) {
      otpRefs.current[index + 1]?.focus();
    }

    if (value && index === OTP_LENGTH - 1) {
      const fullCode = newOtp.join("");
      if (fullCode.length === OTP_LENGTH) {
        handleVerifyOtp(fullCode);
      }
    }
  };

  const handleOtpKeyDown = (
    index: number,
    e: KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpPaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, OTP_LENGTH);
    if (!pasted) return;

    const newOtp = [...otp];
    for (let i = 0; i < OTP_LENGTH; i++) {
      newOtp[i] = pasted[i] || "";
    }
    setOtp(newOtp);

    const focusIndex = Math.min(pasted.length, OTP_LENGTH - 1);
    otpRefs.current[focusIndex]?.focus();

    if (pasted.length === OTP_LENGTH) {
      handleVerifyOtp(pasted);
    }
  };

  const handleResend = async () => {
    if (!supabase) {
      setError("Authentication is not configured. Please contact support.");
      return;
    }
    if (resendCooldown > 0) return;
    setError("");
    setSuccess("");
    setLoading(true);

    const { error: resendError } = await supabase.auth.signInWithOtp({
      email,
      options: { shouldCreateUser: true },
    });
    setLoading(false);

    if (resendError) {
      setError(resendError.message);
      return;
    }

    setOtp(Array(OTP_LENGTH).fill(""));
    setSuccess("A new code has been sent to your email.");
    startCooldown();
    otpRefs.current[0]?.focus();
  };

  const handleBack = () => {
    setStep("email");
    setOtp(Array(OTP_LENGTH).fill(""));
    setError("");
    setSuccess("");
  };

  return (
    <>
      <section className={styles.heroSection}>
        <div className={styles.heroBg} />
        <div className={styles.heroInner}>
          <ScrollAnimation>
            <div className={styles.heroPill}>
              <span className={styles.heroPillDot} />
              <span>Account</span>
            </div>
          </ScrollAnimation>
          <ScrollAnimation>
            <h1 className={styles.heroHeading}>
              {step === "email" ? "Sign In" : "Verify Email"}
            </h1>
          </ScrollAnimation>
          <ScrollAnimation>
            <p className={styles.heroDescription}>
              {step === "email"
                ? "Enter your email to receive a one-time code. No password needed \u2014 fast, simple, and secure."
                : `Enter the verification code we sent to ${email}`}
            </p>
          </ScrollAnimation>
        </div>
      </section>

      <section className={styles.formSection}>
        <div className="padding-global padding-section-large">
          <div className="container-large">
            <ScrollAnimation>
              <div className={styles.formCard}>
                <div className={styles.formAccent} />

                <h2 className={styles.formTitle}>
                  {step === "email" ? "Welcome" : "Check your inbox"}
                </h2>
                <p className={styles.formSubtitle}>
                  {step === "email"
                    ? "We\u2019ll email you a code to sign in or create an account"
                    : `Code sent to ${email}`}
                </p>

                {error && <div className={styles.errorBanner}>{error}</div>}
                {!isAuthAvailable && (
                  <div className={styles.errorBanner}>
                    Authentication is not configured in this environment.
                  </div>
                )}
                {success && (
                  <div className={styles.successBanner}>{success}</div>
                )}

                {step === "email" ? (
                  <form onSubmit={handleSendOtp} className={styles.form}>
                    <div className={styles.fieldGroup}>
                      <label htmlFor="email" className={styles.label}>
                        Email address
                      </label>
                      <div className={styles.inputWrap}>
                        <MailIcon />
                        <input
                          id="email"
                          type="email"
                          required
                          className={styles.input}
                          placeholder="you@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className={styles.submitBtn}
                      disabled={loading || !isAuthAvailable}
                    >
                      {loading ? (
                        <span className={styles.spinner} />
                      ) : (
                        "Continue"
                      )}
                    </button>
                  </form>
                ) : (
                  <div className={styles.form}>
                    <div className={styles.fieldGroup}>
                      <label className={styles.label}>Verification code</label>
                      <div className={styles.otpGroup}>
                        {otp.map((digit, i) => (
                          <input
                            key={i}
                            ref={(el) => {
                              otpRefs.current[i] = el;
                            }}
                            type="text"
                            inputMode="numeric"
                            maxLength={1}
                            className={styles.otpInput}
                            value={digit}
                            onChange={(e) => handleOtpChange(i, e.target.value)}
                            onKeyDown={(e) => handleOtpKeyDown(i, e)}
                            onPaste={i === 0 ? handleOtpPaste : undefined}
                            autoFocus={i === 0}
                          />
                        ))}
                      </div>
                    </div>

                    <button
                      type="button"
                      className={styles.submitBtn}
                      disabled={loading || otp.join("").length !== OTP_LENGTH || !isAuthAvailable}
                      onClick={() => handleVerifyOtp()}
                    >
                      {loading ? (
                        <span className={styles.spinner} />
                      ) : (
                        "Verify & Sign In"
                      )}
                    </button>

                    <div className={styles.otpActions}>
                      <button
                        type="button"
                        className={styles.footerLink}
                        onClick={handleBack}
                      >
                        &larr; Change email
                      </button>
                      <button
                        type="button"
                        className={styles.footerLink}
                        onClick={handleResend}
                        disabled={resendCooldown > 0 || !isAuthAvailable}
                      >
                        {resendCooldown > 0
                          ? `Resend in ${resendCooldown}s`
                          : "Resend code"}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>
    </>
  );
}

function MailIcon() {
  return (
    <svg
      className={styles.inputIcon}
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M22 7l-10 6L2 7" />
    </svg>
  );
}

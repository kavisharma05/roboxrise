"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import Script from "next/script";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { productForCartLine } from "@/lib/cart-checkout";
import { allProducts, getProductBySlug, type Product } from "@/lib/product-data";
import ScrollAnimation from "./ScrollAnimation";
import styles from "./BuyNowPage.module.css";

declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => RazorpayInstance;
  }
}

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  handler: (response: RazorpayResponse) => void;
  prefill: { name: string; email: string; contact: string };
  notes: Record<string, string>;
  theme: { color: string };
  modal?: { ondismiss?: () => void };
}

interface RazorpayInstance {
  open: () => void;
  on: (event: string, handler: (response: { error: { description: string } }) => void) => void;
}

interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

type CheckoutStep = "information" | "payment" | "confirmation";

type CheckoutResolution =
  | { kind: "loading" }
  | { kind: "single"; product: Product; qty: number }
  | { kind: "multi"; lines: { product: Product; quantity: number }[] };

export default function BuyNowPage() {
  const searchParams = useSearchParams();
  const { items, hydrated } = useCart();
  const slugParam = searchParams.get("product");
  const qtyParam = parseInt(searchParams.get("qty") || "1", 10);
  const qtyFromUrl = isNaN(qtyParam) || qtyParam < 1 ? 1 : qtyParam;

  const checkout = useMemo((): CheckoutResolution => {
    if (!hydrated) return { kind: "loading" };
    // Non-empty cart wins over ?product= so stale URL params cannot replace cart contents.
    if (items.length === 1) {
      return {
        kind: "single",
        product: productForCartLine(items[0]),
        qty: items[0].quantity,
      };
    }
    if (items.length > 1) {
      const lines = items.map((ci) => ({
        product: productForCartLine(ci),
        quantity: ci.quantity,
      }));
      return { kind: "multi", lines };
    }
    if (slugParam) {
      const p = getProductBySlug(slugParam) ?? allProducts[0];
      return { kind: "single", product: p, qty: qtyFromUrl };
    }
    return { kind: "single", product: allProducts[0], qty: 1 };
  }, [hydrated, slugParam, qtyFromUrl, items]);

  const product: Product =
    checkout.kind === "loading"
      ? allProducts[0]
      : checkout.kind === "single"
        ? checkout.product
        : checkout.lines[0].product;
  const qty =
    checkout.kind === "loading"
      ? 1
      : checkout.kind === "single"
        ? checkout.qty
        : checkout.lines.reduce((s, l) => s + l.quantity, 0);

  const [step, setStep] = useState<CheckoutStep>("information");
  const [shippingMethod, setShippingMethod] = useState<"standard" | "express">("standard");
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState("");
  const [paymentId, setPaymentId] = useState("");
  const [orderId, setOrderId] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);

  const [form, setForm] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    apartment: "",
    city: "",
    state: "",
    pincode: "",
    phone: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const subtotal = useMemo(() => {
    if (checkout.kind === "loading") return 0;
    if (checkout.kind === "single") return checkout.product.price * checkout.qty;
    return checkout.lines.reduce((s, l) => s + l.product.price * l.quantity, 0);
  }, [checkout]);

  const shippingCost = shippingMethod === "express" ? 29.99 : 0;
  const taxRate = 0.08;
  const tax = subtotal * taxRate;
  const total = subtotal + shippingCost + tax;

  const hasSale =
    checkout.kind === "single" &&
    !checkout.product.priceRange &&
    !!checkout.product.originalPrice &&
    checkout.product.originalPrice > checkout.product.price;
  const savings =
    checkout.kind === "single" && hasSale
      ? (checkout.product.originalPrice! - checkout.product.price) * checkout.qty
      : 0;

  /* Razorpay amounts are in the smallest currency unit (paise for INR) */
  const amountInPaise = Math.round(total * 100);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const validateInformation = () => {
    const newErrors: Record<string, string> = {};
    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = "Invalid email";
    if (!form.firstName.trim()) newErrors.firstName = "First name is required";
    if (!form.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!form.address.trim()) newErrors.address = "Address is required";
    if (!form.city.trim()) newErrors.city = "City is required";
    if (!form.state.trim()) newErrors.state = "State is required";
    if (!form.pincode.trim()) newErrors.pincode = "ZIP / Postal code is required";
    if (!form.phone.trim()) newErrors.phone = "Phone is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinueToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateInformation()) {
      setStep("payment");
      setPaymentError("");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const initiateRazorpayPayment = useCallback(async () => {
    if (!razorpayLoaded && amountInPaise > 0) {
      setPaymentError("Payment system is loading. Please try again in a moment.");
      return;
    }
    if (checkout.kind === "loading") {
      setPaymentError("Cart is still loading. Please wait a moment.");
      return;
    }

    setIsProcessing(true);
    setPaymentError("");

    const itemsPayload =
      checkout.kind === "single"
        ? [{ product_slug: checkout.product.slug, quantity: checkout.qty }]
        : checkout.lines.map((l) => ({ product_slug: l.product.slug, quantity: l.quantity }));

    try {
      const orderRes = await fetch("/api/razorpay/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: itemsPayload,
          shipping_method: shippingMethod,
          shipping: form,
        }),
      });

      if (!orderRes.ok) {
        const err = await orderRes.json();
        throw new Error(err.error || "Failed to create order");
      }

      const orderData = await orderRes.json();
      setOrderId(orderData.order_id);
      if (orderData.zero_amount) {
        setPaymentId("FREE_ORDER");
        setEmailSent(orderData.email_triggered ?? false);
        setStep("confirmation");
        window.scrollTo({ top: 0, behavior: "smooth" });
        setIsProcessing(false);
        return;
      }

      const options: RazorpayOptions = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "",
        amount: orderData.razorpay_order.amount,
        currency: orderData.razorpay_order.currency,
        name: "RoboxRise",
        description: `${product.name.split("–")[0].trim()} × ${qty}`,
        order_id: orderData.razorpay_order.id,
        handler: async (response: RazorpayResponse) => {
          try {
            const verifyRes = await fetch("/api/razorpay/verify-payment", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });

            const result = await verifyRes.json();

            if (result.verified) {
              setPaymentId(response.razorpay_payment_id);
              setEmailSent(true);
              if (result.order_id) setOrderId(result.order_id);
              setStep("confirmation");
              window.scrollTo({ top: 0, behavior: "smooth" });
            } else {
              setPaymentError("Payment verification failed. Please contact support.");
            }
          } catch {
            setPaymentError("Could not verify payment. Please contact support.");
          } finally {
            setIsProcessing(false);
          }
        },
        prefill: {
          name: `${form.firstName} ${form.lastName}`,
          email: form.email,
          contact: form.phone,
        },
        notes: {
          address: `${form.address}, ${form.city}, ${form.state} ${form.pincode}`,
          shipping: shippingMethod,
        },
        theme: { color: "#ff6b35" },
        modal: {
          ondismiss: () => {
            setIsProcessing(false);
          },
        },
      };

      const rzp = new window.Razorpay(options);

      rzp.on("payment.failed", (response: { error: { description: string } }) => {
        setPaymentError(response.error.description || "Payment failed. Please try again.");
        setIsProcessing(false);
      });

      rzp.open();
    } catch (error) {
      const message = error instanceof Error ? error.message : "Something went wrong";
      setPaymentError(message);
      setIsProcessing(false);
    }
  }, [razorpayLoaded, checkout, form, shippingMethod, product, amountInPaise, qty]);

  useEffect(() => {
    setErrors({});
    setPaymentError("");
  }, [step]);

  /* ─── Confirmation Screen ─── */
  if (step === "confirmation") {
    return (
      <>
        <Script
          src="https://checkout.razorpay.com/v1/checkout.js"
          strategy="lazyOnload"
        />
        <section className={styles.confirmationSection}>
          <div className="padding-global padding-section-large">
            <div className="container-large">
              <ScrollAnimation>
                <div className={styles.confirmationCard}>
                  <div className={styles.confirmationIcon}>
                    <CheckCircleIcon />
                  </div>
                  <span className={styles.confirmationStatus}>Order Confirmed</span>
                  <h1 className={styles.confirmationHeading}>Payment Successful!</h1>
                  <p className={styles.confirmationText}>
                    {emailSent ? (
                      <>
                        Thank you for your purchase. A confirmation email has been sent to{" "}
                        <strong>{form.email}</strong>.
                      </>
                    ) : (
                      <>
                        Your order has been placed. Order details:{" "}
                        <strong>{orderId.slice(0, 8).toUpperCase() || orderId}</strong>.
                      </>
                    )}
                  </p>
                  <div className={styles.confirmationMetaGrid}>
                    {orderId && (
                      <div className={styles.confirmationOrder}>
                        <span className={styles.confirmationLabel}>Order ID</span>
                        <span className={styles.confirmationValue}>
                          {orderId.slice(0, 8).toUpperCase()}
                        </span>
                      </div>
                    )}
                    <div className={styles.confirmationOrder}>
                      <span className={styles.confirmationLabel}>Payment ID</span>
                      <span className={styles.confirmationValue}>{paymentId}</span>
                    </div>
                  </div>
                  <div className={styles.confirmationProductRow}>
                    <img
                      src={product.images[0].src}
                      alt={product.images[0].alt}
                      className={styles.confirmationImg}
                    />
                    <div>
                      <p className={styles.confirmationProductName}>{product.name}</p>
                      <p className={styles.confirmationProductMeta}>
                        Qty: {qty} &middot; {"\u20B9"}
                        {total.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                      </p>
                    </div>
                  </div>

                  <div className={styles.confirmationShipping}>
                    <span className={styles.confirmationLabel}>Shipping To</span>
                    <p className={styles.confirmationAddress}>
                      {form.firstName} {form.lastName}
                      <br />
                      {form.address}
                      {form.apartment && `, ${form.apartment}`}
                      <br />
                      {form.city}, {form.state} {form.pincode}
                    </p>
                  </div>

                  <div className={styles.confirmationActions}>
                    {orderId && (
                      <Link
                        href={`/orders/${orderId}`}
                        className={styles.continueShopping}
                      >
                        View Order
                      </Link>
                    )}
                    <Link href="/products" className={styles.continueShopping}>
                      Continue Shopping
                    </Link>
                    <Link href="/" className={styles.backHome}>
                      Back to Home
                    </Link>
                  </div>
                  <div
                    style={{
                      marginTop: "1.5rem",
                      padding: "1rem",
                      borderRadius: "0.75rem",
                      backgroundColor: "#f8f9fa",
                    }}
                  >
                    <p style={{ fontSize: "0.9rem", color: "#4b5563" }}>
                      Want to track your order?
                      <Link href="/login" style={{ color: "#ea580c", marginLeft: "0.35rem" }}>
                        Create an account
                      </Link>
                    </p>
                  </div>
                </div>
              </ScrollAnimation>
            </div>
          </div>
        </section>
      </>
    );
  }

  if (checkout.kind === "loading") {
    return (
      <>
        <Script
          src="https://checkout.razorpay.com/v1/checkout.js"
          strategy="lazyOnload"
          onLoad={() => setRazorpayLoaded(true)}
        />
        <section className={styles.pageHero}>
          <div className="padding-global">
            <div className="container-large">
              <p style={{ padding: "3rem 0", textAlign: "center" }}>Loading checkout…</p>
            </div>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="lazyOnload"
        onLoad={() => setRazorpayLoaded(true)}
      />

      {/* Hero */}
      <section className={styles.pageHero}>
        <div className="padding-global">
          <div className="container-large">
            <ScrollAnimation className={styles.heroInner}>
              <span className={styles.badge}>
                <span className={styles.badgeDot} />
                Secure Checkout
              </span>
              <h1 className={styles.pageTitle}>Checkout</h1>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* Steps indicator */}
      <section className={styles.stepsSection}>
        <div className="padding-global">
          <div className="container-large">
            <div className={styles.stepsBar}>
              <button
                className={`${styles.stepItem} ${
                  step === "information" ? styles.stepActive : styles.stepCompleted
                }`}
                onClick={() => step === "payment" && setStep("information")}
                type="button"
              >
                <span className={styles.stepNumber}>1</span>
                <span className={styles.stepLabel}>Information</span>
              </button>
              <div className={styles.stepLine} />
              <button
                className={`${styles.stepItem} ${
                  step === "payment"
                    ? styles.stepActive
                    : (step as string) === "confirmation"
                    ? styles.stepCompleted
                    : ""
                }`}
                type="button"
                disabled={step === "information"}
              >
                <span className={styles.stepNumber}>2</span>
                <span className={styles.stepLabel}>Payment</span>
              </button>
              <div className={styles.stepLine} />
              <div
                className={`${styles.stepItem} ${
                  (step as string) === "confirmation" ? styles.stepActive : ""
                }`}
              >
                <span className={styles.stepNumber}>3</span>
                <span className={styles.stepLabel}>Confirmation</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main checkout content */}
      <section className={styles.checkoutSection}>
        <div className="padding-global padding-section-large">
          <div className="container-large">
            <div className={styles.checkoutGrid}>
              {/* Left: Form */}
              <div className={styles.formColumn}>
                {step === "information" && (
                  <ScrollAnimation>
                    <form onSubmit={handleContinueToPayment} className={styles.formCard} noValidate>
                      {/* Contact */}
                      <div className={styles.formBlock}>
                        <h2 className={styles.formBlockTitle}>Contact Information</h2>
                        <div
                          style={{
                            backgroundColor: "#eff6ff",
                            border: "1px solid #bfdbfe",
                            borderRadius: "0.75rem",
                            padding: "1rem",
                            marginBottom: "1.25rem",
                          }}
                        >
                          <p style={{ fontSize: "0.875rem", color: "#1e3a8a", margin: 0 }}>
                            <strong>Guest Checkout:</strong> You can complete your order without
                            creating an account. Your order confirmation will be sent to the email
                            you provide.
                          </p>
                        </div>
                        <div className={styles.fieldWrap}>
                          <label className={styles.fieldLabel} htmlFor="bn-email">
                            Email
                          </label>
                          <input
                            type="email"
                            id="bn-email"
                            name="email"
                            className={`${styles.fieldInput} ${errors.email ? styles.fieldError : ""}`}
                            placeholder="you@example.com"
                            value={form.email}
                            onChange={handleChange}
                          />
                          {errors.email && <span className={styles.errorText}>{errors.email}</span>}
                        </div>
                      </div>

                      <div className={styles.divider} />

                      {/* Shipping address */}
                      <div className={styles.formBlock}>
                        <h2 className={styles.formBlockTitle}>Shipping Address</h2>
                        <div className={styles.fieldRow}>
                          <div className={styles.fieldWrap}>
                            <label className={styles.fieldLabel} htmlFor="bn-first">
                              First Name
                            </label>
                            <input
                              type="text"
                              id="bn-first"
                              name="firstName"
                              className={`${styles.fieldInput} ${errors.firstName ? styles.fieldError : ""}`}
                              placeholder="John"
                              value={form.firstName}
                              onChange={handleChange}
                            />
                            {errors.firstName && (
                              <span className={styles.errorText}>{errors.firstName}</span>
                            )}
                          </div>
                          <div className={styles.fieldWrap}>
                            <label className={styles.fieldLabel} htmlFor="bn-last">
                              Last Name
                            </label>
                            <input
                              type="text"
                              id="bn-last"
                              name="lastName"
                              className={`${styles.fieldInput} ${errors.lastName ? styles.fieldError : ""}`}
                              placeholder="Doe"
                              value={form.lastName}
                              onChange={handleChange}
                            />
                            {errors.lastName && (
                              <span className={styles.errorText}>{errors.lastName}</span>
                            )}
                          </div>
                        </div>
                        <div className={styles.fieldWrap}>
                          <label className={styles.fieldLabel} htmlFor="bn-address">
                            Address
                          </label>
                          <input
                            type="text"
                            id="bn-address"
                            name="address"
                            className={`${styles.fieldInput} ${errors.address ? styles.fieldError : ""}`}
                            placeholder="123 Main Street"
                            value={form.address}
                            onChange={handleChange}
                          />
                          {errors.address && (
                            <span className={styles.errorText}>{errors.address}</span>
                          )}
                        </div>
                        <div className={styles.fieldWrap}>
                          <label className={styles.fieldLabel} htmlFor="bn-apt">
                            Apartment, suite, etc.{" "}
                            <span className={styles.optionalTag}>(optional)</span>
                          </label>
                          <input
                            type="text"
                            id="bn-apt"
                            name="apartment"
                            className={styles.fieldInput}
                            placeholder="Apt 4B"
                            value={form.apartment}
                            onChange={handleChange}
                          />
                        </div>
                        <div className={styles.fieldRow}>
                          <div className={styles.fieldWrap}>
                            <label className={styles.fieldLabel} htmlFor="bn-city">
                              City
                            </label>
                            <input
                              type="text"
                              id="bn-city"
                              name="city"
                              className={`${styles.fieldInput} ${errors.city ? styles.fieldError : ""}`}
                              placeholder="City"
                              value={form.city}
                              onChange={handleChange}
                            />
                            {errors.city && (
                              <span className={styles.errorText}>{errors.city}</span>
                            )}
                          </div>
                          <div className={styles.fieldWrap}>
                            <label className={styles.fieldLabel} htmlFor="bn-state">
                              State
                            </label>
                            <input
                              type="text"
                              id="bn-state"
                              name="state"
                              className={`${styles.fieldInput} ${errors.state ? styles.fieldError : ""}`}
                              placeholder="State"
                              value={form.state}
                              onChange={handleChange}
                            />
                            {errors.state && (
                              <span className={styles.errorText}>{errors.state}</span>
                            )}
                          </div>
                          <div className={styles.fieldWrap}>
                            <label className={styles.fieldLabel} htmlFor="bn-pin">
                              ZIP / Postal Code
                            </label>
                            <input
                              type="text"
                              id="bn-pin"
                              name="pincode"
                              className={`${styles.fieldInput} ${errors.pincode ? styles.fieldError : ""}`}
                              placeholder="452001"
                              value={form.pincode}
                              onChange={handleChange}
                            />
                            {errors.pincode && (
                              <span className={styles.errorText}>{errors.pincode}</span>
                            )}
                          </div>
                        </div>
                        <div className={styles.fieldWrap}>
                          <label className={styles.fieldLabel} htmlFor="bn-phone">
                            Phone
                          </label>
                          <input
                            type="tel"
                            id="bn-phone"
                            name="phone"
                            className={`${styles.fieldInput} ${errors.phone ? styles.fieldError : ""}`}
                            placeholder="+91 00000 00000"
                            value={form.phone}
                            onChange={handleChange}
                          />
                          {errors.phone && (
                            <span className={styles.errorText}>{errors.phone}</span>
                          )}
                        </div>
                      </div>

                      <div className={styles.divider} />

                      {/* Shipping method */}
                      <div className={styles.formBlock}>
                        <h2 className={styles.formBlockTitle}>Shipping Method</h2>
                        <div className={styles.shippingOptions}>
                          <label
                            className={`${styles.shippingOption} ${
                              shippingMethod === "standard" ? styles.shippingSelected : ""
                            }`}
                          >
                            <input
                              type="radio"
                              name="shippingMethod"
                              value="standard"
                              checked={shippingMethod === "standard"}
                              onChange={() => setShippingMethod("standard")}
                              className={styles.radioInput}
                            />
                            <div className={styles.radioCircle} />
                            <div className={styles.shippingInfo}>
                              <span className={styles.shippingName}>Standard Shipping</span>
                              <span className={styles.shippingEta}>5–7 business days</span>
                            </div>
                            <span className={styles.shippingPrice}>Free</span>
                          </label>
                          <label
                            className={`${styles.shippingOption} ${
                              shippingMethod === "express" ? styles.shippingSelected : ""
                            }`}
                          >
                            <input
                              type="radio"
                              name="shippingMethod"
                              value="express"
                              checked={shippingMethod === "express"}
                              onChange={() => setShippingMethod("express")}
                              className={styles.radioInput}
                            />
                            <div className={styles.radioCircle} />
                            <div className={styles.shippingInfo}>
                              <span className={styles.shippingName}>Express Shipping</span>
                              <span className={styles.shippingEta}>2–3 business days</span>
                            </div>
                            <span className={styles.shippingPrice}>$29.99</span>
                          </label>
                        </div>
                      </div>

                      <button type="submit" className={styles.primaryBtn}>
                        Continue to Payment
                        <ArrowRightIcon />
                      </button>
                    </form>
                  </ScrollAnimation>
                )}

                {step === "payment" && (
                  <ScrollAnimation>
                    <div className={styles.formCard}>
                      {/* Address review */}
                      <div className={styles.formBlock}>
                        <h2 className={styles.formBlockTitle}>Review Your Order</h2>
                        <div className={styles.reviewCard}>
                          <div className={styles.reviewRow}>
                            <span className={styles.reviewLabel}>Ship to</span>
                            <button
                              type="button"
                              className={styles.reviewEdit}
                              onClick={() => setStep("information")}
                            >
                              Edit
                            </button>
                          </div>
                          <p className={styles.reviewValue}>
                            {form.firstName} {form.lastName}
                            <br />
                            {form.address}
                            {form.apartment ? `, ${form.apartment}` : ""}
                            <br />
                            {form.city}, {form.state} {form.pincode}
                          </p>
                        </div>
                        <div className={styles.reviewCard}>
                          <div className={styles.reviewRow}>
                            <span className={styles.reviewLabel}>Contact</span>
                          </div>
                          <p className={styles.reviewValue}>
                            {form.email}
                            <br />
                            {form.phone}
                          </p>
                        </div>
                        <div className={styles.reviewCard}>
                          <div className={styles.reviewRow}>
                            <span className={styles.reviewLabel}>Shipping</span>
                          </div>
                          <p className={styles.reviewValue}>
                            {shippingMethod === "standard"
                              ? "Standard (5–7 business days) — Free"
                              : "Express (2–3 business days) — $29.99"}
                          </p>
                        </div>
                      </div>

                      <div className={styles.divider} />

                      {/* Razorpay payment section */}
                      <div className={styles.formBlock}>
                        <h2 className={styles.formBlockTitle}>Payment</h2>
                        <p className={styles.formBlockSubtitle}>
                          You&apos;ll be securely redirected to Razorpay to complete your payment.
                        </p>

                        <div className={styles.razorpayCard}>
                          <div className={styles.razorpayHeader}>
                            <RazorpayLogo />
                            <span className={styles.razorpaySecure}>
                              <LockIcon /> Secured by Razorpay
                            </span>
                          </div>
                          <div className={styles.razorpayBody}>
                            <p className={styles.razorpayMethods}>
                              Pay with UPI, Credit/Debit Card, Net Banking, Wallets, and more.
                            </p>
                            <div className={styles.razorpayIcons}>
                              <span className={styles.methodBadge}>UPI</span>
                              <span className={styles.methodBadge}>Visa</span>
                              <span className={styles.methodBadge}>Mastercard</span>
                              <span className={styles.methodBadge}>Net Banking</span>
                              <span className={styles.methodBadge}>Wallets</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Trust row */}
                      <div className={styles.trustRow}>
                        <div className={styles.trustItem}>
                          <LockIcon />
                          <span>256-bit SSL Encryption</span>
                        </div>
                        <div className={styles.trustItem}>
                          <ShieldIcon />
                          <span>Buyer Protection</span>
                        </div>
                      </div>

                      {paymentError && (
                        <div className={styles.paymentErrorBanner}>
                          <AlertIcon />
                          <span>{paymentError}</span>
                        </div>
                      )}

                      <div className={styles.paymentActions}>
                        <button
                          type="button"
                          className={styles.backBtn}
                          onClick={() => {
                            setStep("information");
                            window.scrollTo({ top: 0, behavior: "smooth" });
                          }}
                          disabled={isProcessing}
                        >
                          <ArrowLeftIcon />
                          Back
                        </button>
                        <button
                          type="button"
                          className={`${styles.primaryBtn} ${styles.razorpayBtn}`}
                          onClick={initiateRazorpayPayment}
                          disabled={isProcessing}
                        >
                          {isProcessing ? (
                            <>
                              <span className={styles.spinner} />
                              Processing...
                            </>
                          ) : (
                            <>
                              <LockSmallIcon />
                              Pay {"\u20B9"}
                              {total.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </ScrollAnimation>
                )}
              </div>

              {/* Right: Order summary */}
              <div className={styles.summaryColumn}>
                <ScrollAnimation>
                  <div className={styles.summaryCard}>
                    <h3 className={styles.summaryTitle}>Order Summary</h3>

                    {/* Product(s) — URL param or cart drives line items (not the first catalog product). */}
                    {checkout.kind === "multi" ? (
                      checkout.lines.map((line, idx) => (
                        <div key={`${line.product.slug}-${idx}`} className={styles.summaryProduct}>
                          <div className={styles.summaryImgWrap}>
                            <img
                              src={line.product.images[0].src}
                              alt={line.product.images[0].alt}
                              className={styles.summaryImg}
                            />
                            <span className={styles.qtyBadge}>{line.quantity}</span>
                          </div>
                          <div className={styles.summaryProductInfo}>
                            <p className={styles.summaryProductName}>
                              {line.product.name.split("–")[0].trim()}
                            </p>
                            <p className={styles.summaryProductVariant}>SKU: {line.product.sku}</p>
                          </div>
                          <span className={styles.summaryProductPrice}>
                            {"\u20B9"}
                            {(line.product.price * line.quantity).toLocaleString("en-IN", {
                              minimumFractionDigits: 2,
                            })}
                          </span>
                        </div>
                      ))
                    ) : (
                      <div className={styles.summaryProduct}>
                        <div className={styles.summaryImgWrap}>
                          <img
                            src={product.images[0].src}
                            alt={product.images[0].alt}
                            className={styles.summaryImg}
                          />
                          <span className={styles.qtyBadge}>{qty}</span>
                        </div>
                        <div className={styles.summaryProductInfo}>
                          <p className={styles.summaryProductName}>
                            {product.name.split("–")[0].trim()}
                          </p>
                          <p className={styles.summaryProductVariant}>SKU: {product.sku}</p>
                        </div>
                        <span className={styles.summaryProductPrice}>
                          {"\u20B9"}
                          {(product.price * qty).toLocaleString("en-IN", {
                            minimumFractionDigits: 2,
                          })}
                        </span>
                      </div>
                    )}

                    <div className={styles.summaryDivider} />

                    {/* Pricing lines */}
                    <div className={styles.summaryLines}>
                      <div className={styles.summaryLine}>
                        <span>Subtotal</span>
                        <span>
                          {"\u20B9"}
                          {subtotal.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                        </span>
                      </div>
                      <div className={styles.summaryLine}>
                        <span>Shipping</span>
                        <span className={shippingCost === 0 ? styles.freeShipping : ""}>
                          {shippingCost === 0
                            ? "Free"
                            : `\u20B9${shippingCost.toLocaleString("en-IN", { minimumFractionDigits: 2 })}`}
                        </span>
                      </div>
                      <div className={styles.summaryLine}>
                        <span>Estimated Tax</span>
                        <span>
                          {"\u20B9"}
                          {tax.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                        </span>
                      </div>
                      {savings > 0 && (
                        <div className={`${styles.summaryLine} ${styles.savingsLine}`}>
                          <span>You Save</span>
                          <span>
                            -{"\u20B9"}
                            {savings.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className={styles.summaryDivider} />

                    <div className={styles.summaryTotal}>
                      <span>Total</span>
                      <span>
                        {"\u20B9"}
                        {total.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                      </span>
                    </div>

                    {/* Trust badges */}
                    <div className={styles.summaryTrust}>
                      <div className={styles.summaryTrustItem}>
                        <TruckIcon />
                        <span>Free Shipping</span>
                      </div>
                      <div className={styles.summaryTrustItem}>
                        <ReturnIcon />
                        <span>30-Day Returns</span>
                      </div>
                      <div className={styles.summaryTrustItem}>
                        <WarrantyIcon />
                        <span>1-Year Warranty</span>
                      </div>
                    </div>
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

/* ─── Inline SVG Icons ─── */
function ArrowRightIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}

function ArrowLeftIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 12H5M12 19l-7-7 7-7" />
    </svg>
  );
}

function CheckCircleIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

function LockSmallIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <polyline points="9 12 11 14 15 10" />
    </svg>
  );
}

function AlertIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  );
}

function TruckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="3" width="15" height="13" rx="1" />
      <path d="M16 8h4l3 5v3h-7V8z" />
      <circle cx="5.5" cy="18.5" r="2.5" />
      <circle cx="18.5" cy="18.5" r="2.5" />
    </svg>
  );
}

function ReturnIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 14l-4-4 4-4" />
      <path d="M5 10h11a4 4 0 0 1 0 8h-1" />
    </svg>
  );
}

function WarrantyIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <polyline points="9 12 11 14 15 10" />
    </svg>
  );
}

function RazorpayLogo() {
  return (
    <img
      src="/razorpay-logo.svg"
      alt="Razorpay"
      style={{ height: "1.25rem", width: "auto" }}
    />
  );
}

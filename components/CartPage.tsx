"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { formatCartUnitPrice } from "@/lib/product-data";
import ScrollAnimation from "./ScrollAnimation";
import styles from "./CartPage.module.css";

/* ─── SVG Icons ─── */
const CartIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="8" cy="21" r="1" />
        <circle cx="19" cy="21" r="1" />
        <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
    </svg>
);

const TrashIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="3 6 5 6 21 6" />
        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
        <line x1="10" y1="11" x2="10" y2="17" />
        <line x1="14" y1="11" x2="14" y2="17" />
    </svg>
);

const MinusIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
);

const PlusIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <line x1="12" y1="5" x2="12" y2="19" />
        <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
);

const TAX_RATE = 0.08;

export default function CartPage() {
    const { items, updateQuantity, removeFromCart } = useCart();

    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const tax = subtotal * TAX_RATE;
    const total = subtotal + tax;
    const isEmpty = items.length === 0;

    const fmt = (n: number) =>
        n.toLocaleString("en-IN", { style: "currency", currency: "INR" });

    return (
        <>
            {/* ═══ Page Hero ═══ */}
            <section className={styles.heroSection}>
                <div className={styles.heroBg} />
                <div className={styles.heroInner}>
                    <ScrollAnimation>
                        <div className={styles.heroPill}>
                            <span className={styles.heroPillDot} />
                            <span>Your Cart</span>
                        </div>
                    </ScrollAnimation>
                    <ScrollAnimation>
                        <h1 className={styles.heroHeading}>Shopping Cart</h1>
                    </ScrollAnimation>
                    <ScrollAnimation>
                        <p className={styles.heroDescription}>
                            Review your selected robotics products before proceeding to
                            checkout. Free shipping on all orders.
                        </p>
                    </ScrollAnimation>
                </div>
            </section>

            {/* ═══ Cart Content ═══ */}
            <section className={styles.cartSection}>
                <div className="padding-global padding-section-large">
                    <div className="container-large">
                        {isEmpty ? (
                            <ScrollAnimation>
                                <div className={styles.emptyState}>
                                    <div className={styles.emptyIcon}>
                                        <CartIcon />
                                    </div>
                                    <h2 className={styles.emptyHeading}>Your cart is empty</h2>
                                    <p className={styles.emptyDescription}>
                                        Looks like you haven&apos;t added any robotics products yet.
                                        Explore our collection to find the perfect kit for your needs.
                                    </p>
                                    <Link href="/products" className={styles.emptyButton}>
                                        Browse Products
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M5 12h14M12 5l7 7-7 7" />
                                        </svg>
                                    </Link>
                                </div>
                            </ScrollAnimation>
                        ) : (
                            <div className={styles.cartGrid}>
                                {/* Left — Cart Items */}
                                <div className={styles.cartItems}>
                                    <ScrollAnimation>
                                        <div className={styles.cartHeader}>
                                            <h2 className={styles.cartHeaderTitle}>
                                                Cart Items ({items.length})
                                            </h2>
                                        </div>
                                    </ScrollAnimation>

                                    {items.map((item) => (
                                        <ScrollAnimation key={item.id}>
                                            <div className={styles.cartCard}>
                                                <div className={styles.cartCardImage}>
                                                    <img src={item.image} alt={item.name} />
                                                </div>

                                                <div className={styles.cartCardBody}>
                                                    <div className={styles.cartCardInfo}>
                                                        <h3 className={styles.cartCardName}>
                                                            {item.name}
                                                        </h3>
                                                        <div className={styles.cartCardPricing}>
                                                            <span className={styles.cartCardPrice}>
                                                                {formatCartUnitPrice(item)}
                                                            </span>
                                                            {item.originalPrice &&
                                                                !item.priceRange &&
                                                                item.originalPrice > item.price && (
                                                                <span className={styles.cartCardOriginal}>
                                                                    {fmt(item.originalPrice)}
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>

                                                    <div className={styles.cartCardActions}>
                                                        <div className={styles.quantityStepper}>
                                                            <button
                                                                className={styles.stepperButton}
                                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                                aria-label="Decrease quantity"
                                                            >
                                                                <MinusIcon />
                                                            </button>
                                                            <input
                                                                type="number"
                                                                className={styles.stepperInput}
                                                                value={item.quantity}
                                                                min={1}
                                                                max={99}
                                                                onChange={(e) =>
                                                                    updateQuantity(
                                                                        item.id,
                                                                        parseInt(e.target.value, 10) || 1,
                                                                    )
                                                                }
                                                                aria-label="Quantity"
                                                            />
                                                            <button
                                                                className={styles.stepperButton}
                                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                                aria-label="Increase quantity"
                                                            >
                                                                <PlusIcon />
                                                            </button>
                                                        </div>

                                                        <button
                                                            className={styles.removeButton}
                                                            onClick={() => removeFromCart(item.id)}
                                                            aria-label="Remove item"
                                                        >
                                                            <TrashIcon />
                                                            <span>Remove</span>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </ScrollAnimation>
                                    ))}

                                    <ScrollAnimation>
                                        <Link href="/products" className={styles.continueShopping}>
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M19 12H5M12 19l-7-7 7-7" />
                                            </svg>
                                            Continue Shopping
                                        </Link>
                                    </ScrollAnimation>
                                </div>

                                {/* Right — Order Summary */}
                                <div className={styles.summaryColumn}>
                                    <ScrollAnimation>
                                        <div className={styles.summaryCard}>
                                            <h3 className={styles.summaryTitle}>Order Summary</h3>

                                            <div className={styles.summaryRows}>
                                                <div className={styles.summaryRow}>
                                                    <span>Subtotal</span>
                                                    <span>{fmt(subtotal)}</span>
                                                </div>
                                                <div className={styles.summaryRow}>
                                                    <span>Shipping</span>
                                                    <span className={styles.freeShipping}>Free</span>
                                                </div>
                                                <div className={styles.summaryRow}>
                                                    <span>Tax (8%)</span>
                                                    <span>{fmt(tax)}</span>
                                                </div>
                                            </div>

                                            <div className={styles.summaryDivider} />

                                            <div className={styles.summaryTotal}>
                                                <span>Total</span>
                                                <span>{fmt(total)}</span>
                                            </div>

                                            <Link href="/buy-now" className={styles.checkoutButton}>
                                                Proceed to Checkout
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                                </svg>
                                            </Link>
                                        </div>
                                    </ScrollAnimation>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </>
    );
}

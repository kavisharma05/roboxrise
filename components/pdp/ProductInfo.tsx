"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { formatProductPriceDisplay, type Product } from "@/lib/product-data";
import { useCart } from "@/context/CartContext";
import styles from "./ProductInfo.module.css";

/** Short note below trust badges on PDPs — replace with your preferred wording. */
const PDP_FOOTNOTE =
  "Specifications and availability may vary by configuration. Contact us for exact details before ordering.";

interface Props {
  product: Product;
  loading?: boolean;
  addToCartRef?: React.RefObject<HTMLButtonElement>;
}

export default function ProductInfo({
  product,
  loading,
  addToCartRef,
}: Props) {
  const router = useRouter();
  const [qty, setQty] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [shareTooltip, setShareTooltip] = useState(false);
  const shareTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { addToCart } = useCart();

  useEffect(() => {
    return () => {
      if (shareTimerRef.current) clearTimeout(shareTimerRef.current);
    };
  }, []);

  const isContactQuoteOnly = product.price === 0 && !product.showZeroRupee;
  const isOutOfStock = product.stock === 0;
  const hasSale =
    !product.priceRange &&
    product.price > 0 &&
    !!product.originalPrice &&
    product.originalPrice > product.price;
  const discount = hasSale
    ? Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100)
    : 0;
  const demoVideoUrl = (product as { demoVideoUrl?: string }).demoVideoUrl;

  const handleAddToCart = () => {
    addToCart(
      {
        id: product.slug,
        name: product.name,
        image: product.images[0]?.src || "",
        price: product.price,
        originalPrice: product.originalPrice,
        priceRange: product.priceRange,
        href: `/products/${product.slug}`,
      },
      qty,
    );
    router.push("/cart");
  };

  const handleQtyChange = (delta: number) => {
    setQty((prev) => Math.max(1, Math.min(prev + delta, product.stock || 99)));
  };

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title: product.name, url });
      } catch { /* cancelled */ }
    } else {
      await navigator.clipboard.writeText(url);
      setShareTooltip(true);
      if (shareTimerRef.current) clearTimeout(shareTimerRef.current);
      shareTimerRef.current = setTimeout(() => setShareTooltip(false), 2000);
    }
  };

  if (loading) {
    return (
      <div className={styles.panel}>
        <div className={`${styles.skeleton} ${styles.skeletonLine}`} style={{ width: "60%" }} />
        <div className={`${styles.skeleton} ${styles.skeletonTitle}`} />
        <div className={`${styles.skeleton} ${styles.skeletonLine}`} style={{ width: "45%" }} />
        <div className={`${styles.skeleton} ${styles.skeletonPrice}`} />
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className={`${styles.skeleton} ${styles.skeletonLine}`} style={{ width: `${70 + i * 5}%` }} />
        ))}
        <div style={{ height: "1rem" }} />
        <div className={`${styles.skeleton} ${styles.skeletonBtn}`} />
      </div>
    );
  }

  return (
    <div className={styles.panel}>
      {/* Category pill */}
      <div className={styles.categoryPill}>
        {product.subcategory}
      </div>

      {/* 3. Title */}
      <h1 className={styles.title}>{product.name}</h1>

      {/* 4. Price */}
      <div className={styles.priceWrap}>
        {isContactQuoteOnly ? (
          <span className={styles.contactPrice}>Contact for Pricing</span>
        ) : (
          <>
            <span className={styles.price}>
              {formatProductPriceDisplay(product)}
            </span>
            {hasSale && (
              <>
                <span className={styles.originalPrice}>
                  ₹{product.originalPrice!.toLocaleString("en-IN")}
                </span>
                <span className={styles.discountBadge}>-{discount}%</span>
              </>
            )}
          </>
        )}
      </div>

      {/* 6. EMI or Contact text */}
      {isContactQuoteOnly ? (
        <p className={styles.emiLine}>Get a customized quote for your institution</p>
      ) : (
        <p className={styles.emiLine}>{product.emiText}</p>
      )}
      {demoVideoUrl && (
        <a
          href={demoVideoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.demoVideoLink}
        >
          Watch Demo Video
        </a>
      )}

      {/* 7. USP Bullets */}
      <ul className={styles.uspList}>
        {product.usps.map((usp, i) => (
          <li key={i} className={styles.uspItem}>
            <span className={styles.uspIcon}>
              <CheckIcon />
            </span>
            {usp}
          </li>
        ))}
      </ul>

      {/* 8. Divider */}
      <div className={styles.divider} />

      {/* 9. Quantity Stepper — only if priced and in stock */}
      {!isOutOfStock && !isContactQuoteOnly && (
        <div className={styles.quantityWrap}>
          <div className={styles.quantityLabel}>Quantity</div>
          <div className={styles.stepper}>
            <button
              className={styles.stepperBtn}
              onClick={() => handleQtyChange(-1)}
              disabled={qty <= 1}
              aria-label="Decrease quantity"
            >
              −
            </button>
            <input
              className={styles.stepperInput}
              type="number"
              value={qty}
              min={1}
              max={product.stock || 99}
              onChange={(e) => {
                const val = parseInt(e.target.value);
                if (!isNaN(val) && val >= 1) setQty(Math.min(val, product.stock || 99));
              }}
              aria-label="Quantity"
            />
            <button
              className={styles.stepperBtn}
              onClick={() => handleQtyChange(1)}
              disabled={qty >= (product.stock || 99)}
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>
        </div>
      )}

      {/* 10. CTA Buttons */}
      {isContactQuoteOnly ? (
        /* Request a Quote CTA for zero-price products */
        <Link href="/contact" className={styles.requestQuoteBtn}>
          <EnvelopeIcon /> Request a Quote
        </Link>
      ) : isOutOfStock ? (
        <button className={styles.notifyBtn}>
          <BellIcon /> Notify Me When Available
        </button>
      ) : (
        <>
          <button
            ref={addToCartRef as React.LegacyRef<HTMLButtonElement>}
            className={styles.addToCartBtn}
            onClick={handleAddToCart}
          >
            <span className={styles.addToCartIcon}><CartIcon /></span>
            Add to Cart
          </button>
          <Link
            href={`/buy-now?product=${encodeURIComponent(product.slug)}&qty=${qty}`}
            className={styles.buyNowBtn}
          >
            Buy Now
          </Link>
        </>
      )}

      {/* 11. Secondary Actions */}
      <div className={styles.secondaryActions}>
        <button
          className={`${styles.iconOnlyBtn} ${isWishlisted ? styles.iconOnlyBtnActive : ""}`}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          onClick={() => setIsWishlisted((prev) => !prev)}
        >
          <HeartIcon filled={isWishlisted} />
        </button>
        <button
          className={`${styles.secondaryBtn} ${shareTooltip ? styles.secondaryBtnActive : ""}`}
          aria-label="Share product"
          onClick={handleShare}
        >
          <ShareIcon /> {shareTooltip ? "Link Copied!" : "Share"}
        </button>
      </div>

      {/* 12. SKU */}
      <div className={styles.metaRow}>
        <span className={styles.skuText}>SKU: {product.sku}</span>
      </div>

      {/* 13. Trust Badges */}
      <div className={styles.trustGrid}>
        <div className={styles.trustItem}>
          <span className={styles.trustIconSvg}><TruckIcon /></span>
          <span className={styles.trustText}>Free Shipping</span>
        </div>
        <div className={styles.trustItem}>
          <span className={styles.trustIconSvg}><LockIcon /></span>
          <span className={styles.trustText}>Secure Checkout</span>
        </div>
        <div className={styles.trustItem}>
          <span className={styles.trustIconSvg}><ShieldIcon /></span>
          <span className={styles.trustText}>1-Year Warranty</span>
        </div>
      </div>

      <p className={styles.pdpNote}>{PDP_FOOTNOTE}</p>
    </div>
  );
}

/* ─── Inline SVG Icons ─── */
function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
    </svg>
  );
}

function HeartIcon({ filled }: { filled?: boolean }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

function ShareIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
    </svg>
  );
}

function EnvelopeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function BellIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  );
}

function TruckIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="3" width="15" height="13" rx="1" /><path d="M16 8h4l3 5v3h-7V8z" />
      <circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <polyline points="9 12 11 14 15 10" />
    </svg>
  );
}

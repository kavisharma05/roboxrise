"use client";

import styles from "./Skeleton.module.css";

interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  borderRadius?: string | number;
  className?: string;
  variant?: "text" | "circular" | "rectangular" | "rounded";
  animation?: "pulse" | "wave" | "none";
}

export function Skeleton({
  width,
  height,
  borderRadius,
  className = "",
  variant = "rectangular",
  animation = "pulse",
}: SkeletonProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case "text":
        return { borderRadius: "0.25rem", height: height || "1em" };
      case "circular":
        return { borderRadius: "50%" };
      case "rounded":
        return { borderRadius: borderRadius || "1rem" };
      default:
        return { borderRadius: borderRadius || "0.5rem" };
    }
  };

  const variantStyles = getVariantStyles();

  return (
    <div
      className={`${styles.skeleton} ${styles[animation]} ${className}`}
      style={{
        width: width,
        height: height,
        ...variantStyles,
      }}
    />
  );
}

export function SkeletonText({
  lines = 3,
  gap = "0.75rem",
  lastLineWidth = "60%",
}: {
  lines?: number;
  gap?: string;
  lastLineWidth?: string;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap }}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          variant="text"
          width={i === lines - 1 ? lastLineWidth : "100%"}
          height="1rem"
        />
      ))}
    </div>
  );
}

export function HeroSkeleton() {
  return (
    <section className={styles.heroSection}>
      <div className={styles.heroContent}>
        <div className={styles.heroInner}>
          <Skeleton width="200px" height="1.5rem" borderRadius="2rem" />
          <div style={{ marginTop: "1.5rem" }}>
            <Skeleton width="80%" height="3.5rem" />
            <Skeleton width="60%" height="3.5rem" className={styles.mt1} />
          </div>
          <div style={{ marginTop: "1.5rem" }}>
            <Skeleton width="90%" height="1.25rem" />
            <Skeleton width="70%" height="1.25rem" className={styles.mt05} />
          </div>
          <div className={styles.heroButtons}>
            <Skeleton width="160px" height="48px" borderRadius="2rem" />
            <Skeleton width="140px" height="48px" borderRadius="2rem" />
          </div>
          <Skeleton width="280px" height="1rem" className={styles.mt2} />
        </div>
      </div>
      <div className={styles.heroFormSkeleton}>
        <Skeleton width="100%" height="400px" borderRadius="1.25rem" />
      </div>
      <div className={styles.heroBgSkeleton} />
    </section>
  );
}

export function ProductCardSkeleton() {
  return (
    <div className={styles.productCard}>
      <Skeleton width="100%" height="280px" borderRadius="1rem" />
      <div className={styles.productCardContent}>
        <Skeleton width="40%" height="0.875rem" />
        <Skeleton width="80%" height="1.5rem" className={styles.mt05} />
        <Skeleton width="60%" height="1rem" className={styles.mt05} />
        <div className={styles.productCardFooter}>
          <Skeleton width="80px" height="1.5rem" />
          <Skeleton width="100px" height="40px" borderRadius="2rem" />
        </div>
      </div>
    </div>
  );
}

export function ProductGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className={styles.productGrid}>
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function ProductDetailSkeleton() {
  return (
    <div className={styles.productDetail}>
      <div className={styles.productDetailLeft}>
        <Skeleton width="100%" height="500px" borderRadius="1.25rem" />
        <div className={styles.productThumbnails}>
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} width="80px" height="80px" borderRadius="0.5rem" />
          ))}
        </div>
      </div>
      <div className={styles.productDetailRight}>
        <Skeleton width="100px" height="1.5rem" borderRadius="2rem" />
        <Skeleton width="80%" height="2.5rem" className={styles.mt1} />
        <Skeleton width="120px" height="2rem" className={styles.mt1} />
        <div className={styles.mt2}>
          <SkeletonText lines={4} />
        </div>
        <div className={styles.productDetailButtons}>
          <Skeleton width="100%" height="56px" borderRadius="2rem" />
          <Skeleton width="100%" height="56px" borderRadius="2rem" />
        </div>
        <div className={styles.mt2}>
          <Skeleton width="100%" height="120px" borderRadius="1rem" />
        </div>
      </div>
    </div>
  );
}

export function SectionSkeleton({
  title = true,
  subtitle = true,
  children,
}: {
  title?: boolean;
  subtitle?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <section className={styles.section}>
      <div className={styles.sectionHeader}>
        {title && <Skeleton width="200px" height="0.875rem" />}
        {subtitle && (
          <Skeleton width="400px" height="2.5rem" className={styles.mt1} />
        )}
      </div>
      {children}
    </section>
  );
}

export function CardSkeleton() {
  return (
    <div className={styles.card}>
      <Skeleton width="48px" height="48px" borderRadius="0.5rem" />
      <Skeleton width="70%" height="1.25rem" className={styles.mt1} />
      <SkeletonText lines={2} gap="0.5rem" />
    </div>
  );
}

export function CardGridSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className={styles.cardGrid}>
      {Array.from({ length: count }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  );
}

export function TeamCardSkeleton() {
  return (
    <div className={styles.teamCard}>
      <Skeleton width="100%" height="300px" borderRadius="1rem" />
      <div className={styles.teamCardContent}>
        <Skeleton width="70%" height="1.25rem" />
        <Skeleton width="50%" height="0.875rem" className={styles.mt05} />
      </div>
    </div>
  );
}

export function TeamGridSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className={styles.teamGrid}>
      {Array.from({ length: count }).map((_, i) => (
        <TeamCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function TestimonialSkeleton() {
  return (
    <div className={styles.testimonial}>
      <div className={styles.testimonialHeader}>
        <Skeleton variant="circular" width="48px" height="48px" />
        <div>
          <Skeleton width="120px" height="1rem" />
          <Skeleton width="80px" height="0.75rem" className={styles.mt05} />
        </div>
      </div>
      <SkeletonText lines={3} gap="0.5rem" />
      <div className={styles.testimonialStars}>
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} width="20px" height="20px" borderRadius="0.25rem" />
        ))}
      </div>
    </div>
  );
}

export function CartItemSkeleton() {
  return (
    <div className={styles.cartItem}>
      <Skeleton width="100px" height="100px" borderRadius="0.75rem" />
      <div className={styles.cartItemContent}>
        <Skeleton width="70%" height="1.25rem" />
        <Skeleton width="40%" height="0.875rem" className={styles.mt05} />
        <div className={styles.cartItemFooter}>
          <Skeleton width="100px" height="36px" borderRadius="0.5rem" />
          <Skeleton width="80px" height="1.25rem" />
        </div>
      </div>
    </div>
  );
}

export function CartSkeleton() {
  return (
    <div className={styles.cartLayout}>
      <div className={styles.cartItems}>
        <Skeleton width="150px" height="2rem" />
        <div className={styles.mt2}>
          {Array.from({ length: 3 }).map((_, i) => (
            <CartItemSkeleton key={i} />
          ))}
        </div>
      </div>
      <div className={styles.cartSummary}>
        <Skeleton width="100%" height="300px" borderRadius="1rem" />
      </div>
    </div>
  );
}

export function FAQSkeleton({ count = 5 }: { count?: number }) {
  return (
    <div className={styles.faqList}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className={styles.faqItem}>
          <div className={styles.faqHeader}>
            <Skeleton width="80%" height="1.25rem" />
            <Skeleton width="24px" height="24px" borderRadius="0.25rem" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function ContactFormSkeleton() {
  return (
    <div className={styles.contactForm}>
      <div className={styles.formRow}>
        <div className={styles.formField}>
          <Skeleton width="80px" height="0.875rem" />
          <Skeleton width="100%" height="48px" borderRadius="0.75rem" className={styles.mt05} />
        </div>
        <div className={styles.formField}>
          <Skeleton width="60px" height="0.875rem" />
          <Skeleton width="100%" height="48px" borderRadius="0.75rem" className={styles.mt05} />
        </div>
      </div>
      <div className={styles.formField}>
        <Skeleton width="100px" height="0.875rem" />
        <Skeleton width="100%" height="48px" borderRadius="0.75rem" className={styles.mt05} />
      </div>
      <div className={styles.formField}>
        <Skeleton width="70px" height="0.875rem" />
        <Skeleton width="100%" height="150px" borderRadius="0.75rem" className={styles.mt05} />
      </div>
      <Skeleton width="140px" height="48px" borderRadius="2rem" className={styles.mt1} />
    </div>
  );
}

export function PageHeaderSkeleton() {
  return (
    <div className={styles.pageHeader}>
      <Skeleton width="120px" height="1rem" />
      <Skeleton width="60%" height="3rem" className={styles.mt1} />
      <Skeleton width="80%" height="1.25rem" className={styles.mt1} />
    </div>
  );
}

export function OrderSkeleton() {
  return (
    <div className={styles.orderCard}>
      <div className={styles.orderHeader}>
        <div>
          <Skeleton width="150px" height="1rem" />
          <Skeleton width="100px" height="0.875rem" className={styles.mt05} />
        </div>
        <Skeleton width="100px" height="32px" borderRadius="2rem" />
      </div>
      <div className={styles.orderItems}>
        {Array.from({ length: 2 }).map((_, i) => (
          <div key={i} className={styles.orderItem}>
            <Skeleton width="60px" height="60px" borderRadius="0.5rem" />
            <div style={{ flex: 1 }}>
              <Skeleton width="70%" height="1rem" />
              <Skeleton width="40%" height="0.875rem" className={styles.mt05} />
            </div>
            <Skeleton width="80px" height="1rem" />
          </div>
        ))}
      </div>
      <div className={styles.orderFooter}>
        <Skeleton width="120px" height="1.25rem" />
      </div>
    </div>
  );
}

export function OrdersSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className={styles.ordersList}>
      {Array.from({ length: count }).map((_, i) => (
        <OrderSkeleton key={i} />
      ))}
    </div>
  );
}

export function LoginSkeleton() {
  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginCard}>
        <div className={styles.loginHeader}>
          <Skeleton width="48px" height="48px" borderRadius="0.75rem" />
          <Skeleton width="180px" height="2rem" className={styles.mt1} />
          <Skeleton width="250px" height="1rem" className={styles.mt05} />
        </div>
        <div className={styles.formField}>
          <Skeleton width="50px" height="0.875rem" />
          <Skeleton width="100%" height="48px" borderRadius="0.75rem" className={styles.mt05} />
        </div>
        <div className={styles.formField}>
          <Skeleton width="70px" height="0.875rem" />
          <Skeleton width="100%" height="48px" borderRadius="0.75rem" className={styles.mt05} />
        </div>
        <Skeleton width="100%" height="48px" borderRadius="2rem" className={styles.mt1} />
        <Skeleton width="200px" height="0.875rem" className={styles.mtAuto} />
      </div>
    </div>
  );
}

export function BuyNowSkeleton() {
  return (
    <div className={styles.buyNowLayout}>
      <div className={styles.buyNowLeft}>
        <Skeleton width="200px" height="2rem" />
        <div className={styles.mt2}>
          <Skeleton width="100%" height="200px" borderRadius="1rem" />
        </div>
        <div className={styles.mt2}>
          <Skeleton width="150px" height="1.5rem" />
          <div className={styles.formField}>
            <Skeleton width="100%" height="48px" borderRadius="0.75rem" className={styles.mt1} />
          </div>
          <div className={styles.formRow}>
            <Skeleton width="100%" height="48px" borderRadius="0.75rem" />
            <Skeleton width="100%" height="48px" borderRadius="0.75rem" />
          </div>
          <Skeleton width="100%" height="48px" borderRadius="0.75rem" className={styles.mt1} />
        </div>
      </div>
      <div className={styles.buyNowRight}>
        <Skeleton width="100%" height="400px" borderRadius="1rem" />
      </div>
    </div>
  );
}

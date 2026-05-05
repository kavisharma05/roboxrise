"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { formatProductPriceDisplay, type Product } from "@/lib/product-data";
import { useCart } from "@/context/CartContext";
import styles from "./StickyAddToCart.module.css";

interface Props {
  product: Product;
  addToCartRef: React.RefObject<HTMLButtonElement>;
}

export default function StickyAddToCart({ product, addToCartRef }: Props) {
  const router = useRouter();
  const [visible, setVisible] = useState(false);
  const { addToCart } = useCart();
  const isOutOfStock = product.stock === 0;
  const isContactQuoteOnly = product.price === 0 && !product.showZeroRupee;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(!entry.isIntersecting);
      },
      { threshold: 0 },
    );

    const btn = addToCartRef.current;
    if (btn) observer.observe(btn);

    return () => {
      if (btn) observer.unobserve(btn);
    };
  }, [addToCartRef]);

  const handleClick = () => {
    addToCart({
      id: product.slug,
      name: product.name,
      image: product.images[0]?.src || "",
      price: product.price,
      originalPrice: product.originalPrice,
      priceRange: product.priceRange,
      href: `/products/${product.slug}`,
    });
    router.push("/cart");
  };

  if (isOutOfStock && !isContactQuoteOnly) return null;

  return (
    <div className={`${styles.stickyBar} ${visible ? styles.visible : ""}`}>
      <div className={styles.priceColumn}>
        <span className={styles.stickyName}>{product.name.split("–")[0].split("_")[0].trim()}</span>
        {isContactQuoteOnly ? (
          <span className={styles.stickyContactPrice}>Contact for Pricing</span>
        ) : (
          <span className={styles.stickyPrice}>
            {formatProductPriceDisplay(product)}
          </span>
        )}
      </div>
      {isContactQuoteOnly ? (
        <Link href="/contact" className={styles.stickyBtn}>
          Request Quote
        </Link>
      ) : (
        <button className={styles.stickyBtn} disabled={isOutOfStock} onClick={handleClick}>
          <CartSmallIcon /> Add to Cart
        </button>
      )}
    </div>
  );
}

function CartSmallIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
    </svg>
  );
}

"use client";

import { useRef, useMemo } from "react";
import Link from "next/link";
import type { Product } from "@/lib/product-data";
import { allProducts, formatProductPriceDisplay } from "@/lib/product-data";
import ImageGallery from "./ImageGallery";
import ProductInfo from "./ProductInfo";
import TabsSection from "./TabsSection";
import StickyAddToCart from "./StickyAddToCart";
import styles from "./ProductDetailPage.module.css";

interface Props {
  product: Product;
  loading?: boolean;
}

export default function ProductDetailPage({ product, loading }: Props) {
  const addToCartRef = useRef<HTMLButtonElement>(null);

  const hasSale =
    !product.priceRange &&
    !!product.originalPrice &&
    product.originalPrice > product.price;

  const relatedProducts = useMemo(() => {
    const sameCategory = allProducts.filter(
      (p) => p.category === product.category && p.slug !== product.slug
    );
    const others = allProducts.filter(
      (p) => p.category !== product.category && p.slug !== product.slug
    );
    const pool = [...sameCategory, ...others];
    return pool.slice(0, 4);
  }, [product.slug, product.category]);

  return (
    <>
      {/* Breadcrumb Bar */}
      <div className={styles.breadcrumbBar}>
        <div className="padding-global">
          <div className="container-large">
            <nav className={styles.breadcrumb} aria-label="Breadcrumb">
              <Link href="/" className={styles.breadcrumbLink}>Home</Link>
              <span className={styles.breadcrumbSep} aria-hidden="true">
                <ChevronIcon />
              </span>
              <Link href="/products" className={styles.breadcrumbLink}>Products</Link>
              <span className={styles.breadcrumbSep} aria-hidden="true">
                <ChevronIcon />
              </span>
              <Link href="/products" className={styles.breadcrumbLink}>{product.category}</Link>
              <span className={styles.breadcrumbSep} aria-hidden="true">
                <ChevronIcon />
              </span>
              <span className={styles.breadcrumbCurrent}>
                {product.name.split("–")[0].split("_")[0].trim()}
              </span>
            </nav>
          </div>
        </div>
      </div>

      <section className={styles.pdpSection}>
        <div className="padding-global">
          <div className="container-large">
            <div className={styles.twoColumn}>
              <div className={styles.leftCol}>
                <ImageGallery
                  images={product.images}
                  saleActive={hasSale}
                  loading={loading}
                />
              </div>

              <div className={styles.rightCol}>
                <ProductInfo
                  product={product}
                  loading={loading}
                  addToCartRef={addToCartRef}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <TabsSection product={product} />

      {relatedProducts.length > 0 && (
        <section className={styles.relatedSection}>
          <div className="padding-global">
            <div className="container-large">
              <div className={styles.relatedHeader}>
                <div>
                  <span className={styles.relatedLabel}>You may also like</span>
                  <h2 className={styles.relatedTitle}>
                    More from {product.category}
                  </h2>
                </div>
                <Link href="/products" className={styles.relatedViewAll}>
                  View all products
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
              <div className={styles.relatedGrid}>
                {relatedProducts.map((p) => (
                  <Link
                    key={p.slug}
                    href={`/products/${p.slug}`}
                    className={styles.relatedCard}
                  >
                    <div className={styles.relatedImageWrap}>
                      <img
                        src={p.images[0].src}
                        alt={p.images[0].alt}
                        loading="lazy"
                      />
                    </div>
                    <div className={styles.relatedInfo}>
                      <span className={styles.relatedCategory}>
                        {p.subcategory}
                      </span>
                      <h3 className={styles.relatedName}>
                        {p.name.split("–")[0].split("_")[0].trim()}
                      </h3>
                      <div className={styles.relatedPriceRow}>
                        {p.price === 0 && !p.showZeroRupee ? (
                          <span className={styles.relatedContactPrice}>
                            Contact for Pricing
                          </span>
                        ) : (
                          <>
                            <span className={styles.relatedPrice}>
                              {formatProductPriceDisplay(p)}
                            </span>
                            {p.originalPrice &&
                              !p.priceRange &&
                              p.originalPrice > p.price && (
                              <span className={styles.relatedOriginal}>
                                ₹{p.originalPrice.toLocaleString("en-IN")}
                              </span>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      <StickyAddToCart product={product} addToCartRef={addToCartRef} />
    </>
  );
}

function ChevronIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none">
      <path
        d="M7.5 4.5L12.5 10L7.5 15.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

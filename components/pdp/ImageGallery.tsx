"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import type { ProductImage } from "@/lib/product-data";
import styles from "./ImageGallery.module.css";

interface Props {
  images: ProductImage[];
  saleActive?: boolean;
  loading?: boolean;
}

export default function ImageGallery({ images, saleActive, loading }: Props) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const mainRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    e.currentTarget.style.setProperty("--zoom-x", `${x}%`);
    e.currentTarget.style.setProperty("--zoom-y", `${y}%`);
  }, []);

  const openLightbox = () => setLightboxOpen(true);
  const closeLightbox = () => setLightboxOpen(false);

  const lightboxPrev = () =>
    setActiveIdx((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  const lightboxNext = () =>
    setActiveIdx((prev) => (prev === images.length - 1 ? 0 : prev + 1));

  useEffect(() => {
    if (!lightboxOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxOpen(false);
      if (e.key === "ArrowLeft") setActiveIdx((prev) => (prev === 0 ? images.length - 1 : prev - 1));
      if (e.key === "ArrowRight") setActiveIdx((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightboxOpen, images.length]);

  if (loading) {
    return (
      <div className={styles.gallery}>
        <div className={`${styles.skeleton} ${styles.skeletonMain}`} />
        <div className={styles.skeletonThumbs}>
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className={`${styles.skeleton} ${styles.skeletonThumb}`} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={styles.gallery}>
      {/* Desktop: Main image + thumbnails */}
      <div className={styles.desktopOnly}>
        <div
          ref={mainRef}
          className={styles.mainImageWrap}
          onMouseMove={handleMouseMove}
        >
          {saleActive && <span className={styles.saleBadge}>SALE</span>}
          <button
            className={styles.fullscreenBtn}
            onClick={openLightbox}
            aria-label="View fullscreen"
          >
            <ExpandIcon />
          </button>
          <img
            className={styles.mainImage}
            src={images[activeIdx].src}
            alt={images[activeIdx].alt}
            draggable={false}
          />
          <span className={styles.imageCounter}>{activeIdx + 1} / {images.length}</span>
        </div>

        {images.length > 1 && (
          <div className={styles.thumbnailRow}>
            {images.slice(0, images.length > 5 ? 4 : 5).map((img, i) => (
              <button
                key={i}
                className={`${styles.thumbnail} ${i === activeIdx ? styles.thumbnailActive : ""}`}
                onClick={() => setActiveIdx(i)}
                aria-label={`View image ${i + 1}`}
              >
                <img src={img.src} alt={img.alt} loading="lazy" />
              </button>
            ))}
            {images.length > 5 && (
              <button
                className={styles.thumbnailMore}
                onClick={openLightbox}
                aria-label={`View all ${images.length} images`}
              >
                +{images.length - 4}
              </button>
            )}
          </div>
        )}
      </div>

      {/* Mobile: Swiper carousel */}
      <div className={styles.swiperWrap}>
        <button
          className={styles.mobileFullscreenBtn}
          onClick={openLightbox}
          aria-label="View fullscreen"
        >
          <ExpandIcon />
        </button>
        {saleActive && <span className={styles.saleBadge}>SALE</span>}
        <Swiper
          modules={[Pagination]}
          pagination={{ clickable: true }}
          onSlideChange={(swiper) => setActiveIdx(swiper.activeIndex)}
          spaceBetween={0}
          slidesPerView={1}
        >
          {images.map((img, i) => (
            <SwiperSlide key={i}>
              <div className={styles.swiperSlide}>
                <img src={img.src} alt={img.alt} loading={i > 0 ? "lazy" : undefined} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <p className={styles.imageDisclaimer}>
        Images are only for representation, actual product and color may vary.
      </p>

      {/* Lightbox */}
      {lightboxOpen && (
        <div className={styles.lightbox} onClick={closeLightbox}>
          <button
            className={styles.lightboxClose}
            onClick={closeLightbox}
            aria-label="Close lightbox"
          >
            ✕
          </button>
          <button
            className={`${styles.lightboxNav} ${styles.lightboxPrev}`}
            onClick={(e) => { e.stopPropagation(); lightboxPrev(); }}
            aria-label="Previous image"
          >
            ‹
          </button>
          <img
            className={styles.lightboxImage}
            src={images[activeIdx].src}
            alt={images[activeIdx].alt}
            onClick={(e) => e.stopPropagation()}
          />
          <button
            className={`${styles.lightboxNav} ${styles.lightboxNext}`}
            onClick={(e) => { e.stopPropagation(); lightboxNext(); }}
            aria-label="Next image"
          >
            ›
          </button>
          <span className={styles.lightboxCounter}>
            {activeIdx + 1} / {images.length}
          </span>
        </div>
      )}
    </div>
  );
}

function ExpandIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="15 3 21 3 21 9" />
      <polyline points="9 21 3 21 3 15" />
      <line x1="21" y1="3" x2="14" y2="10" />
      <line x1="3" y1="21" x2="10" y2="14" />
    </svg>
  );
}

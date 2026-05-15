"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
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
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const mainRef = useRef<HTMLDivElement>(null);
  const [portalRoot, setPortalRoot] = useState<HTMLElement | null>(null);

  // Resolve portal target on mount (client-only)
  useEffect(() => {
    setPortalRoot(document.body);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZoomed) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPos({ x, y });
  }, [isZoomed]);

  const handleImageClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    // Don't toggle zoom if clicking on the fullscreen button
    if ((e.target as HTMLElement).closest('button')) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPos({ x, y });
    setIsZoomed((prev) => !prev);
  }, []);

  const handleMouseLeave = useCallback(() => setIsZoomed(false), []);

  const openLightbox = () => setLightboxOpen(true);
  const closeLightbox = () => setLightboxOpen(false);

  const lightboxPrev = () =>
    setActiveIdx((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  const lightboxNext = () =>
    setActiveIdx((prev) => (prev === images.length - 1 ? 0 : prev + 1));

  // Lock body scroll when lightbox is open
  useEffect(() => {
    if (lightboxOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [lightboxOpen]);

  // Keyboard navigation for lightbox
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

  const lightboxElement = lightboxOpen ? (
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
      <div className={styles.lightboxContent} onClick={(e) => e.stopPropagation()}>
        <img
          className={styles.lightboxImage}
          src={images[activeIdx].src}
          alt={images[activeIdx].alt}
        />
        {/* Thumbnail strip inside lightbox */}
        {images.length > 1 && (
          <div className={styles.lightboxThumbs}>
            {images.map((img, i) => (
              <button
                key={i}
                className={`${styles.lightboxThumb} ${i === activeIdx ? styles.lightboxThumbActive : ""}`}
                onClick={() => setActiveIdx(i)}
                aria-label={`View image ${i + 1}`}
              >
                <img src={img.src} alt={img.alt} loading="lazy" />
              </button>
            ))}
          </div>
        )}
      </div>
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
  ) : null;

  return (
    <div className={styles.gallery}>
      {/* Desktop: Main image + thumbnails */}
      <div className={styles.desktopOnly}>
        <div
          ref={mainRef}
          className={`${styles.mainImageWrap} ${isZoomed ? styles.zooming : ''}`}
          onMouseMove={handleMouseMove}
          onClick={handleImageClick}
          onMouseLeave={handleMouseLeave}
        >
          {saleActive && <span className={styles.saleBadge}>SALE</span>}
          <button
            className={styles.fullscreenBtn}
            onClick={(e) => { e.stopPropagation(); openLightbox(); }}
            aria-label="View fullscreen"
          >
            <ExpandIcon />
          </button>
          <img
            className={styles.mainImage}
            src={images[activeIdx].src}
            alt={images[activeIdx].alt}
            draggable={false}
            style={
              isZoomed
                ? {
                    transform: 'scale(2.5)',
                    transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
                    transition: 'transform-origin 0s ease, transform 0.15s ease',
                  }
                : {
                    transform: 'scale(1)',
                    transformOrigin: '50% 50%',
                    transition: 'transform 0.3s ease, transform-origin 0.3s ease',
                  }
            }
          />
          <span className={`${styles.imageCounter} ${isZoomed ? styles.hidden : ''}`}>{activeIdx + 1} / {images.length}</span>
          {isZoomed && (
            <div className={styles.zoomHint}>
              <MagnifyIcon /> Click to exit zoom
            </div>
          )}
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

      {/* Lightbox rendered via portal to escape sticky stacking context */}
      {portalRoot && lightboxElement && createPortal(lightboxElement, portalRoot)}
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

function MagnifyIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
      <line x1="11" y1="8" x2="11" y2="14" />
      <line x1="8" y1="11" x2="14" y2="11" />
    </svg>
  );
}

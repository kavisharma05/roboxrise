"use client";

import { useState, forwardRef } from "react";
import type { Product, Review } from "@/lib/product-data";
import styles from "./TabsSection.module.css";

const TABS = ["Videos", "Description", "Specifications", "In the Box", "Reviews", "FAQ"] as const;
type TabId = (typeof TABS)[number];

interface Props {
  product: Product;
}

const TabsSection = forwardRef<HTMLDivElement, Props>(function TabsSection(
  { product },
  ref,
) {
  const [activeTab, setActiveTab] = useState<TabId>("Videos");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const ratingDistribution = getRatingDistribution(product.reviews);
  const demoEmbedUrl = product.demoVideoUrl
    ? toYouTubeEmbedUrl(product.demoVideoUrl)
    : null;

  return (
    <section className={styles.section} ref={ref}>
      <div className="padding-global">
        <div className="container-large">
          {/* Tab Navigation */}
          <div className={styles.tabNav} role="tablist">
            {TABS.map((tab) => (
              <button
                key={tab}
                role="tab"
                aria-selected={activeTab === tab}
                className={`${styles.tabBtn} ${activeTab === tab ? styles.tabBtnActive : ""}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab Panels */}
          <div className={styles.tabPanel} role="tabpanel">
            {activeTab === "Videos" && (
              <div key="videos" className={`${styles.tabPanelContent} ${styles.videoPanel}`}>
                <h3 className={styles.videoTitle}>Product Demo Video</h3>
                <p className={styles.videoSubtitle}>
                  Watch how this product performs in real-world robotics workflows.
                </p>
                {demoEmbedUrl ? (
                  <div className={styles.videoFrameWrap}>
                    <iframe
                      className={styles.videoFrame}
                      src={demoEmbedUrl}
                      title={`${product.name} demo video`}
                      loading="lazy"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  </div>
                ) : (
                  <div className={styles.videoPlaceholder}>
                    <div className={styles.videoPlaceholderIcon}>
                      <PlayIcon />
                    </div>
                    <div className={styles.videoPlaceholderText}>Demo video will be available soon.</div>
                  </div>
                )}
              </div>
            )}

            {activeTab === "Description" && (
              <div
                key="description"
                className={`${styles.tabPanelContent} ${styles.description}`}
                dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
              />
            )}

            {activeTab === "Specifications" && (
              <div key="specifications" className={`${styles.tabPanelContent} ${styles.specTable}`}>
                {product.specifications.map((spec, i) => (
                  <div key={i} className={styles.specRow}>
                    <div className={styles.specLabel}>{spec.label}</div>
                    <div className={styles.specValue}>{spec.value}</div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "In the Box" && (
              <ul key="inbox" className={`${styles.tabPanelContent} ${styles.boxList}`}>
                {product.inTheBox.map((item, i) => (
                  <li key={i} className={styles.boxItem}>
                    <span className={styles.boxIcon}>
                      <BoxCheckIcon />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            )}

            {activeTab === "Reviews" && (
              <div key="reviews" className={`${styles.tabPanelContent} ${styles.reviewsWrap}`}>
                {/* Rating Summary */}
                <div className={styles.ratingSummary}>
                  <div className={styles.ratingBig}>{product.rating}</div>
                  <div className={styles.ratingStars} aria-label={`${product.rating} out of 5`}>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span key={i} className={i >= Math.round(product.rating) ? styles.ratingStarEmpty : ""}>★</span>
                    ))}
                  </div>
                  <div className={styles.ratingSubtext}>
                    Based on {product.reviewCount} reviews
                  </div>
                  <div className={styles.ratingBars}>
                    {[5, 4, 3, 2, 1].map((star) => {
                      const count = ratingDistribution[star] || 0;
                      const pct =
                        product.reviews.length > 0
                          ? (count / product.reviews.length) * 100
                          : 0;
                      return (
                        <div key={star} className={styles.ratingBarRow}>
                          <span className={styles.ratingBarLabel}>{star}★</span>
                          <div className={styles.ratingBarTrack}>
                            <div
                              className={styles.ratingBarFill}
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                          <span className={styles.ratingBarCount}>{count}</span>
                        </div>
                      );
                    })}
                  </div>
                  <button className={styles.writeReviewBtn}>
                    <PenIcon /> Write a Review
                  </button>
                </div>

                {/* Review Cards */}
                <div className={styles.reviewCards}>
                  {product.reviews.map((review) => (
                    <ReviewCard key={review.id} review={review} />
                  ))}
                </div>
              </div>
            )}

            {activeTab === "FAQ" && (
              <div key="faq" className={`${styles.tabPanelContent} ${styles.faqList}`}>
                {product.faqs.map((faq, i) => (
                  <div key={i} className={styles.faqItem}>
                    <button
                      className={styles.faqQuestion}
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      aria-expanded={openFaq === i}
                    >
                      {faq.question}
                      <span
                        className={`${styles.faqChevron} ${openFaq === i ? styles.faqChevronOpen : ""}`}
                      >
                        <ChevronIcon />
                      </span>
                    </button>
                    <div
                      className={`${styles.faqAnswer} ${openFaq === i ? styles.faqAnswerOpen : ""}`}
                    >
                      <div className={styles.faqAnswerInner}>{faq.answer}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
});

export default TabsSection;

/* ─── Review Card Sub-component ─── */
function ReviewCard({ review }: { review: Review }) {
  const initials = review.author
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2);

  return (
    <div className={styles.reviewCard}>
      <div className={styles.reviewHeader}>
        <div className={styles.reviewAuthorWrap}>
          <div className={styles.reviewAvatar}>{initials}</div>
          <span className={styles.reviewAuthor}>{review.author}</span>
        </div>
        <div className={styles.reviewMeta}>
          {review.verified && (
            <span className={styles.verifiedBadge}>✓ Verified</span>
          )}
          <span className={styles.reviewDate}>
            {new Date(review.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </span>
        </div>
      </div>
      <div className={styles.reviewStars}>
        {Array.from({ length: 5 }).map((_, i) => (
          <span key={i} className={i >= review.rating ? styles.reviewStarEmpty : ""}>
            ★
          </span>
        ))}
      </div>
      <div className={styles.reviewTitle}>{review.title}</div>
      <p className={styles.reviewBody}>{review.body}</p>
    </div>
  );
}

/* ─── Helpers ─── */
function getRatingDistribution(reviews: Review[]): Record<number, number> {
  const dist: Record<number, number> = {};
  reviews.forEach((r) => {
    dist[r.rating] = (dist[r.rating] || 0) + 1;
  });
  return dist;
}

function toYouTubeEmbedUrl(url: string): string {
  const videoId =
    url.match(/(?:youtu\.be\/|youtube\.com\/watch\?v=)([^&?/]+)/)?.[1] ?? "";
  if (!videoId) return "";
  return `https://www.youtube.com/embed/${videoId}`;
}

/* ─── Icons ─── */
function PlayIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polygon points="5 3 19 12 5 21 5 3" />
    </svg>
  );
}

function BoxCheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      <polyline points="9 12 11.5 14.5 16 10" />
    </svg>
  );
}

function ChevronIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

function PenIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  );
}

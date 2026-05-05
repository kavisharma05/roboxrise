"use client";

import { useEffect, useState } from "react";
import type { Product } from "@/lib/product-data";
import styles from "./TabsSection.module.css";

const TABS = ["Videos", "Description", "Specifications", "In the Box", "FAQ"] as const;
type TabId = (typeof TABS)[number];

interface Props {
  product: Product;
}

export default function TabsSection({ product }: Props) {
  const [activeTab, setActiveTab] = useState<TabId>("Videos");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  /** YouTube iframe steals wheel events; shield passes scroll to the page until user clicks to use the player. */
  const [videoPlayerActive, setVideoPlayerActive] = useState(false);

  const demoEmbedUrl = product.demoVideoUrl
    ? toYouTubeEmbedUrl(product.demoVideoUrl)
    : null;

  useEffect(() => {
    if (activeTab !== "Videos") setVideoPlayerActive(false);
  }, [activeTab]);

  useEffect(() => {
    setVideoPlayerActive(false);
  }, [product.slug]);

  return (
    <section className={styles.section}>
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
                  <>
                    {!videoPlayerActive && (
                      <p className={styles.videoInteractHint}>
                        Scroll works here — click the video when you want play, sound, or fullscreen.
                      </p>
                    )}
                    <div
                      className={styles.videoFrameWrap}
                      onMouseLeave={() => setVideoPlayerActive(false)}
                    >
                      <iframe
                        className={`${styles.videoFrame} ${!videoPlayerActive ? styles.videoFrameNonInteractive : ""}`}
                        src={demoEmbedUrl}
                        title={`${product.name} demo video`}
                        loading="lazy"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                      />
                      {!videoPlayerActive && (
                        <button
                          type="button"
                          className={styles.videoScrollShield}
                          aria-label="Activate YouTube player"
                          onClick={() => setVideoPlayerActive(true)}
                        />
                      )}
                    </div>
                  </>
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

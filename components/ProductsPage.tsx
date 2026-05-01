"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { allProducts, formatProductPriceDisplay } from "@/lib/product-data";
import aboutStyles from "./AboutPage.module.css";
import styles from "./ProductsPage.module.css";

const PRODUCT_TYPES = Array.from(new Set(allProducts.map((p) => p.subcategory))).sort();
type ProductType = string;
type SortOption = "default" | "name-asc" | "name-desc" | "price-asc" | "price-desc";

const SORT_LABELS: Record<SortOption, string> = {
    default: "Default",
    "name-asc": "Name: A → Z",
    "name-desc": "Name: Z → A",
    "price-asc": "Price: Low → High",
    "price-desc": "Price: High → Low",
};

interface RawProduct {
    name: string;
    slug: string;
    desc: string;
    image: string;
    price: number;
    showZeroRupee?: boolean;
    priceRange?: { min: number; max: number };
    category: string;
    type: ProductType;
    hasDemoVideo: boolean;
}

const categorySlugMap: Record<string, string> = {
    "Robotic Arms": "robotic-arms",
    "AI & Vision": "ai-vision",
    "Accessories": "accessories",
    "Training & Simulation": "training",
    "Advanced Robots": "advanced-robots",
    "Software & Curriculum": "software",
};

const PRODUCT_SEQUENCE: string[] = [
    "haro380-advanced-kit",
    "haro380-core-kit",
    "mirobot-advanced-kit",
    "mirobot-professional-kit",
    "mirobot-education-kit",
    "mt4-edu-kit",
    "ai-vision-set-programmable-educational-robotics",
    "opencv-advanced-vision-suite-with-textbook",
    "agv-rover-set",
    "conveyor-belt-set-mirobot",
    "sliding-rail-set-mirobot",
    "ai-navigation-learning-suite-with-textbook",
    "ai-hub-ai-development-kit",
    "fruit-picking-cell-mirobot-ai-vision-touch-screen",
    "automobile-assembly-cell-mirobot-touch-screen",
    "ai-automatic-sorting-cell-mirobot-touch-screen",
    "logistic-warehouse-cell-mt4-mirobot",
    "mirobot-automobile-intelligent-manufacturing-line",
    "automobile-assembly-line-robotics-training",
    "ai-automatic-sorting-line-mirobot-training-solution",
    "educational-programmable-robotics-fruit-picking-line",
    "mini-t-slot-starter-set",
    "omniconveyor-standard-set",
    "world-builder-set",
    "brave-edu-kit-biped-robot-sim2real",
    "march-x-pro-lidar-kit-robotic-dog",
];

const PRODUCT_SEQUENCE_INDEX = new Map(
    PRODUCT_SEQUENCE.map((slug, index) => [slug, index] as const)
);

const rawProducts: RawProduct[] = allProducts.map((p) => ({
    name: p.name,
    slug: p.slug,
    desc: p.usps[0] || p.subcategory,
    image: p.images[0]?.src || "",
    price: p.price,
    showZeroRupee: p.showZeroRupee,
    priceRange: p.priceRange,
    category: categorySlugMap[p.category] ?? "all",
    type: p.subcategory,
    hasDemoVideo: !!(p as { demoVideoUrl?: string }).demoVideoUrl,
})).sort((a, b) => {
    const aIndex = PRODUCT_SEQUENCE_INDEX.get(a.slug);
    const bIndex = PRODUCT_SEQUENCE_INDEX.get(b.slug);
    if (aIndex !== undefined && bIndex !== undefined) return aIndex - bIndex;
    if (aIndex !== undefined) return -1;
    if (bIndex !== undefined) return 1;
    return a.name.localeCompare(b.name);
});

const products = rawProducts.map((p) => ({
    ...p,
    href: `/products/${p.slug}`,
}));

/* ─── Icons ─── */
const GridIcon = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <rect x="1" y="1" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" />
        <rect x="9" y="1" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" />
        <rect x="1" y="9" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" />
        <rect x="9" y="9" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" />
    </svg>
);

const Grid3Icon = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <rect x="1" y="1" width="3.5" height="6" rx="0.75" stroke="currentColor" strokeWidth="1.3" />
        <rect x="6.25" y="1" width="3.5" height="6" rx="0.75" stroke="currentColor" strokeWidth="1.3" />
        <rect x="11.5" y="1" width="3.5" height="6" rx="0.75" stroke="currentColor" strokeWidth="1.3" />
        <rect x="1" y="9" width="3.5" height="6" rx="0.75" stroke="currentColor" strokeWidth="1.3" />
        <rect x="6.25" y="9" width="3.5" height="6" rx="0.75" stroke="currentColor" strokeWidth="1.3" />
        <rect x="11.5" y="9" width="3.5" height="6" rx="0.75" stroke="currentColor" strokeWidth="1.3" />
    </svg>
);

const ListIcon = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <rect x="1" y="2" width="14" height="3" rx="0.75" stroke="currentColor" strokeWidth="1.3" />
        <rect x="1" y="7" width="14" height="3" rx="0.75" stroke="currentColor" strokeWidth="1.3" />
        <rect x="1" y="12" width="14" height="3" rx="0.75" stroke="currentColor" strokeWidth="1.3" />
    </svg>
);

const FilterIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="4" y1="21" x2="4" y2="14" />
        <line x1="4" y1="10" x2="4" y2="3" />
        <line x1="12" y1="21" x2="12" y2="12" />
        <line x1="12" y1="8" x2="12" y2="3" />
        <line x1="20" y1="21" x2="20" y2="16" />
        <line x1="20" y1="12" x2="20" y2="3" />
        <line x1="1" y1="14" x2="7" y2="14" />
        <line x1="9" y1="8" x2="15" y2="8" />
        <line x1="17" y1="16" x2="23" y2="16" />
    </svg>
);

const ChatBubbleIcon = () => (
    <svg className={styles.chatIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
);

const ChevronDown = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 9l6 6 6-6" />
    </svg>
);

const HeartIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
);

/* ─── Component ─── */
export default function ProductsPage() {
    const router = useRouter();
    const [activeCategory, setActiveCategory] = useState("all");
    const [activeView, setActiveView] = useState(1);
    const [typeOpen, setTypeOpen] = useState(true);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [checkedTypes, setCheckedTypes] = useState<Set<string>>(new Set());
    const [sortOption, setSortOption] = useState<SortOption>("default");
    const [sortOpen, setSortOpen] = useState(false);
    const { addToCart } = useCart();
    const sortRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            if (sortRef.current && !sortRef.current.contains(e.target as Node)) {
                setSortOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, []);

    const toggleType = (type: string) => {
        setCheckedTypes((prev) => {
            const next = new Set(prev);
            if (next.has(type)) next.delete(type);
            else next.add(type);
            return next;
        });
    };

    const clearFilters = () => {
        setActiveCategory("all");
        setCheckedTypes(new Set());
        setSortOption("default");
    };

    const filteredProducts = useMemo(() => {
        let result = [...products];

        if (activeCategory !== "all") {
            result = result.filter((p) => p.category === activeCategory);
        }

        if (checkedTypes.size > 0) {
            result = result.filter((p) => checkedTypes.has(p.type));
        }

        switch (sortOption) {
            case "name-asc":
                result.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case "name-desc":
                result.sort((a, b) => b.name.localeCompare(a.name));
                break;
            case "price-asc":
                result.sort((a, b) => a.price - b.price);
                break;
            case "price-desc":
                result.sort((a, b) => b.price - a.price);
                break;
        }

        return result;
    }, [activeCategory, checkedTypes, sortOption]);

    const typeCounts = useMemo(() => {
        let pool = products;
        if (activeCategory !== "all") {
            pool = products.filter((p) => p.category === activeCategory);
        }
        const counts: Record<string, number> = {};
        for (const t of PRODUCT_TYPES) counts[t] = 0;
        for (const p of pool) counts[p.type] = (counts[p.type] || 0) + 1;
        return counts;
    }, [activeCategory]);

    const hasActiveFilters = activeCategory !== "all" || checkedTypes.size > 0;

    const handleAddToCart = (product: (typeof products)[number]) => {
        if (product.price === 0 && !product.showZeroRupee) return;
        addToCart({
            id: product.slug,
            name: product.name,
            image: product.image,
            price: product.price,
            priceRange: product.priceRange,
            href: product.href,
        });
        router.push("/cart");
    };

    return (
        <>
            {/* ═══ Page Hero (matches About page) ═══ */}
            <section className={aboutStyles.heroSection}>
                <div className={aboutStyles.heroBg}>
                    <img
                        src="https://res.cloudinary.com/dixayfqq8/image/upload/v1770269618/section1c_fvuwyb.jpg"
                        alt="RoboxRise robotics kits and educational systems"
                    />
                </div>
                <div className={aboutStyles.heroInner}>
                    <div className={aboutStyles.heroPill}>
                        <span className={aboutStyles.heroPillDot} />
                        <span>Our Catalog</span>
                    </div>
                    <h1 className={aboutStyles.heroHeading}>All Products</h1>
                    <p className={aboutStyles.heroDescription}>
                        Browse edu-industrial robot arms, mini factory cells, AI kits, and
                        accessories — everything you need for hands-on robotics learning.
                    </p>
                </div>
            </section>

            <div className={styles.pageWrapper}>
                {/* ═══ Header + Toolbar ═══ */}
                <section className={styles.headerSection}>
                    <div className="padding-global">
                        <div className="container-large">
                            <div className={styles.toolbar}>
                                <div className={styles.toolbarLeft}>
                                    {[
                                        { icon: <ListIcon />, idx: 0 },
                                        { icon: <Grid3Icon />, idx: 1 },
                                        { icon: <GridIcon />, idx: 2 },
                                    ].map(({ icon, idx }) => (
                                        <button
                                            key={idx}
                                            className={`${styles.viewToggle} ${activeView === idx ? styles.active : ""}`}
                                            onClick={() => setActiveView(idx)}
                                            aria-label={`View mode ${idx}`}
                                        >
                                            {icon}
                                        </button>
                                    ))}
                                    <button
                                        className={`${styles.filterToggleBtn} ${sidebarOpen ? styles.active : ""}`}
                                        onClick={() => setSidebarOpen((v) => !v)}
                                    >
                                        <FilterIcon />
                                        Filters
                                        {checkedTypes.size > 0 && (
                                            <span className={styles.filterBadge}>{checkedTypes.size}</span>
                                        )}
                                    </button>
                                </div>
                                <div className={styles.toolbarRight}>
                                    <div className={styles.sortWrapper} ref={sortRef}>
                                        <button
                                            className={`${styles.sortButton} ${sortOpen ? styles.sortButtonOpen : ""}`}
                                            onClick={() => setSortOpen((v) => !v)}
                                        >
                                            <FilterIcon />
                                            {SORT_LABELS[sortOption]}
                                            <span className={`${styles.sortChevron} ${sortOpen ? styles.open : ""}`}>
                                                <ChevronDown />
                                            </span>
                                        </button>
                                        {sortOpen && (
                                            <div className={styles.sortDropdown}>
                                                {(Object.keys(SORT_LABELS) as SortOption[]).map((key) => (
                                                    <button
                                                        key={key}
                                                        className={`${styles.sortOption} ${sortOption === key ? styles.sortOptionActive : ""}`}
                                                        onClick={() => {
                                                            setSortOption(key);
                                                            setSortOpen(false);
                                                        }}
                                                    >
                                                        {SORT_LABELS[key]}
                                                        {sortOption === key && (
                                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                                <polyline points="20 6 9 17 4 12" />
                                                            </svg>
                                                        )}
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                    <span className={styles.productCount}>
                                        {filteredProducts.length} product{filteredProducts.length !== 1 ? "s" : ""}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ═══ Main Content ═══ */}
                <div className="padding-global">
                    <div className="container-large">
                        <div className={styles.mainContent}>
                            {/* Sidebar */}
                            <aside className={`${styles.sidebar} ${sidebarOpen ? styles.sidebarVisible : ""}`}>
                                <div className={styles.sidebarHeader}>
                                    Filter:
                                    {hasActiveFilters && (
                                        <button className={styles.clearFilters} onClick={clearFilters}>
                                            Clear all
                                        </button>
                                    )}
                                </div>

                                <div className={styles.filterGroup}>
                                    <button
                                        className={styles.filterToggle}
                                        onClick={() => setTypeOpen(!typeOpen)}
                                    >
                                        Product type
                                        <span
                                            className={`${styles.filterChevron} ${typeOpen ? styles.open : ""}`}
                                        >
                                            <ChevronDown />
                                        </span>
                                    </button>

                                    {typeOpen && (
                                        <div className={styles.filterList}>
                                            {PRODUCT_TYPES.map((type) => (
                                                <label
                                                    key={type}
                                                    className={`${styles.filterRow} ${typeCounts[type] === 0 ? styles.filterRowDisabled : ""}`}
                                                >
                                                    <input
                                                        type="checkbox"
                                                        className={styles.filterCheckbox}
                                                        checked={checkedTypes.has(type)}
                                                        onChange={() => toggleType(type)}
                                                        disabled={typeCounts[type] === 0}
                                                    />
                                                    <span className={styles.filterLabel}>
                                                        {type}
                                                    </span>
                                                    <span className={styles.filterCount}>
                                                        {typeCounts[type]}
                                                    </span>
                                                </label>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </aside>

                            {/* Product Grid */}
                            <div className={styles.productGrid}>
                                {filteredProducts.length === 0 ? (
                                    <div className={styles.emptyState}>
                                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.35 }}>
                                            <circle cx="11" cy="11" r="8" />
                                            <line x1="21" y1="21" x2="16.65" y2="16.65" />
                                        </svg>
                                        <p className={styles.emptyTitle}>No products found</p>
                                        <p className={styles.emptyDesc}>Try adjusting your filters or category selection.</p>
                                        <button className={styles.emptyCta} onClick={clearFilters}>
                                            Clear all filters
                                        </button>
                                    </div>
                                ) : (
                                    filteredProducts.map((product) => (
                                        <div className={styles.productCard} key={product.name}>
                                            <button
                                                className={styles.wishlistBtn}
                                                aria-label="Add to wishlist"
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                <HeartIcon />
                                            </button>
                                            <Link href={product.href} style={{ textDecoration: 'none', color: 'inherit', display: 'flex', flexDirection: 'column', flex: 1 }}>
                                                <div className={styles.productImageWrap}>
                                                    <img
                                                        src={product.image}
                                                        alt={product.name}
                                                    />
                                                </div>
                                                <div className={styles.productInfo}>
                                                    <div className={styles.productName}>
                                                        {product.name}
                                                    </div>
                                                    {!product.hasDemoVideo && (
                                                        <span className={styles.noVideoBadge}>No demo video yet</span>
                                                    )}
                                                    <div className={styles.productDesc}>
                                                        {product.desc}
                                                    </div>
                                                </div>
                                            </Link>
                                            <div className={styles.productFooter}>
                                                <span className={styles.productPrice}>
                                                    {formatProductPriceDisplay({
                                                        price: product.price,
                                                        showZeroRupee: product.showZeroRupee,
                                                        priceRange: product.priceRange,
                                                    })}
                                                </span>
                                                <button
                                                    className={styles.addToCartBtn}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleAddToCart(product);
                                                    }}
                                                >
                                                    Add to Cart
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* ═══ Floating Chat Button ═══ */}
                <button className={styles.chatButton} aria-label="Chat with us">
                    <ChatBubbleIcon />
                    Chat
                </button>
            </div>
        </>
    );
}

"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { createClient } from "@/lib/supabase/client";
import styles from "./Navbar.module.css";
import type { User } from "@supabase/supabase-js";

interface NavbarProps {
    theme?: "default" | "light";
}

export default function Navbar({ theme = "default" }: NavbarProps) {
    const router = useRouter();
    const pathname = usePathname();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [userDropdownOpen, setUserDropdownOpen] = useState(false);
    const { totalItems } = useCart();
    const [user, setUser] = useState<User | null>(null);

    const supabase = createClient();

    useEffect(() => {
        if (!supabase) return;
        supabase.auth.getUser().then(({ data }) => setUser(data.user));
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            (_event, session) => setUser(session?.user ?? null),
        );
        return () => subscription.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleSignOut = async () => {
        if (!supabase) return;
        await supabase.auth.signOut();
        setUser(null);
        setUserDropdownOpen(false);
        router.refresh();
    };

    const displayName =
        user?.user_metadata?.full_name ||
        user?.email?.split("@")[0] ||
        "User";
    const displayEmail = user?.email || "";

    useEffect(() => {
        let ticking = false;
        const handleScroll = () => {
            if (!ticking) {
                ticking = true;
                requestAnimationFrame(() => {
                    setIsScrolled(window.scrollY > 100);
                    ticking = false;
                });
            }
        };
        handleScroll();
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [isMobileMenuOpen]);

    // Close drawer on route change
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [pathname]);

    const closeMenu = useCallback(() => setIsMobileMenuOpen(false), []);
    const openMenu = useCallback(() => setIsMobileMenuOpen(true), []);

    const drawerLinkClass = (href: string) => {
        const isActive = href === "/" ? pathname === "/" : pathname?.startsWith(href);
        return `${styles.drawerLink} ${isActive ? styles.drawerLinkActive : ""}`;
    };

    return (
        <div className={styles.navMaster}>
            {/* ── Desktop: Initial Navbar (at top, fades on scroll) ── */}
            <div className={`${styles.initialNav} ${isScrolled ? styles.fadeOut : ""} ${theme === "light" ? styles.lightTheme : ""}`}>
                <div className={styles.initialNavContent}>
                    <div
                        className={styles.dropdown}
                        onMouseEnter={() => setIsDropdownOpen(true)}
                        onMouseLeave={() => setIsDropdownOpen(false)}
                    >
                        <div className={styles.dropdownVisible}>
                            <div>More</div>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                className={styles.dropdownIcon}
                            >
                                <path
                                    d="M9.41002 7.30078H9.40002M14.6 7.30078H14.59M9.31002 12.0008H9.30002M14.6 12.0008H14.59M9.41002 16.7008H9.40002M14.6 16.7008H14.59"
                                    stroke="currentColor"
                                    strokeWidth="2.6"
                                    strokeLinecap="round"
                                />
                            </svg>
                        </div>
                        <div className={`${styles.dropdownInvisible} ${isDropdownOpen ? styles.open : ""}`}>
                            <Link href="/" className={styles.dropLink}>Home</Link>
                            <Link href="/products" className={styles.dropLink}>Products</Link>
                            <Link href="/about" className={styles.dropLink}>About</Link>
                            <Link href="/contact" className={styles.dropLink}>Contact</Link>
                        </div>
                    </div>

                    <Link href="/" className={styles.logoLink}>
                        <img src="/roboriselogo.svg" alt="RoboRise" className={styles.logo} />
                    </Link>

                    <div className={`${styles.initialRightGroup} hide-mobile-portrait`}>
                        <Link href="/cart" className={styles.cartLink} aria-label="Cart">
                            <BagIcon />
                            {totalItems > 0 && (
                                <span className={styles.cartBadge}>{totalItems > 9 ? "9+" : totalItems}</span>
                            )}
                        </Link>
                        {user ? (
                            <div
                                className={styles.userMenu}
                                onMouseEnter={() => setUserDropdownOpen(true)}
                                onMouseLeave={() => setUserDropdownOpen(false)}
                            >
                                <button className={styles.avatarBtn} aria-label="User menu">
                                    <UserIcon size={15} />
                                </button>
                                <div className={`${styles.userDropdown} ${userDropdownOpen ? styles.open : ""}`}>
                                    <div className={styles.userDropdownHeader}>
                                        <span className={styles.userDropdownName}>{displayName}</span>
                                        <span className={styles.userDropdownEmail}>{displayEmail}</span>
                                    </div>
                                    <Link href="/orders" className={styles.userDropdownLink}>My Orders</Link>
                                    <button className={styles.userDropdownBtn} onClick={handleSignOut}>Sign Out</button>
                                </div>
                            </div>
                        ) : (
                            <Link href="/login" className={styles.loginLink}>Sign In</Link>
                        )}
                        <span className={styles.navSeparator} />
                        <Link href="/products" className={styles.joinButton}>Shop</Link>
                    </div>
                </div>
            </div>

            {/* ── Desktop: Floating Navbar (on scroll) ── */}
            <nav className={`${styles.floatingNav} ${isScrolled ? styles.visible : ""}`}>
                <div className={styles.floatingNavContent}>
                    <Link href="/" className={styles.floatingLogoLink}>
                        <img src="/roboriselogoinvert.svg" alt="RoboRise" className={styles.floatingLogo} />
                    </Link>
                    <nav className={styles.navWrap}>
                        <div className={styles.navbarList}>
                            <Link href="/" className={styles.navLinks}>Home</Link>
                            <Link href="/products" className={styles.navLinks}>Products</Link>
                            <Link href="/about" className={styles.navLinks}>About</Link>
                            <Link href="/contact" className={styles.navLinks}>Contact</Link>
                        </div>
                    </nav>
                    <div className={`${styles.floatingRightGroup} hide-mobile-portrait`}>
                        <Link href="/cart" className={styles.floatingCartLink} aria-label="Cart">
                            <BagIcon />
                            {totalItems > 0 && (
                                <span className={`${styles.cartBadge} ${styles.cartBadgeLight}`}>{totalItems > 9 ? "9+" : totalItems}</span>
                            )}
                        </Link>
                        {user ? (
                            <div
                                className={styles.userMenu}
                                onMouseEnter={() => setUserDropdownOpen(true)}
                                onMouseLeave={() => setUserDropdownOpen(false)}
                            >
                                <button className={styles.avatarBtnDark} aria-label="User menu">
                                    <UserIcon size={15} />
                                </button>
                                <div className={`${styles.userDropdown} ${userDropdownOpen ? styles.open : ""}`}>
                                    <div className={styles.userDropdownHeader}>
                                        <span className={styles.userDropdownName}>{displayName}</span>
                                        <span className={styles.userDropdownEmail}>{displayEmail}</span>
                                    </div>
                                    <Link href="/orders" className={styles.userDropdownLink}>My Orders</Link>
                                    <button className={styles.userDropdownBtn} onClick={handleSignOut}>Sign Out</button>
                                </div>
                            </div>
                        ) : (
                            <Link href="/login" className={styles.floatingLoginLink}>Sign In</Link>
                        )}
                        <span className={styles.navSeparatorDark} />
                        <Link href="/products" className={styles.floatingJoinButton}>Shop</Link>
                    </div>
                </div>
            </nav>

            {/* ── Mobile: Drawer Overlay ── */}
            <div
                className={`${styles.mobileMenuOverlay} ${isMobileMenuOpen ? styles.open : ""}`}
                onClick={closeMenu}
                aria-hidden="true"
            />

            {/* ── Mobile: Slide-in Drawer ── */}
            <div className={`${styles.mobileMenuDrawer} ${isMobileMenuOpen ? styles.open : ""}`}>
                <div className={styles.drawerHeader}>
                    <img src="/roboriselogo.svg" alt="RoboRise" className={styles.drawerLogo} />
                    <button className={styles.drawerClose} onClick={closeMenu} aria-label="Close menu">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M18 6L6 18M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className={styles.drawerContent}>
                    {user ? (
                        <div className={styles.drawerUser}>
                            <div className={styles.drawerUserHeader}>
                                <div className={styles.drawerUserAvatar}>
                                    {displayName.charAt(0).toUpperCase()}
                                </div>
                                <div className={styles.drawerUserInfo}>
                                    <div className={styles.drawerUserName}>{displayName}</div>
                                    <div className={styles.drawerUserEmail}>{displayEmail}</div>
                                </div>
                            </div>
                            <div className={styles.drawerUserActions}>
                                <Link href="/orders" className={`${styles.drawerUserBtn} ${styles.drawerUserBtnPrimary}`}>
                                    My Orders
                                </Link>
                                <button
                                    className={`${styles.drawerUserBtn} ${styles.drawerUserBtnSecondary}`}
                                    onClick={handleSignOut}
                                >
                                    Sign Out
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className={styles.drawerUser}>
                            <div className={styles.drawerUserActions}>
                                <Link href="/login" className={`${styles.drawerUserBtn} ${styles.drawerUserBtnPrimary}`}>
                                    Sign In
                                </Link>
                                <Link href="/products" className={`${styles.drawerUserBtn} ${styles.drawerUserBtnSecondary}`}>
                                    Browse Shop
                                </Link>
                            </div>
                        </div>
                    )}

                    <div className={styles.drawerSection}>
                        <Link href="/" className={drawerLinkClass("/")}>
                            <HomeIcon /> Home
                        </Link>
                        <Link href="/products" className={drawerLinkClass("/products")}>
                            <ShopIcon /> Products
                        </Link>
                        <Link href="/about" className={drawerLinkClass("/about")}>
                            <InfoIcon /> About Us
                        </Link>
                        <Link href="/contact" className={drawerLinkClass("/contact")}>
                            <ContactIcon /> Contact
                        </Link>
                    </div>

                    <div className={styles.drawerSection}>
                        <div className={styles.drawerSectionTitle}>More</div>
                        <Link href="/help" className={drawerLinkClass("/help")}>
                            <HelpIcon /> Help Center
                        </Link>
                        <Link href="/cart" className={drawerLinkClass("/cart")}>
                            <CartDrawerIcon /> Cart
                            {totalItems > 0 && <span className={styles.drawerBadge}>{totalItems}</span>}
                        </Link>
                        {user && (
                            <Link href="/orders" className={drawerLinkClass("/orders")}>
                                <OrderIcon /> My Orders
                            </Link>
                        )}
                    </div>
                </div>
            </div>

            {/* ── Mobile: Bottom Navigation Bar ── */}
            <nav className={`${styles.bottomNav} ${isMobileMenuOpen ? styles.bottomNavHidden : ""}`}>
                <Link href="/" className={`${styles.bottomNavItem} ${pathname === "/" ? styles.active : ""}`}>
                    <span className={styles.bottomNavIcon}><HomeIcon /></span>
                    <span className={styles.bottomNavLabel}>Home</span>
                </Link>

                <Link href="/products" className={`${styles.bottomNavItem} ${pathname?.startsWith("/products") ? styles.active : ""}`}>
                    <span className={styles.bottomNavIcon}><ShopIcon /></span>
                    <span className={styles.bottomNavLabel}>Shop</span>
                </Link>

                <button className={styles.bottomNavItem} onClick={openMenu} aria-label="Open menu">
                    <span className={styles.bottomNavIcon}><MenuIcon /></span>
                    <span className={styles.bottomNavLabel}>Menu</span>
                </button>

                <Link href="/cart" className={`${styles.bottomNavItem} ${styles.bottomNavCart} ${pathname === "/cart" ? styles.active : ""}`}>
                    <span className={styles.bottomNavIcon}><BagIcon /></span>
                    <span className={styles.bottomNavLabel}>Cart</span>
                    {totalItems > 0 && (
                        <span className={styles.bottomNavBadge}>{totalItems > 9 ? "9+" : totalItems}</span>
                    )}
                </Link>

                {user ? (
                    <button className={styles.bottomNavItem} onClick={openMenu} aria-label="Account">
                        <span className={styles.bottomNavIcon}><UserIcon /></span>
                        <span className={styles.bottomNavLabel}>Account</span>
                    </button>
                ) : (
                    <Link href="/login" className={`${styles.bottomNavItem} ${pathname === "/login" ? styles.active : ""}`}>
                        <span className={styles.bottomNavIcon}><UserIcon /></span>
                        <span className={styles.bottomNavLabel}>Sign In</span>
                    </Link>
                )}
            </nav>
        </div>
    );
}

/* ── Icon components ── */
function UserIcon({ size = 24 }: { size?: number }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
        </svg>
    );
}

function BagIcon() {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3.97 9.47C4.13 8.63 4.85 8.01 5.7 8.01H18.3C19.15 8.01 19.87 8.63 20.03 9.47L21.17 15.47C21.52 17.33 20.1 19.01 18.2 19.01H5.8C3.9 19.01 2.48 17.33 2.83 15.47L3.97 9.47Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
            <path d="M8 8V7C8 4.79 9.79 3 12 3V3C14.21 3 16 4.79 16 7V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="9.5" cy="13.5" r="0.75" fill="currentColor" />
            <circle cx="14.5" cy="13.5" r="0.75" fill="currentColor" />
        </svg>
    );
}

function HomeIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
    );
}

function ShopIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <path d="M16 10a4 4 0 0 1-8 0" />
        </svg>
    );
}

function MenuIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="4" y1="12" x2="20" y2="12" />
            <line x1="4" y1="6" x2="20" y2="6" />
            <line x1="4" y1="18" x2="20" y2="18" />
        </svg>
    );
}

function InfoIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="16" x2="12" y2="12" />
            <line x1="12" y1="8" x2="12.01" y2="8" />
        </svg>
    );
}

function ContactIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
            <polyline points="22,6 12,13 2,6" />
        </svg>
    );
}

function HelpIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
    );
}

function CartDrawerIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="9" cy="21" r="1" />
            <circle cx="20" cy="21" r="1" />
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
        </svg>
    );
}

function OrderIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
            <polyline points="10 9 9 9 8 9" />
        </svg>
    );
}

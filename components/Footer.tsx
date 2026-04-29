"use client";

import Link from "next/link";
import styles from "./Footer.module.css";

const InstagramIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
        <path d="M13.3333 2.5C14.4384 2.5 15.4982 2.93899 16.2796 3.72039C17.061 4.50179 17.5 5.5616 17.5 6.66667V13.3333C17.5 14.4384 17.061 15.4982 16.2796 16.2796C15.4982 17.061 14.4384 17.5 13.3333 17.5H6.66667C5.5616 17.5 4.50179 17.061 3.72039 16.2796C2.93899 15.4982 2.5 14.4384 2.5 13.3333V6.66667C2.5 5.5616 2.93899 4.50179 3.72039 3.72039C4.50179 2.93899 5.5616 2.5 6.66667 2.5H13.3333ZM10 6.66667C9.11594 6.66667 8.2681 7.01786 7.64298 7.64298C7.01786 8.2681 6.66667 9.11594 6.66667 10C6.66667 10.8841 7.01786 11.7319 7.64298 12.357C8.2681 12.9821 9.11594 13.3333 10 13.3333C10.8841 13.3333 11.7319 12.9821 12.357 12.357C12.9821 11.7319 13.3333 10.8841 13.3333 10C13.3333 9.11594 12.9821 8.2681 12.357 7.64298C11.7319 7.01786 10.8841 6.66667 10 6.66667ZM10 8.33333C10.442 8.33333 10.866 8.50893 11.1785 8.82149C11.4911 9.13405 11.6667 9.55797 11.6667 10C11.6667 10.442 11.4911 10.866 11.1785 11.1785C10.866 11.4911 10.442 11.6667 10 11.6667C9.55797 11.6667 9.13405 11.4911 8.82149 11.1785C8.50893 10.866 8.33333 10.442 8.33333 10C8.33333 9.55797 8.50893 9.13405 8.82149 8.82149C9.13405 8.50893 9.55797 8.33333 10 8.33333ZM13.75 5.41667C13.529 5.41667 13.317 5.50446 13.1607 5.66074C13.0045 5.81702 12.9167 6.02899 12.9167 6.25C12.9167 6.47101 13.0045 6.68298 13.1607 6.83926C13.317 6.99554 13.529 7.08333 13.75 7.08333C13.971 7.08333 14.183 6.99554 14.3393 6.83926C14.4955 6.68298 14.5833 6.47101 14.5833 6.25C14.5833 6.02899 14.4955 5.81702 14.3393 5.66074C14.183 5.50446 13.971 5.41667 13.75 5.41667Z" />
    </svg>
);

const FacebookIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
        <path d="M18.3327 9.99984C18.3327 5.39984 14.5993 1.6665 9.99935 1.6665C5.39935 1.6665 1.66602 5.39984 1.66602 9.99984C1.66602 14.0332 4.53268 17.3915 8.33268 18.1665V12.4998H6.66602V9.99984H8.33268V7.9165C8.33268 6.30817 9.64102 4.99984 11.2493 4.99984H13.3327V7.49984H11.666C11.2077 7.49984 10.8327 7.87484 10.8327 8.33317V9.99984H13.3327V12.4998H10.8327V18.2915C15.041 17.8748 18.3327 14.3248 18.3327 9.99984Z" />
    </svg>
);

const LinkedInIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
        <path d="M14.4192 1.875H5.58083C4.59799 1.875 3.65539 2.26543 2.96041 2.96041C2.26543 3.65539 1.875 4.59799 1.875 5.58083V14.4192C1.875 15.402 2.26543 16.3446 2.96041 17.0396C3.65539 17.7346 4.59799 18.125 5.58083 18.125H14.4192C15.402 18.125 16.3446 17.7346 17.0396 17.0396C17.7346 16.3446 18.125 15.402 18.125 14.4192V5.58083C18.125 4.59799 17.7346 3.65539 17.0396 2.96041C16.3446 2.26543 15.402 1.875 14.4192 1.875ZM7.36917 14.9933C7.37178 15.0387 7.36509 15.0841 7.34951 15.1268C7.33394 15.1695 7.3098 15.2085 7.27858 15.2415C7.24736 15.2745 7.20973 15.3008 7.16798 15.3188C7.12624 15.3367 7.08127 15.3459 7.03583 15.3458H5.5525C5.46305 15.3437 5.37802 15.3065 5.31569 15.2423C5.25336 15.1781 5.2187 15.092 5.21917 15.0025V8.83333C5.21794 8.78879 5.22566 8.74446 5.24186 8.70296C5.25806 8.66145 5.28242 8.62361 5.3135 8.59168C5.34457 8.55975 5.38173 8.53438 5.42279 8.51705C5.46384 8.49973 5.50794 8.49082 5.5525 8.49083H7.03583C7.08039 8.49082 7.1245 8.49973 7.16555 8.51705C7.2066 8.53438 7.24376 8.55975 7.27484 8.59168C7.30591 8.62361 7.33027 8.66145 7.34647 8.70296C7.36268 8.74446 7.37039 8.78879 7.36917 8.83333V14.9933ZM6.26667 7.19333C6.10607 7.19213 5.94728 7.15931 5.79937 7.09674C5.65146 7.03417 5.51733 6.94308 5.40462 6.82867C5.29191 6.71426 5.20284 6.57877 5.1425 6.42994C5.08215 6.28111 5.05171 6.12185 5.05292 5.96125C5.05412 5.80065 5.08694 5.64187 5.14951 5.49396C5.21208 5.34605 5.30317 5.21191 5.41758 5.0992C5.53199 4.98649 5.66748 4.89743 5.81631 4.83708C5.96514 4.77674 6.1244 4.7463 6.285 4.7475C6.60376 4.75787 6.90586 4.8924 7.12682 5.12238C7.34778 5.35237 7.47012 5.6596 7.46773 5.97852C7.46534 6.29745 7.3384 6.60281 7.11402 6.82946C6.88963 7.0561 6.58555 7.18608 6.26667 7.19167M15.2808 14.9833C15.2804 15.0675 15.2474 15.1483 15.1886 15.2086C15.1299 15.2689 15.05 15.3041 14.9658 15.3067H13.4C13.3157 15.3041 13.2357 15.2688 13.1769 15.2083C13.1181 15.1478 13.0852 15.0668 13.085 14.9825V12.1292C13.085 11.7033 13.215 10.2767 11.955 10.2767C10.9725 10.2767 10.7783 11.2767 10.7408 11.7217V15.0475C10.7409 15.132 10.708 15.2132 10.6492 15.2738C10.5904 15.3345 10.5103 15.3699 10.4258 15.3725H8.90667C8.82062 15.3723 8.73816 15.3379 8.67739 15.277C8.61663 15.2161 8.5825 15.1336 8.5825 15.0475V8.80333C8.5851 8.71888 8.62048 8.63876 8.68115 8.57996C8.74182 8.52116 8.82301 8.48829 8.9075 8.48833H10.4258C10.5103 8.48829 10.5915 8.52116 10.6522 8.57996C10.7128 8.63876 10.7482 8.71888 10.7508 8.80333V9.34083C10.9725 9.01635 11.2786 8.75855 11.6361 8.59525C11.9935 8.43195 12.3887 8.36933 12.7792 8.41417C15.3083 8.41417 15.2992 10.7767 15.2992 12.12L15.2808 14.9833Z" />
    </svg>
);

const TwitterIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
        <path d="M8.74065 12.2092L12.709 17.5H18.5423L11.994 8.76833L17.4423 2.5H15.234L10.9698 7.405L7.29232 2.5H1.45898L7.71732 10.8458L1.93398 17.5H4.14232L8.74065 12.2092ZM13.5423 15.8333L4.79232 4.16667H6.45898L15.209 15.8333H13.5423Z" />
    </svg>
);

const footerLinks = {
    company: [
        { label: "Home", href: "/" },
        { label: "Products", href: "/products" },
        { label: "About", href: "/about" },
        { label: "Contact", href: "/contact" },
    ],
    products: [
        { label: "MT4 Edu Kit", href: "/products/mt4-edu-kit" },
        { label: "Mirobot Professional Kit", href: "/products/mirobot-professional-kit" },
        { label: "Haro380 Core Kit", href: "/products/haro380-core-kit" },
        { label: "Mirobot Advanced Kit", href: "/products/mirobot-advanced-kit" },
    ],
    support: [
        { label: "Contact", href: "/contact" },
        { label: "Help Center", href: "/help" },
        { label: "Privacy Policy", href: "/privacy" },
        { label: "Terms of Service", href: "/terms" },
    ],
};

export default function Footer() {

    return (
        <footer className={styles.sectionFooter}>
            <div className="padding-global padding-section-medium">
                <div className="container-large">
                    <div className={styles.footerContent}>
                        {/* Main Footer Content */}
                        <div className={styles.footerMain}>
                            {/* Left Side - Brand */}
                            <div className={styles.footerLeftWrap}>
                                <div className={styles.footerBrand}>
                                    <img
                                        src="/roboriselogoinvert.svg"
                                        alt="RoboRise"
                                        className={styles.brandLogo}
                                    />
                                    <p className={styles.brandDescription}>
                                        Empowering the next generation of innovators through hands-on robotics and STEM education.
                                    </p>
                                </div>
                            </div>

                            {/* Right Side - Link Columns */}
                            <div className={styles.footerRight}>
                                <div className={styles.linkColumn}>
                                    <span className={styles.columnTitle}>Quick Links</span>
                                    <div className={styles.linkList}>
                                        {footerLinks.company.map((link) => (
                                            <Link key={link.label} href={link.href} className={styles.footerLink}>
                                                {link.label}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                                <div className={styles.linkColumn}>
                                    <span className={styles.columnTitle}>Products</span>
                                    <div className={styles.linkList}>
                                        {footerLinks.products.map((link) => (
                                            <Link key={link.label} href={link.href} className={styles.footerLink}>
                                                {link.label}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                                <div className={styles.linkColumn}>
                                    <span className={styles.columnTitle}>Support</span>
                                    <div className={styles.linkList}>
                                        {footerLinks.support.map((link) => (
                                            <Link key={link.label} href={link.href} className={styles.footerLink}>
                                                {link.label}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Bottom Bar */}
                        <div className={styles.footerBottom}>
                            <p className={styles.copyright}>
                                © 2026 RoboRise. All rights reserved.
                            </p>
                            <div className={styles.socialLinks}>
                                <a href="#" className={styles.socialLink} aria-label="Instagram">
                                    <InstagramIcon />
                                </a>
                                <a href="#" className={styles.socialLink} aria-label="Facebook">
                                    <FacebookIcon />
                                </a>
                                <a href="#" className={styles.socialLink} aria-label="LinkedIn">
                                    <LinkedInIcon />
                                </a>
                                <a href="#" className={styles.socialLink} aria-label="Twitter">
                                    <TwitterIcon />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

"use client";

interface ScrollAnimationProps {
    children: React.ReactNode;
    className?: string;
    delay?: number;
}

export default function ScrollAnimation({
    children,
    className = "",
}: ScrollAnimationProps) {
    return <div className={className}>{children}</div>;
}

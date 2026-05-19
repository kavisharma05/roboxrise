import type { MetadataRoute } from "next";
import { allProducts } from "@/lib/product-data";

const BASE_URL = "https://roboxrise.in";

export default function sitemap(): MetadataRoute.Sitemap {
    const staticRoutes = [
        { route: "", priority: 1.0, freq: "weekly" as const },
        { route: "/products", priority: 0.9, freq: "weekly" as const },
        { route: "/contact", priority: 0.7, freq: "monthly" as const },
        { route: "/about", priority: 0.6, freq: "monthly" as const },
        { route: "/help", priority: 0.5, freq: "monthly" as const },
        { route: "/privacy", priority: 0.2, freq: "yearly" as const },
        { route: "/terms", priority: 0.2, freq: "yearly" as const },
    ].map(({ route, priority, freq }) => ({
        url: `${BASE_URL}${route}`,
        lastModified: new Date(),
        changeFrequency: freq,
        priority,
    }));

    // Exclude zero-price (contact-for-quote) products from sitemap
    const productRoutes = allProducts
        .filter((product) => product.price > 0 || product.showZeroRupee)
        .map((product) => ({
            url: `${BASE_URL}/products/${product.slug}`,
            lastModified: new Date(),
            changeFrequency: "weekly" as const,
            priority: 0.8,
        }));

    return [...staticRoutes, ...productRoutes];
}

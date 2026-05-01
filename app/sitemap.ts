import type { MetadataRoute } from "next";
import { allProducts } from "@/lib/product-data";

const BASE_URL = "https://roboxrise.in";

export default function sitemap(): MetadataRoute.Sitemap {
    const staticRoutes = [
        "",
        "/about",
        "/products",
        "/contact",
        "/help",
        "/privacy",
        "/terms",
        "/cart",
        "/buy-now",
        "/login",
    ].map((route) => ({
        url: `${BASE_URL}${route}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: route === "" ? 1 : 0.7,
    }));

    const productRoutes = allProducts.map((product) => ({
        url: `${BASE_URL}/products/${product.slug}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.8,
    }));

    return [...staticRoutes, ...productRoutes];
}

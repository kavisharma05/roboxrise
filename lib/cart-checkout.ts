import type { CartItem } from "@/context/CartContext";
import { getProductBySlug, type Product } from "@/lib/product-data";

/**
 * Resolve catalog product for a cart line. If the slug is missing from the catalog
 * (stale cart), build a minimal Product from the cart snapshot so checkout UI matches the cart.
 */
export function productForCartLine(ci: CartItem): Product {
  const fromCatalog = getProductBySlug(ci.id);
  if (fromCatalog) {
    return {
      ...fromCatalog,
      price: ci.price,
      originalPrice: ci.originalPrice ?? fromCatalog.originalPrice,
    };
  }
  return {
    slug: ci.id,
    name: ci.name,
    category: "Catalog",
    subcategory: "Cart",
    sku: `CART-${ci.id.replace(/[^a-zA-Z0-9-]/g, "").slice(0, 24) || "item"}`,
    price: ci.price,
    originalPrice: ci.originalPrice,
    priceRange: ci.priceRange,
    currency: "INR",
    stock: 99,
    rating: 0,
    reviewCount: 0,
    images: [{ src: ci.image, alt: ci.name }],
    usps: [],
    emiText: "",
    descriptionHtml: "",
    specifications: [],
    inTheBox: [],
    reviews: [],
    faqs: [],
  };
}

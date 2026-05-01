import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Skeleton } from "@/components/BoneyardSkeleton";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { allProducts, getProductBySlug } from "@/lib/product-data";

const ProductDetailPage = dynamic(
  () => import("@/components/pdp/ProductDetailPage"),
  { ssr: true },
);

export function generateStaticParams() {
  /* Pre-render all known product pages at build time */
  return allProducts.map((p) => ({ slug: p.slug }));
}

/* Allow pages with unknown slugs to be rendered on-demand */
export const dynamicParams = true;

interface PageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const product = getProductBySlug(params.slug) ?? allProducts[0];

  return {
    title: `${product.name} | RoboxRise`,
    description: product.usps.slice(0, 3).join(". ") + ".",
    openGraph: {
      title: product.name,
      description: product.usps.slice(0, 3).join(". ") + ".",
      type: "website",
      images: [{ url: product.images[0].src, alt: product.images[0].alt }],
    },
    alternates: {
      canonical: `/products/${product.slug}`,
    },
  };
}

export default function ProductPage({ params }: PageProps) {
  const product = getProductBySlug(params.slug) ?? allProducts[0];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: product.images.map((img: { src: string }) => img.src),
    description: product.usps.join(". "),
    sku: product.sku,
    brand: { "@type": "Brand", name: "RoboxRise" },
    offers: {
      "@type": "Offer",
      url: `https://roborise.com/products/${product.slug}`,
      priceCurrency: product.currency,
      price: product.price,
      availability:
        product.stock > 0
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
      itemCondition: "https://schema.org/NewCondition",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      reviewCount: product.reviewCount,
      bestRating: 5,
      worstRating: 1,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar theme="light" />
      <main>
        <Skeleton name="product-detail" loading={false}>
          <ProductDetailPage product={product} />
        </Skeleton>
      </main>
      <Footer />
    </>
  );
}

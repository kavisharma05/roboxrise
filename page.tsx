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
  const productKeywords = [
    product.name,
    product.category,
    product.subcategory,
    "robotic arm india",
    "ROS2 robot kit",
    "educational robot",
  ];

  const metaDescription = (product as any).shortDescription || (product as any).description?.split('.')[0] || product.usps.slice(0, 3).join(". ") + ".";

  return {
    // Use just the product name — layout template appends "| RoboxRise"
    title: product.name,
    description: metaDescription,
    keywords: productKeywords,
    alternates: {
      canonical: `https://roboxrise.in/products/${product.slug}`,
    },
    openGraph: {
      title: `${product.name} | RoboxRise`,
      description: metaDescription,
      type: "website",
      url: `https://roboxrise.in/products/${product.slug}`,
      images: [{ url: product.images[0].src, alt: product.images[0].alt }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} | RoboxRise`,
      description: metaDescription,
      images: [product.images[0].src],
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
      url: `https://roboxrise.in/products/${product.slug}`,
      priceCurrency: product.currency,
      price: product.price,
      availability:
        product.stock > 0
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
      itemCondition: "https://schema.org/NewCondition",
      seller: { "@type": "Organization", name: "RoboxRise" },
    },
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://roboxrise.in/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Products",
        item: "https://roboxrise.in/products",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: product.name,
        item: `https://roboxrise.in/products/${product.slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
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

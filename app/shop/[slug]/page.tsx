import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { products, getProduct, brand, formatINR } from "@/data/content";
import ProductDetail from "@/components/shop/ProductDetail";
import RelatedProducts from "@/components/shop/RelatedProducts";

type Params = { params: { slug: string } };

// Pre-render every product page at build time.
export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: Params): Metadata {
  const product = getProduct(params.slug);
  if (!product) return { title: "Product not found" };
  return {
    title: product.name,
    description: product.shortDescription,
    openGraph: {
      title: `${product.name} · ${brand.name}`,
      description: product.shortDescription,
      images: [{ url: product.images[0] }],
    },
  };
}

export default function ProductPage({ params }: Params) {
  const product = getProduct(params.slug);
  if (!product) notFound();

  // Product JSON-LD for rich results.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.shortDescription,
    image: product.images.map((i) => `${brand.url}${i}`),
    brand: { "@type": "Brand", name: brand.name },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      reviewCount: product.reviews,
    },
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
      url: `${brand.url}/shop/${product.slug}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* breadcrumb */}
      <div className="border-b border-navy/10 bg-cream pt-24">
        <nav className="container-st flex items-center gap-1.5 py-4 text-sm text-mist">
          <Link href="/" className="hover:text-navy">
            Home
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <Link href="/shop" className="hover:text-navy">
            Shop
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-ink">{product.name}</span>
          <span className="ml-auto hidden font-medium text-navy sm:inline">
            {formatINR(product.price)}
          </span>
        </nav>
      </div>

      <ProductDetail product={product} />
      <RelatedProducts current={product} />
    </>
  );
}

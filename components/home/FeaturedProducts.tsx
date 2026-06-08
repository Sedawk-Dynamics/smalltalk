"use client";

/** Featured Tees & Polos grid with hover effects + quick view. */
import { useState } from "react";
import type { Product } from "@/data/content";
import { featuredProducts } from "@/data/content";
import ProductCard from "@/components/shop/ProductCard";
import QuickView from "@/components/shop/QuickView";
import SectionHeading from "@/components/ui/SectionHeading";
import MagneticButton from "@/components/ui/MagneticButton";
import { RevealItem, RevealStagger } from "@/components/ui/Reveal";

export default function FeaturedProducts() {
  const [quick, setQuick] = useState<Product | null>(null);

  return (
    <section className="container-st py-14 lg:py-20">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHeading
          eyebrow="The essentials"
          title="Featured Tees & Polos"
          highlight={[1]}
          intro="Start with the staples everyone reaches for — reimagined in premium fabric, priced honestly."
        />
        <div className="hidden sm:block">
          <MagneticButton href="/shop" variant="secondary">
            View All
          </MagneticButton>
        </div>
      </div>

      <RevealStagger
        className="mt-12 grid grid-cols-2 gap-x-5 gap-y-10 lg:grid-cols-4"
        gap={0.08}
      >
        {featuredProducts.map((p) => (
          <RevealItem key={p.slug}>
            <ProductCard product={p} onQuickView={setQuick} />
          </RevealItem>
        ))}
      </RevealStagger>

      <div className="mt-10 flex justify-center sm:hidden">
        <MagneticButton href="/shop" variant="secondary">
          View All Products
        </MagneticButton>
      </div>

      <QuickView product={quick} onClose={() => setQuick(null)} />
    </section>
  );
}

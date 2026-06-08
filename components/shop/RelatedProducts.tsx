"use client";

/** "You may also like" — products in the same category, excluding current. */
import { useState } from "react";
import type { Product } from "@/data/content";
import { products } from "@/data/content";
import ProductCard from "./ProductCard";
import QuickView from "./QuickView";
import { RevealItem, RevealStagger } from "@/components/ui/Reveal";

export default function RelatedProducts({ current }: { current: Product }) {
  const [quick, setQuick] = useState<Product | null>(null);
  const related = products
    .filter((p) => p.slug !== current.slug && p.category === current.category)
    .concat(products.filter((p) => p.category !== current.category))
    .slice(0, 4);

  return (
    <section className="container-st border-t border-navy/10 py-16 lg:py-24">
      <h2 className="font-display text-2xl font-bold tracking-tighter text-ink sm:text-3xl">
        You may also like
      </h2>
      <RevealStagger
        className="mt-8 grid grid-cols-2 gap-x-5 gap-y-10 lg:grid-cols-4"
        gap={0.06}
      >
        {related.map((p) => (
          <RevealItem key={p.slug}>
            <ProductCard product={p} onQuickView={setQuick} />
          </RevealItem>
        ))}
      </RevealStagger>
      <QuickView product={quick} onClose={() => setQuick(null)} />
    </section>
  );
}

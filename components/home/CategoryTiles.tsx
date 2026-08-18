"use client";

/**
 * "Shop by Category" — compact pill links (client: no big banner tiles).
 * Each pill deep-links into the matching WooCommerce product category.
 */
import { categories } from "@/data/content";
import SectionHeading from "@/components/ui/SectionHeading";
import { RevealItem, RevealStagger } from "@/components/ui/Reveal";

export default function CategoryTiles() {
  return (
    <section className="relative py-12 lg:py-16">
      <div className="container-st relative">
        <SectionHeading
          align="center"
          eyebrow="Find your fit"
          title="Shop by category."
          highlight={[2]}
          className="mx-auto"
        />

        <RevealStagger
          className="mx-auto mt-8 flex max-w-3xl flex-wrap justify-center gap-3"
          gap={0.06}
        >
          {categories.map((c) => (
            <RevealItem key={c.name}>
              <a
                href={c.href}
                className="inline-flex items-center rounded-full border border-navy/15 bg-white/60 px-6 py-3 font-display text-base font-semibold text-ink transition-all duration-300 hover:-translate-y-0.5 hover:border-navy hover:bg-navy hover:text-white hover:shadow-card"
              >
                {c.name}
              </a>
            </RevealItem>
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}

"use client";

/**
 * "Shop by Category" — circular image tiles (Nobero / Souled Store pattern),
 * with hover scale + animated ring glow and staggered scroll reveal.
 */
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { categories } from "@/data/content";
import SmartImage from "@/components/ui/SmartImage";
import SectionHeading from "@/components/ui/SectionHeading";
import Aurora from "@/components/ui/Aurora";
import { RevealItem, RevealStagger } from "@/components/ui/Reveal";

export default function CategoryTiles() {
  return (
    <section className="relative py-12 lg:py-16">
      <Aurora />
      <div className="container-st relative">
      <SectionHeading
        align="center"
        eyebrow="Find your fit"
        title="Shop by category."
        highlight={[2]}
        className="mx-auto"
      />

      <RevealStagger
        className="mt-12 grid grid-cols-2 gap-6 sm:gap-8 md:grid-cols-4"
        gap={0.08}
      >
        {categories.map((c) => (
          <RevealItem key={c.name}>
            <Link href={c.href} className="group flex flex-col items-center">
              <div className="relative aspect-square w-full max-w-[220px] overflow-hidden rounded-full">
                {/* animated ring */}
                <span className="absolute inset-0 z-10 rounded-full ring-2 ring-transparent transition-all duration-500 group-hover:ring-glow group-hover:ring-offset-4 group-hover:ring-offset-cream" />
                <span className="absolute -inset-2 z-0 rounded-full bg-glow/0 blur-2xl transition-all duration-500 group-hover:bg-glow/30" />
                <div className="relative h-full w-full overflow-hidden rounded-full bg-cream">
                  <SmartImage
                    src={c.photo}
                    fallbackSrc={c.image}
                    alt={c.name}
                    sizes="220px"
                    className="transition-transform duration-700 group-hover:scale-110"
                  />
                  <span className="absolute inset-0 bg-navy/0 transition-colors duration-500 group-hover:bg-navy/20" />
                  <span className="absolute bottom-4 right-4 flex h-9 w-9 translate-y-3 items-center justify-center rounded-full bg-white text-navy opacity-0 shadow-card transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>
              </div>
              <h3 className="mt-5 font-display text-lg font-bold text-ink transition-colors group-hover:text-navy">
                {c.name}
              </h3>
              <p className="text-sm text-mist">{c.blurb}</p>
            </Link>
          </RevealItem>
        ))}
      </RevealStagger>
      </div>
    </section>
  );
}

"use client";

/**
 * Variation B collections — an offset mosaic (alternating vertical shift)
 * with hover zoom + reveal, distinct from Variation A's even bento grid.
 */
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { collections } from "@/data/content";
import SmartImage from "@/components/ui/SmartImage";
import SectionHeading from "@/components/ui/SectionHeading";
import { ClipReveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

export default function CollectionMosaic() {
  return (
    <section className="container-st py-16 lg:py-24">
      <SectionHeading
        eyebrow="Curated edits"
        title="Shop the collections."
        highlight={[2]}
      />

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {collections.map((c, i) => (
          <ClipReveal
            key={c.title}
            delay={i * 0.08}
            className={cn(
              "group",
              // offset every other column downward for the mosaic feel
              i % 2 === 1 ? "lg:mt-12" : ""
            )}
          >
            <Link
              href={c.href}
              className="relative block aspect-[3/4] overflow-hidden rounded-[1.75rem] bg-cream"
            >
              <SmartImage
                src={c.photo}
                fallbackSrc={c.image}
                alt={c.title}
                sizes="(max-width:1024px) 50vw, 25vw"
                className="transition-transform duration-[1.1s] group-hover:scale-110"
              />
              <span className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5">
                <span className="text-[11px] font-semibold uppercase tracking-widest text-cyan">
                  0{i + 1}
                </span>
                <h3 className="mt-1 font-display text-xl font-bold text-white">
                  {c.title}
                </h3>
                <span className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-white/80 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  Explore <ArrowUpRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          </ClipReveal>
        ))}
      </div>
    </section>
  );
}

"use client";

/**
 * Editorial collection bento grid (The Minimal Closet pattern):
 * asymmetric image blocks with clip-reveal, hover zoom + parallax overlay text.
 */
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { collections } from "@/data/content";
import SmartImage from "@/components/ui/SmartImage";
import SectionHeading from "@/components/ui/SectionHeading";
import Aurora from "@/components/ui/Aurora";
import { ClipReveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

export default function CollectionGrid() {
  return (
    <section className="relative py-14 lg:py-20">
      <Aurora />
      <div className="container-st relative">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHeading
          eyebrow="Curated edits"
          title="Shop the collections."
          highlight={[2]}
        />
        <Link
          href="/shop"
          className="hidden items-center gap-1.5 text-sm font-semibold text-navy underline-offset-4 hover:underline sm:flex"
        >
          View everything <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="mt-12 grid auto-rows-[220px] grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4 lg:auto-rows-[260px]">
        {collections.map((c, i) => (
          <ClipReveal
            key={c.title}
            delay={i * 0.08}
            className={cn("group relative", c.span)}
          >
            <Link
              href={c.href}
              className="relative block h-full w-full overflow-hidden rounded-3xl bg-cream"
            >
              <SmartImage
                src={c.photo}
                fallbackSrc={c.image}
                alt={c.title}
                sizes="(max-width:1024px) 50vw, 50vw"
                className="transition-transform duration-[1.1s] ease-out group-hover:scale-110"
              />
              {/* gradient scrim */}
              <span className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/15 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6">
                <h3 className="font-display text-2xl font-bold text-white transition-transform duration-500 group-hover:-translate-y-1">
                  {c.title}
                </h3>
                <p className="mt-1 max-w-[26ch] text-sm text-white/75">
                  {c.caption}
                </p>
                <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-cyan opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  Explore <ArrowUpRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          </ClipReveal>
        ))}
      </div>
      </div>
    </section>
  );
}

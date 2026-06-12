"use client";

/**
 * Variation B hero — an asymmetric "bento" grid on a light canvas:
 * a big typographic headline tile, a tall lifestyle image, a category
 * quick-pick tile, a promo tile and a count-up stat tile.
 * Interactive: kinetic headline, image zoom, magnetic CTA, count-up.
 */
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { hero, media, categories } from "@/data/content";
import SmartImage from "@/components/ui/SmartImage";
import SplitText from "@/components/ui/SplitText";
import MagneticButton from "@/components/ui/MagneticButton";
import { TeeMotif } from "@/components/ui/Logo";
import { useCountUp } from "@/lib/hooks";
import { Reveal } from "@/components/ui/Reveal";

function StatTile() {
  const { ref, value } = useCountUp(100);
  return (
    <div className="relative flex flex-col justify-between overflow-hidden rounded-3xl bg-navy p-6 text-white">
      <TeeMotif className="absolute -right-4 -top-4 h-20 w-20 text-white/10" />
      <p className="text-xs font-semibold uppercase tracking-widest text-cyan">
        Premium
      </p>
      <p className="font-display text-5xl font-bold">
        <span ref={ref}>{value}</span>
        <span className="text-cyan">%</span>
      </p>
      <p className="text-sm text-white/60">Cotton, every piece</p>
    </div>
  );
}

export default function HeroBento() {
  return (
    <section className="container-st pb-6 pt-24 lg:pt-28">
      <div className="grid gap-4 lg:grid-cols-4 lg:grid-rows-2">
        {/* Headline tile */}
        <div className="card-glow relative flex flex-col justify-between overflow-hidden rounded-[2rem] border border-navy/10 bg-white p-8 sm:p-10 lg:col-span-2 lg:row-span-2">
          <div>
            <span className="chip mb-6">
              <span className="h-1.5 w-1.5 rounded-full bg-current shadow-[0_0_8px_currentColor]" />
              New season · Tees & Polos
            </span>
            <h1 className="font-display text-[2.5rem] font-bold leading-[0.98] tracking-tightest text-ink sm:text-6xl lg:text-[4.2rem]">
              <SplitText
                text="Wear confidence. Look like you mean business."
                highlight={[1, 6]}
                highlightClass="text-gradient-ink"
                stagger={0.05}
              />
            </h1>
            <Reveal delay={0.5}>
              <p className="mt-6 max-w-md text-base leading-relaxed text-mist sm:text-lg">
                {hero.longSub}
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.7}>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <MagneticButton href="/shop" variant="primary">
                Shop the Collection
              </MagneticButton>
              <MagneticButton href="/about" variant="secondary">
                Our Story
              </MagneticButton>
            </div>
          </Reveal>
          {/* decorative motif */}
          <TeeMotif className="pointer-events-none absolute -bottom-8 -right-6 h-44 w-44 text-navy/[0.04]" />
        </div>

        {/* Tall lifestyle image */}
        <Link
          href="/shop"
          className="group relative min-h-[280px] overflow-hidden rounded-[2rem] lg:col-span-1 lg:row-span-2"
        >
          <SmartImage
            src={media.heroPhoto}
            fallbackSrc={media.heroFallback}
            alt="The Small Talk Store premium apparel"
            priority
            sizes="(max-width:1024px) 100vw, 25vw"
            className="transition-transform duration-[1.2s] group-hover:scale-110"
          />
          <span className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
          <span className="absolute bottom-5 left-5 right-5 flex items-center justify-between text-white">
            <span>
              <span className="block font-display text-lg font-bold">
                The Edit
              </span>
              <span className="text-sm text-white/70">Shop bestsellers</span>
            </span>
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-navy transition-transform group-hover:rotate-45">
              <ArrowUpRight className="h-5 w-5" />
            </span>
          </span>
        </Link>

        {/* Category quick-pick */}
        <div className="rounded-[2rem] border border-navy/10 bg-cream p-6 lg:col-span-1">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-mist">
            Shop by category
          </p>
          <ul className="space-y-1">
            {categories.slice(0, 4).map((c) => (
              <li key={c.name}>
                <Link
                  href={c.href}
                  className="group flex items-center justify-between rounded-xl px-2 py-2 text-ink transition-colors hover:bg-white"
                >
                  <span className="font-medium">{c.name}</span>
                  <ArrowRight className="h-4 w-4 -translate-x-1 text-glow opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Stat tile */}
        <StatTile />
      </div>
    </section>
  );
}

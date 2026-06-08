"use client";

/**
 * "Trending Now" — a drag/snap horizontal product rail (Souled Store / Nobero
 * pattern) powered by Embla with free-drag + arrow controls. Each card reuses
 * the tilt/hover ProductCard and shares one QuickView modal.
 */
import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useCallback, useState } from "react";
import type { Product } from "@/data/content";
import { products } from "@/data/content";
import ProductCard from "@/components/shop/ProductCard";
import QuickView from "@/components/shop/QuickView";
import SectionHeading from "@/components/ui/SectionHeading";
import MagneticButton from "@/components/ui/MagneticButton";

export default function TrendingRail() {
  // Sort by rating to fake a "trending" ordering.
  const rail = [...products].sort((a, b) => b.rating - a.rating);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    dragFree: true,
    containScroll: "trimSnaps",
  });
  const [quick, setQuick] = useState<Product | null>(null);

  const prev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const next = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <section className="relative overflow-hidden bg-ink py-14 text-white lg:py-20">
      <div className="container-st">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="🔥 Hot right now"
            title="Trending now."
            highlight={[1]}
            light
          />
          <div className="flex gap-2">
            <button
              onClick={prev}
              aria-label="Scroll left"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white transition hover:bg-white hover:text-navy"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <button
              onClick={next}
              aria-label="Scroll right"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white transition hover:bg-white hover:text-navy"
            >
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Rail — overflows the container intentionally for an editorial feel */}
      <div className="mt-10 cursor-grab overflow-hidden active:cursor-grabbing" ref={emblaRef}>
        <div className="flex gap-5 pl-5 pr-5 sm:pl-8 lg:pl-12">
          {rail.map((p) => (
            <div
              key={p.slug}
              className="min-w-0 shrink-0 basis-[68%] sm:basis-[40%] lg:basis-[23%]"
            >
              {/* light card surface on the dark rail */}
              <div className="rounded-3xl bg-cream/95 p-2.5 text-ink">
                <ProductCard product={p} onQuickView={setQuick} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="container-st mt-10 flex justify-center">
        <MagneticButton href="/shop" variant="light">
          Shop All Bestsellers
        </MagneticButton>
      </div>

      <QuickView product={quick} onClose={() => setQuick(null)} />
    </section>
  );
}

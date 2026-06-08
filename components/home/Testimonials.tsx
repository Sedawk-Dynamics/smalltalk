"use client";

/**
 * Testimonial slider (Embla) with autoplay.
 * ⚠️ Quotes are PLACEHOLDERS — replace in data/content.ts.
 */
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ArrowLeft, ArrowRight, Quote, Star } from "lucide-react";
import { useCallback } from "react";
import { testimonials } from "@/data/content";
import SectionHeading from "@/components/ui/SectionHeading";

export default function Testimonials() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start" },
    [Autoplay({ delay: 4500, stopOnInteraction: false })]
  );

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <section className="bg-cream py-16 lg:py-24">
      <div className="container-st">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Loved by customers"
            title="Real confidence, real reviews."
            highlight={[1]}
          />
          <div className="flex gap-2">
            <button
              onClick={scrollPrev}
              aria-label="Previous testimonial"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-navy/20 text-navy transition hover:bg-navy hover:text-white"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <button
              onClick={scrollNext}
              aria-label="Next testimonial"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-navy/20 text-navy transition hover:bg-navy hover:text-white"
            >
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* PLACEHOLDER REVIEWS — replace with verified customer quotes */}
        <div className="mt-12 overflow-hidden" ref={emblaRef}>
          <div className="flex gap-5">
            {testimonials.map((t, i) => (
              <figure
                key={i}
                className="card-glow min-w-0 shrink-0 basis-[88%] rounded-3xl bg-white p-8 shadow-soft sm:basis-[46%] lg:basis-[31%]"
              >
                <Quote className="h-8 w-8 text-glow/40" />
                <div className="mt-4 flex gap-0.5 text-cyan">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star key={s} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <blockquote className="mt-4 text-base leading-relaxed text-ink">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-navy via-glow to-cyan text-sm font-bold text-white">
                    {t.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                  <span>
                    <span className="block font-semibold text-ink">
                      {t.name}
                    </span>
                    <span className="block text-sm text-mist">{t.role}</span>
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

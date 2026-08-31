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
                className="card-glow min-w-0 shrink-0 basis-[80%] rounded-2xl bg-white p-6 shadow-soft sm:basis-[40%] lg:basis-[23.5%]"
              >
                <Quote className="h-6 w-6 text-glow/40" />
                <div className="mt-3 flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star
                      key={s}
                      className={
                        s < t.rating
                          ? "h-3.5 w-3.5 fill-current text-cyan"
                          : "h-3.5 w-3.5 text-navy/20"
                      }
                    />
                  ))}
                </div>
                <blockquote className="mt-3 text-sm leading-relaxed text-ink">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-5 flex items-center gap-2.5">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-navy via-glow to-cyan text-xs font-bold text-white">
                    {t.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                  <span>
                    <span className="block text-sm font-semibold text-ink">
                      {t.name}
                    </span>
                    <span className="block text-xs text-mist">{t.role}</span>
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

"use client";

/**
 * Variation B "manifesto" — oversized editorial typography with a numbered
 * index, a word-stagger reveal, and a wide cinematic image band.
 */
import { brandIntro, about, media } from "@/data/content";
import SplitText from "@/components/ui/SplitText";
import SmartImage from "@/components/ui/SmartImage";
import { Reveal, ClipReveal } from "@/components/ui/Reveal";
import { TeeMotif } from "@/components/ui/Logo";

export default function Manifesto() {
  return (
    <section className="container-st py-16 lg:py-24">
      {/* index rule */}
      <div className="mb-10 flex items-center gap-4">
        <span className="font-display text-sm font-bold tracking-widest text-glow">
          01
        </span>
        <span className="h-px flex-1 bg-navy/10" />
        <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-mist">
          <TeeMotif className="h-4 w-4 text-glow" /> The idea
        </span>
      </div>

      <div className="grid gap-8 lg:grid-cols-12">
        <h2 className="font-display text-4xl font-bold leading-[1.02] tracking-tighter text-ink sm:text-6xl lg:col-span-8 lg:text-[4.5rem]">
          <SplitText
            text={brandIntro.heading}
            highlight={[4]}
            highlightClass="text-gradient-ink"
          />
        </h2>
        <div className="lg:col-span-4 lg:pt-3">
          <Reveal delay={0.2}>
            <p className="text-base leading-relaxed text-mist sm:text-lg">
              {about.story[0]}
            </p>
          </Reveal>
        </div>
      </div>

      {/* wide image band */}
      <ClipReveal className="mt-12">
        <div className="relative aspect-[16/7] overflow-hidden rounded-[2rem]">
          <SmartImage
            src={media.brandIntroPhoto}
            fallbackSrc={media.brandIntroFallback}
            alt="The Small Talk Store — editorial"
            sizes="100vw"
            className="transition-transform duration-[1.4s] hover:scale-105"
          />
          <span className="absolute inset-0 bg-gradient-to-t from-ink/40 to-transparent" />
          <p className="absolute bottom-6 left-6 max-w-md font-display text-2xl font-semibold text-white sm:text-3xl">
            “CEO energy” — without the premium price tag.
          </p>
        </div>
      </ClipReveal>
    </section>
  );
}

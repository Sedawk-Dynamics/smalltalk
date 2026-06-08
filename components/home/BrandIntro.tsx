"use client";

/** Editorial "CEO feeling" block with a clip-reveal visual. */
import SmartImage from "@/components/ui/SmartImage";
import { brandIntro, media } from "@/data/content";
import { Reveal, ClipReveal } from "@/components/ui/Reveal";
import SplitText from "@/components/ui/SplitText";
import MagneticButton from "@/components/ui/MagneticButton";

export default function BrandIntro() {
  return (
    <section className="container-st grid items-center gap-10 py-16 lg:grid-cols-2 lg:py-24">
      <ClipReveal className="relative order-2 lg:order-1">
        <div className="relative aspect-[5/6] overflow-hidden rounded-3xl bg-cream">
          <SmartImage
            src={media.brandIntroPhoto}
            fallbackSrc={media.brandIntroFallback}
            alt="The Small Talk Store — editorial"
            sizes="(max-width:1024px) 100vw, 50vw"
            className="transition-transform duration-[1.2s] hover:scale-105"
          />
        </div>
        {/* floating accent card */}
        <div className="glass-dark absolute -bottom-6 -right-2 max-w-[200px] rounded-2xl px-5 py-4 text-white sm:-right-6">
          <p className="font-display text-2xl font-bold">CEO energy</p>
          <p className="mt-1 text-xs text-white/70">
            Without the premium price tag.
          </p>
        </div>
      </ClipReveal>

      <div className="order-1 lg:order-2">
        <Reveal>
          <span className="mb-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-glow">
            <span className="h-px w-6 bg-current" />
            {brandIntro.eyebrow}
          </span>
        </Reveal>
        <h2 className="font-display text-3xl font-bold leading-tight tracking-tighter text-ink sm:text-4xl lg:text-5xl">
          <SplitText
            text={brandIntro.heading}
            highlight={[4]}
            highlightClass="text-gradient-ink"
          />
        </h2>
        <Reveal delay={0.15}>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-mist sm:text-lg">
            {brandIntro.body}
          </p>
        </Reveal>
        <Reveal delay={0.25}>
          <div className="mt-8">
            <MagneticButton href="/about" variant="secondary">
              Read Our Story
            </MagneticButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

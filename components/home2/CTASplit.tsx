"use client";

/**
 * Variation B closing CTA — a split band: bold statement on navy beside a
 * full-bleed image with a price tag overlay.
 */
import { ctaBanner, media, formatINR, featuredProducts } from "@/data/content";
import SmartImage from "@/components/ui/SmartImage";
import SplitText from "@/components/ui/SplitText";
import MagneticButton from "@/components/ui/MagneticButton";
import GradientMesh from "@/components/ui/GradientMesh";
import { Reveal } from "@/components/ui/Reveal";

export default function CTASplit() {
  const from = Math.min(...featuredProducts.map((p) => p.price));
  return (
    <section className="container-st py-16 lg:py-24">
      <div className="grid overflow-hidden rounded-[2.5rem] lg:grid-cols-2">
        {/* Text side */}
        <div className="relative flex flex-col justify-center bg-navy p-10 text-white sm:p-14">
          <GradientMesh className="opacity-50" />
          <div className="relative">
            <h2 className="font-display text-4xl font-bold leading-[1.03] tracking-tighter sm:text-5xl lg:text-6xl">
              <SplitText text={ctaBanner.heading} highlight={[3]} />
            </h2>
            <Reveal delay={0.2}>
              <p className="mt-5 max-w-sm text-white/70">{ctaBanner.sub}</p>
            </Reveal>
            <Reveal delay={0.3}>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <MagneticButton href="/shop" variant="light">
                  Shop Now
                </MagneticButton>
                <span className="text-sm text-white/60">
                  Starting at{" "}
                  <span className="font-display text-lg font-bold text-cyan">
                    {formatINR(from)}
                  </span>
                </span>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Image side */}
        <div className="relative min-h-[320px] overflow-hidden">
          <SmartImage
            src={media.aboutStoryPhoto}
            fallbackSrc={media.aboutStoryFallback}
            alt="Look like you mean business"
            sizes="(max-width:1024px) 100vw, 50vw"
            className="transition-transform duration-[1.4s] hover:scale-105"
          />
        </div>
      </div>
    </section>
  );
}

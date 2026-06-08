"use client";

/** Closing CTA banner — "Look like you mean business." */
import { ctaBanner } from "@/data/content";
import GradientMesh from "@/components/ui/GradientMesh";
import MagneticButton from "@/components/ui/MagneticButton";
import SplitText from "@/components/ui/SplitText";
import { Reveal } from "@/components/ui/Reveal";
import Marquee from "@/components/ui/Marquee";

export default function CTABanner() {
  return (
    <section className="relative overflow-hidden bg-navy text-white">
      <GradientMesh />
      <div className="container-st relative flex flex-col items-center py-20 text-center lg:py-24">
        <h2 className="max-w-4xl font-display text-4xl font-bold leading-[1.05] tracking-tightest sm:text-6xl lg:text-7xl">
          <SplitText text={ctaBanner.heading} highlight={[3]} />
        </h2>
        <Reveal delay={0.2}>
          <p className="mt-6 max-w-md text-base text-white/70 sm:text-lg">
            {ctaBanner.sub}
          </p>
        </Reveal>
        <Reveal delay={0.3}>
          <div className="mt-9">
            <MagneticButton href={ctaBanner.cta.href} variant="light">
              {ctaBanner.cta.label}
            </MagneticButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

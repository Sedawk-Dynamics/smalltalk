"use client";

/** Founder message — portrait + large pull-quote + animated signature line-draw. */
import { motion } from "framer-motion";
import { founder, media } from "@/data/content";
import { Reveal, ClipReveal } from "@/components/ui/Reveal";
import { TeeMotif } from "@/components/ui/Logo";
import SmartImage from "@/components/ui/SmartImage";
import DecorGrid from "@/components/ui/DecorGrid";
import { useReducedMotion } from "@/lib/hooks";

export default function FounderMessage() {
  const reduced = useReducedMotion();
  return (
    <section className="relative overflow-hidden py-16 lg:py-24">
      <DecorGrid />
      <div className="container-st relative grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr]">
        {/* Portrait */}
        <ClipReveal className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-3xl">
          <SmartImage
            src={media.founderPhoto}
            fallbackSrc={media.founderFallback}
            alt={`${founder.name}, ${founder.role}`}
            sizes="380px"
            className="transition-transform duration-[1.2s] hover:scale-105"
          />
          <div className="glass-dark absolute bottom-4 left-4 rounded-2xl px-4 py-2.5 text-white">
            <p className="font-display font-bold">{founder.name}</p>
            <p className="text-xs text-white/70">{founder.role}</p>
          </div>
        </ClipReveal>

        {/* Quote */}
        <div>
          <Reveal>
            <TeeMotif className="h-10 w-10 text-glow" />
          </Reveal>
          <Reveal delay={0.1}>
            <blockquote className="mt-6 font-display text-2xl font-semibold leading-snug tracking-tight text-ink sm:text-3xl lg:text-4xl">
              &ldquo;{founder.message}&rdquo;
            </blockquote>
          </Reveal>

          {/* Animated signature line-draw */}
          <svg
            viewBox="0 0 300 80"
            className="mt-8 h-16 w-56 text-navy"
            fill="none"
          >
            <motion.path
              d="M5 55 C 30 10, 50 10, 60 45 C 68 70, 80 70, 92 40 C 100 18, 118 18, 120 50 L 135 30 M 150 55 C 175 20, 195 25, 200 45 C 205 62, 220 60, 235 35 C 248 15, 270 20, 295 30"
              stroke="currentColor"
              strokeWidth={2.5}
              strokeLinecap="round"
              initial={reduced ? { pathLength: 1 } : { pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.8, ease: "easeInOut" }}
            />
          </svg>
          <p className="mt-1 text-sm text-mist">— {founder.name}, {founder.role}</p>
        </div>
      </div>
    </section>
  );
}

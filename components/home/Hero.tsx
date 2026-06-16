"use client";

/**
 * Hero: kinetic headline (words mask up), animated gradient-mesh background,
 * parallax floating tee visual, CTAs, and an animated scroll cue.
 */
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { hero, media } from "@/data/content";
import GradientMesh from "@/components/ui/GradientMesh";
import HeroCanvas from "@/components/ui/HeroCanvas";
import SmartImage from "@/components/ui/SmartImage";
import MagneticButton from "@/components/ui/MagneticButton";
import SplitText from "@/components/ui/SplitText";
import { TeeMotif } from "@/components/ui/Logo";
import { useReducedMotion } from "@/lib/hooks";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  // Parallax layers.
  const yText = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : -120]);
  const yVisual = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 140]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative -mt-20 flex min-h-[100svh] items-center overflow-hidden bg-navy pt-20 text-white"
    >
      <GradientMesh />
      {/* canvas particle constellation */}
      <HeroCanvas className="pointer-events-none absolute inset-0 opacity-70" />
      {/* subtle grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.6) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      <div className="container-st relative grid w-full items-center gap-10 py-24 lg:grid-cols-[1.15fr_0.85fr]">
        {/* Copy */}
        <motion.div style={{ y: yText, opacity }} className="relative z-10">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-white/80"
          >
            <TeeMotif className="h-4 w-4 text-cyan" />
            Premium · Everyday · Honest
          </motion.span>

          <h1 className="font-display text-[2.6rem] font-bold leading-[1.02] tracking-tightest sm:text-6xl lg:text-7xl">
            <SplitText
              words={hero.headlineWords}
              highlight={[1, 6]}
              stagger={0.06}
            />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.7 }}
            className="mt-7 max-w-md text-base leading-relaxed text-white/70 sm:text-lg"
          >
            {hero.longSub}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.7 }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <MagneticButton href={hero.ctaPrimary.href} variant="light">
              {hero.ctaPrimary.label}
            </MagneticButton>
            <MagneticButton
              href={hero.ctaSecondary.href}
              variant="ghost"
              className="text-white hover:bg-white/10"
            >
              {hero.ctaSecondary.label}
            </MagneticButton>
          </motion.div>
        </motion.div>

        {/* Visual */}
        <motion.div
          style={{ y: yVisual }}
          className="relative mx-auto hidden aspect-[4/5] w-full max-w-sm lg:block"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: -4 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="relative h-full w-full"
          >
            <div className="absolute inset-0 -z-10 rounded-[2rem] bg-glow/30 blur-3xl" />
            <div className={reduced ? "" : "animate-float"}>
              <div className="glass overflow-hidden rounded-[2rem] p-3 shadow-glow">
                <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem]">
                  <SmartImage
                    src={media.heroPhoto}
                    fallbackSrc={media.heroFallback}
                    alt="Premium apparel by The Small Talk Store"
                    priority
                    sizes="380px"
                  />
                </div>
              </div>
            </div>

            {/* floating chips */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.1 }}
              className="glass-dark absolute -left-6 top-10 rounded-2xl px-4 py-2.5 text-sm"
            >
              <p className="font-display text-lg font-bold">100%</p>
              <p className="text-xs text-white/60">Premium cotton</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.25 }}
              className="glass-dark absolute -right-4 bottom-16 rounded-2xl px-4 py-2.5 text-sm"
            >
              <p className="font-display text-lg font-bold text-cyan">₹799</p>
              <p className="text-xs text-white/60">Honest pricing</p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        style={{ opacity }}
        className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-white/60"
      >
        <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <div className="flex h-9 w-5 justify-center rounded-full border border-white/30 p-1">
          <motion.span
            animate={reduced ? {} : { y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.6 }}
            className="h-1.5 w-1.5 rounded-full bg-cyan"
          />
        </div>
      </motion.div>
    </section>
  );
}

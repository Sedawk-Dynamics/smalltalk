"use client";

/**
 * Variation B "why us" — a sticky-scroll layout: the left column pins while
 * the right column of feature blocks scrolls past, each revealing in.
 */
import { Briefcase, Shirt, Sparkles, type LucideIcon } from "lucide-react";
import { whyChooseUs, valuePillars } from "@/data/content";
import { Reveal } from "@/components/ui/Reveal";
import SplitText from "@/components/ui/SplitText";
import MagneticButton from "@/components/ui/MagneticButton";
import { BadgeCheck, Feather, Wallet } from "lucide-react";

const icons: Record<string, LucideIcon> = {
  Sparkles,
  Shirt,
  Briefcase,
  BadgeCheck,
  Feather,
  Wallet,
};

export default function StickyFeatures() {
  return (
    <section className="container-st py-16 lg:py-24">
      <div className="grid gap-12 lg:grid-cols-2">
        {/* Sticky left */}
        <div className="lg:sticky lg:top-28 lg:h-fit">
          <span className="chip mb-4">
            <span className="h-1.5 w-1.5 rounded-full bg-current shadow-[0_0_8px_currentColor]" />
            Why choose us
          </span>
          <h2 className="font-display text-4xl font-bold leading-[1.03] tracking-tighter text-ink sm:text-5xl">
            <SplitText
              text="Quality you can feel. Pricing you can trust."
              highlight={[2, 6]}
              highlightClass="text-gradient-ink"
            />
          </h2>
          <Reveal delay={0.2}>
            <p className="mt-5 max-w-md text-mist">
              No premium price tag, no compromise on the things that matter —
              fabric, fit and finish.
            </p>
          </Reveal>

          {/* value pills */}
          <Reveal delay={0.3}>
            <div className="mt-6 flex flex-wrap gap-2">
              {valuePillars.map((v) => {
                const Icon = icons[v.icon] ?? BadgeCheck;
                return (
                  <span
                    key={v.title}
                    className="flex items-center gap-2 rounded-full border border-navy/15 bg-white px-4 py-2 text-sm font-medium text-navy"
                  >
                    <Icon className="h-4 w-4 text-glow" /> {v.title}
                  </span>
                );
              })}
            </div>
          </Reveal>

          <Reveal delay={0.4}>
            <div className="mt-8">
              <MagneticButton href="/about" variant="secondary">
                More about us
              </MagneticButton>
            </div>
          </Reveal>
        </div>

        {/* Scrolling feature blocks */}
        <div className="space-y-5">
          {whyChooseUs.map((card, i) => {
            const Icon = icons[card.icon] ?? Sparkles;
            return (
              <Reveal key={card.title} delay={i * 0.05}>
                <div className="card-glow group relative overflow-hidden rounded-3xl border border-navy/10 bg-cream p-8">
                  <span className="absolute right-6 top-4 font-display text-7xl font-bold text-navy/[0.05]">
                    0{i + 1}
                  </span>
                  <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-navy text-cyan">
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-ink">
                    {card.title}
                  </h3>
                  <p className="mt-2 max-w-sm leading-relaxed text-mist">
                    {card.description}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

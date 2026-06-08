"use client";

/** 3 USP cards with glow-on-hover + glass treatment. */
import { Briefcase, Shirt, Sparkles, type LucideIcon } from "lucide-react";
import { whyChooseUs } from "@/data/content";
import SectionHeading from "@/components/ui/SectionHeading";
import { RevealItem, RevealStagger } from "@/components/ui/Reveal";
import GradientMesh from "@/components/ui/GradientMesh";

const icons: Record<string, LucideIcon> = { Sparkles, Shirt, Briefcase };

export default function WhyChooseUs() {
  return (
    <section className="relative overflow-hidden bg-ink py-16 text-white lg:py-24">
      <GradientMesh className="opacity-60" />
      <div className="container-st relative">
        <SectionHeading
          eyebrow="Why choose us"
          title="Quality you can feel, pricing you can trust."
          highlight={[2]}
          light
          align="center"
        />

        <RevealStagger className="mt-14 grid gap-5 md:grid-cols-3">
          {whyChooseUs.map((card, i) => {
            const Icon = icons[card.icon] ?? Sparkles;
            return (
              <RevealItem key={card.title}>
                <div className="group glass gradient-border relative h-full overflow-hidden rounded-3xl p-8 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-glow">
                  <span className="absolute right-6 top-6 font-display text-6xl font-bold text-white/5 transition-colors group-hover:text-white/10">
                    0{i + 1}
                  </span>
                  <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-glow/20 text-cyan transition-colors group-hover:bg-glow/30">
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="font-display text-xl font-bold">
                    {card.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/65">
                    {card.description}
                  </p>
                </div>
              </RevealItem>
            );
          })}
        </RevealStagger>
      </div>
    </section>
  );
}

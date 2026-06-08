"use client";

/** Our Values strip — icons + count-up / animated reveal. */
import { BadgeCheck, Feather, Wallet, type LucideIcon } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import DecorGrid from "@/components/ui/DecorGrid";
import { useCountUp } from "@/lib/hooks";

const icons: Record<string, LucideIcon> = { BadgeCheck, Feather, Wallet };

const stats = [
  { icon: "BadgeCheck", label: "Quality Products", value: 100, suffix: "%", hint: "Honestly made, every piece" },
  { icon: "Feather", label: "Comfort", value: 24, suffix: "/7", hint: "Built for all-day wear" },
  { icon: "Wallet", label: "Affordability", value: 0, suffix: "", hint: "Zero premium price tax", isText: true, text: "₹0" },
];

function Stat({
  stat,
}: {
  stat: (typeof stats)[number];
}) {
  const { ref, value } = useCountUp(stat.value);
  const Icon = icons[stat.icon] ?? BadgeCheck;
  return (
    <div className="flex flex-col items-center text-center">
      <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-navy/5 text-navy">
        <Icon className="h-7 w-7" />
      </div>
      <p className="font-display text-4xl font-bold text-navy sm:text-5xl">
        <span ref={ref}>{stat.isText ? stat.text : value}</span>
        <span className="text-glow">{stat.suffix}</span>
      </p>
      <p className="mt-2 font-display text-lg font-semibold text-ink">
        {stat.label}
      </p>
      <p className="mt-1 text-sm text-mist">{stat.hint}</p>
    </div>
  );
}

export default function ValuesStrip() {
  return (
    <section className="relative overflow-hidden border-y border-navy/10 bg-cream">
      <DecorGrid />
      <div className="container-st relative grid gap-12 py-12 md:grid-cols-3 lg:py-16">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.1}>
            <Stat stat={s} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

"use client";

/**
 * Variation B testimonials — two infinite marquee rows drifting in opposite
 * directions (pause on hover). A different rhythm from Variation A's slider.
 */
import { Star } from "lucide-react";
import { testimonials } from "@/data/content";
import SectionHeading from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

function Card({ t }: { t: (typeof testimonials)[number] }) {
  return (
    <figure className="card-glow w-[340px] shrink-0 rounded-3xl border border-navy/10 bg-white p-6 sm:w-[420px]">
      <div className="flex gap-0.5 text-cyan">
        {Array.from({ length: 5 }).map((_, s) => (
          <Star key={s} className="h-4 w-4 fill-current" />
        ))}
      </div>
      <blockquote className="mt-3 leading-relaxed text-ink">
        &ldquo;{t.quote}&rdquo;
      </blockquote>
      <figcaption className="mt-5 flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-navy via-glow to-cyan text-sm font-bold text-white">
          {t.name.split(" ").map((n) => n[0]).join("")}
        </span>
        <span>
          <span className="block font-semibold text-ink">{t.name}</span>
          <span className="block text-sm text-mist">{t.role}</span>
        </span>
      </figcaption>
    </figure>
  );
}

function Row({ reverse = false }: { reverse?: boolean }) {
  // Duplicate enough times for a seamless loop.
  const loop = [...testimonials, ...testimonials, ...testimonials];
  return (
    <div className="group flex overflow-hidden">
      <div
        className={cn(
          "flex shrink-0 gap-5 pr-5",
          reverse ? "animate-marquee-reverse" : "animate-marquee",
          "group-hover:[animation-play-state:paused]"
        )}
      >
        {loop.map((t, i) => (
          <Card key={i} t={t} />
        ))}
      </div>
    </div>
  );
}

export default function TestimonialsMarquee() {
  return (
    <section className="overflow-hidden bg-cream py-16 lg:py-24">
      <div className="container-st">
        <SectionHeading
          align="center"
          eyebrow="Loved by customers"
          title="Real confidence, real reviews."
          highlight={[1]}
          className="mx-auto"
        />
      </div>
      <div className="mt-12 flex flex-col gap-5">
        <Row />
        <Row reverse />
      </div>
    </section>
  );
}

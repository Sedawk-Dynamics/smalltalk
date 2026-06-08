"use client";

/**
 * Promotional offer banners (Souled Store / Nobero style) — bold gradient
 * cards with a parallax-on-hover shine, motif watermark and magnetic CTA.
 */
import { promos } from "@/data/content";
import { TeeMotif } from "@/components/ui/Logo";
import MagneticButton from "@/components/ui/MagneticButton";
import { RevealItem, RevealStagger } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

export default function PromoBanners() {
  return (
    <section className="container-st pb-4 pt-2 lg:pb-10">
      <RevealStagger className="grid gap-5 md:grid-cols-2" gap={0.12}>
        {promos.map((p) => (
          <RevealItem key={p.title}>
            <div
              className={cn(
                "group relative flex min-h-[220px] flex-col justify-between overflow-hidden rounded-3xl bg-gradient-to-br p-8 text-white shadow-soft transition-transform duration-500 hover:-translate-y-1",
                p.gradient
              )}
            >
              {/* shine sweep */}
              <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              {/* motif watermark */}
              <TeeMotif className="pointer-events-none absolute -bottom-6 -right-6 h-40 w-40 text-white/10 transition-transform duration-700 group-hover:rotate-12 group-hover:scale-110" />

              <div className="relative">
                <span className="inline-block rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider backdrop-blur">
                  {p.tag}
                </span>
                <h3 className="mt-4 font-display text-3xl font-bold leading-tight tracking-tighter sm:text-4xl">
                  {p.title}
                </h3>
                <p className="mt-2 max-w-xs text-white/80">{p.sub}</p>
              </div>

              <div className="relative mt-6">
                <MagneticButton href={p.cta.href} variant="light">
                  {p.cta.label}
                </MagneticButton>
              </div>
            </div>
          </RevealItem>
        ))}
      </RevealStagger>
    </section>
  );
}

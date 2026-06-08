"use client";

/** Newsletter capture band. */
import Newsletter from "@/components/ui/Newsletter";
import SectionHeading from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import GradientMesh from "@/components/ui/GradientMesh";
import { TeeMotif } from "@/components/ui/Logo";

export default function NewsletterBand() {
  return (
    <section className="container-st py-12">
      <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-navy px-6 py-16 text-center shadow-soft sm:px-12">
        <GradientMesh className="opacity-70" />
        {/* grain overlay */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.08] mix-blend-overlay"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
        />
        <TeeMotif className="relative mx-auto mb-5 h-9 w-9 text-cyan" />
        <div className="relative">
        <SectionHeading
          light
          align="center"
          eyebrow="Join the circle"
          title="Be first to the drops."
          highlight={[2]}
          intro="Early access, member pricing, and the occasional note worth reading. No spam — ever."
          className="mx-auto"
        />
        <Reveal delay={0.2}>
          <div className="mx-auto mt-8 max-w-md">
            <Newsletter dark />
          </div>
        </Reveal>
        </div>
      </div>
    </section>
  );
}

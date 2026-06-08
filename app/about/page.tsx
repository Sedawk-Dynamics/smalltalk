import type { Metadata } from "next";
import { Eye, Mail, Target } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import { Reveal, ClipReveal, RevealItem, RevealStagger } from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { TeeMotif } from "@/components/ui/Logo";
import SmartImage from "@/components/ui/SmartImage";
import GradientMesh from "@/components/ui/GradientMesh";
import MagneticButton from "@/components/ui/MagneticButton";
import Marquee from "@/components/ui/Marquee";
import {
  about,
  brand,
  founder,
  team,
  marqueeItems,
  media,
  founderHighlights,
} from "@/data/content";

export const metadata: Metadata = {
  title: "About",
  description:
    "The story, mission, vision and people behind The Small Talk Store — premium everyday apparel without the premium price.",
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        title="We're building a mindset."
        highlight={[3]}
        subtitle="Looking good shouldn't feel expensive, and quality shouldn't feel out of reach. So we changed the equation."
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "About", href: "/about" },
        ]}
      />

      {/* Story */}
      <section className="container-st grid items-start gap-10 py-14 lg:grid-cols-[0.9fr_1.1fr] lg:py-20">
        <div className="lg:sticky lg:top-28">
          <SectionHeading eyebrow="Our story" title="How it started." highlight={[1]} />
          <Reveal delay={0.15}>
            <p className="mt-5 font-display text-xl font-medium leading-snug text-navy">
              {brand.positioning}
            </p>
          </Reveal>
          <Reveal delay={0.25}>
            <div className="mt-6 flex flex-wrap gap-2">
              {["Premium fabric", "Honest pricing", "Everyday fits"].map((t) => (
                <span key={t} className="chip">
                  {t}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
        <div className="space-y-5">
          {about.story.map((p, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <p className="text-base leading-relaxed text-mist sm:text-lg">{p}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Editorial image */}
      <ClipReveal className="container-st">
        <div className="relative aspect-[16/8] overflow-hidden rounded-3xl bg-cream">
          <SmartImage
            src={media.aboutStoryPhoto}
            fallbackSrc={media.aboutStoryFallback}
            alt="The Small Talk Store editorial"
            sizes="100vw"
          />
        </div>
      </ClipReveal>

      {/* Mission + Vision */}
      <section className="container-st grid gap-5 py-14 md:grid-cols-2 lg:py-20">
        <Reveal>
          <div className="h-full rounded-3xl bg-navy p-8 text-white sm:p-10">
            <Target className="h-9 w-9 text-cyan" />
            <h3 className="mt-5 font-display text-2xl font-bold">Mission</h3>
            <p className="mt-3 leading-relaxed text-white/75">{about.mission}</p>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="h-full rounded-3xl bg-ink p-8 text-white sm:p-10">
            <Eye className="h-9 w-9 text-glow" />
            <h3 className="mt-5 font-display text-2xl font-bold">Vision</h3>
            <p className="mt-3 leading-relaxed text-white/75">{about.vision}</p>
          </div>
        </Reveal>
      </section>

      {/* Values */}
      <section className="container-st pb-8">
        <SectionHeading
          align="center"
          eyebrow="What we stand for"
          title="Our values."
          highlight={[1]}
          className="mx-auto"
        />
        <RevealStagger className="mx-auto mt-10 grid max-w-3xl gap-4 sm:grid-cols-3">
          {about.valuesList.map((v) => (
            <RevealItem key={v}>
              <div className="flex flex-col items-center rounded-3xl border border-navy/10 bg-white p-8 text-center">
                <TeeMotif className="h-8 w-8 text-glow" />
                <p className="mt-4 font-display text-lg font-semibold text-ink">
                  {v}
                </p>
              </div>
            </RevealItem>
          ))}
        </RevealStagger>
      </section>

      <Marquee items={marqueeItems} className="my-12" />

      {/* Founder — bold navy feature band */}
      <section className="container-st py-8 lg:py-12">
        <div className="relative grid items-stretch gap-0 overflow-hidden rounded-[2rem] bg-navy text-white shadow-soft lg:grid-cols-[0.9fr_1.1fr]">
          <GradientMesh className="opacity-60" />
          {/* Portrait — fills the full band height, no empty gaps */}
          <ClipReveal className="relative min-h-[360px] overflow-hidden lg:min-h-full">
            <SmartImage
              src={media.founderPhoto}
              fallbackSrc={media.founderFallback}
              alt={`${founder.name}, ${founder.role}`}
              sizes="(max-width:1024px) 100vw, 520px"
            />
            <span className="absolute inset-0 bg-gradient-to-t from-navy/70 via-transparent to-transparent lg:bg-gradient-to-r" />
          </ClipReveal>

          {/* Quote + credentials */}
          <div className="relative flex flex-col justify-center p-8 sm:p-10 lg:p-14">
            <span className="chip mb-5 w-fit border-white/20 bg-white/10 text-cyan">
              <span className="h-1.5 w-1.5 rounded-full bg-current shadow-[0_0_8px_currentColor]" />
              Founder&apos;s note
            </span>
            <TeeMotif className="h-9 w-9 text-cyan" />
            <blockquote className="mt-5 font-display text-2xl font-semibold leading-snug tracking-tight sm:text-3xl">
              &ldquo;{founder.message}&rdquo;
            </blockquote>
            <p className="mt-6 font-semibold">{founder.name}</p>
            <p className="text-sm text-white/60">{founder.role}</p>

            {/* highlights row — fills the space with real info */}
            <dl className="mt-8 grid grid-cols-3 gap-4 border-t border-white/10 pt-6">
              {founderHighlights.map((h) => (
                <div key={h.label}>
                  <dt className="font-display text-2xl font-bold text-white">
                    {h.value}
                  </dt>
                  <dd className="mt-0.5 text-xs uppercase tracking-wider text-white/55">
                    {h.label}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="container-st py-14 lg:py-20">
        <SectionHeading
          align="center"
          eyebrow="The people"
          title="Meet the team."
          highlight={[2]}
          className="mx-auto"
        />
        <RevealStagger className="mx-auto mt-10 grid max-w-4xl gap-6 sm:grid-cols-2">
          {team.map((m) => (
            <RevealItem key={m.email}>
              <div className="card-glow group h-full overflow-hidden rounded-3xl border border-navy/10 bg-white p-7">
                {/* top accent */}
                <div className="flex items-start justify-between">
                  <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-navy via-glow to-cyan font-display text-xl font-bold text-white shadow-card">
                    {m.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                  <a
                    href={`mailto:${m.email}`}
                    aria-label={`Email ${m.name}`}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-navy/15 text-navy transition hover:bg-navy hover:text-white"
                  >
                    <Mail className="h-4 w-4" />
                  </a>
                </div>

                <p className="mt-5 font-display text-xl font-bold text-ink">
                  {m.name}
                </p>
                <p className="text-sm font-medium text-glow">{m.role}</p>
                <p className="mt-3 text-sm leading-relaxed text-mist">{m.bio}</p>

                {/* focus tags */}
                <div className="mt-5 flex flex-wrap gap-2">
                  {m.focus.map((f) => (
                    <span
                      key={f}
                      className="rounded-full bg-navy/5 px-3 py-1 text-xs font-medium text-navy"
                    >
                      {f}
                    </span>
                  ))}
                </div>

                <a
                  href={`mailto:${m.email}`}
                  className="mt-5 inline-flex items-center gap-1.5 border-t border-navy/10 pt-4 text-sm text-navy transition hover:text-glow"
                >
                  <Mail className="h-3.5 w-3.5" /> {m.email}
                </a>
              </div>
            </RevealItem>
          ))}
        </RevealStagger>

        <div className="mt-12 flex justify-center">
          <MagneticButton href="/shop" variant="primary">
            Explore the Collection
          </MagneticButton>
        </div>
      </section>
    </>
  );
}

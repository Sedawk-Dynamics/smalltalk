"use client";

/**
 * Pinned horizontal-scroll lookbook (GSAP ScrollTrigger).
 * The section pins while panels scroll sideways. Falls back to a normal
 * horizontal swipe row for reduced-motion / touch.
 */
import { useLayoutEffect, useRef } from "react";
import SmartImage from "@/components/ui/SmartImage";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { lookbook } from "@/data/content";
import SectionHeading from "@/components/ui/SectionHeading";
import { useReducedMotion } from "@/lib/hooks";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

export default function Lookbook() {
  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (reduced) return;
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const ctx = gsap.context(() => {
      const getScrollAmount = () => track.scrollWidth - window.innerWidth;

      const tween = gsap.to(track, {
        x: () => -getScrollAmount(),
        ease: "none",
      });

      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: () => `+=${getScrollAmount()}`,
        pin: true,
        animation: tween,
        scrub: 1,
        invalidateOnRefresh: true,
      });
    }, section);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-navy py-20 text-white lg:py-0"
    >
      <div className="container-st pb-10 pt-4 lg:absolute lg:left-0 lg:right-0 lg:top-12 lg:z-10">
        <SectionHeading
          eyebrow="Lookbook"
          title="From desk to dinner."
          highlight={[2]}
          light
        />
      </div>

      <div
        className={
          reduced
            ? "flex gap-5 overflow-x-auto px-5 pb-6 lg:px-12"
            : "flex h-screen items-center"
        }
      >
        <div
          ref={trackRef}
          className={
            reduced
              ? "flex gap-5"
              : "flex gap-6 px-5 will-change-transform lg:px-[8vw] lg:pt-28"
          }
        >
          {lookbook.map((look, i) => (
            <article
              key={look.title}
              className="group relative h-[60vh] w-[72vw] shrink-0 overflow-hidden rounded-3xl sm:w-[52vw] lg:h-[68vh] lg:w-[34vw]"
            >
              <SmartImage
                src={look.photo}
                fallbackSrc={look.image}
                alt={look.title}
                sizes="(max-width:1024px) 72vw, 34vw"
                className="transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 p-6">
                <span className="text-xs font-semibold uppercase tracking-widest text-cyan">
                  0{i + 1}
                </span>
                <h3 className="mt-1 font-display text-2xl font-bold">
                  {look.title}
                </h3>
                <p className="mt-1 text-sm text-white/70">{look.caption}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import SplitText from "./SplitText";
import { Reveal } from "./Reveal";
import { cn } from "@/lib/utils";

/** Reusable eyebrow + kinetic heading + optional intro. */
export default function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  light = false,
  highlight = [],
  className,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  align?: "left" | "center";
  light?: boolean;
  highlight?: number[];
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow && (
        <Reveal>
          <span
            className={cn(
              "chip mb-4",
              light && "border-white/20 bg-white/10 text-cyan"
            )}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-current shadow-[0_0_8px_currentColor]" />
            {eyebrow}
          </span>
        </Reveal>
      )}
      <h2
        className={cn(
          "font-display text-3xl font-bold leading-[1.05] tracking-tighter sm:text-4xl lg:text-[3.25rem]",
          light ? "text-white" : "text-ink"
        )}
      >
        <SplitText
          text={title}
          highlight={highlight}
          highlightClass={light ? "text-gradient" : "text-gradient-ink"}
        />
      </h2>
      {intro && (
        <Reveal delay={0.15}>
          <p
            className={cn(
              "mt-4 text-base leading-relaxed",
              light ? "text-white/70" : "text-mist"
            )}
          >
            {intro}
          </p>
        </Reveal>
      )}
    </div>
  );
}

"use client";

/**
 * Infinite scrolling marquee strip with the brand motif as separator.
 * Pure CSS animation (keyframes in tailwind.config) → cheap + smooth.
 */
import { TeeMotif } from "./Logo";
import { cn } from "@/lib/utils";

export default function Marquee({
  items,
  reverse = false,
  className,
  dark = false,
}: {
  items: string[];
  reverse?: boolean;
  className?: string;
  dark?: boolean;
}) {
  // Duplicate the list so the -50% translate loops seamlessly.
  const loop = [...items, ...items];
  return (
    <div
      className={cn(
        "group relative flex overflow-hidden border-y py-5 select-none",
        dark
          ? "border-white/10 bg-ink text-white"
          : "border-navy/10 bg-navy text-white",
        className
      )}
      aria-hidden
    >
      <div
        className={cn(
          "flex shrink-0 items-center gap-8 whitespace-nowrap pr-8",
          reverse ? "animate-marquee-reverse" : "animate-marquee",
          "group-hover:[animation-play-state:paused]"
        )}
      >
        {loop.map((item, i) => (
          <span key={i} className="flex items-center gap-8">
            <span className="font-display text-2xl font-semibold uppercase tracking-tight md:text-4xl">
              {item}
            </span>
            <TeeMotif className="h-5 w-5 text-glow md:h-7 md:w-7" />
          </span>
        ))}
      </div>
    </div>
  );
}

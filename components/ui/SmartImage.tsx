"use client";

/**
 * SmartImage — never renders an empty box.
 * 1. Tries the real photo (`src`, e.g. an Unsplash CDN URL).
 * 2. On error, falls back to a local SVG mockup (`fallbackSrc`).
 * 3. If that also fails, renders an animated brand gradient panel.
 *
 * Built on next/image (optimization, lazy-load) with an onError ladder.
 */
import Image from "next/image";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { TeeMotif } from "./Logo";

type Props = {
  src?: string;
  fallbackSrc?: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  /** Show the brand motif on the final gradient fallback. */
  motif?: boolean;
};

export default function SmartImage({
  src,
  fallbackSrc,
  alt,
  className,
  sizes,
  priority,
  motif = true,
}: Props) {
  // 0 = real photo, 1 = svg fallback, 2 = gradient panel
  const [stage, setStage] = useState<0 | 1 | 2>(src ? 0 : fallbackSrc ? 1 : 2);

  // Reset when the source changes (e.g. gallery switch).
  useEffect(() => {
    setStage(src ? 0 : fallbackSrc ? 1 : 2);
  }, [src, fallbackSrc]);

  if (stage === 2) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={cn(
          "relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-navy via-indigo-700 to-cyan-500",
          className
        )}
      >
        <div className="absolute inset-0 animate-mesh-drift bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.25),transparent_60%)]" />
        {motif && <TeeMotif className="relative h-1/3 w-1/3 text-white/40" />}
      </div>
    );
  }

  const current = stage === 0 ? (src as string) : (fallbackSrc as string);

  return (
    <Image
      src={current}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      className={cn("object-cover", className)}
      onError={() =>
        setStage((s) => (s === 0 && fallbackSrc ? 1 : 2))
      }
    />
  );
}

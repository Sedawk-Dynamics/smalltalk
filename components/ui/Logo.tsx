"use client";

/**
 * SINGLE SOURCE OF TRUTH for the brand logo — used in the header, footer and
 * mobile menu. Renders the finalized brand artwork:
 *   variant="light" → white logo  (/public/logo-white.png)  — for dark backgrounds
 *   variant="dark"  → blue logo   (/public/logo-blue.png)   — for light backgrounds
 * Size it with a height class on `className` (e.g. "h-7 w-auto"); the width
 * scales automatically to the artwork's 3087×962 ratio.
 *
 * To swap the logo later, replace those two PNGs (keep the filenames) — every
 * usage across the site flows through this component.
 */
import Image from "next/image";
import { cn } from "@/lib/utils";

const LOGOS = {
  light: "/logo-white.png", // white artwork — for navy/dark surfaces
  dark: "/logo-blue.png", // blue artwork — for light/cream surfaces
} as const;

// Intrinsic dimensions of the supplied artwork (transparent PNG).
const INTRINSIC = { width: 3087, height: 962 };

export function TeeMotif({
  className,
  title = "",
}: {
  className?: string;
  title?: string;
}) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      fill="none"
      role={title ? "img" : "presentation"}
      aria-label={title || undefined}
      aria-hidden={title ? undefined : true}
    >
      <path
        d="M22 8 L12 14 L7 26 L16 30 L18 24 L18 54 A2 2 0 0 0 20 56 L44 56 A2 2 0 0 0 46 54 L46 24 L48 30 L57 26 L52 14 L42 8 C40 14 34 16 32 16 C30 16 24 14 22 8 Z"
        fill="currentColor"
      />
      <path
        d="M26 9 C28 14 31 15 32 15 C33 15 36 14 38 9"
        stroke="rgba(255,255,255,0.85)"
        strokeWidth={2}
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function Logo({
  variant = "dark",
  className,
  priority = false,
}: {
  variant?: "light" | "dark";
  /** Pass a height class, e.g. "h-7 w-auto". */
  className?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src={variant === "light" ? LOGOS.light : LOGOS.dark}
      alt="The Small Talk Store"
      width={INTRINSIC.width}
      height={INTRINSIC.height}
      priority={priority}
      sizes="200px"
      className={cn("w-auto select-none", className)}
    />
  );
}

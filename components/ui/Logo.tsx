"use client";

/**
 * SINGLE SOURCE OF TRUTH for the brand logo — used in the header, footer and
 * mobile menu. The favicon (app/icon.svg) and OG image (public/og-image.svg)
 * use the same t-shirt-collar motif so the mark is consistent everywhere.
 *
 * TODO(client-asset): Replace with the finalized logo. Drop the file at
 * /public/logo.svg, render it here (swap the wordmark below for an <Image>/<svg>),
 * and update the favicon (app/icon.svg) + OG image (public/og-image.svg) to match.
 * This is the only component to edit — every usage flows through here.
 */
import { cn } from "@/lib/utils";

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
  compact = false,
}: {
  variant?: "light" | "dark";
  className?: string;
  compact?: boolean;
}) {
  const color = variant === "light" ? "text-white" : "text-navy";
  return (
    <span
      className={cn(
        "inline-flex select-none items-baseline font-display font-bold tracking-tighter",
        color,
        className
      )}
    >
      <span className="text-[1.05em] leading-none">Sm</span>
      {/* the motif stands in for the lowercase "a" */}
      <TeeMotif className="mx-[0.02em] inline-block h-[0.92em] w-[0.92em] translate-y-[0.1em]" />
      <span className="text-[1.05em] leading-none">ll</span>
      <span className="ml-[0.18em] text-[1.05em] leading-none">Talk</span>
      {!compact && (
        <span className="ml-[0.35em] text-[0.62em] font-medium uppercase tracking-[0.32em] opacity-70">
          Store
        </span>
      )}
    </span>
  );
}

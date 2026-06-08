"use client";

/**
 * Magnetic button with a sliding arrow on hover.
 * - "Magnetic": follows the cursor slightly while hovered.
 * - Renders as <Link> if href is given, else <button>.
 * - Disables the magnet effect for reduced-motion users.
 */
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/lib/hooks";

type Variant = "primary" | "secondary" | "ghost" | "light";

const base =
  "shimmer group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-7 py-3.5 text-sm font-semibold tracking-wide transition-all duration-300 will-change-transform";

const variants: Record<Variant, string> = {
  // electric gradient fill + glow (primary CTA)
  primary:
    "bg-gradient-to-r from-navy via-glow to-navy bg-[length:200%_100%] bg-[position:0%] text-white shadow-[0_10px_30px_-10px_rgba(91,91,240,0.7)] hover:bg-[position:100%] hover:shadow-[0_16px_44px_-12px_rgba(91,91,240,0.9)]",
  // glass outline with gradient hairline
  secondary:
    "gradient-border bg-white/40 text-navy backdrop-blur hover:bg-navy hover:text-white",
  // ghost
  ghost: "text-navy hover:bg-navy/5",
  // filled white w/ glow (for navy backgrounds)
  light:
    "bg-white text-navy shadow-[0_10px_30px_-12px_rgba(255,255,255,0.6)] hover:shadow-[0_16px_44px_-14px_rgba(61,214,208,0.7)]",
};

export default function MagneticButton({
  children,
  href,
  variant = "primary",
  className,
  withArrow = true,
  onClick,
  type = "button",
  ariaLabel,
}: {
  children: React.ReactNode;
  href?: string;
  variant?: Variant;
  className?: string;
  withArrow?: boolean;
  onClick?: () => void;
  type?: "button" | "submit";
  ariaLabel?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();
  const [t, setT] = useState({ x: 0, y: 0 });

  const onMove = (e: React.MouseEvent) => {
    if (reduced || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const x = e.clientX - (r.left + r.width / 2);
    const y = e.clientY - (r.top + r.height / 2);
    setT({ x: x * 0.25, y: y * 0.35 });
  };
  const reset = () => setT({ x: 0, y: 0 });

  const inner = (
    <span
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      className={cn(base, variants[variant], className)}
      style={{
        transform: `translate(${t.x}px, ${t.y}px)`,
        transition: t.x === 0 && t.y === 0 ? "transform .35s ease" : "none",
      }}
    >
      {/* focus glow ring handled globally via :focus-visible */}
      <span className="relative z-10">{children}</span>
      {withArrow && (
        <span className="relative z-10 inline-flex h-4 w-4 items-center justify-center overflow-hidden">
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-5" />
          <ArrowRight className="absolute h-4 w-4 -translate-x-5 transition-transform duration-300 group-hover:translate-x-0" />
        </span>
      )}
    </span>
  );

  if (href) {
    return (
      <Link href={href} aria-label={ariaLabel} className="inline-flex">
        {inner}
      </Link>
    );
  }
  return (
    <button
      type={type}
      onClick={onClick}
      aria-label={ariaLabel}
      className="inline-flex"
    >
      {inner}
    </button>
  );
}

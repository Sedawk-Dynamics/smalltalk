"use client";

/**
 * Decorative section backdrop: a faint dotted grid + slow-floating
 * outlined shapes. Purely visual — keeps sections from ever feeling empty.
 */
import { cn } from "@/lib/utils";

export default function DecorGrid({
  className,
  dark = false,
}: {
  className?: string;
  dark?: boolean;
}) {
  const dot = dark ? "rgba(255,255,255,0.10)" : "rgba(33,33,90,0.10)";
  const ring = dark ? "border-white/10" : "border-navy/10";
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      {/* dotted grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(${dot} 1.2px, transparent 1.2px)`,
          backgroundSize: "26px 26px",
          maskImage:
            "radial-gradient(ellipse at center, black 30%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, black 30%, transparent 75%)",
        }}
      />
      {/* floating outlined shapes */}
      <div
        className={cn(
          "absolute -left-10 top-10 h-40 w-40 animate-float rounded-3xl border",
          ring
        )}
      />
      <div
        className={cn(
          "absolute right-8 top-1/2 h-24 w-24 animate-float rounded-full border [animation-delay:-2s]",
          ring
        )}
      />
      <div
        className={cn(
          "absolute bottom-8 left-1/3 h-16 w-16 animate-float rotate-12 border [animation-delay:-4s]",
          ring
        )}
      />
    </div>
  );
}

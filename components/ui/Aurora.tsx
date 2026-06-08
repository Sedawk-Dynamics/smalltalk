"use client";

/**
 * Ambient aurora layer for LIGHT sections — soft drifting colour fields +
 * a faint tech grid. Drop inside a `relative` section; it fills it (absolute).
 * Low opacity so it adds depth without fighting foreground content.
 */
import { cn } from "@/lib/utils";

export default function Aurora({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 -z-0 overflow-hidden",
        className
      )}
    >
      <div className="absolute -left-32 top-[-20%] h-[34rem] w-[34rem] animate-mesh-drift rounded-full bg-glow/15 blur-[130px]" />
      <div className="absolute right-[-10%] top-1/4 h-[30rem] w-[30rem] animate-mesh-drift rounded-full bg-cyan/12 blur-[130px] [animation-delay:-6s]" />
      <div className="absolute bottom-[-20%] left-1/3 h-[28rem] w-[28rem] animate-mesh-drift rounded-full bg-indigo-500/10 blur-[130px] [animation-delay:-12s]" />

      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(var(--navy) 1px, transparent 1px), linear-gradient(90deg, var(--navy) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          maskImage:
            "radial-gradient(ellipse at 50% 0%, black 10%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at 50% 0%, black 10%, transparent 75%)",
        }}
      />
    </div>
  );
}

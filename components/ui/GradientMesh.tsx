"use client";

/**
 * Animated navy/indigo gradient-mesh background — soft drifting blobs.
 * Lives behind dark sections (hero, CTA). Pure CSS, GPU-cheap.
 */
import { cn } from "@/lib/utils";

export default function GradientMesh({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      <div className="absolute -left-20 top-0 h-[40rem] w-[40rem] animate-mesh-drift rounded-full bg-glow/30 blur-[120px]" />
      <div className="absolute right-0 top-1/3 h-[34rem] w-[34rem] animate-mesh-drift rounded-full bg-cyan/20 blur-[120px] [animation-delay:-6s]" />
      <div className="absolute bottom-0 left-1/3 h-[30rem] w-[30rem] animate-mesh-drift rounded-full bg-indigo-500/20 blur-[120px] [animation-delay:-12s]" />
    </div>
  );
}

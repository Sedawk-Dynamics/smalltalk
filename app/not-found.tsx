import Link from "next/link";
import { TeeMotif } from "@/components/ui/Logo";
import MagneticButton from "@/components/ui/MagneticButton";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[80svh] flex-col items-center justify-center overflow-hidden bg-navy px-6 text-center text-white">
      <div className="pointer-events-none absolute inset-0 opacity-50">
        <div className="absolute left-1/4 top-1/3 h-72 w-72 animate-mesh-drift rounded-full bg-glow/30 blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 h-72 w-72 animate-mesh-drift rounded-full bg-cyan/20 blur-[120px]" />
      </div>
      <TeeMotif className="relative h-14 w-14 text-glow" />
      <h1 className="relative mt-6 font-display text-7xl font-bold tracking-tightest sm:text-9xl">
        404
      </h1>
      <p className="relative mt-3 max-w-sm text-white/70">
        This page slipped out of the wardrobe. Let&apos;s get you back to
        something that fits.
      </p>
      <div className="relative mt-8 flex gap-3">
        <MagneticButton href="/" variant="light">
          Back Home
        </MagneticButton>
        <Link
          href="/shop"
          className="rounded-full border border-white/25 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10"
        >
          Shop
        </Link>
      </div>
    </section>
  );
}

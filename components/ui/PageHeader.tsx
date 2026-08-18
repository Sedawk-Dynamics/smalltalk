"use client";

/** Reusable dark page header (breadcrumb + title + subtitle). */
import Link from "next/link";
import GradientMesh from "./GradientMesh";
import SplitText from "./SplitText";
import { Reveal } from "./Reveal";
import { cn } from "@/lib/utils";

export default function PageHeader({
  title,
  subtitle,
  breadcrumb,
  highlight = [],
  solid = false,
}: {
  title: string;
  subtitle?: string;
  breadcrumb?: { label: string; href: string }[];
  highlight?: number[];
  /** Solid logo-navy background (#252464), no gradient mesh (client request). */
  solid?: boolean;
}) {
  return (
    <section
      className={cn(
        "relative -mt-20 overflow-hidden pb-16 pt-32 text-white lg:pb-20 lg:pt-40",
        solid ? "bg-[#252464]" : "bg-navy"
      )}
    >
      {!solid && <GradientMesh />}
      <div className="container-st relative">
        {breadcrumb && (
          <Reveal>
            <nav className="mb-5 flex items-center gap-2 text-xs text-white/50">
              {breadcrumb.map((b, i) => (
                <span key={b.href} className="flex items-center gap-2">
                  <Link href={b.href} className="transition hover:text-white">
                    {b.label}
                  </Link>
                  {i < breadcrumb.length - 1 && <span>/</span>}
                </span>
              ))}
            </nav>
          </Reveal>
        )}
        <h1 className="max-w-3xl font-display text-4xl font-bold leading-[1.05] tracking-tightest sm:text-6xl">
          <SplitText text={title} highlight={highlight} />
        </h1>
        {subtitle && (
          <Reveal delay={0.15}>
            <p className="mt-5 max-w-xl text-base text-white/70 sm:text-lg">
              {subtitle}
            </p>
          </Reveal>
        )}
      </div>
    </section>
  );
}

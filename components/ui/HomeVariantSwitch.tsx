"use client";

/**
 * Floating A/B switcher so the client can flip between the two home-page
 * layouts while a final design is being chosen. Only appears on / and /v2.
 */
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Layers } from "lucide-react";
import { cn } from "@/lib/utils";

export default function HomeVariantSwitch() {
  const pathname = usePathname();
  const options = [
    { label: "A", href: "/", title: "Variation A — Cinematic" },
    { label: "B", href: "/v2", title: "Variation B — Editorial" },
  ];

  return (
    <div className="fixed bottom-6 left-6 z-[120] flex items-center gap-2 rounded-full border border-navy/10 bg-white/80 p-1.5 pl-3 shadow-soft backdrop-blur-xl">
      <Layers className="h-4 w-4 text-navy" />
      <span className="hidden text-xs font-semibold uppercase tracking-wider text-mist sm:inline">
        Layout
      </span>
      <div className="flex items-center gap-1">
        {options.map((o) => {
          const active = pathname === o.href;
          return (
            <Link
              key={o.href}
              href={o.href}
              title={o.title}
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold transition-colors",
                active
                  ? "bg-navy text-white shadow-card"
                  : "text-navy hover:bg-navy/5"
              )}
            >
              {o.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

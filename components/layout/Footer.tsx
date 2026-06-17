"use client";

/** Site footer: brand-motif divider, link columns, socials, payment + legal. */
import Link from "next/link";
import {
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Twitter,
  Youtube,
} from "lucide-react";
import Logo, { TeeMotif } from "@/components/ui/Logo";
import PaymentBadges from "@/components/ui/PaymentBadges";
import { brand, footerColumns, socials } from "@/data/content";

const socialIcon: Record<string, React.ElementType> = {
  Instagram,
  Facebook,
  Twitter,
  Youtube,
};

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink text-white">
      {/* Brand motif divider */}
      <div className="flex items-center gap-4 px-6 py-6 opacity-30">
        <span className="h-px flex-1 bg-white/20" />
        <TeeMotif className="h-6 w-6 text-glow" />
        <span className="h-px flex-1 bg-white/20" />
      </div>

      <div className="container-st grid gap-x-8 gap-y-12 pb-12 pt-6 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr_1fr_1.3fr]">
        {/* Brand + newsletter */}
        <div className="space-y-5">
          <Logo variant="light" className="h-10 w-auto" />
          <p className="max-w-xs text-sm leading-relaxed text-white/60">
            Premium everyday apparel — honest pricing, no compromise.
          </p>
        </div>

        {/* Link columns */}
        {Object.entries(footerColumns).map(([title, links]) => (
          <div key={title}>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white/90">
              {title}
            </h4>
            <ul className="space-y-2.5">
              {links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-white/55 transition-colors hover:text-white"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Contact */}
        <div>
          <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white/90">
            Contact
          </h4>
          <ul className="space-y-3 text-sm text-white/55">
            <li className="flex gap-2.5">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-glow" />
              <span>{brand.address}</span>
            </li>
            <li>
              <a
                href={`tel:${brand.phone.replace(/\s/g, "")}`}
                className="flex items-center gap-2.5 transition-colors hover:text-white"
              >
                <Phone className="h-4 w-4 shrink-0 text-glow" />
                {brand.phone}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${brand.email}`}
                className="flex items-center gap-2.5 transition-colors hover:text-white"
              >
                <Mail className="h-4 w-4 shrink-0 text-glow" />
                {brand.email}
              </a>
            </li>
            <li className="text-xs text-white/40">Hours: {brand.hours}</li>
          </ul>

          {/* Socials */}
          <div className="mt-5 flex gap-2">
            {socials.map((s) => {
              const Icon = socialIcon[s.icon] ?? Instagram;
              return (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/70 transition-all hover:border-glow hover:bg-glow hover:text-white"
                >
                  <Icon className="h-4 w-4" />
                </a>
              );
            })}
          </div>
        </div>
      </div>

      {/* Payment badges + legal */}
      <div className="border-t border-white/10">
        <div className="container-st flex flex-col items-center justify-between gap-4 py-6 text-xs text-white/45 sm:flex-row">
          <p>
            © 2026 {brand.legalEntity}. All rights reserved.{" "}
            <span className="text-white/30">GSTIN: {brand.gstin}</span>
          </p>
          <PaymentBadges />
          <div className="flex flex-wrap gap-x-4 gap-y-1">
            <Link href="/terms" className="hover:text-white">
              Terms
            </Link>
            <Link href="/privacy" className="hover:text-white">
              Privacy
            </Link>
            <Link href="/refund" className="hover:text-white">
              Refund
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

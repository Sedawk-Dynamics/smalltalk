/**
 * Shared renderer for legal documents (Terms / Privacy / Refund).
 * Styled to match the site. Server component — no client JS needed.
 */
import Link from "next/link";
import { AlertTriangle } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { brand } from "@/data/content";
import type { LegalDoc } from "@/data/legal";

export default function LegalPage({ doc }: { doc: LegalDoc }) {
  return (
    <>
      <PageHeader
        title={doc.title}
        subtitle={doc.intro}
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: doc.title, href: `/${doc.slug}` },
        ]}
      />

      <section className="container-st py-14 lg:py-20">
        <div className="mx-auto max-w-3xl">
          {/* Needs-legal-review notice (visible to the client) */}
          <div className="mb-10 flex gap-3 rounded-2xl border border-glow/30 bg-glow/5 p-4 text-sm text-ink">
            <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-glow" />
            <p>
              <strong>Draft for review — not legal advice.</strong> This document
              is an initial draft and must be reviewed and finalised by a
              qualified lawyer before publishing. {doc.updated}.
            </p>
          </div>

          <div className="space-y-8">
            {doc.sections.map((s, i) => (
              <Reveal key={s.heading} delay={Math.min(i * 0.03, 0.2)}>
                <div>
                  <h2 className="font-display text-xl font-bold text-ink">
                    {s.heading}
                  </h2>
                  {s.body.map((p, j) => (
                    <p
                      key={j}
                      className="mt-3 text-[15px] leading-relaxed text-mist"
                    >
                      {p}
                    </p>
                  ))}
                </div>
              </Reveal>
            ))}
          </div>

          {/* Cross-links */}
          <div className="mt-12 flex flex-wrap gap-x-6 gap-y-2 border-t border-navy/10 pt-6 text-sm">
            <span className="text-mist">Related:</span>
            <Link href="/terms" className="text-navy hover:text-glow">
              Terms &amp; Conditions
            </Link>
            <Link href="/privacy" className="text-navy hover:text-glow">
              Privacy Policy
            </Link>
            <Link href="/refund" className="text-navy hover:text-glow">
              Refund &amp; Cancellation
            </Link>
            <Link href="/contact" className="text-navy hover:text-glow">
              Contact us
            </Link>
          </div>

          <p className="mt-6 text-xs text-mist">
            {brand.legalEntity} · {brand.address} · GSTIN {brand.gstin}
          </p>
        </div>
      </section>
    </>
  );
}

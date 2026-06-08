import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageHeader from "@/components/ui/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import MagneticButton from "@/components/ui/MagneticButton";
import { supportPages, type SupportSlug } from "@/data/support";

type Params = { params: { slug: string } };

export function generateStaticParams() {
  return Object.keys(supportPages).map((slug) => ({ slug }));
}

export function generateMetadata({ params }: Params): Metadata {
  const page = supportPages[params.slug as SupportSlug];
  if (!page) return { title: "Not found" };
  return { title: page.title, description: page.subtitle };
}

export default function SupportPage({ params }: Params) {
  const page = supportPages[params.slug as SupportSlug];
  if (!page) notFound();

  return (
    <>
      <PageHeader
        title={page.title}
        subtitle={page.subtitle}
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: page.title, href: `/support/${params.slug}` },
        ]}
      />
      <section className="container-st py-16 lg:py-24">
        <div className="mx-auto max-w-3xl space-y-4">
          {page.sections.map((s, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <details className="group rounded-2xl border border-navy/10 bg-white p-6 [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex cursor-pointer items-center justify-between font-display text-lg font-semibold text-ink">
                  {s.q}
                  <span className="ml-4 text-2xl text-glow transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 leading-relaxed text-mist">{s.a}</p>
              </details>
            </Reveal>
          ))}
        </div>

        <div className="mt-14 text-center">
          <p className="text-mist">Still have a question?</p>
          <div className="mt-4 flex justify-center">
            <MagneticButton href="/contact">Contact Us</MagneticButton>
          </div>
        </div>
      </section>
    </>
  );
}

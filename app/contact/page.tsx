import type { Metadata } from "next";
import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import ContactForm from "@/components/contact/ContactForm";
import { Reveal } from "@/components/ui/Reveal";
import { brand } from "@/data/content";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with The Small Talk Store — Pitampura, New Delhi. Call, WhatsApp, or send us a message.",
};

export default function ContactPage() {
  const details = [
    {
      icon: MapPin,
      label: "Visit us",
      value: brand.address,
    },
    {
      icon: Phone,
      label: "Call / WhatsApp",
      value: brand.phone,
      href: `tel:${brand.phone.replace(/\s/g, "")}`,
    },
    {
      icon: Mail,
      label: "Email",
      value: brand.email,
      href: `mailto:${brand.email}`,
    },
    { icon: Clock, label: "Working hours", value: brand.hours },
  ];

  return (
    <>
      <PageHeader
        title="Let's talk."
        highlight={[1]}
        subtitle="Questions about sizing, orders, or wholesale? We'd love to hear from you."
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Contact", href: "/contact" },
        ]}
      />

      <section className="container-st grid gap-12 py-16 lg:grid-cols-[1fr_1.1fr] lg:py-24">
        {/* Details */}
        <div>
          <h2 className="font-display text-2xl font-bold tracking-tighter text-ink sm:text-3xl">
            Reach us directly
          </h2>
          <p className="mt-3 text-mist">
            {brand.name} · {brand.legalEntity}
          </p>

          <ul className="mt-8 space-y-5">
            {details.map((d) => (
              <Reveal key={d.label}>
                <li className="flex gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-navy/5 text-navy">
                    <d.icon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-mist">
                      {d.label}
                    </p>
                    {d.href ? (
                      <a
                        href={d.href}
                        className="font-medium text-ink transition hover:text-navy"
                      >
                        {d.value}
                      </a>
                    ) : (
                      <p className="font-medium text-ink">{d.value}</p>
                    )}
                  </div>
                </li>
              </Reveal>
            ))}
          </ul>

          <a
            href={`https://wa.me/${brand.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-sm font-semibold text-white transition hover:brightness-95"
          >
            <MessageCircle className="h-5 w-5" /> Chat on WhatsApp
          </a>

          <p className="mt-6 text-xs text-mist">GSTIN: {brand.gstin}</p>
        </div>

        {/* Form */}
        <div className="rounded-3xl border border-navy/10 bg-cream p-6 sm:p-8">
          <h2 className="mb-6 font-display text-xl font-bold text-ink">
            Send a message
          </h2>
          <ContactForm />
        </div>
      </section>

      {/* Map */}
      <section className="container-st pb-20">
        <div className="overflow-hidden rounded-3xl border border-navy/10">
          <iframe
            title="The Small Talk Store location"
            src={brand.mapEmbedSrc}
            className="h-[400px] w-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>
    </>
  );
}

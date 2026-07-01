import type { Metadata, Viewport } from "next";
import { Syne, Manrope } from "next/font/google";
import "./globals.css";
import Providers from "@/components/providers/Providers";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import { brand } from "@/data/content";

/**
 * Typography — single source of truth (next/font → CSS vars → Tailwind
 * `font-display` / `font-body`). Change the pairing here and it updates
 * everywhere.
 *   Headings → Syne (distinctive, editorial, fashion-forward display)
 *   Body     → Manrope (clean, modern, highly legible)
 *
 * NOTE(client-confirm): Typeface direction — confirm or replace with the
 * brand's chosen fonts (swap the two imports below; nothing else changes).
 */
const display = Syne({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  // variable font — full weight range loaded; no `weight` needed
});
const body = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(brand.url),
  title: {
    default: `${brand.name} — Wear confidence. Look like you mean business.`,
    template: `%s · ${brand.name}`,
  },
  description: brand.tagline + " Premium everyday apparel — without the premium price.",
  keywords: [
    "premium t-shirts",
    "polos",
    "everyday apparel",
    "affordable premium clothing",
    "The Small Talk Store",
  ],
  authors: [{ name: brand.legalEntity }],
  openGraph: {
    type: "website",
    url: brand.url,
    title: `${brand.name} — Wear confidence. Look like you mean business.`,
    description: "Premium everyday apparel — without the premium price.",
    siteName: brand.name,
    images: [{ url: "/og-image.svg", width: 1200, height: 630, alt: brand.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${brand.name}`,
    description: "Premium everyday apparel — without the premium price.",
    images: ["/og-image.svg"],
  },
  alternates: { canonical: brand.url },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#15153C",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Organization JSON-LD for SEO.
  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: brand.name,
    legalName: brand.legalEntity,
    url: brand.url,
    logo: `${brand.url}/icon.svg`,
    email: brand.email,
    telephone: brand.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: "C-182 Pushpanjali Enclave, Pitampura",
      addressLocality: "New Delhi",
      postalCode: "110034",
      addressCountry: "IN",
    },
    sameAs: [
      "https://instagram.com",
      "https://facebook.com",
      "https://twitter.com",
    ],
  };

  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body className="grain">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <Providers>
          <AnnouncementBar />
          <Navbar />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}

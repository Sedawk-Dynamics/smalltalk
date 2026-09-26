import type { Metadata, Viewport } from "next";
import { Syne, Manrope } from "next/font/google";
import "./globals.css";
import Providers from "@/components/providers/Providers";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import { brand, socials, seo } from "@/data/content";

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

// Canonical URLs are set per page (never here) — a canonical in the root
// layout is inherited by every page and tells Google they're all the home page.
export const metadata: Metadata = {
  metadataBase: new URL(brand.url),
  title: {
    default: seo.title,
    template: `%s | ${brand.name}`,
  },
  description: seo.description,
  applicationName: brand.name,
  keywords: [
    "The Small Talk Store",
    "Small Talk Store",
    "Small Talk",
    "thesmalltalkstore",
    "Small Talk Garment",
    "Small Talk t-shirts",
    "premium t-shirts India",
    "oversized t-shirts",
    "cotton polo t-shirts",
    "polo t-shirts for men",
    "kids t-shirts",
    "affordable premium clothing",
  ],
  authors: [{ name: brand.legalEntity }],
  creator: brand.legalEntity,
  publisher: brand.legalEntity,
  category: "shopping",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "/",
    title: seo.title,
    description: seo.description,
    siteName: brand.name,
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: brand.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: seo.title,
    description: seo.description,
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  ...(brand.googleSiteVerification && {
    verification: { google: brand.googleSiteVerification },
  }),
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
  // Only real profile links (not bare placeholder domains) belong in sameAs.
  const sameAs = socials
    .map((s) => s.href)
    .filter((href) => new URL(href).pathname.replace(/\/$/, "") !== "");

  // Organization + WebSite JSON-LD. WebSite.name/alternateName is what Google
  // uses for the site name shown above the result.
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "OnlineStore",
        "@id": `${brand.url}/#organization`,
        name: brand.name,
        alternateName: ["Small Talk Store", "Small Talk", "The Small Talk"],
        legalName: brand.legalEntity,
        url: `${brand.url}/`,
        logo: `${brand.url}/Logo.png`,
        image: `${brand.url}/og-image.jpg`,
        description: seo.description,
        email: brand.email,
        telephone: brand.phone,
        vatID: brand.gstin,
        address: {
          "@type": "PostalAddress",
          streetAddress: "C-182 Pushpanjali Enclave, Pitampura",
          addressLocality: "New Delhi",
          addressRegion: "Delhi",
          postalCode: "110034",
          addressCountry: "IN",
        },
        contactPoint: {
          "@type": "ContactPoint",
          telephone: brand.phone,
          email: brand.email,
          contactType: "customer service",
          areaServed: "IN",
          availableLanguage: ["English", "Hindi"],
        },
        ...(sameAs.length > 0 && { sameAs }),
      },
      {
        "@type": "WebSite",
        "@id": `${brand.url}/#website`,
        name: brand.name,
        alternateName: ["Small Talk Store", "Small Talk", "thesmalltalkstore.com"],
        url: `${brand.url}/`,
        inLanguage: "en-IN",
        publisher: { "@id": `${brand.url}/#organization` },
      },
    ],
  };

  return (
    <html lang="en-IN" className={`${display.variable} ${body.variable}`}>
      <body className="grain">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
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

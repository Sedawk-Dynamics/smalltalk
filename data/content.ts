/**
 * ============================================================
 * THE SMALL TALK STORE — single source of truth for all copy.
 * Edit text/brand details here; products live in products.json.
 * ============================================================
 */

import productsJson from "./products.json";

export type Product = {
  slug: string;
  name: string;
  category: "Tees" | "Polos" | string;
  price: number;
  compareAtPrice?: number;
  currency: string;
  badge?: string;
  shortDescription: string;
  description: string;
  colors: string[];
  sizes: string[];
  fabric: string;
  fit: string;
  featured: boolean;
  rating: number;
  reviews: number;
  /** Real photography (CDN). SmartImage falls back to `images` (SVG) on error. */
  photos?: string[];
  images: string[];
};

export const products = productsJson as Product[];

export const getProduct = (slug: string) =>
  products.find((p) => p.slug === slug);

export const featuredProducts = products.filter((p) => p.featured);

/* ============================================================
   PRODUCT SPECIFICATIONS · SIZE GUIDE · CARE  (Item 6)
   Data-driven from confirmed facts already on the site
   (100% cotton, GSM from `fabric`, Made in India / Delhi) plus
   observable garment features. Anything not yet confirmed by the
   client is marked "TBD — confirm with client".
   ============================================================ */

/** Build a consistent spec list for any product from confirmed/derived data. */
export function getProductSpecs(p: Product): { label: string; value: string }[] {
  const gsm = p.fabric.match(/(\d+)\s*GSM/i)?.[1] ?? null;
  const composition = p.fabric.split(",")[0].trim();
  const isPolo = p.category === "Polos";
  return [
    { label: "Composition", value: composition }, // confirmed (from product fabric)
    ...(gsm ? [{ label: "Fabric weight", value: `${gsm} GSM` }] : []),
    { label: "Knit", value: isPolo ? "Cotton piqué" : "Single jersey" },
    { label: "Fit", value: p.fit },
    {
      label: isPolo ? "Collar" : "Neckline",
      value: isPolo ? "Ribbed collar · 2-button placket" : "Ribbed crew neck",
    },
    { label: "Sleeve", value: "Short sleeve" },
    { label: "Finish", value: "Pre-shrunk · colourfast" }, // already claimed in product copy
    { label: "Country of origin", value: "Made in India · New Delhi" }, // confirmed
    { label: "Wash care", value: "Machine wash cold, inside-out" },
  ];
}

/** Size guide (garment measurements, inches).
 *  TBD — confirm exact measurements with client before publishing. */
export const sizeChartByCategory: Record<
  string,
  { sizes: string[]; rows: { label: string; values: number[] }[] }
> = {
  Tees: {
    sizes: ["S", "M", "L", "XL", "XXL"],
    rows: [
      { label: "Chest", values: [38, 40, 42, 44, 46] },
      { label: "Length", values: [27, 28, 29, 30, 31] },
      { label: "Shoulder", values: [16.5, 17.5, 18.5, 19.5, 20.5] },
    ],
  },
  Polos: {
    sizes: ["S", "M", "L", "XL", "XXL"],
    rows: [
      { label: "Chest", values: [38, 40, 42, 44, 46] },
      { label: "Length", values: [27.5, 28.5, 29.5, 30.5, 31.5] },
      { label: "Shoulder", values: [16.5, 17.5, 18.5, 19.5, 20.5] },
    ],
  },
};

export const getSizeChart = (p: Product) =>
  sizeChartByCategory[p.category] ?? sizeChartByCategory.Tees;

/** Care instructions (cotton). Same across the cotton range. */
export const careInstructions = [
  "Machine wash cold (max 30°C) with similar colours.",
  "Turn inside-out before washing to protect the surface.",
  "Do not bleach. Use a mild detergent.",
  "Tumble dry low or line dry in shade.",
  "Warm iron if needed; avoid ironing over any print.",
];

/* ---------------- BRAND ---------------- */
export const brand = {
  name: "The Small Talk Store",
  legalEntity: "Small Talk Garment LLP",
  domain: "thesmalltalkstore.com",
  url: "https://thesmalltalkstore.com",
  tagline: "Wear confidence. Look like you mean business.",
  positioning:
    "Quality is not just about price — it's about how it makes you feel.",
  // Contact
  address: "C-182 Pushpanjali Enclave, Pitampura, New Delhi 110034",
  phone: "+91 8595382034",
  whatsapp: "918595382034", // digits only, for wa.me link
  email: "info@thesmalltalkstore.com",
  enquiriesEmail: "info@thesmalltalkstore.com",
  hours: "9:00 AM – 5:00 PM",
  gstin: "07AFXFS8211B1ZS",
  // Map embed (Pitampura, New Delhi). Replace with the exact pin when available.
  mapEmbedSrc:
    "https://www.google.com/maps?q=Pushpanjali+Enclave+Pitampura+New+Delhi+110034&output=embed",
};

/* ---------------- HERO ----------------
   The brand message lives HERE and nowhere else — one bold headline + one
   supporting line. (Client feedback: state it once, prominently.) */
export const hero = {
  headline: "Wear confidence. Look like you mean business.",
  // Split into words for the kinetic reveal. Highlights: indexes 1 & 6.
  headlineWords: [
    "Wear",
    "confidence.",
    "Look",
    "like",
    "you",
    "mean",
    "business.",
  ],
  sub: "Premium everyday apparel — without the premium price.",
  longSub:
    "Premium everyday apparel — honest pricing, real confidence, no compromise.",
  ctaPrimary: { label: "Shop Now", href: "/shop" },
  ctaSecondary: { label: "Our Story", href: "/about" },
};

/* ---------------- MARQUEE ---------------- */
export const marqueeItems = [
  "Premium Quality",
  "Smart Pricing",
  "Everyday Confidence",
  "Casual yet Formal",
  "Made to Feel",
];

/* ---------------- BRAND INTRO (CEO feeling) ---------------- */
export const brandIntro = {
  eyebrow: "The CEO feeling",
  heading: "Not just clothing — a mindset.",
  body: "That quiet confidence. That presence. That “CEO energy” — without the need to overspend. Every piece is rooted in clean design, thoughtful fits, and premium-quality fabric, so when you wear it, you don't just look put-together, you feel it.",
};

/* ---------------- WHY CHOOSE US ---------------- */
export const whyChooseUs = [
  {
    title: "High Quality Fabrics",
    description: "Premium materials in every piece.",
    icon: "Sparkles",
  },
  {
    title: "Everyday Fashion",
    description: "Versatile staples for any moment.",
    icon: "Shirt",
  },
  {
    title: "Casual yet Formal Looks",
    description: "Bridge comfort and confidence.",
    icon: "Briefcase",
  },
];

/* ---------------- VALUES (count-up strip) ---------------- */
export const values = [
  { label: "Quality Products", value: 100, suffix: "%", hint: "Honestly made" },
  { label: "Comfort", value: 24, suffix: "/7", hint: "All-day wear" },
  { label: "Affordability", value: 0, suffix: "₹ premium tax", hint: "Smart pricing", isText: true },
];

// Simpler animated values strip used on home (icon + label).
export const valuePillars = [
  { title: "Quality Products", icon: "BadgeCheck" },
  { title: "Comfort", icon: "Feather" },
  { title: "Affordability", icon: "Wallet" },
];

/* ---------------- LOOKBOOK (horizontal pinned) ----------------
   `photo` = real CDN image; `image` = local SVG fallback (SmartImage).
   TODO(client-asset): Replace with brand creative (casual, everyday — NOT
   formal/boardroom). These are casual lifestyle placeholders. */
export const lookbook = [
  {
    title: "Off-Duty",
    caption: "Easy layers, zero effort.",
    photo: "https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?auto=format&fit=crop&w=900&q=80",
    image: "/lookbook/look-1.svg",
  },
  {
    title: "The Weekend",
    caption: "Tees built for ease.",
    photo: "https://images.unsplash.com/photo-1496346651646-50b4ca7d0f31?auto=format&fit=crop&w=900&q=80",
    image: "/lookbook/look-2.svg",
  },
  {
    title: "Out & About",
    caption: "Made for moving.",
    photo: "https://images.unsplash.com/photo-1488161628813-04466f872be2?auto=format&fit=crop&w=900&q=80",
    image: "/lookbook/look-3.svg",
  },
  {
    title: "The Off-Day",
    caption: "Comfort, elevated.",
    photo: "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=900&q=80",
    image: "/lookbook/look-4.svg",
  },
];

/* ---------------- EDITORIAL MEDIA (real photos + SVG fallbacks) ----------------
   TODO(client-asset): Replace every `*Photo` with casual, everyday brand
   photography (relaxed-but-sharp — no business-formal / corporate framing).
   SVG fallbacks are brand tee/polo mockups and are safe to keep. */
export const media = {
  heroPhoto:
    "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80",
  heroFallback: "/products/essential-tee-1.svg",
  brandIntroPhoto:
    "https://images.unsplash.com/photo-1492447166138-50c3889fccb1?auto=format&fit=crop&w=900&q=80",
  brandIntroFallback: "/lookbook/look-1.svg",
  aboutStoryPhoto:
    "https://images.unsplash.com/photo-1496346651646-50b4ca7d0f31?auto=format&fit=crop&w=1400&q=80",
  aboutStoryFallback: "/lookbook/look-2.svg",
  founderPhoto:
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=700&q=80",
  founderFallback: "/lookbook/look-3.svg",
};

/* ---------------- SHOP BY CATEGORY (circular tiles) ----------------
   `photo` = real CDN; `image` = local SVG fallback. */
export const categories = [
  {
    name: "Tees",
    blurb: "Everyday staples",
    href: "/shop?category=Tees",
    photo: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=500&q=80",
    image: "/products/essential-tee-1.svg",
  },
  {
    name: "Polos",
    blurb: "Casual yet formal",
    href: "/shop?category=Polos",
    photo: "https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?auto=format&fit=crop&w=500&q=80",
    image: "/products/premium-polo-1.svg",
  },
  {
    name: "New Arrivals",
    blurb: "Fresh drops",
    href: "/shop",
    photo: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=500&q=80",
    image: "/products/heavyweight-tee-1.svg",
  },
  {
    name: "Bestsellers",
    blurb: "Customer favourites",
    href: "/shop",
    photo: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=500&q=80",
    image: "/products/classic-crew-1.svg",
  },
];

/* ---------------- PROMOTIONAL BANNERS ---------------- */
export const promos = [
  {
    title: "Buy 2, Get 1 Free",
    sub: "Mix & match any tees. Limited time.",
    cta: { label: "Shop Tees", href: "/shop?category=Tees" },
    gradient: "from-navy via-indigo-700 to-glow",
    tag: "Combo Offer",
  },
  {
    title: "Flat ₹400 Off Polos",
    sub: "Elevate your collar game for less.",
    cta: { label: "Shop Polos", href: "/shop?category=Polos" },
    gradient: "from-ink via-navy to-cyan",
    tag: "Polo Edit",
  },
];

/* ---------------- COLLECTIONS (editorial bento grid) ---------------- */
export const collections = [
  {
    title: "The Polo Edit",
    caption: "Collars, done casually.",
    href: "/shop?category=Polos",
    span: "lg:col-span-2 lg:row-span-2",
    photo: "https://images.unsplash.com/photo-1503341504253-dff4815485f1?auto=format&fit=crop&w=1100&q=80",
    image: "/lookbook/look-1.svg",
  },
  {
    title: "Weekend Casual",
    caption: "Off-duty, on point.",
    href: "/shop?category=Tees",
    span: "",
    photo: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&w=700&q=80",
    image: "/lookbook/look-2.svg",
  },
  {
    title: "Heavyweight Drop",
    caption: "Structured. Substantial.",
    href: "/shop/heavyweight-tee",
    span: "",
    photo: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=700&q=80",
    image: "/lookbook/look-3.svg",
  },
  {
    title: "Everyday Ready",
    caption: "Sorted for any day.",
    href: "/shop",
    span: "lg:col-span-2",
    photo: "https://images.unsplash.com/photo-1523398002811-999ca8dec234?auto=format&fit=crop&w=1100&q=80",
    image: "/lookbook/look-4.svg",
  },
];

/* ---------------- ABOUT ---------------- */
export const about = {
  story: [
    "We started with a simple idea — looking good shouldn't feel expensive, and quality shouldn't feel out of reach. In a world where fashion forces you to choose between comfort, style, or price, we decided to change the equation.",
    "Our journey begins with something familiar — the T-shirt. But not just any T-shirt. We've reimagined it to carry you from everyday moments to important ones, with ease, confidence, and style. Every piece is rooted in clean design, thoughtful fits, and premium-quality fabric — so when you wear it, you don't just look put-together, you feel it. That quiet confidence. That presence. That “CEO energy” — without the need to overspend.",
    "This brand is for the go-getters, the self-starters, and the everyday achievers. We're not just building clothing — we're building a mindset.",
  ],
  mission:
    "We believe everyone deserves well-made clothing without the premium price tag. Our mission is to deliver quality and honest style in every piece, while building a culture where we grow, care, and take ownership of the value we deliver.",
  vision:
    "To be a brand people trust and feel proud of — where everyone can find clothing that looks good, feels great, and fits their budget, without compromise.",
  valuesList: ["Quality Products", "Comfort", "Affordability"],
};

/* ---------------- FOUNDER ---------------- */
export const founder = {
  name: "Chirag Sethi",
  role: "Founder & Director",
  // Founder voice only — the brand headline lives once, in the hero.
  message:
    "We're not just building clothing — we're building a mindset. Quality everyone deserves, made honestly and priced fairly.",
};

/* ---------------- TEAM (About page) ---------------- */
export const team = [
  {
    name: "Chirag Sethi",
    role: "Director",
    email: "chirag.sethi@thesmalltalkstore.com",
    bio: "Sets the brand vision and obsesses over fit, fabric and the feeling each piece gives you.",
    focus: ["Brand", "Product", "Vision"],
  },
  {
    name: "Shweta Singh",
    role: "Director",
    email: "shweta.singh@thesmalltalkstore.com",
    bio: "Leads operations and customer experience — making sure quality and care show up in every order.",
    focus: ["Operations", "Experience", "Quality"],
  },
];

/* Founder credentials shown on the About founder band. */
export const founderHighlights = [
  { value: "2024", label: "Founded" },
  { value: "100%", label: "Cotton" },
  { value: "Delhi", label: "Made in India" },
];

/* ---------------- TESTIMONIALS ----------------
   ⚠️ PLACEHOLDERS — replace with real customer reviews. */
export const testimonials = [
  {
    quote:
      "The fabric genuinely feels premium and the fit is spot on. I bought one tee, came back for three more the same week.",
    name: "Aarav Mehta",
    role: "Bengaluru",
  },
  {
    quote:
      "Finally a polo I can wear to the office and to dinner without changing. Looks sharp, feels effortless.",
    name: "Ishita Rao",
    role: "Mumbai",
  },
  {
    quote:
      "Quality you'd expect at twice the price. The Small Talk Store nailed the everyday wardrobe.",
    name: "Kabir Singh",
    role: "New Delhi",
  },
];

/* ---------------- CTA BANNER ----------------
   Product-action focused (the brand message is carried once, by the hero). */
export const ctaBanner = {
  heading: "Start with the staples.",
  sub: "Premium tees and polos, priced honestly — built for every day.",
  cta: { label: "Shop Now", href: "/shop" },
};

/* ---------------- NAV + FOOTER ---------------- */
export const navLinks = [
  { label: "Home 1", href: "/" },
  { label: "Home 2", href: "/v2" },
  { label: "Shop", href: "/shop" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const announcement =
  "Free shipping on your first order  ·  New: Premium Tees & Polos";

export const footerColumns = {
  Shop: [
    { label: "Tees", href: "/shop?category=Tees" },
    { label: "Polos", href: "/shop?category=Polos" },
    { label: "All Products", href: "/shop" },
  ],
  Company: [
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
  Support: [
    { label: "Shipping", href: "/support/shipping" },
    { label: "Returns", href: "/support/returns" },
    { label: "FAQ", href: "/support/faq" },
  ],
  Legal: [
    { label: "Terms & Conditions", href: "/terms" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Refund & Cancellation", href: "/refund" },
  ],
};

export const socials = [
  { label: "Instagram", href: "https://instagram.com", icon: "Instagram" },
  { label: "Facebook", href: "https://facebook.com", icon: "Facebook" },
  { label: "Twitter", href: "https://twitter.com", icon: "Twitter" },
  { label: "YouTube", href: "https://youtube.com", icon: "Youtube" },
];

/* Format INR helper */
export const formatINR = (n: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(n);

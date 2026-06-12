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

/* ---------------- BRAND ---------------- */
export const brand = {
  name: "The Small Talk Store",
  legalEntity: "Small Talk Garment LLP",
  domain: "thesmalltalkstore.com",
  url: "https://thesmalltalkstore.com",
  tagline: "Wear confidence. Feel in control. Look like you mean business.",
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

/* ---------------- HERO ---------------- */
export const hero = {
  headline: "Wear confidence. Feel in control. Look like you mean business.",
  // Split into words for the kinetic reveal.
  headlineWords: [
    "Wear",
    "confidence.",
    "Feel",
    "in",
    "control.",
    "Look",
    "like",
    "you",
    "mean",
    "business.",
  ],
  sub: "Premium everyday apparel — without the premium price.",
  longSub:
    "We're building a modern apparel brand for people who value quality and smart spending — sharp looks, real confidence, no premium price tag.",
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
   `photo` = real CDN image; `image` = local SVG fallback (SmartImage). */
export const lookbook = [
  {
    title: "The Boardroom",
    caption: "Polos that read formal.",
    photo: "https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?auto=format&fit=crop&w=900&q=80",
    image: "/lookbook/look-1.svg",
  },
  {
    title: "The Weekend",
    caption: "Tees built for ease.",
    photo: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&w=900&q=80",
    image: "/lookbook/look-2.svg",
  },
  {
    title: "The Commute",
    caption: "From desk to dinner.",
    photo: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=80",
    image: "/lookbook/look-3.svg",
  },
  {
    title: "The Off-Day",
    caption: "Comfort, elevated.",
    photo: "https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=900&q=80",
    image: "/lookbook/look-4.svg",
  },
];

/* ---------------- EDITORIAL MEDIA (real photos + SVG fallbacks) ---------------- */
export const media = {
  heroPhoto:
    "https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&w=800&q=80",
  heroFallback: "/products/premium-polo-1.svg",
  brandIntroPhoto:
    "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=900&q=80",
  brandIntroFallback: "/lookbook/look-1.svg",
  aboutStoryPhoto:
    "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=1400&q=80",
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
    caption: "Collars that command the room.",
    href: "/shop?category=Polos",
    span: "lg:col-span-2 lg:row-span-2",
    photo: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=1100&q=80",
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
    title: "Workwear Ready",
    caption: "Desk to dinner, sorted.",
    href: "/shop",
    span: "lg:col-span-2",
    photo: "https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?auto=format&fit=crop&w=1100&q=80",
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
  message:
    "We're not just building clothing — we're building a mindset. Wear confidence. Feel in control. Look like you mean business.",
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

/* ---------------- CTA BANNER ---------------- */
export const ctaBanner = {
  heading: "Look like you mean business.",
  sub: "Premium everyday apparel, priced honestly. Start with the staples.",
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

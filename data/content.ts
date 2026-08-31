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
  /** Path on the WooCommerce shop (e.g. /product/joggers/) — cards link there. */
  url?: string;
  /** Real photography. SmartImage falls back to `images` on error. */
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

/* The WooCommerce shop — all commerce (shop, cart, checkout) lives there;
   this Next.js site is the brand frontend. Swap via env when the shop moves
   to its real domain (e.g. shop.thesmalltalkstore.com). */
export const shopUrl =
  process.env.NEXT_PUBLIC_SHOP_URL ?? "https://staging.smalltalks.sedawk.cloud";

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
  ctaPrimary: { label: "Shop Now", href: shopUrl },
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
    photo: "/SmallTalk Products/Tees/Oversized/Oversize Tee Background.webp",
    image: "/lookbook/look-1.svg",
  },
  {
    title: "The Weekend",
    caption: "Tees built for ease.",
    photo: "/SmallTalk Products/Tees/Comfort Everyday Tee/Comfort Tee Background.webp",
    image: "/lookbook/look-2.svg",
  },
  {
    title: "Out & About",
    caption: "Made for moving.",
    photo: "/SmallTalk Products/Joggers/Joggers Background.webp",
    image: "/lookbook/look-3.svg",
  },
  {
    title: "The Off-Day",
    caption: "Comfort, elevated.",
    photo: "/SmallTalk Products/Hoodies/Everyday Hoodies/Hoodie Background.webp",
    image: "/lookbook/look-4.svg",
  },
];

/* ---------------- EDITORIAL MEDIA (real photos + SVG fallbacks) ----------------
   TODO(client-asset): Replace every `*Photo` with casual, everyday brand
   photography (relaxed-but-sharp — no business-formal / corporate framing).
   SVG fallbacks are brand tee/polo mockups and are safe to keep. */
export const media = {
  heroPhoto: "/SmallTalk Products/Tees/Oversized/Oversize Tee front.webp",
  heroFallback: "/products/essential-tee-1.svg",
  brandIntroPhoto: "/SmallTalk Products/Polo/Polo Adults front.webp",
  brandIntroFallback: "/lookbook/look-1.svg",
  aboutStoryPhoto: "/SmallTalk Products/Tees/Oversized/Oversize Tee Background.webp",
  aboutStoryFallback: "/lookbook/look-2.svg",
  founderPhoto:
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=700&q=80",
  founderFallback: "/lookbook/look-3.svg",
};

/* ---------------- SHOP BY CATEGORY ----------------
   Compact pills (client: no big banner) — deep links into the WooCommerce
   product categories on the shop subdomain. */
export type ShopCategory = {
  name: string;
  href: string;
  children?: { name: string; href: string }[];
};

export const categories: ShopCategory[] = [
  {
    name: "Tees",
    href: `${shopUrl}/product-category/tees/`,
    children: [
      { name: "Everyday Essential Tee", href: `${shopUrl}/product-category/tees/everyday-essential-tee/` },
      { name: "Oversized Tee", href: `${shopUrl}/product-category/tees/oversized-tee/` },
    ],
  },
  { name: "Polos", href: `${shopUrl}/product-category/polos/` },
  {
    name: "Hoodies",
    href: `${shopUrl}/product-category/hoodies/`,
    children: [
      { name: "Everyday Hoodie", href: `${shopUrl}/product-category/hoodies/everyday-hoodie/` },
      { name: "Zipper Hoodie", href: `${shopUrl}/product-category/hoodies/zipper-hoodie/` },
    ],
  },
  { name: "Pullover", href: `${shopUrl}/product-category/pullover/` },
  { name: "Joggers", href: `${shopUrl}/product-category/joggers/` },
  {
    name: "Kids",
    href: `${shopUrl}/product-category/kids/`,
    children: [
      { name: "Kids Tee", href: `${shopUrl}/product-category/kids/everyday-tee/` },
      { name: "Kids Polo", href: `${shopUrl}/product-category/kids/polo/` },
      { name: "Kids Zipper Hoodie", href: `${shopUrl}/product-category/kids/zipper-hoodie-kids/` },
    ],
  },
];

/* ---------------- PROMOTIONAL BANNERS ---------------- */
export const promos = [
  {
    title: "Buy 2, Get 1 Free",
    sub: "Mix & match any tees. Limited time.",
    cta: { label: "Shop Tees", href: `${shopUrl}/product-category/tees/` },
    gradient: "from-navy via-indigo-700 to-glow",
    tag: "Combo Offer",
  },
  {
    title: "Flat ₹400 Off Polos",
    sub: "Elevate your collar game for less.",
    cta: { label: "Shop Polos", href: `${shopUrl}/product-category/polos/` },
    gradient: "from-ink via-navy to-cyan",
    tag: "Polo Edit",
  },
];

/* ---------------- COLLECTIONS (editorial bento grid) ---------------- */
export const collections = [
  {
    title: "The Polo Edit",
    caption: "Collars, done casually.",
    href: `${shopUrl}/product-category/polos/`,
    span: "lg:col-span-2 lg:row-span-2",
    photo: "/SmallTalk Products/Polo/Polo Adults Background.webp",
    image: "/lookbook/look-1.svg",
  },
  {
    title: "Weekend Casual",
    caption: "Off-duty, on point.",
    href: `${shopUrl}/product-category/tees/`,
    span: "",
    photo: "/SmallTalk Products/Tees/Comfort Everyday Tee/Comfort Tee Background.webp",
    image: "/lookbook/look-2.svg",
  },
  {
    title: "Heavyweight Drop",
    caption: "Structured. Substantial.",
    href: `${shopUrl}/product-category/tees/oversized-tee/`,
    span: "",
    photo: "/SmallTalk Products/Tees/Oversized/Oversize Tee Back.webp",
    image: "/lookbook/look-3.svg",
  },
  {
    title: "Everyday Ready",
    caption: "Sorted for any day.",
    href: shopUrl,
    span: "lg:col-span-2",
    photo: "/SmallTalk Products/Hoodies/Zipper Hoodies/Zipper Hoodie Background.webp",
    image: "/lookbook/look-4.svg",
  },
];

/* ---------------- ABOUT ----------------
   Copy updated per client review (Aug 2026). */
export const about = {
  story: [
    "Looking sharp shouldn't come with luxury markups, and everyday comfort should never be a compromise. We set out to fix that equation.",
    "We started with everyday wear, meticulously designed for modern life. Built with natural fabrics and comfort-driven fits, our products transition seamlessly from casual routines to key meetings.",
    "You get clean minimalist style, all-day comfort, and quiet confidence — without overpaying.",
    "This brand is for the go-getters, the self-starters, and the everyday achievers. We're not just building clothing — we're building a mindset.",
  ],
  // Client: call this "Reason for Being" instead of Mission.
  reasonForBeing:
    "To redefine the everyday wardrobe by making durable, comfortable, and minimalist style accessible to all at an honest accessible value.",
  // Client: call this "Aspiration" instead of Vision.
  aspiration:
    "To be a brand people trust and feel proud of, providing clothing that looks good, feels great, and delivers honest value - without compromise.",
  valuesList: [
    {
      title: "Uncompromising Quality",
      description:
        "Quality isn't optional. Built to last — craftsmanship perfected for everyday durability.",
    },
    {
      title: "Absolute Comfort",
      description: "Comfort fits and natural materials for seamless daily wear.",
    },
    {
      title: "Value",
      description:
        "Honest pricing that puts style, comfort & confidence within reach.",
    },
  ],
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
   ⚠️ PLACEHOLDERS — replace with real customer reviews as they come in.
   Ratings are per-review (mixed on purpose — a wall of 5 stars reads fake). */
export const testimonials = [
  {
    quote:
      "Ordered one Comfort Tee in black to test the quality. The stitching and fabric weight surprised me at this price — came back for two more the same week.",
    name: "Aarav Mehta",
    role: "Bengaluru",
    rating: 5,
  },
  {
    quote:
      "The polo collar actually holds its shape after washing, which is where most polos I've owned give up. Wish there were a couple more colour options though.",
    name: "Ishita Rao",
    role: "Mumbai",
    rating: 4,
  },
  {
    quote:
      "Quality you'd expect at twice the price. Wore the Executive Polo to a client meeting and straight to dinner — no complaints either place.",
    name: "Kabir Singh",
    role: "New Delhi",
    rating: 5,
  },
  {
    quote:
      "Bought the kids tee for my 9-year-old. Fabric is soft and survived a month of school and playground. Delivery took a day longer than promised, hence one star off.",
    name: "Priya Nair",
    role: "Kochi",
    rating: 4,
  },
  {
    quote:
      "The Oversize Tee has proper weight to it — drapes well instead of clinging. It's become my default for WFH days and errands.",
    name: "Rohan Deshpande",
    role: "Pune",
    rating: 5,
  },
  {
    quote:
      "Joggers are comfortable and the zip pocket is genuinely useful for keys on walks. Sizing runs slightly relaxed — I'd size down if you're between sizes.",
    name: "Meera Iyer",
    role: "Chennai",
    rating: 4,
  },
  {
    quote:
      "Got the hoodie for Delhi winters. Warm without being bulky, and no pilling after several washes so far. Solid basics, honestly priced.",
    name: "Arjun Malhotra",
    role: "Gurugram",
    rating: 5,
  },
  {
    quote:
      "Third order in two months. The consistency is what wins me over — every piece fits the same, washes the same, feels the same.",
    name: "Sneha Kulkarni",
    role: "Hyderabad",
    rating: 5,
  },
];

/* ---------------- CTA BANNER ----------------
   Product-action focused (the brand message is carried once, by the hero). */
export const ctaBanner = {
  heading: "Start with the staples.",
  sub: "Premium tees and polos, priced honestly — built for every day.",
  cta: { label: "Shop Now", href: shopUrl },
};

/* ---------------- NAV + FOOTER ---------------- */

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "Shop", href: shopUrl },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const announcement =
  "Free shipping on orders above ₹1,000  ·  New: Premium Tees & Polos";

export const footerColumns = {
  Shop: [
    { label: "Tees", href: `${shopUrl}/product-category/tees/` },
    { label: "Polos", href: `${shopUrl}/product-category/polos/` },
    { label: "Hoodies", href: `${shopUrl}/product-category/hoodies/` },
    { label: "Pullover", href: `${shopUrl}/product-category/pullover/` },
    { label: "Joggers", href: `${shopUrl}/product-category/joggers/` },
    { label: "Kids", href: `${shopUrl}/product-category/kids/` },
    { label: "All Products", href: shopUrl },
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

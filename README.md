# The Small Talk Store — Website

A futuristic, production-ready e‑commerce + brand website for **The Small Talk Store** (Small Talk Garment LLP). Premium, kinetic, confident — "CEO energy" — built to be fast, responsive, and accessible.

> Tagline: **Wear confidence. Feel in control. Look like you mean business.**

---

## ✨ Tech stack

| Area | Choice |
|---|---|
| Framework | **Next.js 14** (App Router) + React 18 + TypeScript |
| Styling | **Tailwind CSS** (brand tokens in `tailwind.config.ts`) |
| Animation | **Framer Motion** (reveals, page transitions, kinetic text) |
| Scroll FX | **GSAP + ScrollTrigger** (pinned horizontal lookbook) |
| Smooth scroll | **Lenis** (inertia scrolling, synced to GSAP) |
| Carousels | **Embla Carousel** (+ autoplay) for testimonials |
| Icons | **lucide-react** |
| Data | Local **JSON / TS** (`data/`) — no backend required |

> **3D note:** The brief listed `@react-three/fiber` as *optional* for a floating hero element. To keep installs fast and reliable, the hero ships with a premium animated **glass + parallax** visual instead. To add a real 3D tee later, install `three @react-three/fiber @react-three/drei` and lazy-load a `<Canvas>` into `components/home/Hero.tsx` (kept modular for exactly this).

---

## 🚀 Getting started

```bash
# 1. Install dependencies
npm install

# 2. Run the dev server
npm run dev
# → http://localhost:3000

# 3. Production build
npm run build && npm run start
```

Requires Node 18.17+ (Node 20/22 recommended).

---

## 🗂️ Project structure

```
app/
  layout.tsx            # Root layout: fonts, providers, navbar/footer, SEO + JSON-LD
  page.tsx              # Home (sections in brief order)
  globals.css           # Tailwind layers, grain/glow, cursor, reduced-motion
  icon.svg              # Favicon (brand motif)
  sitemap.ts / robots.ts / manifest.ts
  shop/                 # /shop (filters) + /shop/[slug] (product detail, SSG)
  about/  contact/  cart/
  support/[slug]/       # shipping / returns / faq (placeholder)
  not-found.tsx         # Branded 404
components/
  layout/               # Navbar, Footer, AnnouncementBar, CartDrawer, SearchModal
  home/                 # Hero, BrandIntro, FeaturedProducts, WhyChooseUs,
                        #   ValuesStrip, Lookbook, FounderMessage, Testimonials,
                        #   NewsletterBand, CTABanner
  shop/                 # ProductCard, QuickView, ShopClient, ProductDetail, RelatedProducts
  cart/                 # CartPageClient
  contact/              # ContactForm
  ui/                   # Buttons, Reveal, SplitText, Marquee, Logo, Preloader,
                        #   CustomCursor, GradientMesh, FloatingButtons, etc.
  providers/            # Cart, Toast, SmoothScroll (Lenis), Providers wrapper
data/
  products.json         # 👈 product catalogue
  content.ts            # 👈 ALL site copy + brand details (single source of truth)
  support.ts            # support page content
lib/                    # hooks (count-up, reduced-motion), utils
public/
  products/  lookbook/  og-image.svg  logo-motif.svg
scripts/gen-mockups.mjs # regenerates placeholder SVG mockups (safe to delete)
```

---

## ✍️ Where to edit content

- **All copy & brand info** (name, address, phone, email, GSTIN, hero text, mission, vision, founder, team, testimonials, footer links): [`data/content.ts`](data/content.ts)
- **Products** (name, price, sizes, colours, images, description): [`data/products.json`](data/products.json)
- **Support / FAQ**: [`data/support.ts`](data/support.ts)
- **Brand colours & fonts**: [`tailwind.config.ts`](tailwind.config.ts)

---

## 🎨 Brand tokens

| Token | Hex | Use |
|---|---|---|
| `navy` | `#21215A` | Backgrounds, headings, primary buttons |
| `ink` | `#15153B` | Deep sections, footer |
| `cream` | `#F7F6F2` | Light section backgrounds |
| `mist` | `#6B6B7B` | Muted body text |
| `glow` | `#5B5BF0` | Electric accent (glows/hover/focus) — *used sparingly* |
| `cyan` | `#3DD6D0` | Alt accent for gradient mesh / highlights |

Fonts use **Space Grotesk** (display) + **Inter** (body) via `next/font`. To switch to **Clash Display / Satoshi**, add them from [Fontshare](https://fontshare.com) and swap the `--font-display` / `--font-body` variables in `app/layout.tsx` + `globals.css`.

---

## ♿ Accessibility & motion

- Every animation respects **`prefers-reduced-motion`** (Lenis, cursor, reveals, marquee, preloader all fall back gracefully).
- Semantic HTML, keyboard-navigable, visible focus rings, ARIA labels on interactive controls, alt text on imagery.
- Custom cursor only activates on fine-pointer (desktop) devices.

---

## 🔁 ✅ Assets to replace (checklist)

The site runs immediately with **placeholder** assets. Swap these for production:

- [ ] **Logo** — replace `<Logo />` (`components/ui/Logo.tsx`) and `public/logo-motif.svg` / `app/icon.svg` with the official files. Note the t‑shirt‑collar **"a"** is used as a recurring motif (preloader, dividers, bullets, favicon, scroll cue).
- [ ] **Product photos** — replace generated SVGs in `public/products/*.svg` with real photography, then update the `images` arrays in `data/products.json`. (Add your image host to `next.config.mjs → images.remotePatterns` if remote.)
- [ ] **Lookbook images** — `public/lookbook/look-1..4.svg`.
- [ ] **OG / social image** — `public/og-image.svg` (1200×630). Consider a `.jpg/.png` for best compatibility.
- [ ] **Testimonials** — placeholder quotes in `data/content.ts` (clearly marked) → real verified reviews.
- [ ] **Map pin** — `brand.mapEmbedSrc` in `data/content.ts` → exact Google Maps embed for the office.
- [ ] **Domain** — `brand.url` in `data/content.ts` (used for canonical, OG, sitemap, JSON-LD).
- [ ] **Newsletter** — wire `components/ui/Newsletter.tsx` to your ESP (Mailchimp/Klaviyo) or an API route.
- [ ] **Contact form** — wire `components/contact/ContactForm.tsx` to a backend / form service.
- [ ] **Checkout** — `CartPageClient` checkout button is a demo. Integrate Razorpay/Stripe or migrate to Shopify/Medusa (cart API in `components/providers/CartProvider.tsx` is intentionally swap-friendly).

Search the codebase for `TODO:` to find every integration point.

---

## 🔍 SEO

- Per-page `<title>` / meta descriptions + Open Graph + Twitter cards.
- JSON-LD: `Organization` (layout) + `Product` (product pages).
- `sitemap.xml`, `robots.txt`, and a web manifest are generated automatically.

---

## 🛒 Cart

Global cart via React Context + `localStorage` persistence (`components/providers/CartProvider.tsx`). Add-to-cart, quick-view, slide-in drawer, free-shipping progress bar, and a full `/cart` page are all wired. The public API (`addItem` / `removeItem` / `updateQty`) is kept stable so you can replace the internals with Shopify/Medusa without touching components.

---

© 2026 Small Talk Garment LLP. All rights reserved · GSTIN 07AFXFS8211B1ZS

# The Small Talk Store — WoodMart shop skin setup

Goal: make `staging.smalltalks.sedawk.cloud` (WoodMart 8.2.6 + WooCommerce) feel like
the same website as the Next.js site — same colors, fonts, header, footer, and voice.

Two parts:
1. **Paste the CSS** (`small-talk-woodmart.css`) — does ~70% of the visual work.
2. **Theme settings + content below** — fonts, header builder, menus, logo, footer,
   which CSS can't fully do.

All selectors in the CSS were verified against the live staging DOM (WoodMart 8.2.6,
`woodmart-child` child theme active).

---

## Brand tokens (single source of truth = `tailwind.config.ts`)

| Token | Hex       | Used for                                        |
|-------|-----------|--------------------------------------------------|
| navy  | `#15153C` | Headings, primary buttons, links                 |
| ink   | `#0E0E2A` | Announcement bar, footer, deep sections          |
| cream | `#F7F6F2` | Page background, sticky-header glass, drawers    |
| mist  | `#6B6B7B` | Muted body text, breadcrumbs, meta               |
| glow  | `#5B5BF0` | Electric accent — sale labels, hovers, cart badge|
| cyan  | `#3DD6D0` | Alt accent — "New" labels, gradient washes       |

Fonts: **Syne** (headings, product titles — tight -0.03em tracking) · **Manrope**
(body, nav, buttons — sentence case, NO uppercase; buttons are full 999px pills with
a navy→indigo animated gradient).

---

## Step 0 — One-time fixes (staging is currently broken without these)

1. **Permalinks:** `Settings → Permalinks` → **Post name** → Save.
   Staging is on "Plain" — `/shop/` and all product URLs currently fall back to
   the front page.
2. **Homepage:** `Settings → Reading` → A static page → Homepage: **Shop**.
   The subdomain root must never show the imported food-delivery demo page.
3. **Currency:** `WooCommerce → Settings → General` → Indian rupee (₹) —
   matches the Next.js `formatINR` display. Demo products are in USD.

## Step 1 — Custom CSS

`WP Admin → Theme Settings → Custom CSS → Global CSS` → paste the whole of
`small-talk-woodmart.css`.
(Alternative: Appearance → Customize → Additional CSS — same effect.)

`small-talk-woodmart.css` is the canonical, complete file. If you already
pasted an earlier version, append only the delta files instead:
- `paste-2-header-footer.css` — floating pill header + footer styling
- `paste-3-shop-hero.css` — "The Collection" shop hero band (replaces the
  plain "Shop" title + demo category links with the Next.js PageHeader:
  navy mesh band, title, subtitle — all CSS, no admin changes needed)
- `paste-4-product-page.css` — single product page matching the Next.js
  ProductDetail: rounded-3xl gallery + thumb switcher, Syne title/price,
  pill qty + gradient add-to-cart, trust-badges row, accordion sections
  as rounded cards, related-products heading

## Step 2 — Typography (Theme Settings → Typography)

- **Text font:** Manrope — weight 400, color `#6B6B7B`
- **Titles/Headings font:** Syne — weight 700, color `#15153C`
- **Entities title (product/category titles):** Syne — weight 700
- **Main menu font (Advanced typography if needed):** Manrope, 14px, weight 500,
  sentence case (no uppercase)
- Both fonts are on Google Fonts (WoodMart's font picker has them). The child theme
  already enqueues them and the CSS also @imports them as a safety net.

## Step 3 — Colors (Theme Settings → Colors & Backgrounds)

- Primary color: `#5B5BF0`
- Secondary color: `#3DD6D0`
- Link color: `#15153C`, hover `#5B5BF0`
- Body/page background: `#F7F6F2` (CSS adds the indigo/cyan radial washes + film grain)
- Page title background: none/transparent — the shop title sits navy-on-cream,
  same as the Next.js page headers (CSS forces this over the demo's dark strip).

## Step 4 — General layout

- Site width: **1280px** (Theme Settings → General → Layout) — matches the
  Next.js `container-st`.
- Shop layout: sidebar left (the CSS styles it into the Next.js filter panel) or
  full-width with the category chips in the page title — both are skinned.
- Border radius: set the maximum available for blocks/forms (CSS enforces
  24px cards / 14px inputs / 999px buttons anyway).

## Step 5 — Header (Header Builder) — EXACT match

First: append **`paste-2-header-footer.css`** below the CSS already in
`Theme Settings → Custom CSS → Global CSS`. It turns the header row into the
Next.js floating cream glass pill (rounded-full, blur, soft shadow, transparent
row behind it) and styles the footer HTML from Step 6.

Then in `WP Admin → Header Builder`:

1. **Top bar** (~34px):
   - One centered Text element:
     `<span style="color:#3DD6D0">✦</span> Free shipping on your first order · New: Premium Tees &amp; Polos`
   - Background: `#0E0E2A`, white text (CSS forces it regardless).
2. **Main header** (~72px): Logo left · Menu center · icons right.
   - Logo: `logo-blue.png` from the Next.js repo (`public/`) — height ≈ 28–36px.
     (`logo-white.png` is for the footer.)
   - The pill look is automatic (CSS targets `.whb-general-header > .container`);
     set the row background to *none/transparent* in the builder if offered.
   - Enable **Sticky header** — the pill persists when stuck (CSS handles it).
   - Search icon + Cart icon; enable the **cart widget as side panel (drawer)** —
     mirrors the Next.js CartDrawer.
   - Button element: text **"Shop Now"** (no arrow — CSS appends the →),
     link `/shop/`, and set its **CSS class to `st-shop-btn`** — that class gets
     the indigo gradient pill + glow.
3. **Menu items** (Appearance → Menus) — same labels/order as the Next.js nav,
   absolute URLs back to the main site so both sites feel like one:

   | Label   | URL                                        |
   |---------|---------------------------------------------|
   | Home    | `https://thesmalltalkstore.com/`            |
   | Shop    | `/shop/` (this site)                        |
   | About   | `https://thesmalltalkstore.com/about`       |
   | Contact | `https://thesmalltalkstore.com/contact`     |

   The active item gets the indigo underline automatically (CSS styles
   `.current-menu-item`). Use the Vercel/staging URL of the Next.js site until
   the real domain is live. Later, point the **Shop** link in the Next.js nav
   (`data/content.ts → navLinks`) at the shop subdomain — only when the shop
   goes live on its real domain (e.g. `shop.thesmalltalkstore.com`).

## Step 6 — Footer — EXACT match

The Next.js footer (motif divider, 6-column grid, payment badges, WhatsApp
button) can't be rebuilt with stock widgets. Two ways to install it — the
Elementor template is the easiest:

### Option A — Elementor template import (recommended)

The file **`small-talk-footer-elementor.json`** is a ready-made Elementor
template: a full-width `#0E0E2A` section containing the complete footer with
its own scoped CSS (works even before the Custom CSS pastes).

1. `WP Admin → Templates → Saved Templates → Import Templates` → upload
   `small-talk-footer-elementor.json`.
2. `WoodMart → HTML Blocks → Add New` → name it "Footer" → Edit with Elementor
   → insert the imported template (folder icon → My Templates →
   "Small Talk — Footer") → Publish.
3. `Theme Settings → Footer` → set footer content to that **HTML Block**, and
   **disable the built-in "Copyrights" bar** (the template has its own).
4. Media → upload **`logo-white.png`** (from the Next.js repo `public/`), copy
   its URL, and in the template's HTML widget replace
   `REPLACE_WITH_LOGO_WHITE_URL` with it.

### Option B — Custom HTML widget

1. `Theme Settings → Footer`: enable footer, layout = **1 full-width column**,
   disable the built-in "Copyrights" bar.
2. Media → upload **`logo-white.png`**, copy its URL.
3. `Appearance → Widgets → Footer column 1` → add a **Custom HTML** widget →
   paste the whole of **`footer.html`** → replace `REPLACE_WITH_LOGO_WHITE_URL`.
   (Styling comes from `paste-2-header-footer.css`.)

Either way the footer contains: tee-motif divider, brand column + tagline,
SHOP / COMPANY / SUPPORT / LEGAL / CONTACT columns (main-site absolute links),
social circles, the `© 2026 Small Talk Garment LLP · GSTIN` bar with
VISA/Mastercard/RuPay/UPI/AMEX badges and Terms/Privacy/Refund links, plus the
floating WhatsApp button (`wa.me/918595382034`).

## Step 7 — WooCommerce specifics

- **Currency:** ₹ (Indian Rupee) — see Step 0.
- **Product images:** Customizer → WooCommerce → Product Images → crop **4:5**
  (the Next.js cards use `aspect-[4/5]`). Regenerate thumbnails after changing.
- **Products per row:** 3 desktop / 2 mobile; spacing 20–30 — matches the Next.js
  `grid-cols-2 md:grid-cols-3` shop grid.
- **Product hover:** "Standard" or "Quick" — the CSS adds the slow 1.05× zoom and
  the lift + indigo glow on the card. Avoid the busy "icons" hover.
- **Real products:** import **`smalltalk-products.csv`** — the client's full
  catalog (11 variable products, 211 Size × Color variations) as drafts:
  `Products → All Products → Import` → upload the CSV → mapping is automatic
  → Run. This also creates the categories (Tees · Polos · Hoodies &
  Sweatshirts · Joggers · Kids) and the global Size/Color attributes.
  Then per product: set the real price (placeholder is ₹999), add photos,
  and Publish. If using a sidebar, add the Product Categories widget — the
  CSS turns it into the Next.js pill chips.
- **Sale/New labels:** any label shape — CSS restyles them into brand pills
  (sale = indigo `#5B5BF0`, new = cyan `#3DD6D0`).
- **Favicon + site title:** same favicon as the Next.js site (`app/icon.svg`),
  site title "The Small Talk Store — Shop".
- Delete the WoodMart demo content (food-delivery pages/menus, furniture demo
  products, blog posts) once real products are in.

## Step 8 — Elementor pages on the shop (optional)

If the shop subdomain gets its own landing/lookbook page, reuse the Next.js patterns:
- Section headings: Syne 700, clamp ~32–64px, color `#15153C`, letter-spacing -0.04em
- Body: Manrope 400, color `#6B6B7B`
- Primary CTAs: 999px pill, background `#15153C` (CSS adds gradient + glow)
- Add the row class `st-wash` (defined in the CSS) for the local indigo/cyan
  radial-wash background used on the main site's sections.

## Step 9 — Complete WooCommerce configuration

Ordered checklist to take the store from "products imported" to "can sell".

1. **Publish the catalog.** For each of the 11 drafts: set the real price
   (placeholder ₹999), upload photos (variation images optional per color),
   Publish. Trash the last demo product ("Henectus tincidunt") and the demo
   "Accessories" category.
2. **General** (`WooCommerce → Settings → General`): Store address =
   C-182 Pushpanjali Enclave, Pitampura, New Delhi 110034 · Selling location:
   Sell to specific countries → India (widen later) · Currency ₹ (done).
3. **Products tab**: enable reviews + star ratings (the skin styles them).
   Units: kg / cm. Customizer → WooCommerce → Product Images → crop **4:5**,
   then install "Regenerate Thumbnails" plugin and run it.
4. **Shipping** (`Settings → Shipping`): Zone "India" → add **Free shipping**
   (min order ₹1499 — matches the "Free shipping ₹1499+" trust badge) + add
   **Flat rate** (e.g. ₹99) for orders below. The announcement bar's "free
   shipping on your first order" needs a first-order coupon: Marketing →
   Coupons → new coupon `FIRSTSHIP`, Free shipping ✓, usage limit 1 per user.
5. **Payments**: install the **Razorpay for WooCommerce** plugin (covers
   UPI / cards / RuPay / netbanking — matches the footer payment badges);
   connect it with keys from the Razorpay dashboard. Optionally enable
   **Cash on delivery**. Keep COD enabled while testing.
6. **Accounts & Privacy**: allow guest checkout ✓, allow account creation
   during checkout ✓, login at checkout ✓.
7. **Emails**: From name "The Small Talk Store", from address
   info@thesmalltalkstore.com. Base color `#15153C`, background `#F7F6F2`.
   Header image: upload `logo-blue.png` URL.
8. **Advanced**: cart/checkout/my-account pages already assigned. Create a
   local "Terms & Conditions" page (can simply link/summarize the main
   site's /terms) and select it — enables the checkout T&C checkbox.
9. **Taxes**: if invoicing with GST, enable taxes; enter prices inclusive of
   tax; exact garment GST slab per the client's CA. For GSTIN on invoices,
   add "PDF Invoices & Packing Slips for WooCommerce" and put
   `GSTIN: 07AFXFS8211B1ZS` in the invoice footer.
10. **Color swatches** (`Products → Attributes → Color → edit terms`):
    WoodMart adds a "Color" swatch field per term. Suggested hexes:
    Black #111111 · Dessert #C9A87C · Lagoon Blue #3E8E9E · Peacock Blue
    #1B6B7B · Rose Mist #D9A6A6 · Olive Green #6B7245 · Navy Blue #1F2A44 ·
    Kiwi Green #97C05C · Bottle Green #17493B · Maroon #6E1F2E · Asphalt
    #4A4A52 · White #FFFFFF · Grey #9A9A9A · Petrol Blue #2C5F6F · Old Navy
    #23395B · Moss Green #5A6E3A · Blue #2E4A8F · Smokey Blue #5F7085 ·
    Lilac #C8A2C8 · Teal #2A8E82 · Red #C0392B · Ocean Blue #2E7EB3 ·
    Cafe #8B6A50 · Sage Green #9CAF88. Then WoodMart → Theme Settings →
    Shop → enable swatches on grid/filters.
11. **Test order**: publish one product, buy it with COD end-to-end (add to
    cart → checkout → place order), confirm the order appears in
    WooCommerce → Orders and the confirmation email arrives, then cancel it.

---

## What was verified against staging

Injected the skin live into `staging.smalltalks.sedawk.cloud/?post_type=product`
and confirmed via computed styles: body/wrapper bg cream `#F7F6F2`, body font
Manrope, product titles Syne navy 15px, prices navy/Manrope-bold, add-to-cart
pill 999px with the navy→indigo gradient, cards 24px glass `rgba(255,255,255,.6)`
with glow hover, nav links Manrope 14px sentence-case, page-title strip removed
(transparent, navy Syne title), footer + copyright bar ink `#0E0E2A`, "New" label
cyan pill. Label markup on this build is `.product-labels .product-label`
(handled). No top-bar row exists yet (created in Step 5); no category widget in
the sidebar yet (Step 7).

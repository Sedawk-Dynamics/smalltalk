# The Small Talk Store — WoodMart shop skin setup

Goal: make `shop.thesmalltalkstore.com` (WoodMart 8.2.6 + WooCommerce,
food-delivery demo installed) feel like the same website as the Next.js site
(`www.thesmalltalkstore.com` → `thesmalltalkstore.com`). Shop-page and single-product
**structure** mirrors the Banarasi Vastram build; all **colors/typography** are
Small Talk.

Files here:
- `smalltalk-woodmart.css` — full skin (verified live against staging DOM)
- `smalltalk-product-layout-elementor.json` — single product layout template
  (sticky gallery + accordion, same structure as Banarasi)

---

## Brand tokens (source of truth = `tailwind.config.ts`)

| Token | Hex | Used for |
|---|---|---|
| navy | `#15153C` | Primary buttons, headings band, drawer |
| ink | `#0E0E2A` | Footer, headings, body text |
| cream | `#F7F6F2` | Page background (with cool radial tints) |
| mist | `#6B6B7B` | Muted text |
| glow | `#5B5BF0` | Electric accent — hovers, badges, links |
| cyan | `#3DD6D0` | Secondary accent — breadcrumb current, footer hover |

Fonts: **Syne** (headings, weight 600–700, letter-spacing −0.04em) ·
**Manrope** (body/UI, sentence case — NO uppercase nav). Pill buttons (9999px),
20px card radii, soft glow shadows.

## Step 1 — Custom CSS
Theme Settings → Custom CSS → Global CSS → paste all of `smalltalk-woodmart.css`.

## Step 2 — Typography (Theme Settings → Typography)
- Text font: **Manrope · Normal 400 · 14 · `#0E0E2A`**
- Title font: **Syne · Bold 700 · `#0E0E2A`**
- Entities names: **Syne · Semi Bold 600 · `#0E0E2A`**, hover `#5B5BF0`
- Secondary font: Manrope · Normal 400
- Widget titles: **Manrope · Bold 700 · 12 · Uppercase · `#15153C`**
- Header font: **Manrope · Medium 500 · 14 — Uppercase OFF** (sentence case!)

## Step 3 — Colors (Theme Settings → Styles and colors)
- Primary: `#5B5BF0` · Secondary: `#15153C`
- Link: `#15153C`, hover `#5B5BF0`
- Body/page background: `#F7F6F2`

## Step 4 — Buttons (Theme Settings → Buttons)
Default (secondary): Manrope · Semi Bold 600 · **no uppercase** · bg `#FFFFFF`,
hover bg `#15153C` · text Custom `#15153C`, hover text Custom `#FFFFFF`.
Accent (CTA): Manrope · Semi Bold 600 · **no uppercase** · bg `#15153C`,
hover bg `#5B5BF0` · text Custom `#FFFFFF`, hover text Custom `#FFFFFF`.
(The CSS forces pill radius + glow shadows.)

## Step 5 — Page title
Design: Centered · Size: Default · Background: `#15153C` · Text color: **Light**.
CSS adds the glow/cyan mesh tint + gradient hairline under the band.

## Step 6 — General layout
Site width: **1400** (the Next.js container is max-w-[1400px]).

## Step 7 — Header (Header Builder)
1. **Top bar** (36px), bg `#15153C`: one full-width Text element with the marquee:

```html
<div class="st-marquee"><div class="st-marquee-track">
<span>Free shipping on your first order <span class="dot">·</span></span>
<span>New: Premium Tees &amp; Polos <span class="dot">·</span></span>
<span>Wear confidence. Look like you mean business. <span class="dot">·</span></span>
<span>Free shipping on your first order <span class="dot">·</span></span>
<span>New: Premium Tees &amp; Polos <span class="dot">·</span></span>
<span>Wear confidence. Look like you mean business. <span class="dot">·</span></span>
</div></div>
```

2. **Main header** (~76px): Logo left (dark logo variant, ~36px) · Menu center ·
   right: Search icon, My Account, Wishlist, Cart (icon + subtotal) — same
   arrangement as Banarasi. Sticky ON, bg `#F7F6F2` (CSS frosts it).
3. **Menu** (Appearance → Menus) — mirror the Next.js nav, absolute URLs:

   | Label | URL |
   |---|---|
   | Home | `https://thesmalltalkstore.com/` (or vercel URL until live) |
   | Shop | `/shop/` (this site) |
   | About | `https://thesmalltalkstore.com/about` |
   | Contact | `https://thesmalltalkstore.com/contact` |

   Categories dropdown under Shop: Tees, Polos (product categories).
   Labels are sentence case — the skin does NOT uppercase them.

## Step 8 — Footer
Theme Settings → Footer → bg `#0E0E2A` (CSS forces + gradient hairline).
Columns from the Next.js footer (`data/content.ts → footerColumns`):
- Col 1: light logo + tagline "Wear confidence. Look like you mean business." + socials
- Col 2 SHOP: Tees / Polos / All Products (shop categories)
- Col 3 COMPANY: About / Contact (absolute URLs to main site)
- Col 4 GET IN TOUCH: C-182 Pushpanjali Enclave, Pitampura, New Delhi 110034 ·
  +91 8595382034 · info@thesmalltalkstore.com
- Copyright: `© 2026 The Small Talk Store · Small Talk Garment LLP · GSTIN: 07AFXFS8211B1ZS`

## Step 9 — WooCommerce
- Currency ₹, decimals 0 (or 2 if client prices like 999.00)
- Product images: crop **3:4** (apparel), thumbnail width 450
- Products per row 4 / mobile 2, spacing 20, per page 12
- Action after add to cart: **Widget** · AJAX add to cart ON · redirect OFF
- Brands: disable "About brand" tab; clean demo content (food-delivery products,
  sliders, posts) after real products are in
- Attributes: **Size** (XS–XXL — real this time, it's apparel!) with size swatches,
  **Color** with color swatches, **Fit** (Regular/Oversized) if needed.
  Products will typically be **Variable** (size variations), unlike sarees.

## Step 10 — Single product layout (detailed walkthrough)

Order matters: import the template FIRST, then create the layout to insert it into.

### 10.1 Import the template
1. WP Admin → **Templates → Saved Templates** (Elementor's own sidebar menu;
   direct URL: `/wp-admin/edit.php?post_type=elementor_library&tabs_group=library`).
2. Click **Import Templates** (next to "Add New") → upload
   `smalltalk-product-layout-elementor.json` → Import.
3. "Small Talk Single Product Layout" appears in the list.
   Use this admin page, NOT the import icon inside the editor's library modal —
   the modal throws "This source does not support import" for this template type.

### 10.2 Create the layout container
1. **WoodMart → Layouts → Add New**.
2. Name: `Single product layout` · Layout type: **Single product** ·
   Condition: **All products** → Save.
3. Click **Edit with Elementor** on the new layout.

### 10.3 Insert the template
1. In the empty canvas click the grey **folder icon** ("Add Template").
2. **My Templates** tab → hover "Small Talk Single Product Layout" → **Insert**.
3. Click **Update**.

### 10.4 Missing-widget fallback
If "Product short description" or "Product tabs" show as grey "widget not found"
boxes (their slugs vary between installs): delete the grey box, open the Elementor
panel, find the **Single product** widget category, and drag the same-named widget
into the same position. Everything else imports intact.

### 10.5 Accordion settings (Theme Settings → Single product → Tabs)
- Tabs layout: **Accordion**
- Tabs location: After "Add to cart" button
- Accordion state: **All closed** (or First opened, per client preference)
- Hide tabs headings: **ON**
- Description tab: **ON**, priority **10**
- Additional info tab: **OFF**
- Reviews tab: **OFF** — the layout has its own reviews section at the bottom;
  leaving this on duplicates it
- Custom tabs: **ON** (enables Products → Custom Tabs)
- Save options.

### 10.6 Global custom tabs (Products → Custom Tabs)
Create four tabs; for each: paste content, set **Active**, condition **all
products**, and the priority below:

| Tab title | Priority |
|---|---|
| Fabric & Fit | 20 |
| Shipping & Delivery | 30 |
| Return & Exchange | 40 |
| Wash Care | 50 |

Content templates:

**Fabric & Fit**
```html
<ul>
<li><strong>Fabric:</strong> 100% combed cotton, 240 GSM</li>
<li><strong>Fit:</strong> Regular fit — true to size</li>
<li><strong>Model reference:</strong> Model is 6'0" wearing size M</li>
</ul>
<p>Between sizes? Size up for a relaxed fit.</p>
```

**Shipping & Delivery**
```html
<p>Free shipping on your first order. Orders dispatch within 24–48 hours.</p>
<ul>
<li><strong>Metro cities:</strong> 2–4 business days</li>
<li><strong>Rest of India:</strong> 4–7 business days</li>
</ul>
<p>You'll receive tracking details by email as soon as your order ships.</p>
```

**Return & Exchange**
```html
<p>Easy 7-day returns and size exchanges from the date of delivery.</p>
<p>Items must be unworn, unwashed, with tags intact. Contact us at
<a href="mailto:info@thesmalltalkstore.com">info@thesmalltalkstore.com</a>
or on WhatsApp to start a return.</p>
```

**Wash Care**
```html
<ul>
<li>Machine wash cold, inside out, with like colours</li>
<li>Do not bleach · Tumble dry low or line dry</li>
<li>Iron on reverse; do not iron on print</li>
</ul>
```

(Adjust copy with the client — GSM, dispatch window, and return window especially.)

### 10.7 Rename "Description" → "Product Details"
Appearance → Theme File Editor → **woodmart-child → functions.php**, add at the end:

```php
add_filter( 'woocommerce_product_tabs', function( $tabs ) {
	if ( isset( $tabs['description'] ) ) {
		$tabs['description']['title'] = 'Product Details';
	}
	return $tabs;
}, 98 );
```

### 10.8 Per-product content model
- **Short description** → 1–2 sentence hook + 3–4 bullet highlights (shows next
  to the gallery, above the accordion)
- **Description** → renders as the "Product Details" accordion row (specs list)
- **Product type: Variable** with a **Size** attribute (XS–XXL, "Used for
  variations") — apparel needs size selection, unlike the saree shop
- SKU in Inventory tab · main image portrait 3:4 · 3–5 gallery shots

### 10.9 Verify
Open any product page and check top to bottom:
1. Breadcrumbs + gallery left; gallery **sticks** while the right column scrolls
   (desktop only)
2. Right column order: title (Syne) → price → short description → Add to cart
   (pill, navy→glow hover) → "Chat with us on WhatsApp" pill → white trust strip
   card (High Quality Fabrics · Everyday Fashion · Pan-India Shipping · Secure
   Payments) → **5 accordion rows**: Product Details / Fabric & Fit / Shipping &
   Delivery / Return & Exchange / Wash Care
3. "Complete the Look" carousel (related products, 4-up)
4. "Add Your Review" + reviews section
5. Mobile (narrow window): columns stack, sticky disables, trust strip goes 2×2

---

## Verified against staging
Injected the skin into `shop.thesmalltalkstore.com/shop/` (WoodMart 8.2.6,
woodmart-child active) and confirmed computed styles: cream mesh wrapper, frosted
header `rgba(247,246,242,.72)`, Manrope sentence-case nav, navy page-title band
with white Syne title, glow category chips, Syne product titles, 20px card radius,
pill add-to-cart, ink footer. Same selector families as the Banarasi build.

/**
 * One-off generator for placeholder SVG product/lookbook mockups.
 * Run once: `node scripts/gen-mockups.mjs`. Safe to delete after.
 * TODO: replace generated /public/products/*.svg with real photography.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");

const PALETTE = {
  navy: { bg: "#21215A", garment: "#2b2b6e", text: "#FFFFFF" },
  white: { bg: "#EDEDF2", garment: "#FFFFFF", text: "#21215A" },
  cream: { bg: "#F7F6F2", garment: "#ECEAE2", text: "#21215A" },
};

// A tee silhouette path within a 600x760 canvas.
const teePath = (x = 300, y = 150) => `
  M${x - 150} ${y}
  L${x - 230} ${y + 70}
  L${x - 180} ${y + 160}
  L${x - 110} ${y + 120}
  L${x - 110} ${y + 470}
  Q${x - 110} ${y + 490} ${x - 90} ${y + 490}
  L${x + 90} ${y + 490}
  Q${x + 110} ${y + 490} ${x + 110} ${y + 470}
  L${x + 110} ${y + 120}
  L${x + 180} ${y + 160}
  L${x + 230} ${y + 70}
  L${x + 150} ${y}
  C${x + 110} ${y + 70} ${x + 40} ${y + 92} ${x} ${y + 92}
  C${x - 40} ${y + 92} ${x - 110} ${y + 70} ${x - 150} ${y}
  Z`;

const collar = (x = 300, y = 150) =>
  `M${x - 78} ${y + 6} C${x - 50} ${y + 70} ${x - 16} ${y + 86} ${x} ${y + 86} C${x + 16} ${y + 86} ${x + 50} ${y + 70} ${x + 78} ${y + 6}`;

function teeSvg(colorKey, label, withPocket = false, angle = 0) {
  const c = PALETTE[colorKey] ?? PALETTE.navy;
  const pocket = withPocket
    ? `<rect x="225" y="330" width="70" height="80" rx="6" fill="none" stroke="${c.text}" stroke-opacity="0.35" stroke-width="3"/>`
    : "";
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 760" width="600" height="760">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${c.bg}"/>
      <stop offset="1" stop-color="${shade(c.bg, -12)}"/>
    </linearGradient>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${c.garment}"/>
      <stop offset="1" stop-color="${shade(c.garment, -8)}"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.5" cy="0.35" r="0.6">
      <stop offset="0" stop-color="#5B5BF0" stop-opacity="0.25"/>
      <stop offset="1" stop-color="#5B5BF0" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="600" height="760" fill="url(#bg)"/>
  <rect width="600" height="760" fill="url(#glow)"/>
  <g transform="rotate(${angle} 300 380)">
    <path d="${teePath()}" fill="url(#g)" stroke="${shade(c.garment, -18)}" stroke-width="2"/>
    <path d="${collar()}" fill="none" stroke="${shade(c.garment, -22)}" stroke-width="3"/>
    ${pocket}
  </g>
  <text x="300" y="710" text-anchor="middle" font-family="Inter, system-ui, sans-serif" font-size="22" letter-spacing="3" fill="${c.text}" fill-opacity="0.55">${label}</text>
</svg>`;
}

function poloSvg(colorKey, label, angle = 0) {
  const c = PALETTE[colorKey] ?? PALETTE.navy;
  // polo = tee + open placket + structured collar
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 760" width="600" height="760">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${c.bg}"/>
      <stop offset="1" stop-color="${shade(c.bg, -12)}"/>
    </linearGradient>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${c.garment}"/>
      <stop offset="1" stop-color="${shade(c.garment, -8)}"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.5" cy="0.35" r="0.6">
      <stop offset="0" stop-color="#3DD6D0" stop-opacity="0.22"/>
      <stop offset="1" stop-color="#3DD6D0" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="600" height="760" fill="url(#bg)"/>
  <rect width="600" height="760" fill="url(#glow)"/>
  <g transform="rotate(${angle} 300 380)">
    <path d="${teePath()}" fill="url(#g)" stroke="${shade(c.garment, -18)}" stroke-width="2"/>
    <!-- structured collar -->
    <path d="M252 236 L300 280 L262 250 Z" fill="${shade(c.garment, -16)}"/>
    <path d="M348 236 L300 280 L338 250 Z" fill="${shade(c.garment, -16)}"/>
    <path d="M222 232 L300 236 L300 300 Z" fill="none" stroke="${shade(c.garment, -20)}" stroke-width="3"/>
    <path d="M378 232 L300 236 L300 300 Z" fill="none" stroke="${shade(c.garment, -20)}" stroke-width="3"/>
    <!-- placket -->
    <line x1="300" y1="280" x2="300" y2="360" stroke="${shade(c.garment, -22)}" stroke-width="3"/>
    <circle cx="300" cy="305" r="4" fill="${shade(c.garment, -25)}"/>
    <circle cx="300" cy="335" r="4" fill="${shade(c.garment, -25)}"/>
  </g>
  <text x="300" y="710" text-anchor="middle" font-family="Inter, system-ui, sans-serif" font-size="22" letter-spacing="3" fill="${c.text}" fill-opacity="0.55">${label}</text>
</svg>`;
}

function lookSvg(title, caption, key, idx) {
  const c = PALETTE[key] ?? PALETTE.navy;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 1100" width="900" height="1100">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${c.bg}"/>
      <stop offset="1" stop-color="${shade(c.bg, idx % 2 ? -18 : 10)}"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.5" cy="0.3" r="0.7">
      <stop offset="0" stop-color="#5B5BF0" stop-opacity="0.3"/>
      <stop offset="1" stop-color="#5B5BF0" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="900" height="1100" fill="url(#bg)"/>
  <rect width="900" height="1100" fill="url(#glow)"/>
  <g transform="translate(150 220) scale(1)">
    <path d="${teePath()}" fill="${shade(c.garment, -6)}" opacity="0.92"/>
  </g>
  <text x="60" y="980" font-family="Inter, system-ui, sans-serif" font-size="54" font-weight="700" fill="${c.text}">${title}</text>
  <text x="60" y="1030" font-family="Inter, system-ui, sans-serif" font-size="26" fill="${c.text}" fill-opacity="0.65">${caption}</text>
</svg>`;
}

function shade(hex, percent) {
  const n = parseInt(hex.replace("#", ""), 16);
  let r = (n >> 16) & 255,
    g = (n >> 8) & 255,
    b = n & 255;
  r = Math.max(0, Math.min(255, Math.round(r + (r * percent) / 100)));
  g = Math.max(0, Math.min(255, Math.round(g + (g * percent) / 100)));
  b = Math.max(0, Math.min(255, Math.round(b + (b * percent) / 100)));
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}

function out(p, content) {
  const full = resolve(root, "public", p);
  mkdirSync(dirname(full), { recursive: true });
  writeFileSync(full, content);
  console.log("wrote", p);
}

// Products
out("products/essential-tee-1.svg", teeSvg("navy", "ESSENTIAL TEE"));
out("products/essential-tee-2.svg", teeSvg("white", "ESSENTIAL TEE", false, -6));
out("products/premium-polo-1.svg", poloSvg("navy", "PREMIUM POLO"));
out("products/premium-polo-2.svg", poloSvg("cream", "PREMIUM POLO", -5));
out("products/heavyweight-tee-1.svg", teeSvg("ink" in PALETTE ? "ink" : "navy", "HEAVYWEIGHT TEE"));
out("products/heavyweight-tee-2.svg", teeSvg("cream", "HEAVYWEIGHT TEE", false, 5));
out("products/classic-crew-1.svg", teeSvg("white", "CLASSIC CREW"));
out("products/classic-crew-2.svg", teeSvg("navy", "CLASSIC CREW", false, -5));

// Lookbook
out("lookbook/look-1.svg", lookSvg("The Boardroom", "Polos that read formal.", "navy", 0));
out("lookbook/look-2.svg", lookSvg("The Weekend", "Tees built for ease.", "cream", 1));
out("lookbook/look-3.svg", lookSvg("The Commute", "From desk to dinner.", "white", 2));
out("lookbook/look-4.svg", lookSvg("The Off-Day", "Comfort, elevated.", "navy", 3));

// OG image (social share)
out(
  "og-image.svg",
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="1200" height="630">
  <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0" stop-color="#21215A"/><stop offset="0.6" stop-color="#15153B"/><stop offset="1" stop-color="#2b2b8a"/>
  </linearGradient></defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <text x="80" y="300" font-family="Inter, system-ui, sans-serif" font-size="72" font-weight="800" fill="#fff">The Small Talk Store</text>
  <text x="80" y="370" font-family="Inter, system-ui, sans-serif" font-size="34" fill="#b9b9ff">Wear confidence. Feel in control.</text>
  <text x="80" y="420" font-family="Inter, system-ui, sans-serif" font-size="26" fill="#ffffff" fill-opacity="0.7">Premium everyday apparel — without the premium price.</text>
</svg>`
);

console.log("Done.");

"use client";

/**
 * Product detail: image gallery (thumbnail switcher) + buy box with
 * color/size selectors, qty stepper, add-to-cart, and trust badges.
 */
import { useState } from "react";
import SmartImage from "@/components/ui/SmartImage";
import {
  Minus,
  Plus,
  RefreshCw,
  ShieldCheck,
  Star,
  Truck,
} from "lucide-react";
import type { Product } from "@/data/content";
import {
  formatINR,
  getProductSpecs,
  getSizeChart,
  careInstructions,
} from "@/data/content";
import { useCart } from "@/components/providers/CartProvider";
import { useToast } from "@/components/providers/ToastProvider";
import MagneticButton from "@/components/ui/MagneticButton";
import { cn } from "@/lib/utils";

const colorSwatch: Record<string, string> = {
  navy: "#15153C",
  white: "#FFFFFF",
  cream: "#F7F6F2",
};

export default function ProductDetail({ product }: { product: Product }) {
  const { addItem } = useCart();
  const { toast } = useToast();
  const [active, setActive] = useState(0);
  const [size, setSize] = useState<string | null>(null);
  const [color, setColor] = useState(product.colors[0]);
  const [qty, setQty] = useState(1);
  const [err, setErr] = useState(false);

  const add = () => {
    if (!size) {
      setErr(true);
      return;
    }
    addItem(product, { size, color, qty });
    toast(`${product.name} (${size}) added to cart`);
  };

  const discount = product.compareAtPrice
    ? Math.round(
        ((product.compareAtPrice - product.price) / product.compareAtPrice) *
          100
      )
    : 0;

  return (
    <div className="container-st grid gap-10 py-12 lg:grid-cols-2 lg:gap-16 lg:py-16">
      {/* Gallery */}
      <div className="flex flex-col-reverse gap-4 sm:flex-row">
        <div className="flex gap-3 sm:flex-col">
          {product.images.map((img, i) => (
            <button
              key={img + i}
              onClick={() => setActive(i)}
              className={cn(
                "relative h-20 w-16 shrink-0 overflow-hidden rounded-xl border-2 transition",
                active === i ? "border-navy" : "border-transparent opacity-70"
              )}
            >
              <SmartImage
                src={product.photos?.[i]}
                fallbackSrc={img}
                alt={`${product.name} view ${i + 1}`}
                sizes="64px"
              />
            </button>
          ))}
        </div>
        <div className="relative aspect-[4/5] flex-1 overflow-hidden rounded-3xl bg-cream">
          <SmartImage
            src={product.photos?.[active]}
            fallbackSrc={product.images[active]}
            alt={product.name}
            priority
            sizes="(max-width:1024px) 100vw, 50vw"
          />
          {discount > 0 && (
            <span className="absolute left-4 top-4 rounded-full bg-glow px-3 py-1 text-xs font-bold text-white">
              -{discount}%
            </span>
          )}
        </div>
      </div>

      {/* Buy box */}
      <div className="lg:py-4">
        <p className="text-xs uppercase tracking-widest text-mist">
          {product.category}
        </p>
        <h1 className="mt-1 font-display text-3xl font-bold tracking-tighter text-ink sm:text-4xl">
          {product.name}
        </h1>

        <div className="mt-3 flex items-center gap-3">
          <div className="flex items-center gap-1 text-cyan">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={cn(
                  "h-4 w-4",
                  i < Math.round(product.rating) && "fill-current"
                )}
              />
            ))}
          </div>
          <span className="text-sm text-mist">
            {product.rating} · {product.reviews} reviews
          </span>
        </div>

        <div className="mt-5 flex items-baseline gap-3">
          <span className="font-display text-3xl font-bold text-navy">
            {formatINR(product.price)}
          </span>
          {product.compareAtPrice && (
            <span className="text-lg text-mist line-through">
              {formatINR(product.compareAtPrice)}
            </span>
          )}
          {discount > 0 && (
            <span className="rounded-full bg-glow/10 px-2.5 py-1 text-xs font-semibold text-glow">
              Save {discount}%
            </span>
          )}
        </div>

        <p className="mt-5 leading-relaxed text-mist">{product.description}</p>

        {/* Color */}
        <div className="mt-7">
          <p className="mb-2 text-sm font-semibold text-ink">
            Color: <span className="capitalize text-mist">{color}</span>
          </p>
          <div className="flex gap-2">
            {product.colors.map((c) => (
              <button
                key={c}
                onClick={() => setColor(c)}
                aria-label={c}
                className={cn(
                  "h-9 w-9 rounded-full border-2 transition",
                  color === c
                    ? "border-navy ring-2 ring-navy/20"
                    : "border-navy/15"
                )}
                style={{ background: colorSwatch[c] ?? "#ddd" }}
              />
            ))}
          </div>
        </div>

        {/* Size */}
        <div className="mt-6">
          <div className="mb-2 flex items-center justify-between">
            <p className="text-sm font-semibold text-ink">Size</p>
            <button
              type="button"
              onClick={() =>
                document
                  .getElementById("size-guide")
                  ?.scrollIntoView({ behavior: "smooth", block: "center" })
              }
              className="text-xs text-mist underline-offset-2 hover:underline"
            >
              Size guide
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {product.sizes.map((s) => (
              <button
                key={s}
                onClick={() => {
                  setSize(s);
                  setErr(false);
                }}
                className={cn(
                  "h-11 min-w-[3rem] rounded-lg border px-3 text-sm font-medium transition",
                  size === s
                    ? "border-navy bg-navy text-white"
                    : "border-navy/20 text-ink hover:border-navy"
                )}
              >
                {s}
              </button>
            ))}
          </div>
          {err && <p className="mt-2 text-xs text-glow">Please select a size.</p>}
        </div>

        {/* Qty + add */}
        <div className="mt-7 flex flex-wrap items-center gap-4">
          <div className="flex items-center rounded-full border border-navy/20">
            <button
              aria-label="Decrease quantity"
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              className="p-3 text-navy transition hover:text-glow"
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="w-8 text-center font-medium">{qty}</span>
            <button
              aria-label="Increase quantity"
              onClick={() => setQty((q) => q + 1)}
              className="p-3 text-navy transition hover:text-glow"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
          <MagneticButton onClick={add} withArrow={false} className="flex-1">
            Add to Cart · {formatINR(product.price * qty)}
          </MagneticButton>
        </div>

        {/* Trust badges */}
        <ul className="mt-8 grid gap-3 border-t border-navy/10 pt-6 text-sm text-mist sm:grid-cols-3">
          <li className="flex items-center gap-2">
            <Truck className="h-5 w-5 text-navy" /> Free shipping ₹1499+
          </li>
          <li className="flex items-center gap-2">
            <RefreshCw className="h-5 w-5 text-navy" /> 7-day easy returns
          </li>
          <li className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-navy" /> Secure checkout
          </li>
        </ul>

        {/* Specifications */}
        <div className="mt-8" id="specifications">
          <h2 className="font-display text-lg font-bold text-ink">
            Specifications
          </h2>
          <dl className="mt-3 grid grid-cols-1 gap-x-6 gap-y-0 rounded-2xl bg-cream p-5 text-sm sm:grid-cols-2">
            {getProductSpecs(product).map((s) => (
              <div
                key={s.label}
                className="flex items-center justify-between gap-3 border-b border-navy/10 py-2.5 last:border-0"
              >
                <dt className="text-mist">{s.label}</dt>
                <dd className="text-right font-medium text-ink">{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Size guide */}
        <details
          id="size-guide"
          className="group mt-4 rounded-2xl border border-navy/10 p-5 [&_summary::-webkit-details-marker]:hidden"
          open
        >
          <summary className="flex cursor-pointer items-center justify-between font-display text-lg font-bold text-ink">
            Size Guide
            <span className="text-xl text-glow transition-transform group-open:rotate-45">
              +
            </span>
          </summary>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[360px] border-collapse text-sm">
              <thead>
                <tr className="text-left text-mist">
                  <th className="py-2 pr-4 font-medium">Size (in)</th>
                  {getSizeChart(product).sizes.map((s) => (
                    <th key={s} className="px-2 py-2 text-center font-medium">
                      {s}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {getSizeChart(product).rows.map((row) => (
                  <tr key={row.label} className="border-t border-navy/10">
                    <td className="py-2.5 pr-4 font-medium text-ink">
                      {row.label}
                    </td>
                    {row.values.map((v, i) => (
                      <td key={i} className="px-2 py-2.5 text-center text-mist">
                        {v}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs text-mist">
            Measurements are indicative (garment, laid flat).{" "}
            {/* TBD — confirm exact measurements with client. */}
            <span className="italic">To be confirmed.</span>
          </p>
        </details>

        {/* Care instructions */}
        <details className="group mt-4 rounded-2xl border border-navy/10 p-5 [&_summary::-webkit-details-marker]:hidden">
          <summary className="flex cursor-pointer items-center justify-between font-display text-lg font-bold text-ink">
            Care Instructions
            <span className="text-xl text-glow transition-transform group-open:rotate-45">
              +
            </span>
          </summary>
          <ul className="mt-4 space-y-2 text-sm text-mist">
            {careInstructions.map((c) => (
              <li key={c} className="flex gap-2.5">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-glow" />
                {c}
              </li>
            ))}
          </ul>
        </details>
      </div>
    </div>
  );
}

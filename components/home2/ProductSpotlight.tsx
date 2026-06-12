"use client";

/**
 * Variation B product showcase — an interactive spotlight.
 * Hovering / focusing a product name swaps the large image + details.
 * A distinctly different shopping UI from Variation A's product grid.
 */
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, Plus } from "lucide-react";
import { useState } from "react";
import { featuredProducts, formatINR } from "@/data/content";
import SmartImage from "@/components/ui/SmartImage";
import SectionHeading from "@/components/ui/SectionHeading";
import { useCart } from "@/components/providers/CartProvider";
import { useToast } from "@/components/providers/ToastProvider";
import { cn } from "@/lib/utils";

export default function ProductSpotlight() {
  const list = featuredProducts.slice(0, 4);
  const [active, setActive] = useState(0);
  const product = list[active];
  const { addItem } = useCart();
  const { toast } = useToast();

  return (
    <section className="relative overflow-hidden bg-ink py-16 text-white lg:py-24">
      <div className="container-st">
        <SectionHeading
          eyebrow="The staples"
          title="Built to be worn every day."
          highlight={[4]}
          light
        />

        <div className="mt-12 grid items-center gap-10 lg:grid-cols-2">
          {/* Spotlight image */}
          <div className="relative order-2 aspect-[4/5] overflow-hidden rounded-[2rem] bg-navy lg:order-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={product.slug}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0"
              >
                <SmartImage
                  src={product.photos?.[0]}
                  fallbackSrc={product.images[0]}
                  alt={product.name}
                  sizes="(max-width:1024px) 100vw, 50vw"
                />
              </motion.div>
            </AnimatePresence>

            {/* floating price + actions */}
            <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
              <div className="glass-dark rounded-2xl px-4 py-3">
                <p className="font-display text-xl font-bold">
                  {formatINR(product.price)}
                </p>
                <p className="text-xs capitalize text-white/60">
                  {product.colors.join(" · ")}
                </p>
              </div>
              <button
                onClick={() => {
                  addItem(product, {
                    size: product.sizes[1] ?? product.sizes[0],
                    color: product.colors[0],
                  });
                  toast(`${product.name} added to cart`);
                }}
                className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-navy shadow-card transition hover:bg-cream"
                aria-label={`Add ${product.name} to cart`}
              >
                <Plus className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Selector list */}
          <ul className="order-1 lg:order-2">
            {list.map((p, i) => (
              <li key={p.slug}>
                <button
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                  className={cn(
                    "group flex w-full items-center justify-between gap-4 border-b border-white/10 py-5 text-left transition-colors",
                    i === active ? "text-white" : "text-white/45 hover:text-white/80"
                  )}
                >
                  <span className="flex items-baseline gap-4">
                    <span className="font-display text-sm tabular-nums opacity-60">
                      0{i + 1}
                    </span>
                    <span className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
                      {p.name}
                    </span>
                  </span>
                  <span
                    className={cn(
                      "flex items-center gap-3 transition-all",
                      i === active ? "opacity-100" : "opacity-0 group-hover:opacity-60"
                    )}
                  >
                    <span className="hidden text-sm text-white/60 sm:inline">
                      {p.category}
                    </span>
                    <ArrowUpRight className="h-5 w-5 text-cyan" />
                  </span>
                </button>
              </li>
            ))}
            <Link
              href="/shop"
              className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-cyan underline-offset-4 hover:underline"
            >
              View all products <ArrowUpRight className="h-4 w-4" />
            </Link>
          </ul>
        </div>
      </div>
    </section>
  );
}

"use client";

/** Quick-view modal: image, details, size/color selector, add to cart. */
import Link from "next/link";
import SmartImage from "@/components/ui/SmartImage";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import type { Product } from "@/data/content";
import { formatINR } from "@/data/content";
import { useCart } from "@/components/providers/CartProvider";
import { useToast } from "@/components/providers/ToastProvider";
import MagneticButton from "@/components/ui/MagneticButton";
import { cn } from "@/lib/utils";

const colorSwatch: Record<string, string> = {
  navy: "#21215A",
  white: "#FFFFFF",
  cream: "#F7F6F2",
};

export default function QuickView({
  product,
  onClose,
}: {
  product: Product | null;
  onClose: () => void;
}) {
  const { addItem } = useCart();
  const { toast } = useToast();
  const [size, setSize] = useState<string | null>(null);
  const [color, setColor] = useState<string | null>(null);
  const [err, setErr] = useState(false);

  useEffect(() => {
    if (product) {
      setSize(null);
      setColor(product.colors[0]);
      setErr(false);
    }
  }, [product]);

  useEffect(() => {
    document.documentElement.classList.toggle("lenis-stopped", Boolean(product));
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.classList.remove("lenis-stopped");
      window.removeEventListener("keydown", onKey);
    };
  }, [product, onClose]);

  const add = () => {
    if (!size || !color) {
      setErr(true);
      return;
    }
    addItem(product!, { size, color });
    toast(`${product!.name} (${size}) added to cart`);
    onClose();
  };

  return (
    <AnimatePresence>
      {product && (
        <motion.div
          className="fixed inset-0 z-[95] flex items-center justify-center bg-ink/70 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="relative grid w-[min(94vw,860px)] overflow-hidden rounded-3xl bg-white shadow-soft md:grid-cols-2"
            initial={{ scale: 0.94, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.94, y: 20, opacity: 0 }}
            transition={{ type: "spring", stiffness: 280, damping: 28 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              aria-label="Close quick view"
              onClick={onClose}
              className="absolute right-4 top-4 z-10 rounded-full bg-white/80 p-2 text-navy backdrop-blur transition hover:bg-cream"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="relative aspect-square bg-cream md:aspect-auto">
              <SmartImage
                src={product.photos?.[0]}
                fallbackSrc={product.images[0]}
                alt={product.name}
                sizes="(max-width:768px) 94vw, 430px"
              />
            </div>

            <div className="flex flex-col p-6 sm:p-8">
              <p className="text-xs uppercase tracking-widest text-mist">
                {product.category}
              </p>
              <h2 className="mt-1 font-display text-2xl font-bold text-ink">
                {product.name}
              </h2>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-xl font-semibold text-navy">
                  {formatINR(product.price)}
                </span>
                {product.compareAtPrice && (
                  <span className="text-sm text-mist line-through">
                    {formatINR(product.compareAtPrice)}
                  </span>
                )}
              </div>
              <p className="mt-3 text-sm leading-relaxed text-mist">
                {product.shortDescription}
              </p>

              {/* Color */}
              <div className="mt-5">
                <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-ink">
                  Color: <span className="capitalize text-mist">{color}</span>
                </p>
                <div className="flex gap-2">
                  {product.colors.map((c) => (
                    <button
                      key={c}
                      onClick={() => setColor(c)}
                      aria-label={c}
                      className={cn(
                        "h-8 w-8 rounded-full border-2 transition",
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
              <div className="mt-5">
                <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-ink">
                  Size
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => {
                        setSize(s);
                        setErr(false);
                      }}
                      className={cn(
                        "h-10 min-w-[2.75rem] rounded-lg border px-3 text-sm font-medium transition",
                        size === s
                          ? "border-navy bg-navy text-white"
                          : "border-navy/20 text-ink hover:border-navy"
                      )}
                    >
                      {s}
                    </button>
                  ))}
                </div>
                {err && (
                  <p className="mt-2 text-xs text-glow">
                    Please select a size.
                  </p>
                )}
              </div>

              <div className="mt-6 flex items-center gap-3">
                <MagneticButton onClick={add} withArrow={false}>
                  Add to Cart
                </MagneticButton>
                <Link
                  href={`/shop/${product.slug}`}
                  onClick={onClose}
                  className="text-sm font-medium text-navy underline-offset-4 hover:underline"
                >
                  Full details
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

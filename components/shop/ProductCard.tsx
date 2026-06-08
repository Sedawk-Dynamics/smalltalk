"use client";

/**
 * Product card:
 * - image swap to the 2nd image on hover + subtle 3D tilt
 * - size chips, price (with strike-through compare price)
 * - Add to Cart + Quick View reveal on hover
 */
import Link from "next/link";
import { Eye, Heart, Plus } from "lucide-react";
import SmartImage from "@/components/ui/SmartImage";
import { useRef, useState } from "react";
import type { Product } from "@/data/content";
import { formatINR } from "@/data/content";
import { useCart } from "@/components/providers/CartProvider";
import { useToast } from "@/components/providers/ToastProvider";
import { useReducedMotion } from "@/lib/hooks";
import { cn } from "@/lib/utils";

const SWATCH: Record<string, string> = {
  navy: "#21215A",
  white: "#FFFFFF",
  cream: "#F7F6F2",
};

export default function ProductCard({
  product,
  onQuickView,
}: {
  product: Product;
  onQuickView: (p: Product) => void;
}) {
  const { addItem } = useCart();
  const { toast } = useToast();
  const reduced = useReducedMotion();
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const [hover, setHover] = useState(false);
  const [wished, setWished] = useState(false);

  const onMove = (e: React.MouseEvent) => {
    if (reduced || !cardRef.current) return;
    const r = cardRef.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    setTilt({ rx: -py * 6, ry: px * 8 });
  };
  const reset = () => setTilt({ rx: 0, ry: 0 });

  const quickAdd = () => {
    addItem(product, {
      size: product.sizes[1] ?? product.sizes[0],
      color: product.colors[0],
    });
    toast(`${product.name} added to cart`);
  };

  const discount = product.compareAtPrice
    ? Math.round(
        ((product.compareAtPrice - product.price) / product.compareAtPrice) *
          100
      )
    : 0;

  return (
    <div
      ref={cardRef}
      onMouseMove={onMove}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => {
        reset();
        setHover(false);
      }}
      className="group/card relative [perspective:1200px]"
    >
      <div
        className="card-glow relative overflow-hidden rounded-3xl bg-cream transition-transform duration-200 will-change-transform"
        style={{
          transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
          transformStyle: "preserve-3d",
        }}
      >
        {/* Image */}
        <Link
          href={`/shop/${product.slug}`}
          className="relative block aspect-[4/5] overflow-hidden"
        >
          <SmartImage
            src={product.photos?.[0]}
            fallbackSrc={product.images[0]}
            alt={product.name}
            sizes="(max-width:768px) 50vw, 25vw"
            className={cn(
              "absolute inset-0 transition-all duration-700",
              hover ? "scale-105 opacity-0" : "opacity-100"
            )}
          />
          <SmartImage
            src={product.photos?.[1] ?? product.photos?.[0]}
            fallbackSrc={product.images[1] ?? product.images[0]}
            alt={`${product.name} alternate view`}
            sizes="(max-width:768px) 50vw, 25vw"
            className={cn(
              "absolute inset-0 transition-all duration-700",
              hover ? "scale-105 opacity-100" : "opacity-0"
            )}
          />

          {/* Badges */}
          <div className="absolute left-3 top-3 flex flex-col gap-1.5">
            {product.badge && (
              <span className="rounded-full bg-navy px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
                {product.badge}
              </span>
            )}
            {discount > 0 && (
              <span className="rounded-full bg-glow px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
                -{discount}%
              </span>
            )}
          </div>
        </Link>

        {/* Wishlist heart */}
        <button
          onClick={(e) => {
            e.preventDefault();
            setWished((w) => !w);
            toast(
              wished ? "Removed from wishlist" : `${product.name} saved to wishlist`,
              "info"
            );
          }}
          aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
          aria-pressed={wished}
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/85 text-navy shadow-card backdrop-blur transition-transform hover:scale-110"
        >
          <Heart
            className={cn(
              "h-4 w-4 transition-colors",
              wished && "fill-glow text-glow"
            )}
          />
        </button>

        {/* Hover actions */}
        <div
          className={cn(
            "absolute inset-x-3 bottom-3 flex gap-2 transition-all duration-300",
            hover
              ? "translate-y-0 opacity-100"
              : "translate-y-3 opacity-0"
          )}
          style={{ transform: "translateZ(40px)" }}
        >
          <button
            onClick={quickAdd}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-full bg-navy py-3 text-xs font-semibold text-white shadow-card transition-colors hover:bg-ink"
          >
            <Plus className="h-4 w-4" /> Add to Cart
          </button>
          <button
            onClick={() => onQuickView(product)}
            aria-label={`Quick view ${product.name}`}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-navy shadow-card transition-colors hover:bg-cream"
          >
            <Eye className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Meta */}
      <div className="mt-3.5 px-1">
        <div className="flex items-start justify-between gap-2">
          <Link href={`/shop/${product.slug}`}>
            <h3 className="font-display text-base font-semibold text-ink transition-colors group-hover/card:text-navy">
              {product.name}
            </h3>
          </Link>
          <div className="text-right">
            <span className="font-semibold text-navy">
              {formatINR(product.price)}
            </span>
            {product.compareAtPrice && (
              <span className="ml-1.5 text-xs text-mist line-through">
                {formatINR(product.compareAtPrice)}
              </span>
            )}
          </div>
        </div>
        <div className="mt-1 flex items-center justify-between">
          <p className="text-xs text-mist">{product.category}</p>
          {/* colour swatches */}
          <div className="flex items-center gap-1">
            {product.colors.map((c) => (
              <span
                key={c}
                title={c}
                className="h-3.5 w-3.5 rounded-full border border-navy/20"
                style={{ background: SWATCH[c] ?? "#ddd" }}
              />
            ))}
          </div>
        </div>

        {/* Size chips */}
        <div className="mt-2.5 flex flex-wrap gap-1.5">
          {product.sizes.map((s) => (
            <span
              key={s}
              className="rounded-md border border-navy/15 px-2 py-0.5 text-[11px] font-medium text-mist"
            >
              {s}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

"use client";

/**
 * Shop grid + filters: category, price range, size chips, sort dropdown,
 * active-filter pills, clear-all. State is URL-friendly via the category
 * query param (set from the navbar/footer links).
 */
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import type { Product } from "@/data/content";
import { products } from "@/data/content";
import ProductCard from "./ProductCard";
import QuickView from "./QuickView";
import { RevealItem, RevealStagger } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

const CATEGORIES = ["All", "Tees", "Polos"] as const;
const SIZES = ["S", "M", "L", "XL", "XXL"];
const SORTS = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Top Rated" },
] as const;

const MAX_PRICE = 2000;

export default function ShopClient() {
  const params = useSearchParams();
  const initialCat = (params.get("category") as string) || "All";

  const [category, setCategory] = useState<string>(
    CATEGORIES.includes(initialCat as (typeof CATEGORIES)[number])
      ? initialCat
      : "All"
  );
  const [activeSizes, setActiveSizes] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState(MAX_PRICE);
  const [sort, setSort] = useState<string>("featured");
  const [quick, setQuick] = useState<Product | null>(null);
  const [mobileFilters, setMobileFilters] = useState(false);

  const toggleSize = (s: string) =>
    setActiveSizes((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]
    );

  const clearAll = () => {
    setCategory("All");
    setActiveSizes([]);
    setMaxPrice(MAX_PRICE);
    setSort("featured");
  };

  const filtered = useMemo(() => {
    let list = products.filter((p) => {
      const catOk = category === "All" || p.category === category;
      const priceOk = p.price <= maxPrice;
      const sizeOk =
        activeSizes.length === 0 ||
        activeSizes.some((s) => p.sizes.includes(s));
      return catOk && priceOk && sizeOk;
    });

    list = [...list].sort((a, b) => {
      switch (sort) {
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        case "rating":
          return b.rating - a.rating;
        default:
          return Number(b.featured) - Number(a.featured);
      }
    });
    return list;
  }, [category, activeSizes, maxPrice, sort]);

  const hasFilters =
    category !== "All" || activeSizes.length > 0 || maxPrice < MAX_PRICE;

  const Filters = (
    <div className="space-y-8">
      {/* Category */}
      <div>
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-ink">
          Category
        </h3>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={cn(
                "rounded-full border px-4 py-1.5 text-sm transition",
                category === c
                  ? "border-navy bg-navy text-white"
                  : "border-navy/20 text-mist hover:border-navy"
              )}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Size */}
      <div>
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-ink">
          Size
        </h3>
        <div className="flex flex-wrap gap-2">
          {SIZES.map((s) => (
            <button
              key={s}
              onClick={() => toggleSize(s)}
              className={cn(
                "h-10 min-w-[2.75rem] rounded-lg border px-3 text-sm font-medium transition",
                activeSizes.includes(s)
                  ? "border-navy bg-navy text-white"
                  : "border-navy/20 text-ink hover:border-navy"
              )}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Price */}
      <div>
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-ink">
          Max Price:{" "}
          <span className="text-navy">₹{maxPrice.toLocaleString("en-IN")}</span>
        </h3>
        <input
          type="range"
          min={500}
          max={MAX_PRICE}
          step={100}
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="w-full accent-navy"
          aria-label="Maximum price"
        />
      </div>

      {hasFilters && (
        <button
          onClick={clearAll}
          className="text-sm font-medium text-glow underline-offset-4 hover:underline"
        >
          Clear all filters
        </button>
      )}
    </div>
  );

  return (
    <section className="container-st py-12 lg:py-16">
      <div className="grid gap-10 lg:grid-cols-[260px_1fr]">
        {/* Desktop sidebar */}
        <aside className="hidden lg:block">
          <div className="sticky top-28">{Filters}</div>
        </aside>

        <div>
          {/* Toolbar */}
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <p className="text-sm text-mist">
              <span className="font-semibold text-ink">{filtered.length}</span>{" "}
              product{filtered.length !== 1 && "s"}
            </p>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setMobileFilters(true)}
                className="flex items-center gap-2 rounded-full border border-navy/20 px-4 py-2 text-sm text-navy lg:hidden"
              >
                <SlidersHorizontal className="h-4 w-4" /> Filters
              </button>
              <label className="sr-only" htmlFor="sort">
                Sort by
              </label>
              <select
                id="sort"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="rounded-full border border-navy/20 bg-white px-4 py-2 text-sm text-navy outline-none focus:border-navy"
              >
                {SORTS.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Active pills */}
          {hasFilters && (
            <div className="mb-6 flex flex-wrap gap-2">
              {category !== "All" && (
                <Pill onClear={() => setCategory("All")}>{category}</Pill>
              )}
              {activeSizes.map((s) => (
                <Pill key={s} onClear={() => toggleSize(s)}>
                  Size {s}
                </Pill>
              ))}
              {maxPrice < MAX_PRICE && (
                <Pill onClear={() => setMaxPrice(MAX_PRICE)}>
                  ≤ ₹{maxPrice.toLocaleString("en-IN")}
                </Pill>
              )}
            </div>
          )}

          {/* Grid */}
          {filtered.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-navy/20 py-24 text-center">
              <p className="text-mist">No products match your filters.</p>
              <button
                onClick={clearAll}
                className="mt-3 font-medium text-navy underline-offset-4 hover:underline"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <RevealStagger
              className="grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-3"
              gap={0.06}
            >
              {filtered.map((p) => (
                <RevealItem key={p.slug}>
                  <ProductCard product={p} onQuickView={setQuick} />
                </RevealItem>
              ))}
            </RevealStagger>
          )}
        </div>
      </div>

      {/* Mobile filter sheet */}
      {mobileFilters && (
        <div className="fixed inset-0 z-[95] lg:hidden">
          <div
            className="absolute inset-0 bg-ink/60 backdrop-blur-sm"
            onClick={() => setMobileFilters(false)}
          />
          <div className="absolute bottom-0 left-0 right-0 max-h-[85vh] overflow-y-auto rounded-t-3xl bg-cream p-6">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="font-display text-xl font-bold text-ink">Filters</h2>
              <button
                aria-label="Close filters"
                onClick={() => setMobileFilters(false)}
                className="rounded-full p-2 text-navy hover:bg-navy/5"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            {Filters}
            <button
              onClick={() => setMobileFilters(false)}
              className="mt-8 w-full rounded-full bg-navy py-3.5 font-semibold text-white"
            >
              Show {filtered.length} products
            </button>
          </div>
        </div>
      )}

      <QuickView product={quick} onClose={() => setQuick(null)} />
    </section>
  );
}

function Pill({
  children,
  onClear,
}: {
  children: React.ReactNode;
  onClear: () => void;
}) {
  return (
    <span className="flex items-center gap-1.5 rounded-full bg-navy/5 px-3 py-1.5 text-sm text-navy">
      {children}
      <button onClick={onClear} aria-label="Remove filter">
        <X className="h-3.5 w-3.5" />
      </button>
    </span>
  );
}

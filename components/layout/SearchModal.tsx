"use client";

/** Lightweight client-side product search overlay. */
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import SmartImage from "@/components/ui/SmartImage";
import { Search, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { products, formatINR } from "@/data/content";

export default function SearchModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [q, setQ] = useState("");

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  useEffect(() => {
    document.documentElement.classList.toggle("lenis-stopped", open);
    return () => document.documentElement.classList.remove("lenis-stopped");
  }, [open]);

  const results = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return products.slice(0, 4);
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(term) ||
        p.category.toLowerCase().includes(term) ||
        p.shortDescription.toLowerCase().includes(term)
    );
  }, [q]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[90] flex justify-center bg-ink/70 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="mt-[12vh] h-fit w-[min(92vw,640px)] overflow-hidden rounded-3xl bg-white shadow-soft"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 border-b border-navy/10 px-5 py-4">
              <Search className="h-5 w-5 text-mist" />
              <input
                autoFocus
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search tees, polos…"
                className="w-full bg-transparent text-lg text-ink outline-none placeholder:text-mist"
              />
              <button
                aria-label="Close search"
                onClick={onClose}
                className="rounded-full p-1.5 text-mist hover:bg-navy/5"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="max-h-[50vh] overflow-y-auto p-2">
              {results.length === 0 && (
                <p className="px-4 py-8 text-center text-mist">
                  No products match “{q}”.
                </p>
              )}
              {results.map((p) => (
                <Link
                  key={p.slug}
                  href={`/shop/${p.slug}`}
                  onClick={onClose}
                  className="flex items-center gap-4 rounded-2xl p-3 transition hover:bg-cream"
                >
                  <div className="relative h-16 w-14 shrink-0 overflow-hidden rounded-lg bg-cream">
                    <SmartImage
                      src={p.photos?.[0]}
                      fallbackSrc={p.images[0]}
                      alt={p.name}
                      sizes="56px"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-ink">{p.name}</p>
                    <p className="text-sm text-mist">{p.category}</p>
                  </div>
                  <span className="font-semibold text-navy">
                    {formatINR(p.price)}
                  </span>
                </Link>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

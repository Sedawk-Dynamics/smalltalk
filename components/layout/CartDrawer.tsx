"use client";

/** Slide-in cart drawer (global). Line items, qty steppers, subtotal, checkout. */
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import SmartImage from "@/components/ui/SmartImage";
import { useEffect } from "react";
import { useCart } from "@/components/providers/CartProvider";
import { formatINR } from "@/data/content";
import MagneticButton from "@/components/ui/MagneticButton";

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQty, subtotal, count } =
    useCart();

  useEffect(() => {
    document.documentElement.classList.toggle("lenis-stopped", isOpen);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeCart();
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.classList.remove("lenis-stopped");
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, closeCart]);

  const FREE_SHIP = 1499;
  const remaining = Math.max(0, FREE_SHIP - subtotal);
  const progress = Math.min(100, (subtotal / FREE_SHIP) * 100);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-[100] bg-ink/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
          />
          <motion.aside
            className="fixed right-0 top-0 z-[101] flex h-full w-[min(92vw,440px)] flex-col bg-cream shadow-soft"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 32 }}
            role="dialog"
            aria-label="Shopping cart"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-navy/10 px-5 py-4">
              <h2 className="flex items-center gap-2 font-display text-lg font-bold text-ink">
                <ShoppingBag className="h-5 w-5" /> Your Cart
                <span className="text-mist">({count})</span>
              </h2>
              <button
                aria-label="Close cart"
                onClick={closeCart}
                className="rounded-full p-2 text-navy transition hover:bg-navy/5"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Free-shipping progress */}
            {items.length > 0 && (
              <div className="border-b border-navy/10 px-5 py-3">
                <p className="text-xs text-mist">
                  {remaining > 0 ? (
                    <>
                      You&apos;re{" "}
                      <span className="font-semibold text-navy">
                        {formatINR(remaining)}
                      </span>{" "}
                      away from free shipping
                    </>
                  ) : (
                    <span className="font-semibold text-navy">
                      🎉 You&apos;ve unlocked free shipping!
                    </span>
                  )}
                </p>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-navy/10">
                  <motion.div
                    className="h-full rounded-full bg-glow"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            )}

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-5 py-4">
              {items.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
                  <ShoppingBag className="h-12 w-12 text-navy/20" />
                  <p className="text-mist">Your cart is empty.</p>
                  <MagneticButton href="/shop" onClick={closeCart}>
                    Start Shopping
                  </MagneticButton>
                </div>
              ) : (
                <ul className="space-y-4">
                  <AnimatePresence initial={false}>
                    {items.map((item) => (
                      <motion.li
                        key={item.id}
                        layout
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, x: 40 }}
                        className="flex gap-3"
                      >
                        <Link
                          href={`/shop/${item.slug}`}
                          onClick={closeCart}
                          className="relative h-24 w-20 shrink-0 overflow-hidden rounded-xl bg-white"
                        >
                          <SmartImage
                            src={item.image}
                            alt={item.name}
                            sizes="80px"
                          />
                        </Link>
                        <div className="flex flex-1 flex-col">
                          <div className="flex justify-between gap-2">
                            <p className="font-medium text-ink">{item.name}</p>
                            <button
                              aria-label="Remove item"
                              onClick={() => removeItem(item.id)}
                              className="text-mist transition hover:text-glow"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                          <p className="text-xs capitalize text-mist">
                            {item.size} · {item.color}
                          </p>
                          <div className="mt-auto flex items-center justify-between">
                            <div className="flex items-center rounded-full border border-navy/15">
                              <button
                                aria-label="Decrease quantity"
                                onClick={() =>
                                  updateQty(item.id, item.qty - 1)
                                }
                                className="p-1.5 text-navy transition hover:text-glow"
                              >
                                <Minus className="h-3.5 w-3.5" />
                              </button>
                              <span className="w-6 text-center text-sm font-medium">
                                {item.qty}
                              </span>
                              <button
                                aria-label="Increase quantity"
                                onClick={() =>
                                  updateQty(item.id, item.qty + 1)
                                }
                                className="p-1.5 text-navy transition hover:text-glow"
                              >
                                <Plus className="h-3.5 w-3.5" />
                              </button>
                            </div>
                            <span className="font-semibold text-navy">
                              {formatINR(item.price * item.qty)}
                            </span>
                          </div>
                        </div>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-navy/10 px-5 py-4">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-sm text-mist">Subtotal</span>
                  <span className="font-display text-xl font-bold text-ink">
                    {formatINR(subtotal)}
                  </span>
                </div>
                <p className="mb-3 text-xs text-mist">
                  Taxes &amp; shipping calculated at checkout.
                </p>
                <div className="flex flex-col gap-2">
                  <Link
                    href="/cart"
                    onClick={closeCart}
                    className="flex items-center justify-center rounded-full bg-navy py-3.5 text-sm font-semibold text-white transition-colors hover:bg-ink"
                  >
                    Checkout
                  </Link>
                  <button
                    onClick={closeCart}
                    className="text-center text-sm text-mist underline-offset-4 hover:text-navy hover:underline"
                  >
                    Continue shopping
                  </button>
                </div>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

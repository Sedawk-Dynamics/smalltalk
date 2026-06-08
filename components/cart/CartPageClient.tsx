"use client";

/** Full cart page — line items, qty, order summary, mock checkout. */
import Link from "next/link";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import SmartImage from "@/components/ui/SmartImage";
import { useCart } from "@/components/providers/CartProvider";
import { useToast } from "@/components/providers/ToastProvider";
import { formatINR } from "@/data/content";
import MagneticButton from "@/components/ui/MagneticButton";

export default function CartPageClient() {
  const { items, subtotal, updateQty, removeItem, clear, count } = useCart();
  const { toast } = useToast();

  const FREE_SHIP = 1499;
  const shipping = subtotal === 0 || subtotal >= FREE_SHIP ? 0 : 79;
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <div className="container-st flex flex-col items-center justify-center gap-5 py-32 text-center">
        <ShoppingBag className="h-16 w-16 text-navy/20" />
        <h1 className="font-display text-3xl font-bold text-ink">
          Your cart is empty
        </h1>
        <p className="max-w-sm text-mist">
          Looks like you haven&apos;t added anything yet. Let&apos;s fix that.
        </p>
        <MagneticButton href="/shop">Start Shopping</MagneticButton>
      </div>
    );
  }

  return (
    <div className="container-st grid gap-10 py-12 lg:grid-cols-[1.6fr_1fr] lg:py-16">
      {/* Items */}
      <div>
        <div className="flex items-center justify-between">
          <h1 className="font-display text-3xl font-bold tracking-tighter text-ink">
            Cart{" "}
            <span className="text-mist">
              ({count} item{count !== 1 && "s"})
            </span>
          </h1>
          <button
            onClick={() => {
              clear();
              toast("Cart cleared", "info");
            }}
            className="text-sm text-mist underline-offset-4 hover:text-glow hover:underline"
          >
            Clear all
          </button>
        </div>

        <ul className="mt-6 divide-y divide-navy/10">
          {items.map((item) => (
            <li key={item.id} className="flex gap-4 py-5">
              <Link
                href={`/shop/${item.slug}`}
                className="relative h-28 w-24 shrink-0 overflow-hidden rounded-2xl bg-cream"
              >
                <SmartImage
                  src={item.image}
                  alt={item.name}
                  sizes="96px"
                />
              </Link>
              <div className="flex flex-1 flex-col">
                <div className="flex justify-between gap-3">
                  <div>
                    <Link
                      href={`/shop/${item.slug}`}
                      className="font-display text-lg font-semibold text-ink hover:text-navy"
                    >
                      {item.name}
                    </Link>
                    <p className="text-sm capitalize text-mist">
                      {item.size} · {item.color}
                    </p>
                  </div>
                  <p className="font-semibold text-navy">
                    {formatINR(item.price * item.qty)}
                  </p>
                </div>
                <div className="mt-auto flex items-center justify-between">
                  <div className="flex items-center rounded-full border border-navy/15">
                    <button
                      aria-label="Decrease quantity"
                      onClick={() => updateQty(item.id, item.qty - 1)}
                      className="p-2 text-navy hover:text-glow"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-8 text-center text-sm font-medium">
                      {item.qty}
                    </span>
                    <button
                      aria-label="Increase quantity"
                      onClick={() => updateQty(item.id, item.qty + 1)}
                      className="p-2 text-navy hover:text-glow"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="flex items-center gap-1.5 text-sm text-mist hover:text-glow"
                  >
                    <Trash2 className="h-4 w-4" /> Remove
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <Link
          href="/shop"
          className="mt-6 inline-block text-sm font-medium text-navy underline-offset-4 hover:underline"
        >
          ← Continue shopping
        </Link>
      </div>

      {/* Summary */}
      <aside className="h-fit lg:sticky lg:top-28">
        <div className="rounded-3xl border border-navy/10 bg-cream p-6 sm:p-8">
          <h2 className="font-display text-xl font-bold text-ink">
            Order Summary
          </h2>
          <dl className="mt-5 space-y-3 text-sm">
            <div className="flex justify-between">
              <dt className="text-mist">Subtotal</dt>
              <dd className="font-medium text-ink">{formatINR(subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-mist">Shipping</dt>
              <dd className="font-medium text-ink">
                {shipping === 0 ? "Free" : formatINR(shipping)}
              </dd>
            </div>
            <div className="flex justify-between border-t border-navy/10 pt-3">
              <dt className="font-display text-lg font-bold text-ink">Total</dt>
              <dd className="font-display text-lg font-bold text-navy">
                {formatINR(total)}
              </dd>
            </div>
          </dl>

          <button
            onClick={() =>
              toast("This is a demo checkout — wire up your payment gateway.", "info")
            }
            className="mt-6 w-full rounded-full bg-navy py-4 text-sm font-semibold text-white transition hover:bg-ink"
          >
            Proceed to Checkout
          </button>
          <p className="mt-3 text-center text-xs text-mist">
            {/* TODO: integrate Razorpay / Stripe / Shopify checkout here. */}
            Secure checkout · Demo only
          </p>
        </div>
      </aside>
    </div>
  );
}

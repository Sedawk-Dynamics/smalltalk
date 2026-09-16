"use client";

/**
 * Sticky shrinking navbar.
 * - Transparent over the hero, turns to a frosted bar once scrolled.
 * - Live cart-count badge opens the cart drawer.
 * - Mobile: hamburger → full-screen animated overlay with staggered links.
 */
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu, Search, ShoppingBag, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Logo from "@/components/ui/Logo";
import MagneticButton from "@/components/ui/MagneticButton";
import { categories, navLinks, shopUrl } from "@/data/content";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  // Full-width "Shop" mega dropdown (client request) — small close delay so
  // the cursor can travel from the nav link into the panel.
  const [shopOpen, setShopOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const openShop = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setShopOpen(true);
  };
  const scheduleCloseShop = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setShopOpen(false), 150);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change.
  useEffect(() => setMenuOpen(false), [pathname]);

  // Lock scroll when the mobile menu is open.
  useEffect(() => {
    document.documentElement.classList.toggle("lenis-stopped", menuOpen);
    return () => document.documentElement.classList.remove("lenis-stopped");
  }, [menuOpen]);

  // Pages whose first section is DARK (navy) and bleeds up behind the navbar →
  // use a light (white) logo at the top. Light-hero pages keep the dark logo.
  const isProductPage = /^\/shop\/[^/]+$/.test(pathname);
  const isHome = pathname === "/"; // home hero is now a light banner image
  const lightHero = isProductPage || isHome; // these pages have a light top; others are dark
  const darkHero = !lightHero;
  const onLight = scrolled || !darkHero;

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 w-full transition-all duration-500",
          scrolled ? "px-3 pt-3 sm:px-5" : "px-0 pt-0"
        )}
      >
        <nav
          className={cn(
            "mx-auto flex items-center justify-between transition-all duration-500",
            scrolled
              ? "max-w-[1340px] gap-4 rounded-full border border-white/40 bg-cream/70 px-5 py-2.5 shadow-[0_18px_50px_-24px_rgba(21,21,59,0.5)] backdrop-blur-xl sm:px-7"
              : "container-st py-5"
          )}
        >
          {/* Logo */}
          <Link href="/" aria-label="The Small Talk Store — home">
            <Logo
              variant={onLight ? "dark" : "light"}
              priority
              className={cn(
                "w-auto transition-all duration-500",
                scrolled ? "h-7" : "h-9"
              )}
            />
          </Link>

          {/* Center links */}
          <ul className="hidden items-center gap-1 lg:flex">
            {navLinks.map((l) => {
              const active =
                l.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(l.href);
              const isShop = l.label === "Shop";
              return (
                <li
                  key={l.href}
                  onMouseEnter={isShop ? openShop : undefined}
                  onMouseLeave={isShop ? scheduleCloseShop : undefined}
                >
                  <Link
                    href={l.href}
                    onFocus={isShop ? openShop : undefined}
                    className={cn(
                      "relative inline-flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium transition-colors",
                      onLight ? "text-navy/80 hover:text-navy" : "text-white/80 hover:text-white",
                      active && (onLight ? "text-navy" : "text-white")
                    )}
                  >
                    {l.label}
                    {isShop && (
                      <ChevronDown
                        className={cn(
                          "h-3.5 w-3.5 transition-transform duration-300",
                          shopOpen && "rotate-180"
                        )}
                      />
                    )}
                    {active && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-glow"
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Right cluster — search/cart/shop all live on the WooCommerce site */}
          <div className="flex items-center gap-1.5">
            <a
              href={shopUrl}
              aria-label="Search the shop"
              className={cn(
                "rounded-full p-2.5 transition-colors",
                onLight ? "text-navy hover:bg-navy/5" : "text-white hover:bg-white/10"
              )}
            >
              <Search className="h-5 w-5" />
            </a>

            <a
              href={`${shopUrl}/cart/`}
              aria-label="Cart"
              className={cn(
                "relative rounded-full p-2.5 transition-colors",
                onLight ? "text-navy hover:bg-navy/5" : "text-white hover:bg-white/10"
              )}
            >
              <ShoppingBag className="h-5 w-5" />
            </a>

            <div className="ml-1 hidden sm:block">
              <MagneticButton
                href={shopUrl}
                variant={onLight ? "primary" : "light"}
                className="px-5 py-2.5 text-xs"
              >
                Shop Now
              </MagneticButton>
            </div>

            {/* Hamburger */}
            <button
              aria-label="Open menu"
              onClick={() => setMenuOpen(true)}
              className={cn(
                "rounded-full p-2.5 transition-colors lg:hidden",
                onLight ? "text-navy hover:bg-navy/5" : "text-white hover:bg-white/10"
              )}
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </nav>

        {/* Full-width Shop mega dropdown (desktop) */}
        <AnimatePresence>
          {shopOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              onMouseEnter={openShop}
              onMouseLeave={scheduleCloseShop}
              className="absolute inset-x-0 top-full hidden lg:block"
            >
              <div className="mx-3 mt-2 rounded-3xl border border-white/40 bg-cream/95 shadow-soft backdrop-blur-xl sm:mx-5">
                <div className="container-st grid grid-cols-6 gap-8 px-8 py-8">
                  {categories.map((c) => (
                    <div key={c.name}>
                      <a
                        href={c.href}
                        className="font-display text-base font-bold text-ink transition-colors hover:text-glow"
                      >
                        {c.name}
                      </a>
                      {c.children && (
                        <ul className="mt-3 space-y-2">
                          {c.children.map((s) => (
                            <li key={s.name}>
                              <a
                                href={s.href}
                                className="text-sm text-mist transition-colors hover:text-navy"
                              >
                                {s.name}
                              </a>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
                <div className="border-t border-navy/10 px-8 py-4 text-center">
                  <a
                    href={shopUrl}
                    className="text-sm font-semibold text-navy transition-colors hover:text-glow"
                  >
                    View All Products →
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Full-screen mobile overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-[80] flex flex-col bg-navy text-white"
            initial={{ clipPath: "circle(0% at 100% 0%)" }}
            animate={{ clipPath: "circle(150% at 100% 0%)" }}
            exit={{ clipPath: "circle(0% at 100% 0%)" }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="container-st flex items-center justify-between py-5">
              <Logo variant="light" className="h-9 w-auto" />
              <button
                aria-label="Close menu"
                onClick={() => setMenuOpen(false)}
                className="rounded-full p-2.5 hover:bg-white/10"
              >
                <X className="h-7 w-7" />
              </button>
            </div>

            <nav className="container-st flex flex-1 flex-col justify-center gap-2">
              {navLinks.map((l, i) => (
                <motion.div
                  key={l.href}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 + i * 0.08, duration: 0.5 }}
                >
                  <Link
                    href={l.href}
                    className="block font-display text-5xl font-bold tracking-tighter transition-colors hover:text-glow sm:text-7xl"
                  >
                    {l.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <div className="container-st pb-10">
              <MagneticButton href={shopUrl} variant="light">
                Shop the Collection
              </MagneticButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

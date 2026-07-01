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
import { Menu, Search, ShoppingBag, X } from "lucide-react";
import { useEffect, useState } from "react";
import Logo from "@/components/ui/Logo";
import MagneticButton from "@/components/ui/MagneticButton";
import { navLinks } from "@/data/content";
import { useCart } from "@/components/providers/CartProvider";
import { cn } from "@/lib/utils";
import SearchModal from "./SearchModal";

export default function Navbar() {
  const pathname = usePathname();
  const { count, openCart } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

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
  const lightHero = isProductPage; // product pages have a light top; others are dark
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
              return (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className={cn(
                      "relative rounded-full px-4 py-2 text-sm font-medium transition-colors",
                      onLight ? "text-navy/80 hover:text-navy" : "text-white/80 hover:text-white",
                      active && (onLight ? "text-navy" : "text-white")
                    )}
                  >
                    {l.label}
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

          {/* Right cluster */}
          <div className="flex items-center gap-1.5">
            <button
              aria-label="Search"
              onClick={() => setSearchOpen(true)}
              className={cn(
                "rounded-full p-2.5 transition-colors",
                onLight ? "text-navy hover:bg-navy/5" : "text-white hover:bg-white/10"
              )}
            >
              <Search className="h-5 w-5" />
            </button>

            <button
              aria-label={`Cart, ${count} items`}
              onClick={openCart}
              className={cn(
                "relative rounded-full p-2.5 transition-colors",
                onLight ? "text-navy hover:bg-navy/5" : "text-white hover:bg-white/10"
              )}
            >
              <ShoppingBag className="h-5 w-5" />
              <AnimatePresence>
                {count > 0 && (
                  <motion.span
                    key={count}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -right-0.5 -top-0.5 flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-glow px-1 text-[10px] font-bold text-white"
                  >
                    {count}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            <div className="ml-1 hidden sm:block">
              <MagneticButton
                href="/shop"
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
              <MagneticButton href="/shop" variant="light">
                Shop the Collection
              </MagneticButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}

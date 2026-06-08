"use client";

/** Back-to-top + floating WhatsApp (gently pulsing). */
import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";
import { brand } from "@/data/content";

export default function FloatingButtons() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toTop = () => {
    const lenis = (window as unknown as { lenis?: { scrollTo: (n: number) => void } })
      .lenis;
    if (lenis) lenis.scrollTo(0);
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="fixed bottom-6 right-6 z-[120] flex flex-col items-center gap-3">
      {/* Back to top */}
      <button
        onClick={toTop}
        aria-label="Back to top"
        className={`flex h-11 w-11 items-center justify-center rounded-full border border-navy/15 bg-white text-navy shadow-soft transition-all duration-300 hover:bg-navy hover:text-white ${
          show
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-4 opacity-0"
        }`}
      >
        <ArrowUp className="h-5 w-5" />
      </button>

      {/* WhatsApp */}
      <a
        href={`https://wa.me/${brand.whatsapp}?text=${encodeURIComponent(
          "Hi! I'd like to know more about The Small Talk Store."
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] p-3.5 text-white shadow-soft"
      >
        <span className="absolute inset-0 animate-pulse-ring rounded-full bg-[#25D366]" />
        <svg viewBox="0 0 32 32" className="relative h-6 w-6" fill="currentColor">
          <path d="M16.004 0h-.008C7.174 0 0 7.176 0 16c0 3.49 1.124 6.726 3.038 9.354L1.05 31.27l6.117-1.957A15.9 15.9 0 0 0 16.004 32C24.826 32 32 24.822 32 16S24.826 0 16.004 0zm9.32 22.586c-.387 1.092-1.922 1.998-3.146 2.262-.836.178-1.928.32-5.604-1.204-4.704-1.95-7.73-6.73-7.966-7.04-.226-.31-1.9-2.53-1.9-4.826 0-2.296 1.166-3.424 1.636-3.904.387-.396.846-.576 1.348-.576.162 0 .31.008.442.014.387.018.582.04.838.654.318.77 1.096 2.668 1.19 2.862.094.194.156.42.026.73-.122.31-.226.45-.45.69-.226.24-.44.424-.664.682-.204.226-.434.47-.176.91.258.43 1.146 1.89 2.46 3.06 1.696 1.51 3.094 1.978 3.572 2.176.356.148.78.112 1.04-.166.33-.356.736-.946 1.15-1.526.294-.41.664-.462 1.054-.318.396.138 2.49 1.174 2.918 1.388.428.214.712.318.818.494.106.18.106 1.022-.282 2.114z" />
        </svg>
      </a>
    </div>
  );
}

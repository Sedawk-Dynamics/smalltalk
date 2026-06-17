"use client";

/**
 * Full-screen navy preloader:
 * the t-shirt-collar motif "draws" in, a percentage counter ticks up,
 * then a curtain reveals the page. Shown once per session.
 */
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useReducedMotion } from "@/lib/hooks";
import Logo from "./Logo";

export default function Preloader() {
  const reduced = useReducedMotion();
  const [done, setDone] = useState(false);
  const [pct, setPct] = useState(0);

  useEffect(() => {
    // Show once per browser session.
    if (typeof window !== "undefined" && sessionStorage.getItem("sts-loaded")) {
      setDone(true);
      return;
    }

    if (reduced) {
      sessionStorage.setItem("sts-loaded", "1");
      const t = setTimeout(() => setDone(true), 300);
      return () => clearTimeout(t);
    }

    let frame = 0;
    const start = performance.now();
    const total = 1900;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / total);
      setPct(Math.round(p * 100));
      if (p < 1) {
        frame = requestAnimationFrame(tick);
      } else {
        sessionStorage.setItem("sts-loaded", "1");
        setTimeout(() => setDone(true), 350);
      }
    };
    frame = requestAnimationFrame(tick);

    // Lock scroll during preload.
    document.documentElement.classList.add("lenis-stopped");
    return () => {
      cancelAnimationFrame(frame);
      document.documentElement.classList.remove("lenis-stopped");
    };
  }, [reduced]);

  useEffect(() => {
    if (done) document.documentElement.classList.remove("lenis-stopped");
  }, [done]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[300] flex flex-col items-center justify-center bg-navy text-white"
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* animated mesh behind */}
          <div className="pointer-events-none absolute inset-0 opacity-50">
            <div className="absolute left-1/4 top-1/3 h-72 w-72 animate-mesh-drift rounded-full bg-glow/40 blur-[100px]" />
            <div className="absolute right-1/4 bottom-1/4 h-72 w-72 animate-mesh-drift rounded-full bg-cyan/30 blur-[100px]" />
          </div>

          <motion.svg
            viewBox="0 0 64 64"
            className="relative h-24 w-24"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.path
              d="M22 8 L12 14 L7 26 L16 30 L18 24 L18 54 A2 2 0 0 0 20 56 L44 56 A2 2 0 0 0 46 54 L46 24 L48 30 L57 26 L52 14 L42 8 C40 14 34 16 32 16 C30 16 24 14 22 8 Z"
              fill="none"
              stroke="#fff"
              strokeWidth={1.5}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: reduced ? 1 : 1 }}
              transition={{ duration: 1.6, ease: "easeInOut" }}
            />
            <motion.path
              d="M22 8 L12 14 L7 26 L16 30 L18 24 L18 54 A2 2 0 0 0 20 56 L44 56 A2 2 0 0 0 46 54 L46 24 L48 30 L57 26 L52 14 L42 8 C40 14 34 16 32 16 C30 16 24 14 22 8 Z"
              fill="#5B5BF0"
              initial={{ opacity: 0 }}
              animate={{ opacity: reduced ? 1 : pct / 100 }}
            />
          </motion.svg>

          <Logo variant="light" className="relative mt-8 h-7 w-auto opacity-90" />
          <div className="relative mt-3 font-display text-5xl font-bold tabular-nums">
            {pct}
            <span className="text-glow">%</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

"use client";

/**
 * Kinetic headline: words mask up one after another.
 * Robust trigger: uses useInView, but ALSO force-shows shortly after mount so
 * the text can never get stuck hidden if the in-view callback misfires
 * (e.g. behind the preloader / under Lenis).
 */
import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/lib/hooks";
import { cn } from "@/lib/utils";

export default function SplitText({
  text,
  words,
  className,
  delay = 0,
  stagger = 0.08,
}: {
  text?: string;
  words?: string[];
  className?: string;
  delay?: number;
  stagger?: number;
  // `highlight` / `highlightClass` are accepted for backwards-compat but no
  // longer render coloured words — headings are a single solid colour now.
  highlight?: number[];
  highlightClass?: string;
}) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });
  const [forceShow, setForceShow] = useState(false);

  // Safety net: never let the text stay hidden.
  useEffect(() => {
    const t = setTimeout(() => setForceShow(true), 900);
    return () => clearTimeout(t);
  }, []);

  const tokens = words ?? text?.split(" ") ?? [];
  const show = reduced || inView || forceShow;

  return (
    <span ref={ref} className={cn("inline", className)} aria-label={tokens.join(" ")}>
      {tokens.map((w, i) => (
        <span
          key={i}
          aria-hidden
          className={cn(
            "inline-block overflow-hidden align-bottom",
            // real gap between words — a trailing space would be clipped by
            // the overflow-hidden box, so use margin instead.
            i < tokens.length - 1 && "mr-[0.25em]"
          )}
        >
          <motion.span
            className="inline-block"
            initial={{ y: "110%" }}
            animate={show ? { y: "0%" } : { y: "110%" }}
            transition={{
              duration: reduced ? 0 : 0.7,
              delay: reduced ? 0 : delay + i * stagger,
              ease: [0.33, 1, 0.68, 1],
            }}
          >
            {w}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

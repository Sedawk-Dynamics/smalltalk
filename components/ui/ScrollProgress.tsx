"use client";

/** Thin gradient scroll-progress beam pinned to the very top of the viewport. */
import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[130] h-[3px] origin-left bg-gradient-to-r from-navy via-glow to-cyan shadow-[0_0_12px_rgba(91,91,240,0.7)]"
    />
  );
}

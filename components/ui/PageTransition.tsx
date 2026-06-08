"use client";

/**
 * Lightweight route transition: the incoming page fades/rises in quickly.
 * We intentionally avoid AnimatePresence `mode="wait"` (which unmounts the old
 * page first and leaves a blank gap) — instead each route just animates in on
 * mount, keyed by pathname. Fast, no blank flash. Skips for reduced-motion.
 */
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useReducedMotion } from "@/lib/hooks";

export default function PageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const reduced = useReducedMotion();

  if (reduced) return <>{children}</>;

  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

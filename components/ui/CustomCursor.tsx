"use client";

/**
 * Custom cursor: a small dot + trailing ring.
 * - Ring grows + inverts over [data-cursor="hover"] / links / buttons.
 * - Only enabled on fine pointers and when motion is allowed.
 */
import { useEffect, useRef, useState } from "react";
import { useFinePointer, useReducedMotion } from "@/lib/hooks";

export default function CustomCursor() {
  const fine = useFinePointer();
  const reduced = useReducedMotion();
  const enabled = fine && !reduced;

  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    if (!enabled) {
      document.body.classList.remove("has-custom-cursor");
      return;
    }
    document.body.classList.add("has-custom-cursor");

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      setHidden(false);
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }
      const target = e.target as HTMLElement;
      const interactive = target.closest(
        'a, button, [data-cursor="hover"], input, textarea, select, [role="button"]'
      );
      setHovering(Boolean(interactive));
    };

    const onLeave = () => setHidden(true);

    // Smooth trailing ring via lerp.
    const tick = () => {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.body.classList.remove("has-custom-cursor");
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[150]"
      style={{ opacity: hidden ? 0 : 1, transition: "opacity 0.2s" }}
    >
      <div
        ref={dotRef}
        className="absolute -ml-1 -mt-1 h-2 w-2 rounded-full bg-glow"
        style={{
          transition: "width .2s, height .2s, background .2s",
          ...(hovering ? { width: 0, height: 0 } : {}),
        }}
      />
      <div
        ref={ringRef}
        className="absolute rounded-full border"
        style={{
          width: hovering ? 56 : 34,
          height: hovering ? 56 : 34,
          marginLeft: hovering ? -28 : -17,
          marginTop: hovering ? -28 : -17,
          borderColor: hovering ? "transparent" : "rgba(91,91,240,0.7)",
          backgroundColor: hovering ? "rgba(91,91,240,0.18)" : "transparent",
          backdropFilter: hovering ? "invert(1)" : "none",
          transition:
            "width .25s ease, height .25s ease, margin .25s ease, background .25s ease, border-color .25s ease",
        }}
      />
    </div>
  );
}

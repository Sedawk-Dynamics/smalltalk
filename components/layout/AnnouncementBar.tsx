"use client";

/** Slim, dismissible announcement bar (persists dismissal in localStorage). */
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { announcement } from "@/data/content";

export default function AnnouncementBar() {
  const [open, setOpen] = useState(true);

  useEffect(() => {
    if (localStorage.getItem("sts-announce-dismissed") === "1") setOpen(false);
  }, []);

  if (!open) return null;

  return (
    <div className="relative z-[55] bg-ink text-white">
      <div className="container-st flex items-center justify-center gap-3 py-2 text-center text-xs sm:text-sm">
        <p className="font-medium tracking-wide">
          <span className="text-cyan">✦</span> {announcement}
        </p>
        <button
          aria-label="Dismiss announcement"
          onClick={() => {
            setOpen(false);
            localStorage.setItem("sts-announce-dismissed", "1");
          }}
          className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full p-1 opacity-70 transition hover:bg-white/10 hover:opacity-100"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

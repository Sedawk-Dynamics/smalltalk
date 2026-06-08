"use client";

/** Email capture with validation + success state. */
import { ArrowRight, Check } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function Newsletter({
  dark = false,
  className,
}: {
  dark?: boolean;
  className?: string;
}) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "error" | "done">("idle");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!ok) {
      setStatus("error");
      return;
    }
    // TODO: wire to your ESP (Mailchimp/Klaviyo) or a /api route.
    setStatus("done");
    setEmail("");
  };

  if (status === "done") {
    return (
      <div
        className={cn(
          "flex items-center gap-3 rounded-full px-5 py-3.5 text-sm font-medium",
          dark ? "bg-white/10 text-white" : "bg-navy/5 text-navy",
          className
        )}
      >
        <Check className="h-5 w-5 text-cyan" />
        You&apos;re in. Welcome to the inner circle.
      </div>
    );
  }

  return (
    <form onSubmit={submit} className={cn("w-full", className)} noValidate>
      <div
        className={cn(
          "flex items-center gap-2 rounded-full border p-1.5 pl-5 transition-colors",
          dark
            ? "border-white/20 bg-white/5 focus-within:border-white/50"
            : "border-navy/20 bg-white focus-within:border-navy"
        )}
      >
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status === "error") setStatus("idle");
          }}
          placeholder="Enter your email"
          aria-label="Email address"
          className={cn(
            "w-full bg-transparent text-sm outline-none",
            dark
              ? "text-white placeholder:text-white/50"
              : "text-ink placeholder:text-mist"
          )}
        />
        <button
          type="submit"
          aria-label="Subscribe"
          className={cn(
            "group flex h-10 shrink-0 items-center gap-1.5 rounded-full px-5 text-sm font-semibold transition-colors",
            dark ? "bg-white text-navy hover:bg-cream" : "bg-navy text-white hover:bg-ink"
          )}
        >
          Subscribe
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
      {status === "error" && (
        <p
          className={cn(
            "mt-2 pl-5 text-xs",
            dark ? "text-cyan" : "text-glow"
          )}
        >
          Please enter a valid email address.
        </p>
      )}
    </form>
  );
}

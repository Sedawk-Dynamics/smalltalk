import type { Config } from "tailwindcss";

/**
 * The Small Talk Store — brand design tokens.
 * Sample the exact navy from the real logo and tweak `navy`/`ink` if needed.
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: "#21215A", // primary — backgrounds, headings, primary buttons
        ink: "#15153B", // deep sections, footer
        cream: "#F7F6F2", // light section backgrounds
        mist: "#6B6B7B", // muted body text
        glow: "#5B5BF0", // electric accent — use sparingly
        cyan: "#3DD6D0", // alt accent for gradient mesh / highlights
      },
      fontFamily: {
        // Wired up via next/font in app/layout.tsx → CSS variables.
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        tighter: "-0.04em",
        tightest: "-0.06em",
      },
      borderRadius: {
        xl2: "1.25rem",
        "3xl": "1.75rem",
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(91,91,240,0.4), 0 8px 40px -8px rgba(91,91,240,0.5)",
        soft: "0 20px 60px -20px rgba(21,21,59,0.25)",
        card: "0 10px 40px -15px rgba(21,21,59,0.35)",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "marquee-reverse": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0)" },
        },
        "mesh-drift": {
          "0%, 100%": { transform: "translate(0,0) scale(1)" },
          "33%": { transform: "translate(4%, -6%) scale(1.1)" },
          "66%": { transform: "translate(-5%, 4%) scale(0.95)" },
        },
        "pulse-ring": {
          "0%": { transform: "scale(1)", opacity: "0.7" },
          "100%": { transform: "scale(2.2)", opacity: "0" },
        },
        "spin-slow": {
          to: { transform: "rotate(360deg)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-14px)" },
        },
      },
      animation: {
        marquee: "marquee 28s linear infinite",
        "marquee-reverse": "marquee-reverse 28s linear infinite",
        "mesh-drift": "mesh-drift 18s ease-in-out infinite",
        "pulse-ring": "pulse-ring 2.4s ease-out infinite",
        "spin-slow": "spin-slow 24s linear infinite",
        float: "float 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;

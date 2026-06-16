import type { Metadata } from "next";
import LegalPage from "@/components/legal/LegalPage";
import { terms } from "@/data/legal";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "Terms & Conditions for The Small Talk Store (Small Talk Garment LLP) — orders, pricing, shipping, returns, liability and governing law.",
};

export default function TermsPage() {
  return <LegalPage doc={terms} />;
}

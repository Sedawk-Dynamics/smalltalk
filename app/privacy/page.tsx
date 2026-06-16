import type { Metadata } from "next";
import LegalPage from "@/components/legal/LegalPage";
import { privacy } from "@/data/legal";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How The Small Talk Store collects, uses and protects your personal data.",
};

export default function PrivacyPage() {
  return <LegalPage doc={privacy} />;
}

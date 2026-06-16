import type { Metadata } from "next";
import LegalPage from "@/components/legal/LegalPage";
import { refund } from "@/data/legal";

export const metadata: Metadata = {
  title: "Refund & Cancellation Policy",
  description:
    "Cancellations, returns, exchanges and refunds at The Small Talk Store.",
};

export default function RefundPage() {
  return <LegalPage doc={refund} />;
}

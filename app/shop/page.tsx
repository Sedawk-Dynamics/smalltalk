import { Suspense } from "react";
import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import ShopClient from "@/components/shop/ShopClient";

export const metadata: Metadata = {
  title: "Shop",
  description:
    "Shop premium everyday tees and polos from The Small Talk Store. Quality fabrics, honest pricing.",
};

export default function ShopPage() {
  return (
    <>
      <PageHeader
        title="The Collection"
        highlight={[1]}
        subtitle="Premium everyday staples — tees and polos built to feel as good as they look."
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Shop", href: "/shop" },
        ]}
      />
      {/* useSearchParams needs a Suspense boundary in the App Router. */}
      <Suspense fallback={<div className="container-st py-20 text-mist">Loading products…</div>}>
        <ShopClient />
      </Suspense>
    </>
  );
}

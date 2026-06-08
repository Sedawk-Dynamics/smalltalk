import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import CartPageClient from "@/components/cart/CartPageClient";

export const metadata: Metadata = {
  title: "Cart",
  description: "Review your bag and check out.",
};

export default function CartPage() {
  return (
    <>
      <PageHeader
        title="Your Bag"
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Cart", href: "/cart" },
        ]}
      />
      <CartPageClient />
    </>
  );
}

"use client";

/** Client-side provider stack + global chrome that must live below <body>. */
import { CartProvider } from "./CartProvider";
import { ToastProvider } from "./ToastProvider";
import SmoothScroll from "./SmoothScroll";
import Preloader from "@/components/ui/Preloader";
import CartDrawer from "@/components/layout/CartDrawer";
import FloatingButtons from "@/components/ui/FloatingButtons";
import PageTransition from "@/components/ui/PageTransition";
import ScrollProgress from "@/components/ui/ScrollProgress";

// NOTE(client-feedback): custom cursor removed — native OS cursor restored
// site-wide for simpler, more accessible navigation.
export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <ToastProvider>
        <SmoothScroll>
          <Preloader />
          <ScrollProgress />
          <PageTransition>{children}</PageTransition>
          <CartDrawer />
          <FloatingButtons />
        </SmoothScroll>
      </ToastProvider>
    </CartProvider>
  );
}

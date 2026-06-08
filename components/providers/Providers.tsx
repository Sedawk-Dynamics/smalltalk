"use client";

/** Client-side provider stack + global chrome that must live below <body>. */
import { CartProvider } from "./CartProvider";
import { ToastProvider } from "./ToastProvider";
import SmoothScroll from "./SmoothScroll";
import CustomCursor from "@/components/ui/CustomCursor";
import Preloader from "@/components/ui/Preloader";
import CartDrawer from "@/components/layout/CartDrawer";
import FloatingButtons from "@/components/ui/FloatingButtons";
import PageTransition from "@/components/ui/PageTransition";
import ScrollProgress from "@/components/ui/ScrollProgress";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <ToastProvider>
        <SmoothScroll>
          <Preloader />
          <ScrollProgress />
          <CustomCursor />
          <PageTransition>{children}</PageTransition>
          <CartDrawer />
          <FloatingButtons />
        </SmoothScroll>
      </ToastProvider>
    </CartProvider>
  );
}

import type { Metadata } from "next";
import HeroBento from "@/components/home2/HeroBento";
import Marquee from "@/components/ui/Marquee";
import Manifesto from "@/components/home2/Manifesto";
import ProductSpotlight from "@/components/home2/ProductSpotlight";
import StickyFeatures from "@/components/home2/StickyFeatures";
import CollectionMosaic from "@/components/home2/CollectionMosaic";
import TestimonialsMarquee from "@/components/home2/TestimonialsMarquee";
import CTASplit from "@/components/home2/CTASplit";
import NewsletterBand from "@/components/home/NewsletterBand";
import HomeVariantSwitch from "@/components/ui/HomeVariantSwitch";
import { marqueeItems } from "@/data/content";

export const metadata: Metadata = {
  title: "Home — Variation B (Editorial)",
  description:
    "Alternate home-page layout for The Small Talk Store — a light, editorial, interactive variation.",
};

/**
 * VARIATION B — an alternate home page (light, editorial, bento layout).
 * The original cinematic home lives at "/". This is for client review.
 */
export default function HomeV2() {
  return (
    <>
      <HeroBento />
      <Marquee items={marqueeItems} />
      <Manifesto />
      <ProductSpotlight />
      <StickyFeatures />
      <CollectionMosaic />
      <TestimonialsMarquee />
      <NewsletterBand />
      <CTASplit />
      <HomeVariantSwitch />
    </>
  );
}

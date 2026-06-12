import Hero from "@/components/home/Hero";
import Marquee from "@/components/ui/Marquee";
import CategoryTiles from "@/components/home/CategoryTiles";
import PromoBanners from "@/components/home/PromoBanners";
import BrandIntro from "@/components/home/BrandIntro";
import TrendingRail from "@/components/home/TrendingRail";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import CollectionGrid from "@/components/home/CollectionGrid";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import ValuesStrip from "@/components/home/ValuesStrip";
import Lookbook from "@/components/home/Lookbook";
import FounderMessage from "@/components/home/FounderMessage";
import Testimonials from "@/components/home/Testimonials";
import NewsletterBand from "@/components/home/NewsletterBand";
import CTABanner from "@/components/home/CTABanner";
import HomeVariantSwitch from "@/components/ui/HomeVariantSwitch";
import { marqueeItems } from "@/data/content";

/**
 * HOME — cinematic brand hero fused with modern D2C e-commerce sections
 * (category tiles, promo banners, trending rail, collection grid) inspired
 * by The Souled Store / Nobero / The Minimal Closet.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee items={marqueeItems} />
      <CategoryTiles />
      <PromoBanners />
      <BrandIntro />
      <TrendingRail />
      <FeaturedProducts />
      <CollectionGrid />
      <WhyChooseUs />
      <ValuesStrip />
      <Lookbook />
      <FounderMessage />
      <Testimonials />
      <NewsletterBand />
      <CTABanner />
      <HomeVariantSwitch />
    </>
  );
}

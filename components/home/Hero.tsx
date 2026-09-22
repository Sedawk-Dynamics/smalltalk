/**
 * Hero: full-width banner image (client-supplied artwork with headline,
 * sub-copy and social proof baked in). Desktop and mobile get separate
 * art-directed crops; the whole banner links to the shop.
 */
import Image from "next/image";
import { hero } from "@/data/content";

const ALT =
  "Style that speaks without saying a word — premium everyday apparel by The Small Talk Store";

export default function Hero() {
  return (
    <section className="relative -mt-20 bg-[#F5F3EF]">
      <a href={hero.ctaPrimary.href} aria-label={hero.ctaPrimary.label}>
        {/* Desktop / tablet banner (16:9) */}
        <Image
          src="/smalltalk-banner.webp"
          alt={ALT}
          width={3840}
          height={2161}
          priority
          sizes="100vw"
          className="hidden h-auto w-full md:block"
        />
        {/* Mobile banner (portrait) */}
        <Image
          src="/smalltalk-banner-mobile.webp"
          alt={ALT}
          width={1024}
          height={1536}
          priority
          sizes="100vw"
          className="h-auto w-full md:hidden"
        />
      </a>
    </section>
  );
}

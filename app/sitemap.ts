import type { MetadataRoute } from "next";
import { products, brand } from "@/data/content";
import { supportPages } from "@/data/support";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = brand.url;
  const staticRoutes = ["", "/shop", "/about", "/contact", "/cart"].map((r) => ({
    url: `${base}${r}`,
    lastModified: new Date("2026-06-05"),
    changeFrequency: "weekly" as const,
    priority: r === "" ? 1 : 0.8,
  }));

  const productRoutes = products.map((p) => ({
    url: `${base}/shop/${p.slug}`,
    lastModified: new Date("2026-06-05"),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const supportRoutes = Object.keys(supportPages).map((s) => ({
    url: `${base}/support/${s}`,
    lastModified: new Date("2026-06-05"),
    changeFrequency: "monthly" as const,
    priority: 0.4,
  }));

  return [...staticRoutes, ...productRoutes, ...supportRoutes];
}

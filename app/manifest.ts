import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "The Small Talk Store",
    short_name: "Small Talk",
    description: "Premium everyday apparel — without the premium price.",
    start_url: "/",
    display: "standalone",
    background_color: "#15153C",
    theme_color: "#15153C",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}

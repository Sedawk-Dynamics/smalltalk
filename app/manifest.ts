import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "The Small Talk Store",
    short_name: "Small Talk",
    description: "Premium everyday apparel — without the premium price.",
    start_url: "/",
    display: "standalone",
    background_color: "#21215A",
    theme_color: "#21215A",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
    ],
  };
}

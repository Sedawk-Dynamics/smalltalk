/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Serve remote photos directly from their CDN (Unsplash already returns
    // WebP via `auto=format`). This skips Next's on-demand optimizer, which was
    // the bottleneck making images slow to appear. Local SVGs serve instantly.
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "images.pexels.com" },
      { protocol: "https", hostname: "picsum.photos" },
    ],
  },
  // The second home variation was retired — send any old /v2 links to the home page.
  async redirects() {
    return [{ source: "/v2", destination: "/", permanent: true }];
  },
};

export default nextConfig;

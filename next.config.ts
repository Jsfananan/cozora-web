import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "i.imgur.com" },
      { protocol: "https", hostname: "*.bunny.net" },
    ],
  },
  // The $99 Skill Sets bundle store was retired 2026-08-07. Existing buyers keep
  // access via /access and /dashboard; these storefront URLs are permanently gone.
  async redirects() {
    return [
      { source: "/bundles", destination: "/", permanent: true },
      { source: "/bundles/:slug", destination: "/", permanent: true },
      { source: "/ai-bundles", destination: "/", permanent: true },
      { source: "/checkout", destination: "/", permanent: true },
      { source: "/checkout/success", destination: "/access", permanent: true },
    ];
  },
};

export default nextConfig;

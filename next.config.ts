import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "i.imgur.com" },
      { protocol: "https", hostname: "*.bunny.net" },
    ],
  },
  async redirects() {
    return [
      {
        source: "/creator-guide",
        destination: "https://cozora-creators.netlify.app/",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;

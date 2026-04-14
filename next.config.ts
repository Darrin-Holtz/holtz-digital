import type { NextConfig } from "next";
import path from "path";

export const runtime = "nodejs";

const nextConfig: NextConfig = {  
  experimental: {
    serverActions: {
      bodySizeLimit: "5mb",
      allowedOrigins: [
        "supreme-journey-r474jx5r946qfwpw7-5000.app.github.dev",
        "localhost:5000",
      ],
    },
  },

  turbopack: {},
  cacheComponents: false,
  async headers() {
    return [
      {
        source: "/",
        headers: [
          {
            key: "Cache-Control",
            value: "private, no-cache, no-store, max-age=0, must-revalidate",
          },
        ],
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        hostname: "images.unsplash.com",
        protocol: "https",
        port: "",
      },
      {
        hostname: "vibrant-woodpecker-180.convex.cloud",
        protocol: "https",
        port: "",
      },
      {
        hostname: "avatar.vercel.sh",
        protocol: "https",
        port: "",
      }
    ]
  },  
};

export default nextConfig;

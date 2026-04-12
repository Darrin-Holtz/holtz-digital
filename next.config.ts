import type { NextConfig } from "next";
import path from "path";

export const runtime = "nodejs";

const isProduction = process.env.NODE_ENV === "production";

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
  cacheComponents: isProduction,
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
        hostname: "secret-fish-571.convex.cloud",
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

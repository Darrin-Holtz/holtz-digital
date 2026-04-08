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

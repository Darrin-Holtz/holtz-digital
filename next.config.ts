import type { NextConfig } from "next";
import path from "path";

export const runtime = "nodejs";

const codespaceHost = process.env.CODESPACE_NAME
  ? `${process.env.CODESPACE_NAME}-5000.app.github.dev`
  : undefined;

const nextConfig: NextConfig = {  
  ...(codespaceHost && {
    assetPrefix: `https://${codespaceHost}`,
  }),
  experimental: {
    serverActions: {
      bodySizeLimit: "5mb",
      allowedOrigins: [
        "https://holtz-digital.vercel.app",
        ...(codespaceHost ? [`https://${codespaceHost}`] : []),
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

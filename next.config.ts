import type { NextConfig } from "next";
import path from "path";

export const runtime = "nodejs";

const nextConfig: NextConfig = {  
  experimental: {
    serverActions: {
      allowedOrigins: [
        "supreme-journey-r474jx5r946qfwpw7-5000.app.github.dev",
        "localhost:5000",
      ],
    },
  },
  images: {
    remotePatterns: [{
      hostname: "images.unsplash.com",
      protocol: "https",
      port: "",
    }]
  },
  webpack: (config, { dev }) => {
    if (dev) {
      const root = path.resolve(__dirname);
      config.watchOptions = {
        ...config.watchOptions,
        ignored: new RegExp(
          `(${[
            `${root}/.git`,
            `${root}/.next`,
            `${root}/.cache`,
            `${root}/.local`,
            `${root}/node_modules`,
          ]
            .map((p) => p.replace(/[/\\]/g, "[\\/\\\\]"))
            .join("|")})`
        ),
      };
    }
    return config;
  },
};

export default nextConfig;

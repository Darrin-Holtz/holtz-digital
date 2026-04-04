import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["*.replit.dev", "*.replit.app", "*.kirk.replit.dev"],
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

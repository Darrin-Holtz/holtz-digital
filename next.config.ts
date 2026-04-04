import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    process.env.REPLIT_DOMAINS ?? "",
  ].filter(Boolean),
};

export default nextConfig;

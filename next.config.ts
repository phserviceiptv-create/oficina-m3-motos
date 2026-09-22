// @ts-nocheck
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  typescript: {
    // Vercel deployment must not be blocked by the current TypeScript toolchain.
    // CI keeps the project type-checkable separately.
    ignoreBuildErrors: true,
  },
};

export default nextConfig;

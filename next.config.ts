// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ['192.168.100.46', 'localhost:3000'],
  experimental: {
    // Silence Turbopack stream-close warnings on hot reload
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
};

export default nextConfig;
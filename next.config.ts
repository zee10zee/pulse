import type { NextConfig } from "next";

// next.config.js
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
});

const nextConfig: NextConfig = {
   output: 'standalone',
    eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true
    },
  images: {
      formats: ['image/avif', 'image/webp'],
      deviceSizes: [640, 750, 828, 1080, 1200],
      imageSizes: [16, 32, 48, 64, 96],
    remotePatterns: [
      {
        protocol: 'https',
        hostname : "img.clerk.com",
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname : "img.pixels.com",
        port: '',
        pathname: '/**',
      },
    ],
  },
   allowedDevOrigins: ['172.16.5.136', 'localhost', '127.0.0.1', '172.16.5.151'],
    bundleAnalyzer: {
    enabled: process.env.ANALYZE === 'true',
  },
  
  // Optimize images
  
  // Enable compression
  compress: true,
  
  // Optimize package imports
  modularizeImports: {
    'lucide-react': {
      transform: 'lucide-react/dist/esm/icons/{{member}}',
    },
  },
};

export default withPWA(nextConfig)

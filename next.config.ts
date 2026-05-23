import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
   allowedDevOrigins: ['172.16.5.136', 'localhost', '127.0.0.1', '172.16.5.151'],
};

export default nextConfig;

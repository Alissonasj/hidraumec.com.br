import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  allowedDevOrigins: ['192.168.0.181'],
  images: {
    remotePatterns: [new URL('https://images.unsplash.com/**?w=500')]
  }
};

export default nextConfig;

import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  cacheComponents: true,
  logging: {
    fetches: { fullUrl: true }
  },
  images: {
    remotePatterns: [new URL('https://images.unsplash.com/**?w=500')]
  }
};

export default nextConfig;

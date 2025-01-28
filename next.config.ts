import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Configure for GitHub Pages
  basePath: '',
  trailingSlash: true,
  assetPrefix: './',
};

export default nextConfig;

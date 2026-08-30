import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // This repository is the user-level GitHub Pages site, so it is served from
  // the domain root and does not require a basePath or relative assetPrefix.
  trailingSlash: true,
};

export default nextConfig;

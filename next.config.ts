import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Usar standalone para melhor compatibilidade com GitHub Pages
  output: 'standalone',
  images: {
    unoptimized: true,
  },
  // BasePath para GitHub Pages (raphaelolimpio.github.io/pc2)
  basePath: process.env.NODE_ENV === 'production' ? '/pc2' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/pc2/' : '',
  // Permitir componentes dinâmicos e client-side rendering
  swcMinify: true,
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
  // Otimizações para GitHub Pages
  poweredByHeader: false,
  compress: true,
  generateEtags: true,
  productionBrowserSourceMaps: false,
  // Headers para cache
  headers: async () => {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, must-revalidate',
          },
        ],
      },
    ];
  },
};

export default nextConfig;

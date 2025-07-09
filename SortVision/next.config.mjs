/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Outputs a Single-Page Application (SPA)
  distDir: './dist', // Changes the build output directory to `./dist/`
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  
  // Image optimization (disabled for static export)
  images: {
    unoptimized: true,
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  
  // Performance optimizations
  compiler: {
    // Remove console.log in production
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn']
    } : false,
  },
  
  // Bundle optimization
  experimental: {
    // Other experimental features
    optimizePackageImports: [
      'lucide-react',
      '@vercel/analytics',
      '@vercel/speed-insights',
      'framer-motion'
    ],
  },
  
  // File extensions
  pageExtensions: ['jsx', 'js', 'ts', 'tsx'], // Future TypeScript support
  
  // Webpack optimizations (fallback when not using Turbopack)
  webpack: (config, { dev, isServer }) => {
    // Only apply webpack optimizations when not using Turbopack
    if (process.env.TURBOPACK) {
      return config;
    }
    
    // Optimize for production
    if (!dev && !isServer) {
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            default: false,
            vendors: false,
            // Vendor chunk for common libraries
            vendor: {
              name: 'vendor',
              chunks: 'all',
              test: /node_modules/,
              priority: 20,
            },
            // Common chunk for shared code
            common: {
              minChunks: 2,
              chunks: 'all',
              priority: 10,
              reuseExistingChunk: true,
              enforce: true,
            },
          },
        },
      };
    }
    
    return config;
  },
  
  // Environment variables (public)
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
  
  // Additional development optimizations can be added here
}

export default nextConfig 
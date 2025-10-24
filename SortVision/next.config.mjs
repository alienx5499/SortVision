/** @type {import('next').NextConfig} */
const nextConfig = {
  // Next.js 16 - Use App Router (default)
  // output: 'export', // Removed for SSR/SSG support
  trailingSlash: false,
  skipTrailingSlashRedirect: false,

  // SEO and Performance optimizations
  poweredByHeader: false,
  compress: true,
  generateEtags: true,
  
  // Next.js 16 - Production URL for absolute URLs
  env: {
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'https://www.sortvision.com',
  },

  // Security headers (backup configuration)
  async headers() {
    return [
      {
        source: '/sitemap.xml',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/xml; charset=utf-8',
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, s-maxage=3600',
          },
        ],
      },
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
          },
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://vercel.live https://vitals.vercel-insights.com https://va.vercel-scripts.com https://www.googletagmanager.com https://www.google-analytics.com https://fonts.googleapis.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://www.sortvision.com; style-src-elem 'self' 'unsafe-inline' https://fonts.googleapis.com https://www.sortvision.com; script-src-elem 'self' 'unsafe-inline' 'unsafe-eval' https://vercel.live https://vitals.vercel-insights.com https://va.vercel-scripts.com https://www.googletagmanager.com https://www.google-analytics.com https://fonts.googleapis.com https://www.sortvision.com; font-src 'self' https://fonts.gstatic.com data:; img-src 'self' data: https: blob:; media-src 'self' data: blob:; connect-src 'self' https: data: blob:; frame-src 'none'; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'; worker-src 'self' blob:;",
          },
        ],
      },
    ];
  },

  // Image optimization (now enabled for server-side rendering)
  images: {
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
    // Remove React dev tools in production
    reactRemoveProperties: process.env.NODE_ENV === 'production' ? {
      properties: ['^data-testid$']
    } : false,
  },

  // Next.js 16 - Cache Components disabled for compatibility with dynamic routes
  // SortVision uses dynamic metadata based on URL params for SEO
  // cacheComponents: true,

  // Bundle optimization
  experimental: {
    // Next.js 16 - Optimize package imports for better tree-shaking
    optimizePackageImports: [
      'lucide-react',
      '@vercel/analytics',
      '@vercel/speed-insights',
      'framer-motion',
      '@radix-ui/react-dropdown-menu',
      '@radix-ui/react-select',
      '@radix-ui/react-slider',
      '@radix-ui/react-tabs',
      '@radix-ui/react-tooltip',
      'react-icons/si',
      'react-icons/di',
      'react-icons/fa',
      'react-icons/md',
      'react-icons/ai',
      'react-icons/bi',
      'react-icons/bs',
      'react-icons/cg',
      'react-icons/fc',
      'react-icons/fi',
      'react-icons/gi',
      'react-icons/go',
      'react-icons/gr',
      'react-icons/hi',
      'react-icons/hi2',
      'react-icons/im',
      'react-icons/io',
      'react-icons/io5',
      'react-icons/li',
      'react-icons/ri',
      'react-icons/rx',
      'react-icons/sl',
      'react-icons/tb',
      'react-icons/tfi',
      'react-icons/ti',
      'react-icons/vsc'
    ],
    
    // Next.js 16 - React Server Components optimizations
    serverActions: {
      bodySizeLimit: '2mb',
      allowedOrigins: ['www.sortvision.com', 'sortvision.com']
    },
    
    // Next.js 16 - Optimize CSS
    optimizeCss: true,
    
    // Performance optimizations
    webVitalsAttribution: ['CLS', 'FID', 'FCP', 'LCP', 'TTFB'],
  },

  // React Compiler (Next.js 16 - production ready)
  reactCompiler: true,
  
  // Turbopack configuration (Next.js 16 - now stable)
  // Note: SVG handling via webpack config below for compatibility
  turbopack: {
    resolveAlias: {
      '@': './src'
    },
  },

  // File extensions
  pageExtensions: ['jsx', 'js', 'ts', 'tsx'], // Future TypeScript support

  // Server external packages
  serverExternalPackages: ['@octokit/rest'],

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
          minSize: 20000,
          maxSize: 244000,
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
            // Separate chunk for large libraries
            framerMotion: {
              name: 'framer-motion',
              test: /[\\/]node_modules[\\/]framer-motion[\\/]/,
              chunks: 'all',
              priority: 30,
            },
            // Analytics chunk
            analytics: {
              name: 'analytics',
              test: /[\\/]node_modules[\\/]@vercel[\\/]/,
              chunks: 'all',
              priority: 25,
            },
          },
        },
        // Enable tree shaking
        usedExports: true,
        sideEffects: false,
        // Additional optimizations for unused code elimination
        providedExports: true,
        innerGraph: true,
        mangleExports: true,
      };
    }

    // Add module concatenation for better performance
    if (!dev) {
      config.optimization.concatenateModules = true;
    }

    // Additional optimizations for unused JavaScript reduction
    if (!dev && !isServer) {
      config.optimization.usedExports = true;
      config.optimization.sideEffects = false;
      
      // Enable more aggressive tree shaking
      config.optimization.providedExports = true;
      config.optimization.innerGraph = true;
      config.optimization.mangleExports = true;
    }

    return config;
  },


  // Additional performance optimizations
  onDemandEntries: {
    // period (in ms) where the server will keep pages in the buffer
    maxInactiveAge: 25 * 1000,
    // number of pages that should be kept simultaneously without being disposed
    pagesBufferLength: 2,
  },
  
  // Additional development optimizations can be added here
}

export default nextConfig

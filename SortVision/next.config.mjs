/** @type {import('next').NextConfig} */
const nextConfig = {
  // Removed static export to enable server-side rendering for dynamic routes
  // output: 'export', // This was causing 404s for dynamic routes
  // distDir: './dist', // Not needed without static export
  trailingSlash: false,
  skipTrailingSlashRedirect: false,

  // SEO and Performance optimizations
  poweredByHeader: false,
  compress: true,
  generateEtags: true,

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

  // Bundle optimization
  experimental: {
    // Other experimental features
    optimizePackageImports: [
      'lucide-react',
      '@vercel/analytics',
      '@vercel/speed-insights',
      'framer-motion'
    ],
    // Enable modern JavaScript features
    esmExternals: true,
    // Optimize CSS
    optimizeCss: true,
    // Enable additional optimizations
    optimizeServerReact: true,
    serverMinification: true,
    serverSourceMaps: false,
  },

  // Turbopack configuration (now stable in Next.js 16)
  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
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

  // Environment variables (public)
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
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

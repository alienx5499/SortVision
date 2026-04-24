/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';

const cspScriptSources = [
  "'self'",
  "'unsafe-inline'",
  ...(isProd ? [] : ["'unsafe-eval'"]),
  'https://vercel.live',
  'https://vitals.vercel-insights.com',
  'https://va.vercel-scripts.com',
  'https://www.googletagmanager.com',
  'https://www.google-analytics.com',
  'https://fonts.googleapis.com',
  'https://www.sortvision.com',
];

const contentSecurityPolicy = [
  "default-src 'self'",
  `script-src ${cspScriptSources.join(' ')}`,
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://www.sortvision.com",
  "style-src-elem 'self' 'unsafe-inline' https://fonts.googleapis.com https://www.sortvision.com",
  `script-src-elem ${cspScriptSources.join(' ')}`,
  "font-src 'self' https://fonts.gstatic.com data:",
  "img-src 'self' data: https: blob:",
  "media-src 'self' data: blob:",
  "connect-src 'self' https: data: blob:",
  "frame-src 'none'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "worker-src 'self' blob:",
].join('; ');

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

  // Redirects to fix indexing issues
  async redirects() {
    return [
      // Fix HTTP to HTTPS redirects (handled by hosting, but kept for fallback)
      {
        source: '/:path*',
        has: [
          {
            type: 'header',
            key: 'x-forwarded-proto',
            value: 'http',
          },
        ],
        destination: 'https://www.sortvision.com/:path*',
        permanent: true,
      },
      // Fix www redirects (handled by hosting, but kept for fallback)
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'sortvision.com',
          },
        ],
        destination: 'https://www.sortvision.com/:path*',
        permanent: true,
      },
    ];
  },

  // Security headers (backup configuration)
  // Do not set Cache-Control on /_next/static in development — Next warns on *any* custom value there.
  // Production still sets immutable caching for hashed chunks below.
  async headers() {
    const securityHeadersBlock = {
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
            value: contentSecurityPolicy,
          },
        ],
    };

    if (!isProd) {
      return [securityHeadersBlock];
    }

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
        source: '/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/:path*.{jpg,jpeg,png,gif,webp,avif,svg,ico}',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      securityHeadersBlock,
    ];
  },

  // Image optimization (now enabled for server-side rendering)
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: isProd ? 60 * 60 * 24 * 30 : 60, // prod: 30d; dev: 1m to avoid stale optimized images
    dangerouslyAllowSVG: true,
    contentDispositionType: 'inline',
  },

  // Performance optimizations
  compiler: {
    // Remove console in production (use boolean — empty exclude[] is invalid in Next 16 schema)
    removeConsole: process.env.NODE_ENV === 'production',
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
            // Separate chunk for large libraries (but ensure it's loaded)
            framerMotion: {
              name: 'framer-motion',
              test: /[\\/]node_modules[\\/]framer-motion[\\/]/,
              chunks: 'all',
              priority: 30,
              enforce: true, // Ensure this chunk is always created
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
        // Note: sideEffects should be configured in package.json, not here
        // framer-motion package.json should have "sideEffects": false or specific files listed
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
        // Note: sideEffects configuration belongs in package.json
        // framer-motion should work with default webpack tree-shaking
        
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

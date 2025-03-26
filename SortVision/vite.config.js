import path from "path"
import { fileURLToPath } from 'url'
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { VitePWA } from 'vite-plugin-pwa'
import compression from 'vite-plugin-compression'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    compression(),
    VitePWA({
      includeAssets: ['favicon.svg', 'splash.svg', 'robots.txt'],
      manifest: {
        name: 'SortVision',
        short_name: 'SortVision',
        description: 'Interactive visualization of popular sorting algorithms',
        theme_color: '#0F172A',
        icons: [
          {
            src: '/favicon.svg',
            sizes: '64x64 128x128 256x256',
            type: 'image/svg+xml',
            purpose: 'any'
          },
          {
            src: '/splash.svg',
            sizes: '512x512',
            type: 'image/svg+xml',
            purpose: 'maskable'
          }
        ]
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          }
        ]
      }
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          radix: [
            '@radix-ui/react-select',
            '@radix-ui/react-slider',
            '@radix-ui/react-slot',
            '@radix-ui/react-tabs'
          ],
          lucide: ['lucide-react'],
          tailwind: ['tailwindcss', 'tailwind-merge', 'tailwindcss-animate'],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
  ssgOptions: {
    script: 'async',
    formatting: 'minify',
    crittersOptions: {
      preload: 'media',
      inlineFonts: true,
    },
  },
  ssr: {
    noExternal: ['@radix-ui/**'],
  },
})

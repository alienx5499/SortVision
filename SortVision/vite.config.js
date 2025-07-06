import path from "path";
import { fileURLToPath } from "url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import compression from "vite-plugin-compression";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    compression(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.svg", "splash.svg", "robots.txt"],
      manifest: {
        name: "SortVision",
        short_name: "SortVision",
        description: "Interactive visualization of popular sorting algorithms",
        theme_color: "#0F172A",
        background_color: "#0F172A",
        display: "standalone",
        scope: "/",
        start_url: "/",
        icons: [
          {
            src: "/favicon.svg",
            sizes: "64x64 128x128 256x256",
            type: "image/svg+xml",
            purpose: "any",
          },
          {
            src: "/splash.svg",
            sizes: "512x512",
            type: "image/svg+xml",
            purpose: "maskable",
          },
        ],
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg,json,vue,txt,woff2}"],
        navigateFallback: null,
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: "CacheFirst",
            options: {
              cacheName: "google-fonts-cache",
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    extensions: [".js", ".jsx", ".ts", ".tsx", ".json", ".txt"],
  },
  server: {
    port: 7777,
    host: '0.0.0.0',
    strictPort: true,
    fs: {
      allow: [".."],
    },
    proxy: {
      '/api': {
        target: 'http://localhost:7777',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
    middlewares: [
      (req, res, next) => {
        if (req.url && req.url.endsWith(".jsx")) {
          res.setHeader("Content-Type", "application/javascript");
        }
        next();
      },
    ],
  },
  preview: {
    port: 7777,
    host: '0.0.0.0',
    strictPort: true
  },
  build: {
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react", "react-dom"],
          radix: [
            "@radix-ui/react-select",
            "@radix-ui/react-slider",
            "@radix-ui/react-slot",
            "@radix-ui/react-tabs",
          ],
          lucide: ["lucide-react"],
          tailwind: ["tailwindcss", "tailwind-merge", "tailwindcss-animate"],
        },
        entryFileNames: "assets/[name]-[hash].js",
        chunkFileNames: "assets/[name]-[hash].js",
        assetFileNames: (assetInfo) => {
          // Preserve the original path for code files
          if (assetInfo.name.includes('/code/')) {
            return assetInfo.name;
          }
          return 'assets/[name]-[hash].[ext]';
        },
      },
    },
    chunkSizeWarningLimit: 1000,
    assetsInlineLimit: 0, // Ensure text files are not inlined
    copyPublicDir: true,
  },
  optimizeDeps: {
    include: ["react", "react-dom"],
    esbuildOptions: {
      loader: {
        ".js": "jsx",
        ".jsx": "jsx",
        ".txt": "text", // Add text file loader
      },
    },
  },
  ssgOptions: {
    script: "async",
    formatting: "minify",
    crittersOptions: {
      preload: "media",
      inlineFonts: true,
    },
  },
  ssr: {
    noExternal: ["@radix-ui/**"],
  },
});

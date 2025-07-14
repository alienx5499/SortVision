import path from "path";
import { fileURLToPath } from "url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import compression from "vite-plugin-compression";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory
  const env = loadEnv(mode, process.cwd(), "");

  return {
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
          runtimeCaching: [
            {
              urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
              handler: "CacheFirst",
              options: {
                cacheName: "google-fonts-cache",
                expiration: {
                  maxEntries: 10,
                  maxAgeSeconds: 60 * 60 * 24 * 365,
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
      port: 3000,
      fs: {
        allow: [".."],
      },
      proxy: {
        '/api': {
          target: env.VITE_API_URL || 'http://localhost:3000',
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
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
        },
      },
      chunkSizeWarningLimit: 1000,
    },
    optimizeDeps: {
      include: ["react", "react-dom"],
    },
  };
});
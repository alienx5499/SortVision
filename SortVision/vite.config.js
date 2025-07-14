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
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [
      react(),
      tailwindcss(),
      compression(),
      VitePWA({
        registerType: "autoUpdate",
        includeAssets: [
          "favicon.ico",
          "robots.txt",
          "apple-touch-icon.png",
          "safari-pinned-tab.svg"
        ],
        manifest: {
          name: "SortVision",
          short_name: "SortVision",
          description: "A visualization tool for sorting algorithms",
          theme_color: "#ffffff",
          icons: [
            {
              src: "pwa-192x192.png",
              sizes: "192x192",
              type: "image/png"
            },
            {
              src: "pwa-512x512.png",
              sizes: "512x512",
              type: "image/png"
            },
            {
              src: "pwa-512x512.png",
              sizes: "512x512",
              type: "image/png",
              purpose: "any maskable"
            }
          ]
        }
        // workbox removed as per diff
      }),
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
      // extensions removed as per diff
    },
    server: {
      port: 3000,
      open: true,
      strictPort: true,
      hmr: true,
    },
    preview: {
      port: 4173,
      open: true,
      strictPort: true,
    },
    build: {
      chunkSizeWarningLimit: 1000,
      rollupOptions: {
        output: {
          manualChunks: {
            react: ["react", "react-dom"],
            d3: ["d3", "d3-array", "d3-scale", "d3-axis"],
            analysis: [
              "./src/components/analysis/MemoryTracker",
              "./src/components/analysis/CacheAnalyzer",
              "./src/components/analysis/BranchPredictor",
            ],
          },
        },
      },
    },
    optimizeDeps: {
      include: ["react", "react-dom", "d3"],
    },
  };
});
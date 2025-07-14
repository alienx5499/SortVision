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
      }),
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
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
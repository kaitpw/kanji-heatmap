import path from "path";
import { defineConfig, UserConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { VitePWA } from "vite-plugin-pwa";

const pwaConfig = {
  registerType: "autoUpdate" as const,
  includeAssets: [
    "favicon.io",
    "img/icon512_maskable",
    "img/icon512_rounded.png",
  ],
  manifest: {
    name: "Kanji Companion",
    short_name: "Kanji Friend",
    orientation: "any" as const,
    display: "standalone" as const,
    lang: "en-US" as const,
    description:
      "Kanji Information User Interface that Japanese Learners will enjoy. Tailored for beginners and include Kanji frequency rankings from various data sources",
    start_url: ".",
    theme_color: "#fb02a8",
    background_color: "#FFFFFF",
    icons: [
      {
        purpose: "maskable",
        sizes: "512x512",
        src: "img/app-icon-512x512.png",
        type: "image/png"
      },
      {
        purpose: "maskable",
        sizes: "192x192",
        src: "img/app-icon-192x192.png",
        type: "image/png"
      },
    ],
  },
  workbox: {
    globPatterns: ["**/*.{js,css,html,json}"], // Include JSON files
    runtimeCaching: [
      {
        urlPattern: /\.json$/i, // Cache JSON requests
        handler: "StaleWhileRevalidate" as const,
        options: {
          cacheName: "kanji-companion-json-cache",
          expiration: {
            maxEntries: 50,
            maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
          },
        },
      },
    ],
  },
};
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), VitePWA(pwaConfig)] as UserConfig["plugins"],
  build: {
    target: "esnext", // Needed for module workers
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});

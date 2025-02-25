import path from "path";
import { defineConfig, UserConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { VitePWA } from "vite-plugin-pwa";

const pwaConfig = {
  registerType: "prompt" as const,
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
        src: "img/icon512_maskable.png",
        type: "image/png",
      },
      {
        purpose: "any",
        sizes: "512x512",
        src: "img/icon512_rounded.png",
        type: "image/png",
      },
      {
        src: "favicon.ico",
        sizes: "64x64 32x32 24x24 16x16",
        type: "image/x-icon",
      },
    ],
  },
  workbox: {
    globPatterns: ["**/*.{js,css,html,json}"], // Include JSON files
    runtimeCaching: [
      {
        urlPattern: /\.json$/i, // Cache JSON requests
        handler: "CacheFirst" as const,
        options: {
          cacheName: "json-cache",
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

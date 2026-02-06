import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { readFileSync } from "fs";
import path from "path";

const pkg = JSON.parse(readFileSync("./package.json", "utf-8"));

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    chunkSizeWarningLimit: 1000,
  },
  define: {
    "import.meta.env.VITE_SITE_VERSION": JSON.stringify(pkg.version),
  },
  plugins: [react()].filter(Boolean),
  optimizeDeps: {
    exclude: ["lucide-react"],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: "::",
    port: 5173,
    hmr: {
      overlay: false,
    },
  },
});

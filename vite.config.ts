import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { visualizer } from "rollup-plugin-visualizer";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), visualizer({ filename: "stats.html" })],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes("node_modules")) {
            // === Only truly standalone libs (no circular deps, no React) ===

            if (id.includes("@zxcvbn-ts") || id.includes("zxcvbn")) return "vendor-zxcvbn";
            if (id.includes("libphonenumber-js")) return "vendor-phone";
            if (id.includes("prosemirror")) return "vendor-prosemirror";
            if (id.includes("date-fns") || id.includes("@internationalized/date")) return "vendor-date";
            if (id.includes("zod")) return "vendor-zod";
            if (id.includes("@fontsource")) return "vendor-fonts";
            if (id.includes("lucide-react")) return "vendor-icons";
            if (id.includes("@radix-ui")) return "vendor-radix";
            if (id.includes("framer-motion")) return "vendor-framer";
            if (id.includes("@tanstack")) return "vendor-tanstack";
            if (id.includes("@dnd-kit")) return "vendor-dnd";
            if (id.includes("react-router-dom") || id.includes("@remix-run")) return "vendor-router";
            if (id.includes("react-day-picker")) return "vendor-calendar";
            if (id.includes("lodash") || id.includes("uuid") || id.includes("axios") || id.includes("js-cookie") || id.includes("clsx") || id.includes("tailwind-merge")) return "vendor-utils";

          }
        },
      },
    },
  },
})
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
            // Core React
            if (id.includes("react-dom/")) {
              return "vendor-react-dom";
            }
            if (id.includes("react/")) {
              return "vendor-react-core";
            }
            // React Router
            if (id.includes("react-router") || id.includes("@remix-run")) {
              return "vendor-router";
            }
            // State Management
            if (id.includes("@reduxjs/toolkit") || id.includes("react-redux") || id.includes("redux")) {
              return "vendor-redux";
            }
            // Phone Number Validation
            if (id.includes("react-phone-number-input") || id.includes("libphonenumber-js")) {
              return "vendor-phone-input";
            }
            // Heavy password strength library
            if (id.includes("@zxcvbn-ts") || id.includes("zxcvbn")) {
              return "vendor-zxcvbn";
            }
            // Date libraries and Internationalization
            if (id.includes("@internationalized/date") || id.includes("date-fns") || id.includes("react-day-picker")) {
              return "vendor-date";
            }
            // Radix UI Component Primitives
            if (id.includes("radix-ui")) {
              return "vendor-radix";
            }
            // Form validation and state
            if (id.includes("react-hook-form") || id.includes("@hookform") || id.includes("zod")) {
              return "vendor-forms";
            }
            // General UI ecosystems
            if (id.includes("lucide-react") || id.includes("tailwind") || id.includes("cmdk") || id.includes("clsx") || id.includes("sonner") || id.includes("embla-carousel") || id.includes("html-react-parser") || id.includes("react-aria-components")) {
              return "vendor-ui";
            }
            // Rich Text Editor (Tiptap)
            if (id.includes("@tiptap") || id.includes("prosemirror")) {
              return "vendor-editor";
            }
            // Charts (recharts + d3-*) — NOT separated due to circular deps
            // Data Tables
            if (id.includes("@tanstack/react-table")) {
              return "vendor-table";
            }
            // Localization
            if (id.includes("i18next") || id.includes("react-i18next") || id.includes("i18n")) {
              return "vendor-i18n";
            }
            // DnD Kit
            if (id.includes("@dnd-kit")) {
              return "vendor-dnd";
            }
            // Utility Libraries
            if (id.includes("lodash") || id.includes("uuid") || id.includes("compose-function") || id.includes("js-cookie") || id.includes("axios")) { // Added axios to utils
              return "vendor-utils";
            }
            // @fontsource files
            if (id.includes("@fontsource")) {
              return "vendor-fonts";
            }
            // Everything else
            return "vendor-others";
          }
        },
      },
    },
  },
})
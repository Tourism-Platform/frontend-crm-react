import path from "path"
import { sentryVitePlugin } from "@sentry/vite-plugin"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig, loadEnv } from "vite"
import { visualizer } from "rollup-plugin-visualizer";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Все переменные (не только VITE_*): SENTRY_AUTH_TOKEN приходит из env/секрета
  const env = { ...loadEnv(mode, process.cwd(), ""), ...process.env };
  // Карты генерируем только когда их есть куда загрузить и потом удалить;
  // Vitest (mode "test") их не собирает, даже если токен лежит в .env
  const isSourcemapUpload = Boolean(env.SENTRY_AUTH_TOKEN) && mode !== "test";

  return {
    plugins: [
      react(),
      tailwindcss(),
      visualizer({ filename: "stats.html" }),
      // Последним: загружает source maps уже собранного бандла
      sentryVitePlugin({
        // Без токена (локальная сборка) плагин выключен, сборка не падает
        disable: !isSourcemapUpload,
        authToken: env.SENTRY_AUTH_TOKEN,
        org: env.SENTRY_ORG,
        project: env.SENTRY_PROJECT,
        telemetry: false,
        release: {
          // Тот же релиз, что уходит в SDK — иначе карты не сматчатся
          name: env.VITE_APP_RELEASE || undefined,
          // .git не попадает в Docker-контекст — коммиты не привязываем
          setCommits: false,
        },
        sourcemaps: {
          // .map не должны раздаваться nginx — исходники только в Sentry
          filesToDeleteAfterUpload: ["./dist/**/*.map"],
        },
      }),
    ],
    server: {
      host: "127.0.0.1",
      port: 5173,
      // strictPort: true,
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    build: {
      // Карты без `//# sourceMappingURL` в бандле
      sourcemap: isSourcemapUpload ? "hidden" : false,
      rollupOptions: {
        output: {
          manualChunks: (id) => {
            if (id.includes("node_modules")) {
              // === Only truly standalone libs (no circular deps, no React) ===

              if (id.includes("@zxcvbn-ts") || id.includes("zxcvbn")) return "vendor-zxcvbn";
              if (id.includes("libphonenumber-js")) return "vendor-phone";
              if (id.includes("prosemirror")) return "vendor-prosemirror";
              if (id.includes("date-fns") || id.includes("@internationalized/date")) return "vendor-date";
              // Только сам пакет: иначе сюда попадают чужие файлы с «zod» в имени (zod-errors из @sentry/core)
              if (id.includes("/node_modules/zod/")) return "vendor-zod";
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
  }
})

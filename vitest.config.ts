import { defineConfig, mergeConfig } from "vitest/config";

import viteConfig from "./vite.config";

/**
 * Алиасы и плагины — из vite.config (Sentry-плагин там выключен для mode "test").
 * VITE_* задаются явно: тесты не зависят от локального .env
 */
export default defineConfig((env) =>
	mergeConfig(viteConfig(env), {
		test: {
			environment: "jsdom",
			setupFiles: ["./src/app/test/setup.ts"],
			// Только юнит/компонентные тесты: e2e/*.spec.ts запускает Playwright
			include: ["src/**/*.test.{ts,tsx}"],
			/**
			 * TZ: даты в тестах не зависят от пояса машины. Vitest присваивает env в
			 * рантайме воркера — так TZ применяется и на Windows (из окружения при старте — нет).
			 * Фейковые хосты: незамоканный запрос падает, а не уходит на бэкенд
			 */
			env: {
				TZ: "UTC",
				VITE_API_URL: "http://api.test",
				VITE_DOCUMENT_API_URL: "http://document.test",
				VITE_ENABLE_MSW: "false",
				VITE_SENTRY_DSN: "",
				VITE_SENTRY_ENABLED: "false"
			},
			unstubGlobals: true,
			unstubEnvs: true,
			restoreMocks: true,
			coverage: {
				provider: "v8",
				include: ["src/**/*.{ts,tsx}"],
				exclude: [
					"src/**/*.test.{ts,tsx}",
					"src/app/test/**",
					"src/shared/api/generated/**",
					"src/**/mock/**",
					"src/**/handlers/**",
					"src/main.tsx"
				],
				reporter: ["text-summary", "html", "lcov"]
			}
		}
	})
);

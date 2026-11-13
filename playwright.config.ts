import { defineConfig, devices } from "@playwright/test";

const PORT = 5175;
const BASE_URL = `http://127.0.0.1:${PORT}`;

/**
 * E2E только на моковом бэкенде (MSW в dev-сервере). API — фиктивный хост:
 * если запрос не перехвачен MSW, он упадёт, а не уйдёт на настоящий бэкенд.
 * Переменные окружения процесса важнее локального .env
 */
export default defineConfig({
	testDir: "./e2e",
	globalSetup: "./e2e/global-setup.ts",
	fullyParallel: true,
	forbidOnly: Boolean(process.env.CI),
	retries: 0,
	// Все воркеры делят один dev-сервер Vite: при большем числе он не успевает
	// компилировать ленивые чанки и тесты падают по таймаутам
	workers: 2,
	timeout: 60_000,
	expect: { timeout: 10_000 },
	reporter: [["list"], ["html", { open: "never" }]],
	use: {
		baseURL: BASE_URL,
		locale: "en-US",
		trace: "retain-on-failure"
	},
	projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
	webServer: {
		command: `npx vite --host 127.0.0.1 --port ${PORT} --strictPort`,
		url: BASE_URL,
		// Свой порт и всегда свой сервер: чужой dev-сервер мог быть с настоящим API
		reuseExistingServer: false,
		timeout: 120_000,
		env: {
			VITE_ENABLE_MSW: "true",
			VITE_API_URL: "http://api.test",
			VITE_DOCUMENT_API_URL: "http://document.test",
			VITE_SENTRY_DSN: "",
			VITE_SENTRY_ENABLED: "false",
			SENTRY_AUTH_TOKEN: ""
		}
	}
});

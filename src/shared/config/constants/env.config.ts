const VITE_API_URL = import.meta.env.VITE_API_URL;
const VITE_DOCUMENT_API_URL = import.meta.env.VITE_DOCUMENT_API_URL;
const VITE_ENABLE_MSW = import.meta.env.VITE_ENABLE_MSW;
const VITE_APP_ENV = import.meta.env.VITE_APP_ENV;
/**
 * Мониторинг: DSN публичный. Включение (DSN + VITE_SENTRY_ENABLED в dev) читается
 * в shared/lib/monitoring напрямую из import.meta.env — ради вырезания SDK при сборке
 */
const VITE_SENTRY_DSN = import.meta.env.VITE_SENTRY_DSN ?? "";
/** Тег сборки (образа) — связывает события с деплоем и source maps */
const VITE_APP_RELEASE = import.meta.env.VITE_APP_RELEASE ?? "";

export const ENV = {
	VITE_API_URL,
	VITE_DOCUMENT_API_URL,
	VITE_ENABLE_MSW,
	VITE_APP_ENV: VITE_APP_ENV as "prod" | "dev",
	VITE_SENTRY_DSN,
	VITE_APP_RELEASE
} as const;

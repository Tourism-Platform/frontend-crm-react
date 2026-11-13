import type {
	IMonitoring,
	IMonitoringAdapter,
	TCreateBrowserRouter,
	TRootErrorHandlers
} from "./monitoring.types";
import { noopMonitoring } from "./noop.adapter";
import { createSentryMonitoring } from "./sentry/sentry.adapter";

let activeAdapter: IMonitoringAdapter = noopMonitoring;

/**
 * В prod — при наличии DSN; в dev — только по явному VITE_SENTRY_ENABLED=true.
 * Напрямую из import.meta.env, а не через ENV: Vite подставляет значения при сборке,
 * и без DSN ветка с Sentry сворачивается — SDK и Replay не попадают в бандл
 */
const IS_MONITORING_ENABLED =
	!!import.meta.env.VITE_SENTRY_DSN &&
	(import.meta.env.PROD || import.meta.env.VITE_SENTRY_ENABLED === "true");

/**
 * Стабильная ссылка для всего приложения: делегирует в адаптер,
 * выбранный в initMonitoring, поэтому импортировать можно до инициализации
 */
export const monitoring: IMonitoring = {
	captureError: (error, context) =>
		activeAdapter.captureError(error, context),
	setUser: (user) => activeAdapter.setUser(user),
	addBreadcrumb: (message, data) => activeAdapter.addBreadcrumb(message, data)
};

/** Для createRoot в main.tsx — читается после initMonitoring */
export const getRootErrorHandlers = (): TRootErrorHandlers =>
	activeAdapter.rootErrorHandlers;

/** Для router.tsx — модуль роутера выполняется после monitoring.init */
export const wrapCreateBrowserRouter = (
	createRouter: TCreateBrowserRouter
): TCreateBrowserRouter => activeAdapter.wrapCreateBrowserRouter(createRouter);

/** Вызывается один раз из monitoring.init.ts до рендера */
export const initMonitoring = (): void => {
	activeAdapter = IS_MONITORING_ENABLED
		? createSentryMonitoring()
		: noopMonitoring;
};

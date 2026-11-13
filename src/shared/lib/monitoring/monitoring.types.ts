import type { RootOptions } from "react-dom/client";
import type { createBrowserRouter } from "react-router-dom";

export interface IMonitoringUser {
	id: string;
	role?: string | null;
}

export interface IMonitoringErrorContext {
	tags?: Record<string, string | number | boolean>;
	extra?: Record<string, unknown>;
	/** Группировка в одну issue: например `["api", endpoint, status]` */
	fingerprint?: string[];
}

/** Порт мониторинга: приложение знает только его, вендор — деталь адаптера */
export interface IMonitoring {
	captureError(error: unknown, context?: IMonitoringErrorContext): void;
	setUser(user: IMonitoringUser | null): void;
	addBreadcrumb(message: string, data?: Record<string, unknown>): void;
}

/** Хуки React 19 для createRoot: ловят ошибки всех ErrorBoundary и необработанные */
export type TRootErrorHandlers = Pick<
	RootOptions,
	"onUncaughtError" | "onCaughtError" | "onRecoverableError"
>;

export type TCreateBrowserRouter = typeof createBrowserRouter;

/** Что адаптер отдаёт точке сборки (app); фичам хватает IMonitoring */
export interface IMonitoringAdapter extends IMonitoring {
	rootErrorHandlers: TRootErrorHandlers;
	/** Трейсинг навигации: оборачивает фабрику роутера, сигнатура не меняется */
	wrapCreateBrowserRouter(
		createRouter: TCreateBrowserRouter
	): TCreateBrowserRouter;
}

import type { IMonitoringAdapter } from "./monitoring.types";

/** Мониторинг выключен (dev, нет DSN): ничего не отправляет, в dev пишет в консоль */
export const noopMonitoring: IMonitoringAdapter = {
	captureError: (error, context) => {
		if (import.meta.env.DEV) {
			console.debug("[monitoring] captureError", error, context);
		}
	},
	setUser: (user) => {
		if (import.meta.env.DEV) {
			console.debug("[monitoring] setUser", user);
		}
	},
	addBreadcrumb: () => {},
	// Пустой объект — React использует свои обработчики по умолчанию
	rootErrorHandlers: {},
	wrapCreateBrowserRouter: (createRouter) => createRouter
};

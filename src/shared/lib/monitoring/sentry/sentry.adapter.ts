import * as Sentry from "@sentry/react";

import type {
	IMonitoringAdapter,
	TCreateBrowserRouter
} from "../monitoring.types";

import { createSentryOptions } from "./sentry.options";

/** Свои обработчики заменяют дефолтные React — возвращаем вывод в консоль */
const logToConsole = (error: unknown) => console.error(error);

/** Единственная точка, где приложение касается Sentry SDK */
export const createSentryMonitoring = (): IMonitoringAdapter => {
	Sentry.init(createSentryOptions());

	return {
		captureError: (error, context) => {
			Sentry.captureException(error, {
				tags: context?.tags,
				extra: context?.extra,
				fingerprint: context?.fingerprint
			});
		},
		setUser: (user) => {
			Sentry.setUser(
				user ? { id: user.id, role: user.role ?? undefined } : null
			);
		},
		addBreadcrumb: (message, data) => {
			Sentry.addBreadcrumb({ message, data, level: "info" });
		},
		rootErrorHandlers: {
			onUncaughtError: Sentry.reactErrorHandler(logToConsole),
			// ErrorBoundary сам пишет в консоль в componentDidCatch
			onCaughtError: Sentry.reactErrorHandler(),
			onRecoverableError: Sentry.reactErrorHandler(logToConsole)
		},
		// Типы RouteObject у Sentry свои — сигнатура фабрики та же
		wrapCreateBrowserRouter: (createRouter) =>
			Sentry.wrapCreateBrowserRouter(createRouter) as TCreateBrowserRouter
	};
};

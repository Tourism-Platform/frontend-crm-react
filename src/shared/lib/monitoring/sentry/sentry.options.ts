import * as Sentry from "@sentry/react";
import { useEffect } from "react";
import {
	createRoutesFromChildren,
	matchRoutes,
	useLocation,
	useNavigationType
} from "react-router-dom";

import { ENV } from "@/shared/config";

import { scrubPayload } from "./sentry.scrubber";

/** Шум браузера и расширений — не баги приложения */
const IGNORE_ERRORS: Array<string | RegExp> = [
	"ResizeObserver loop limit exceeded",
	"ResizeObserver loop completed with undelivered notifications",
	"AbortError"
];

const DENY_URLS: Array<string | RegExp> = [
	/^chrome-extension:\/\//i,
	/^moz-extension:\/\//i,
	/^safari-(web-)?extension:\/\//i
];

export const createSentryOptions = (): Sentry.BrowserOptions => ({
	dsn: ENV.VITE_SENTRY_DSN,
	// prod | dev; без значения — режим Vite (development / production)
	environment: ENV.VITE_APP_ENV || import.meta.env.MODE,
	release: ENV.VITE_APP_RELEASE || undefined,
	// Видны данные туристов и платежей: пользователя задаём сами (id, role),
	// cookies/заголовки/тела запросов не собираем
	dataCollection: {
		userInfo: false,
		cookies: false,
		httpHeaders: false,
		httpBodies: []
	},
	integrations: [
		// pageload/navigation с параметризованными роутами (/tours/:id)
		Sentry.reactRouterBrowserTracingIntegration({
			useEffect,
			useLocation,
			useNavigationType,
			createRoutesFromChildren,
			matchRoutes
		}),
		Sentry.replayIntegration({
			maskAllText: true,
			maskAllInputs: true,
			blockAllMedia: true
		})
	],
	// Трассируем всё; снизить, если упрёмся в квоту Sentry
	tracesSampleRate: 1.0,
	// CORS бэкенда не разрешает sentry-trace/baggage — к API их не добавляем
	tracePropagationTargets: [],
	// Replay только вокруг ошибки, не всю сессию
	replaysSessionSampleRate: 0,
	replaysOnErrorSampleRate: 1.0,
	ignoreErrors: IGNORE_ERRORS,
	denyUrls: DENY_URLS,
	beforeSend: (event) => scrubPayload(event),
	// SDK 11 стримит спаны (traceLifecycle: "stream") — beforeSendTransaction не вызывается
	beforeSendSpan: (span) => scrubPayload(span),
	beforeBreadcrumb: (breadcrumb) => scrubPayload(breadcrumb)
});

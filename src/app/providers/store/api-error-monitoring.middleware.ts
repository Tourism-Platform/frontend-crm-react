import { type Middleware, isRejectedWithValue } from "@reduxjs/toolkit";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";

import { getApiErrorDetail, isFetchBaseQueryError } from "@/shared/api";
import { monitoring } from "@/shared/lib";

/** Не HTTP-статус, а сбой транспорта — это баг или инфраструктура */
const REPORTED_TRANSPORT_ERRORS = new Set<unknown>([
	"FETCH_ERROR",
	"TIMEOUT_ERROR"
]);

const MAX_DETAIL_LENGTH = 500;

/** 4xx — бизнес-логика (валидация, права, сессия), в мониторинг не идут */
const isBusinessStatus = (status: number): boolean =>
	status >= 400 && status < 500;

const shouldReport = (error: FetchBaseQueryError): boolean => {
	if (typeof error.status === "number") {
		return error.status >= 500;
	}
	// Тело не JSON: решает HTTP-статус ответа — HTML-страница nginx на 413 тоже 4xx,
	// а битый JSON на 2xx и HTML на 502 — наша проблема
	if (error.status === "PARSING_ERROR") {
		return !isBusinessStatus(error.originalStatus);
	}
	// Офлайн у пользователя — не наша ошибка
	return REPORTED_TRANSPORT_ERRORS.has(error.status) && navigator.onLine;
};

const getEndpointName = (meta: unknown): string => {
	const arg = (meta as { arg?: { endpointName?: unknown } } | undefined)?.arg;
	return typeof arg?.endpointName === "string" ? arg.endpointName : "unknown";
};

/** Один перехватчик для всех RTK Query API: baseApi, authApi, documentGeneratorApi */
export const apiErrorMonitoringMiddleware: Middleware =
	() => (next) => (action) => {
		if (
			isRejectedWithValue(action) &&
			isFetchBaseQueryError(action.payload)
		) {
			const { status } = action.payload;

			if (shouldReport(action.payload)) {
				const endpoint = getEndpointName(action.meta);

				monitoring.captureError(
					new Error(`API ${String(status)}: ${endpoint}`),
					{
						tags: { endpoint, status: String(status) },
						extra: {
							detail: getApiErrorDetail(action.payload)?.slice(
								0,
								MAX_DETAIL_LENGTH
							)
						},
						fingerprint: ["api", endpoint, String(status)]
					}
				);
			}
		}

		return next(action);
	};

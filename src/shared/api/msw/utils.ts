import { type PathParams, delay, http } from "msw";

import { ENV } from "@/shared/config";

const BASE_URL = (ENV.VITE_API_URL || "").replace(/\/$/, "");

/**
 * Обертка над MSW http обработчиком для уменьшения бойлерплейта.
 * Автоматически добавляет BASE_URL, задержку и парсит body.
 */
export const createMockHandler = <T>(
	endpoint: { url: string; method: string },
	resolver: (args: {
		body: T;
		request: Request;
		params: PathParams;
	}) => Promise<Response> | Response
) => {
	const method = endpoint.method.toLowerCase() as keyof typeof http;

	return http[method](
		`${BASE_URL}${endpoint.url}`,
		async ({ request, params }) => {
			// Стандартная задержка для имитации сети
			await delay(500);

			let body = {} as T;
			try {
				// Клонируем запрос, чтобы не вызвать ошибку "body used" при повторном чтении если нужно
				body = (await request.clone().json()) as T;
			} catch {
				// В некоторых GET/DELETE запросах body может отсутствовать
			}

			return resolver({ body, request, params });
		}
	);
};

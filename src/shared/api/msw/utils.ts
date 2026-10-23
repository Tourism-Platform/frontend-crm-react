import { HttpResponse, type PathParams, delay, http } from "msw";

import { ENV } from "@/shared/config";

import type { HTTPValidationError } from "../generated/Api";

export const MOCK_BASE_URL = (ENV.VITE_API_URL || "").replace(/\/$/, "");
export const MOCK_DOCUMENT_BASE_URL = (ENV.VITE_DOCUMENT_API_URL || "").replace(
	/\/$/,
	""
);

/** Имитация сети для ручной проверки в браузере; в тестах ответы мгновенные */
const MOCK_RESPONSE_DELAY_MS = import.meta.env.MODE === "test" ? 0 : 500;

const HTTP_HANDLERS = {
	GET: http.get,
	POST: http.post,
	PUT: http.put,
	PATCH: http.patch,
	DELETE: http.delete
} as const;

export interface IMockEndpoint<TBody> {
	url: string;
	method: string;
	_types?: { body: TBody };
}

export interface IMockResolverArgs<TBody> {
	body: TBody;
	query: URLSearchParams;
	params: PathParams;
	cookies: Record<string, string>;
	request: Request;
}

type TMockResolver<TBody> = (
	args: IMockResolverArgs<TBody>
) => Promise<Response> | Response;

/**
 * Обертка над MSW http обработчиком для уменьшения бойлерплейта.
 * Принимает endpoint из generated paths, добавляет BASE_URL и задержку,
 * парсит JSON body и query. Для path-параметров передавайте плейсхолдер:
 * `PATHS.getTour(":tourId")`.
 */
export const createMockHandler = <TBody>(
	endpoint: IMockEndpoint<TBody>,
	resolver: TMockResolver<TBody>
) => createUrlMockHandler(MOCK_BASE_URL, endpoint, resolver);

/** То же для сторонних API (document generator): базовый URL передаётся явно */
export const createUrlMockHandler = <TBody>(
	baseUrl: string,
	endpoint: IMockEndpoint<TBody>,
	resolver: TMockResolver<TBody>
) => {
	const method = endpoint.method.toUpperCase() as keyof typeof HTTP_HANDLERS;

	return HTTP_HANDLERS[method](
		`${baseUrl.replace(/\/$/, "")}${endpoint.url}`,
		async ({ request, params, cookies }) => {
			await delay(MOCK_RESPONSE_DELAY_MS);

			let body = {} as TBody;
			try {
				body = (await request.clone().json()) as TBody;
			} catch {
				// GET/DELETE без body и multipart-запросы
			}

			return resolver({
				body,
				query: new URL(request.url).searchParams,
				params,
				cookies,
				request
			});
		}
	);
};

/** skip/limit из query (контракт бэка); невалидные значения — дефолты */
export const parseSkipLimit = (query: URLSearchParams, defaultLimit = 10) => {
	const skip = Number(query.get("skip") ?? 0);
	const limit = Number(query.get("limit") ?? defaultLimit);

	return {
		skip: Number.isInteger(skip) && skip >= 0 ? skip : 0,
		limit: Number.isInteger(limit) && limit > 0 ? limit : defaultLimit
	};
};

export const paginate = <T>(items: T[], skip: number, limit: number) =>
	items.slice(skip, skip + limit);

/** Списочный ответ бэка `{ total_count, data }` со skip/limit из query */
export const toListResponse = <T>(
	items: T[],
	query: URLSearchParams,
	defaultLimit = 10
) => {
	const { skip, limit } = parseSkipLimit(query, defaultLimit);
	return { total_count: items.length, data: paginate(items, skip, limit) };
};

/** Регистронезависимый поиск по `q`: пустой запрос пропускает всё */
export const matchesQuery = (
	q: string | null,
	...values: (string | null | undefined)[]
) => {
	const needle = q?.trim().toLowerCase();
	if (!needle) return true;
	return values.some((value) => value?.toLowerCase().includes(needle));
};

/** Сортировка по полю для `sort_by/desc`; null и undefined — в конце */
export const sortBy = <T>(items: T[], field: keyof T | null, desc = false) => {
	if (!field) return items;

	return [...items].sort((a, b) => {
		const left = a[field];
		const right = b[field];
		if (left == null) return 1;
		if (right == null) return -1;
		const result = left < right ? -1 : left > right ? 1 : 0;
		return desc ? -result : result;
	});
};

/** Значения query-параметра, переданного несколько раз (`?status=a&status=b`) */
export const getQueryList = (query: URLSearchParams, key: string) =>
	query
		.getAll(key)
		.flatMap((value) => value.split(","))
		.filter(Boolean);

/** Детерминированный UUID для mock-данных: namespace разделяет сущности */
export const createMockId = (namespace: string, index: number) =>
	`00000000-0000-4000-${namespace}-${String(index).padStart(12, "0")}`;

/** Счётчик id для записей, созданных во время работы мока */
export const createMockIdSequence = (namespace: string, start: number) => {
	let next = start;
	return {
		next: () => createMockId(namespace, next++),
		reset: (value: number) => {
			next = value;
		}
	};
};

export const mockValidationError = (loc: (string | number)[], msg: string) =>
	HttpResponse.json<HTTPValidationError>(
		{ detail: [{ loc, msg, type: "value_error" }] },
		{ status: 422 }
	);

export const mockBadRequest = (detail: string) =>
	HttpResponse.json({ detail }, { status: 400 });

export const mockUnauthorized = () =>
	HttpResponse.json({ detail: "Not authenticated" }, { status: 401 });

export const mockNotFound = (detail = "Not found") =>
	HttpResponse.json({ detail }, { status: 404 });

export const mockNoContent = () => new HttpResponse(null, { status: 204 });

/** Файл-заглушка: pdf, паспорт, логотип, вложение */
export const mockFileResponse = (
	fileName: string,
	contentType = "application/pdf"
) =>
	new HttpResponse(
		new Blob([`mock file ${fileName}`], { type: contentType }),
		{
			headers: {
				"Content-Type": contentType,
				"Content-Disposition": `attachment; filename=${fileName}`
			}
		}
	);

/** Файлы из multipart-запроса (загрузка логотипов, паспортов, вложений) */
export const readFormFiles = async (request: Request) => {
	try {
		const formData = await request.clone().formData();
		return [...formData.values()].filter(
			(value): value is File => value instanceof File
		);
	} catch {
		return [];
	}
};

/** URL картинки-заглушки для медиа (логотипы, фото, галереи) */
export const mockImageUrl = (seed: string, width = 800, height = 600) =>
	`https://picsum.photos/seed/${encodeURIComponent(seed)}/${width}/${height}`;

/** Копия объекта без указанных ключей (read-модель → её часть) */
export const omitKeys = <T extends object, K extends keyof T>(
	value: T,
	keys: readonly K[]
): Omit<T, K> => {
	const copy = { ...value };
	for (const key of keys) delete copy[key];
	return copy;
};

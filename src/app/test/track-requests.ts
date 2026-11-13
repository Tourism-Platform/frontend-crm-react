import { server } from "../mws/server";

export interface ITrackedRequest {
	method: string;
	/** Путь без хоста: `/auth/logout` */
	path: string;
	/** Параметры строки запроса (GET-фильтры, пагинация) */
	query: URLSearchParams;
	/** Тело запроса (JSON — объектом), если было */
	body: unknown;
}

const parseBody = (text: string): unknown => {
	try {
		return JSON.parse(text);
	} catch {
		return text;
	}
};

/**
 * Запросы, которые реально ушли в моковый бэкенд, — в порядке отправки.
 * Нужен setupMswServer() в файле теста; подписка снимается после каждого теста
 */
export const trackRequests = () => {
	const requests: ITrackedRequest[] = [];

	server.events.on("request:start", ({ request }) => {
		const url = new URL(request.url);
		const entry: ITrackedRequest = {
			method: request.method,
			path: url.pathname,
			query: url.searchParams,
			body: undefined
		};
		requests.push(entry);
		void request
			.clone()
			.text()
			.then((text) => {
				entry.body = text ? parseBody(text) : undefined;
			});
	});

	return requests;
};

/** Запросы к пути, оканчивающемуся на `suffix` */
export const requestsTo = (requests: ITrackedRequest[], suffix: string) =>
	requests.filter((request) => request.path.endsWith(suffix));

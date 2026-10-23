import { HttpResponse, http } from "msw";

import { MOCK_BASE_URL, MOCK_DOCUMENT_BASE_URL } from "@/shared/api";

/** Заголовок ответа catch-all: по нему тест покрытия отличает незамоканный путь */
export const UNMOCKED_HEADER = "x-msw-unmocked";

const createUnmockedHandler = (baseUrl: string) =>
	http.all(`${baseUrl}/*`, ({ request }) => {
		const { pathname } = new URL(request.url);
		console.warn(`[MSW] Not mocked: ${request.method} ${pathname}`);

		return HttpResponse.json(
			{ detail: `Not mocked: ${request.method} ${pathname}` },
			{ status: 501, headers: { [UNMOCKED_HEADER]: "1" } }
		);
	});

/** Регистрируются последними: при включённом MSW ни один запрос к API не уходит на бэкенд */
export const unmockedHandlers = [MOCK_BASE_URL, MOCK_DOCUMENT_BASE_URL]
	.filter(Boolean)
	.map(createUnmockedHandler);

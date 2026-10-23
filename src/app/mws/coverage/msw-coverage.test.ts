import { HttpHandler, type Path, matchRequestUrl } from "msw";
import { describe, expect, it } from "vitest";

import { MOCK_BASE_URL } from "@/shared/api";
import * as GENERATED_PATHS from "@/shared/api/generated/paths";

import { handlers } from "../handlers";

type TEndpoint = { url: string; method: string };
type TPathsEntry = TEndpoint | ((...args: string[]) => TEndpoint);

const PATH_USAGE_REGEX = /\b([A-Z][A-Z0-9_]*_PATHS)\.(\w+)/g;

/** Исходники UI: без сгенерированного кода, моков, хендлеров и тестов */
const UI_SOURCES = import.meta.glob<string>(
	[
		"/src/**/*.{ts,tsx}",
		"!/src/shared/api/generated/**",
		"!/src/app/mws/**",
		"!/src/**/handlers/**",
		"!/src/**/mock/**",
		"!/src/**/mocks/**",
		"!/src/**/*.test.{ts,tsx}",
		"!/src/**/*.mock.ts",
		"!/src/**/*.seed.ts",
		"!/src/**/*.store.ts"
	],
	{ query: "?raw", import: "default", eager: true }
);

/** `X_PATHS.y`, которые реально использует UI */
const collectUsedPaths = () => {
	const used = new Set<string>();
	for (const source of Object.values(UI_SOURCES)) {
		for (const [, object, key] of source.matchAll(PATH_USAGE_REGEX)) {
			used.add(`${object}.${key}`);
		}
	}
	return [...used].sort();
};

const getEntry = (object: string, key: string) =>
	(GENERATED_PATHS as unknown as Record<string, Record<string, TPathsEntry>>)[
		object
	]?.[key];

/** Конкретный URL запроса и шаблон пути (`:p0`, `:p1`, …) */
const resolveEndpoint = (entry: TPathsEntry) => {
	if (typeof entry !== "function")
		return { request: entry, template: entry.url };

	const args = (prefix: string) =>
		Array.from({ length: entry.length }, (_, index) => `${prefix}${index}`);
	return {
		request: entry(...args("mock-")),
		template: entry(...args(":p")).url
	};
};

/** Шаблоны сравниваются без имён параметров и хвостового слэша */
const normalizePath = (path: string) =>
	path.replace(/:\w+/g, ":").replace(/\/$/, "");

const httpHandlers = handlers.filter(
	(handler): handler is HttpHandler => handler instanceof HttpHandler
);

/** Первый хендлер, который MSW выберет для запроса (порядок важен) */
const findHandler = ({ url, method }: TEndpoint) => {
	const requestUrl = new URL(`${MOCK_BASE_URL}${url}`);
	return httpHandlers.find((handler) => {
		const { method: handlerMethod, path } = handler.info;
		const methodMatches =
			handlerMethod instanceof RegExp
				? handlerMethod.test(method)
				: handlerMethod.toUpperCase() === method.toUpperCase();
		return (
			methodMatches && matchRequestUrl(requestUrl, path as Path).matches
		);
	});
};

describe("MSW coverage", () => {
	it("every API path used by the UI is routed to its own mock handler", () => {
		const problems: string[] = [];
		const usedPaths = collectUsedPaths();
		// Защита от тихого прохождения при сломанном сканировании исходников
		expect(usedPaths.length).toBeGreaterThan(100);

		for (const name of usedPaths) {
			const [object, key] = name.split(".");
			const entry = getEntry(object, key);
			// Не путь (тип или поле *_PATHS-подобного объекта)
			if (!entry) continue;

			const { request, template } = resolveEndpoint(entry);
			const handler = findHandler(request);
			const expected = normalizePath(`${MOCK_BASE_URL}${template}`);
			const actual = handler && normalizePath(String(handler.info.path));

			if (actual !== expected) {
				problems.push(
					`${name} → ${request.method} ${template}: ${
						actual ? `routed to ${actual}` : "no handler"
					}`
				);
			}
		}

		if (problems.length) {
			console.warn(
				`Unmocked API paths (${problems.length}):\n${problems.join("\n")}`
			);
		}
		expect(problems).toEqual([]);
	});

	it("no mocked path is shadowed by a handler registered earlier", () => {
		const shadowed: string[] = [];

		for (const [object, paths] of Object.entries(GENERATED_PATHS)) {
			for (const [key, entry] of Object.entries(
				paths as Record<string, TPathsEntry>
			)) {
				const { request, template } = resolveEndpoint(entry);
				const expected = normalizePath(`${MOCK_BASE_URL}${template}`);
				const hasOwnHandler = httpHandlers.some(
					(handler) =>
						normalizePath(String(handler.info.path)) === expected &&
						String(handler.info.method).toUpperCase() ===
							request.method
				);
				if (!hasOwnHandler) continue;

				const actual = normalizePath(
					String(findHandler(request)?.info.path)
				);
				if (actual !== expected) {
					shadowed.push(
						`${object}.${key} → ${template}: routed to ${actual}`
					);
				}
			}
		}

		expect(shadowed).toEqual([]);
	});
});

import type { TQueryParams } from "./routes.types";

type TRouteWithParams<T extends string> =
	T extends `${string}:${infer Param}/${infer Rest}`
		? { [K in Param | keyof TRouteWithParams<Rest>]: string }
		: T extends `${string}:${infer Param}`
			? { [K in Param]: string }
			: never;

type TQuery = Record<string, string | number | boolean | null | undefined>;

const appendQuery = (path: string, query?: TQuery): string => {
	if (!query) return path;

	const searchParams = new URLSearchParams();
	Object.entries(query).forEach(([key, value]) => {
		if (value === undefined || value === null || value === "") return;
		searchParams.set(key, String(value));
	});

	const qs = searchParams.toString();
	return qs ? `${path}?${qs}` : path;
};

export const buildRoute = <T extends string>(
	template: T,
	...args: keyof TRouteWithParams<T> extends never
		? []
		: [params: TRouteWithParams<T>, query?: TQuery]
): string => {
	const [params, query] = args as [
		TRouteWithParams<T> | undefined,
		TQuery | undefined
	];
	if (!params) return appendQuery(template, query);

	const path = Object.entries(params).reduce(
		(acc, [key, value]) => acc.replace(`:${key}`, String(value)),
		template as string
	);
	return appendQuery(path, query);
};

export const buildRouteWithQuery = <TPath extends keyof TQueryParams>(
	path: TPath,
	query?: TQueryParams[TPath]
): string => appendQuery(path, query as TQuery | undefined);

export const parseQueryByRoute = <TPath extends keyof TQueryParams>(
	search: string | URLSearchParams
): TQueryParams[TPath] => {
	const params =
		typeof search === "string" ? new URLSearchParams(search) : search;
	const result = {} as { [K in keyof TQueryParams[TPath]]?: string };

	params.forEach((value, key) => {
		result[key as keyof TQueryParams[TPath]] = value;
	});

	return result as TQueryParams[TPath];
};

import {
	CATALOG_QUERY_ARRAY_PARAMS,
	ENUM_CATALOG_QUERY_PARAM
} from "../config/catalog-query.config";
import type { TCatalogUrlQuery } from "../types/catalog-query.types";

const parsePositiveInt = (value: string | null): number | undefined => {
	if (!value) return undefined;

	const parsed = Number.parseInt(value, 10);

	return Number.isFinite(parsed) && parsed > 0 ? parsed : undefined;
};

/** Дата из адреса — только `YYYY-MM-DD` и существующий день; вписанное руками иначе отбрасывается */
const parseIsoDate = (value: string | null): string | undefined => {
	if (!value || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return undefined;

	const [year, month, day] = value.split("-").map(Number);
	const date = new Date(year, month - 1, day);

	return date.getFullYear() === year &&
		date.getMonth() === month - 1 &&
		date.getDate() === day
		? value
		: undefined;
};

export const parseCatalogQuery = (
	search: string | URLSearchParams
): TCatalogUrlQuery => {
	const params =
		typeof search === "string" ? new URLSearchParams(search) : search;

	const query: TCatalogUrlQuery = {};

	const place = params.get(ENUM_CATALOG_QUERY_PARAM.PLACE);
	if (place) {
		query.place = place;
	}

	const checkIn = parseIsoDate(params.get(ENUM_CATALOG_QUERY_PARAM.CHECK_IN));
	if (checkIn) {
		query.checkIn = checkIn;
	}

	const checkOut = parseIsoDate(
		params.get(ENUM_CATALOG_QUERY_PARAM.CHECK_OUT)
	);
	if (checkOut) {
		query.checkOut = checkOut;
	}

	const page = parsePositiveInt(params.get(ENUM_CATALOG_QUERY_PARAM.PAGE));
	if (page) {
		query.page = page;
	}

	const sort = params.get(ENUM_CATALOG_QUERY_PARAM.SORT);
	if (sort) {
		query.sort = sort;
	}

	for (const key of CATALOG_QUERY_ARRAY_PARAMS) {
		const values = params
			.getAll(key)
			.map((value) => value.trim())
			.filter(Boolean);

		if (values.length > 0) {
			query[key] = values;
		}
	}

	return query;
};

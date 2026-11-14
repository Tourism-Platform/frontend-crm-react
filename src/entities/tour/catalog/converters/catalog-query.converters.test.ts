import { describe, expect, it } from "vitest";

import { ENUM_LANGUAGES } from "../../landing";
import { ENUM_TOUR_CATEGORY } from "../../tour";
import { ENUM_CATALOG_QUERY_PARAM } from "../config/catalog-query.config";
import { buildCatalogQueryString } from "../lib/build-catalog-query";
import { parseCatalogQuery } from "../lib/parse-catalog-query";
import { ENUM_CATALOG_DURATION, ENUM_CATALOG_SORT } from "../types";

import {
	mapCatalogFiltersToCatalogQuery,
	mapCatalogQueryToCatalogFilters
} from "./catalog-query.converters";

const DEFAULTS = {
	page: 1,
	limit: 12,
	search: "",
	filters: { country: [], city: [], duration: [], language: [], category: [] }
};

const toFilters = (params: [string, string][]) =>
	mapCatalogQueryToCatalogFilters(
		parseCatalogQuery(new URLSearchParams(params)),
		DEFAULTS
	);

describe("parseCatalogQuery", () => {
	it("keeps a valid date and drops a malformed or non-existent one", () => {
		expect(
			parseCatalogQuery(
				new URLSearchParams([
					[ENUM_CATALOG_QUERY_PARAM.CHECK_IN, "2026-02-28"],
					[ENUM_CATALOG_QUERY_PARAM.CHECK_OUT, "2026-02-30"]
				])
			)
		).toEqual({ checkIn: "2026-02-28" });
		expect(
			parseCatalogQuery(
				new URLSearchParams([
					[ENUM_CATALOG_QUERY_PARAM.CHECK_IN, "28.02.2026"]
				])
			)
		).toEqual({});
	});

	it("drops a page that is not a positive integer", () => {
		expect(
			parseCatalogQuery(
				new URLSearchParams([[ENUM_CATALOG_QUERY_PARAM.PAGE, "0"]])
			)
		).toEqual({});
		expect(
			parseCatalogQuery(
				new URLSearchParams([[ENUM_CATALOG_QUERY_PARAM.PAGE, "abc"]])
			)
		).toEqual({});
		expect(
			parseCatalogQuery(
				new URLSearchParams([[ENUM_CATALOG_QUERY_PARAM.PAGE, "3"]])
			)
		).toEqual({ page: 3 });
	});

	it("ignores page size in the address", () => {
		expect(
			parseCatalogQuery(new URLSearchParams([["limit", "100"]]))
		).toEqual({});
	});
});

describe("mapCatalogQueryToCatalogFilters", () => {
	it("drops unknown sort, duration, language and category values", () => {
		const filters = toFilters([
			[ENUM_CATALOG_QUERY_PARAM.SORT, "cheapest"],
			[ENUM_CATALOG_QUERY_PARAM.DURATION, ENUM_CATALOG_DURATION.FULL_DAY],
			[ENUM_CATALOG_QUERY_PARAM.DURATION, "week"],
			[ENUM_CATALOG_QUERY_PARAM.LANGUAGE, ENUM_LANGUAGES.ENGLISH],
			[ENUM_CATALOG_QUERY_PARAM.LANGUAGE, "klingon"],
			[ENUM_CATALOG_QUERY_PARAM.CATEGORY, "unknown"]
		]);

		expect(filters.sort).toBeUndefined();
		expect(filters.filters).toMatchObject({
			duration: [ENUM_CATALOG_DURATION.FULL_DAY],
			language: [ENUM_LANGUAGES.ENGLISH],
			category: []
		});
	});

	it("keeps page size from defaults", () => {
		expect(toFilters([["limit", "100"]]).limit).toBe(DEFAULTS.limit);
	});
});

describe("buildCatalogQueryString", () => {
	it("writes no page size and no first page", () => {
		const qs = buildCatalogQueryString(
			mapCatalogFiltersToCatalogQuery({
				...DEFAULTS,
				sort: ENUM_CATALOG_SORT.PRICE_DESC,
				filters: {
					...DEFAULTS.filters,
					category: [ENUM_TOUR_CATEGORY.ARCHAEOLOGICAL]
				}
			})
		);

		expect(qs).not.toContain("limit");
		expect(qs).not.toContain(ENUM_CATALOG_QUERY_PARAM.PAGE);
		expect(qs).toContain(`sort=${ENUM_CATALOG_SORT.PRICE_DESC}`);
	});
});

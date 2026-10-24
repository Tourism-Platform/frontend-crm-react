import { describe, expect, it } from "vitest";

import { buildCatalogQueryString } from "../lib/build-catalog-query";
import { parseCatalogQuery } from "../lib/parse-catalog-query";
import { ENUM_CATALOG_SORT, ENUM_TOUR_CATALOG_SORT_BACKEND } from "../types";

import {
	mapCatalogFiltersToCatalogQuery,
	mapCatalogQueryToCatalogFilters
} from "./catalog-query.converters";
import { mapCatalogTourFiltersToPublicCatalogQuery } from "./catalog-tour.converters";

const BASE = { page: 1, limit: 12, search: "" };

describe("catalog sort", () => {
	it("sends no sort when it is empty", () => {
		expect(
			mapCatalogTourFiltersToPublicCatalogQuery(BASE)
		).not.toHaveProperty("sort");
	});

	it("maps sort to backend", () => {
		expect(
			mapCatalogTourFiltersToPublicCatalogQuery({
				...BASE,
				sort: ENUM_CATALOG_SORT.DURATION_DESC
			})
		).toMatchObject({ sort: ENUM_TOUR_CATALOG_SORT_BACKEND.DURATION_DESC });
	});

	it("round-trips sort through the URL", () => {
		const qs = buildCatalogQueryString(
			mapCatalogFiltersToCatalogQuery({
				...BASE,
				sort: ENUM_CATALOG_SORT.PRICE_ASC
			})
		);

		expect(qs).toContain("sort=price_asc");
		expect(
			mapCatalogQueryToCatalogFilters(parseCatalogQuery(qs), BASE).sort
		).toBe(ENUM_CATALOG_SORT.PRICE_ASC);
	});
});

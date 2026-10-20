import { describe, expect, it } from "vitest";

import { TourListSortField, TourType } from "@/shared/api";

import { ENUM_TOUR_LIST_SORT, ENUM_TOUR_TYPES } from "../types";

import { mapTourFiltersToBackend } from "./tour-common.converts";

const BASE = { page: 1, limit: 10, search: "", status: [] };

describe("mapTourFiltersToBackend", () => {
	it("sends no sort and type when they are empty", () => {
		const query = mapTourFiltersToBackend(BASE);

		expect(query).not.toHaveProperty("sort_by");
		expect(query).not.toHaveProperty("desc");
		expect(query).not.toHaveProperty("typ");
	});

	it("maps sort option to sort_by and desc", () => {
		expect(
			mapTourFiltersToBackend({
				...BASE,
				sort: ENUM_TOUR_LIST_SORT.TITLE_DESC
			})
		).toMatchObject({ sort_by: TourListSortField.Title, desc: true });
	});

	it("maps tour type", () => {
		expect(
			mapTourFiltersToBackend({ ...BASE, type: ENUM_TOUR_TYPES.GROUP })
		).toMatchObject({ typ: TourType.Regular });
	});
});

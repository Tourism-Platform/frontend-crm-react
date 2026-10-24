import { describe, expect, it } from "vitest";

import {
	ENUM_TOUR_LIST_SORT,
	ENUM_TOUR_LIST_SORT_FIELD_BACKEND,
	ENUM_TOUR_TYPES,
	ENUM_TOUR_TYPE_BACKEND
} from "../types";

import { mapTourFiltersToBackend } from "./tour-common.converters";

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
		).toMatchObject({
			sort_by: ENUM_TOUR_LIST_SORT_FIELD_BACKEND.TITLE,
			desc: true
		});
	});

	it("maps tour type", () => {
		expect(
			mapTourFiltersToBackend({ ...BASE, type: ENUM_TOUR_TYPES.GROUP })
		).toMatchObject({ typ: ENUM_TOUR_TYPE_BACKEND.REGULAR });
	});
});

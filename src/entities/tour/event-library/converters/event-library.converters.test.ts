import { describe, expect, it } from "vitest";

import { ENUM_EVENT } from "@/entities/tour/itinerary";
import { ENUM_EVENT_BACKEND } from "@/entities/tour/itinerary/types/event-backend-enum.types";

import type { IEventLibraryFilters } from "../types";

import { mapEventLibraryFiltersToBackend } from "./event-library.converters";

const filters = (
	overrides: Partial<IEventLibraryFilters> = {}
): IEventLibraryFilters => ({
	page: 1,
	limit: 10,
	status: [],
	...overrides
});

describe("mapEventLibraryFiltersToBackend", () => {
	it("omits typ when no status is selected", () => {
		expect(mapEventLibraryFiltersToBackend(filters())).toEqual({
			limit: 10
		});
		expect(mapEventLibraryFiltersToBackend(filters())).not.toHaveProperty(
			"typ"
		);
	});

	it("maps transportation to a single transfer typ", () => {
		expect(
			mapEventLibraryFiltersToBackend(
				filters({ status: [ENUM_EVENT.TRANSPORTATION] })
			)
		).toEqual({
			limit: 10,
			typ: [ENUM_EVENT_BACKEND.TRANSFER]
		});
	});

	it("expands flight into flight, train and bus", () => {
		expect(
			mapEventLibraryFiltersToBackend(
				filters({ status: [ENUM_EVENT.FLIGHT] })
			)
		).toEqual({
			limit: 10,
			typ: [
				ENUM_EVENT_BACKEND.FLIGHT,
				ENUM_EVENT_BACKEND.TRAIN,
				ENUM_EVENT_BACKEND.BUS
			]
		});
	});

	it("sends every selected type in one array", () => {
		expect(
			mapEventLibraryFiltersToBackend(
				filters({
					status: [ENUM_EVENT.FLIGHT, ENUM_EVENT.ACTIVITY]
				})
			)
		).toEqual({
			limit: 10,
			typ: [
				ENUM_EVENT_BACKEND.FLIGHT,
				ENUM_EVENT_BACKEND.TRAIN,
				ENUM_EVENT_BACKEND.BUS,
				ENUM_EVENT_BACKEND.ACTIVITY
			]
		});
	});

	it("maps page 2 to skip", () => {
		expect(
			mapEventLibraryFiltersToBackend(filters({ page: 2, limit: 10 }))
		).toEqual({ skip: 10, limit: 10 });
	});
});

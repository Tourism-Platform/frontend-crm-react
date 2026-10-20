import { INTERSECTION_ELEMENTS } from "@/shared/config";

import type { ICatalogTourFilters } from "@/entities/tour";

export const DEFAULT_CATALOG_FILTERS: ICatalogTourFilters = {
	page: 1,
	limit: INTERSECTION_ELEMENTS.CATALOG_TOURS,
	search: "",
	filters: {
		country: [],
		city: [],
		duration: [],
		language: [],
		category: []
	}
};

export type TCatalogViewMode = "grid" | "list";

import type {
	PublicTourCatalogSchemaOutput,
	TourCatalogSort,
	TourCategory
} from "../Api";

// AUTO-GENERATED — не редактировать вручную
// Сгенерировано скриптом scripts/generate-api-paths.ts

export const TOUR_CATALOG_PATHS = {
	listPublicCatalog: {
		url: "/tour/catalog/public",
		method: "GET",
		_types: {} as {
			body: void;
			query: {
				sort?: TourCatalogSort | null;
				q?: string | null;
				categories?: TourCategory[] | null;
				duration_days_min?: number | null;
				duration_days_max?: number | null;
				city?: string | null;
				skip?: number;
				limit?: number;
			};
			response: PublicTourCatalogSchemaOutput[];
		}
	} as const,
	listAgencyCatalog: {
		url: "/tour/catalog/agency",
		method: "GET",
		_types: {} as {
			body: void;
			query: {
				sort?: TourCatalogSort | null;
				q?: string | null;
				categories?: TourCategory[] | null;
				duration_days_min?: number | null;
				duration_days_max?: number | null;
				city?: string | null;
				skip?: number;
				limit?: number;
			};
			response: PublicTourCatalogSchemaOutput[];
		}
	} as const
} as const;

import type {
	Language,
	LanguageCode,
	LocationSuggestionSchema,
	PublicTourCatalogSchemaOutput,
	TourCatalogSort,
	TourCategory
} from "../Api";

// AUTO-GENERATED — не редактировать вручную
// Сгенерировано скриптом scripts/generate-api-paths.ts

export const TOUR_CATALOG_PATHS = {
	suggestLocations: {
		url: "/tour/catalog/suggest",
		method: "GET",
		_types: {} as {
			body: void;
			query: { q: string; lang?: LanguageCode; limit?: number };
			response: LocationSuggestionSchema[];
		}
	} as const,
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
				country?: string | null;
				language?: Language | null;
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
				country?: string | null;
				language?: Language | null;
				skip?: number;
				limit?: number;
			};
			response: PublicTourCatalogSchemaOutput[];
		}
	} as const
} as const;

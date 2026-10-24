import { SuggestKind, TourCatalogSort } from "@/shared/api";

export const ENUM_TOUR_CATALOG_SORT_BACKEND = {
	PRICE_ASC: TourCatalogSort.PriceAsc,
	PRICE_DESC: TourCatalogSort.PriceDesc,
	DURATION_ASC: TourCatalogSort.DurationAsc,
	DURATION_DESC: TourCatalogSort.DurationDesc
} as const;

export type ENUM_TOUR_CATALOG_SORT_BACKEND_TYPE = TourCatalogSort;

export const ENUM_SUGGEST_KIND_BACKEND = {
	CITY: SuggestKind.City,
	PLACE: SuggestKind.Place,
	COUNTRY: SuggestKind.Country
} as const;

export type ENUM_SUGGEST_KIND_BACKEND_TYPE = SuggestKind;

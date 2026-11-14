import type { TToursCatalogPageKeys } from "@/shared/config";
import type { TFormField } from "@/shared/types";

/** Поля фильтров каталога — пути в форме `ICatalogTourFilters` */
export const ENUM_CATALOG_FILTER = {
	COUNTRY: "filters.country",
	CITY: "filters.city",
	DURATION: "filters.duration",
	LANGUAGE: "filters.language",
	CATEGORY: "filters.category"
} as const;

export type ENUM_CATALOG_FILTER_TYPE =
	(typeof ENUM_CATALOG_FILTER)[keyof typeof ENUM_CATALOG_FILTER];

export type TCatalogFilterForm = TFormField<
	TToursCatalogPageKeys,
	ENUM_CATALOG_FILTER_TYPE
>;

import { TourCatalogSort } from "@/shared/api";
import { createEnumMapper } from "@/shared/utils";

import { ENUM_CATALOG_SORT, type ENUM_CATALOG_SORT_TYPE } from "../types";

const MAP_CATALOG_SORT: Record<ENUM_CATALOG_SORT_TYPE, TourCatalogSort> = {
	[ENUM_CATALOG_SORT.PRICE_ASC]: TourCatalogSort.PriceAsc,
	[ENUM_CATALOG_SORT.PRICE_DESC]: TourCatalogSort.PriceDesc,
	[ENUM_CATALOG_SORT.DURATION_ASC]: TourCatalogSort.DurationAsc,
	[ENUM_CATALOG_SORT.DURATION_DESC]: TourCatalogSort.DurationDesc
};

export const catalogSortMapper = createEnumMapper<
	ENUM_CATALOG_SORT_TYPE,
	TourCatalogSort
>(MAP_CATALOG_SORT);

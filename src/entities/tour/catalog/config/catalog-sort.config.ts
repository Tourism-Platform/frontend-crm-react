import type { TOptionsKeys } from "@/shared/config";

import { ENUM_CATALOG_SORT, type ENUM_CATALOG_SORT_TYPE } from "../types";

export const CATALOG_SORT_LABELS: Record<ENUM_CATALOG_SORT_TYPE, TOptionsKeys> =
	{
		[ENUM_CATALOG_SORT.PRICE_ASC]: "tour.catalogSort.price_asc",
		[ENUM_CATALOG_SORT.PRICE_DESC]: "tour.catalogSort.price_desc",
		[ENUM_CATALOG_SORT.DURATION_ASC]: "tour.catalogSort.duration_asc",
		[ENUM_CATALOG_SORT.DURATION_DESC]: "tour.catalogSort.duration_desc"
	};

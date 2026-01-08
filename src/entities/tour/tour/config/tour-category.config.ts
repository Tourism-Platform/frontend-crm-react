import type { TOptionsKeys } from "@/shared/config";

import { ENUM_TOUR_CATEGORY, type ENUM_TOUR_CATEGORY_TYPE } from "../types";

export const TOUR_CATEGORY_LABELS: Record<
	ENUM_TOUR_CATEGORY_TYPE,
	TOptionsKeys
> = {
	[ENUM_TOUR_CATEGORY.BEACH]: "tour.tourCategories.beach",
	[ENUM_TOUR_CATEGORY.MOUNTAIN]: "tour.tourCategories.mountain",
	[ENUM_TOUR_CATEGORY.CITY]: "tour.tourCategories.city",
	[ENUM_TOUR_CATEGORY.SAFARI]: "tour.tourCategories.safari",
	[ENUM_TOUR_CATEGORY.CRUISE]: "tour.tourCategories.cruise",
	[ENUM_TOUR_CATEGORY.GASTRONOMIC]: "tour.tourCategories.gastronomic",
	[ENUM_TOUR_CATEGORY.EXTREME]: "tour.tourCategories.extreme"
};

import type { TOptionsKeys } from "@/shared/config";

import {
	ENUM_CATALOG_TOUR_CATEGORY,
	type ENUM_CATALOG_TOUR_CATEGORY_TYPE
} from "../types";

export const CATALOG_TOUR_CATEGORY_LABELS: Record<
	ENUM_CATALOG_TOUR_CATEGORY_TYPE,
	TOptionsKeys
> = {
	[ENUM_CATALOG_TOUR_CATEGORY.CULTURAL_HISTORICAL]:
		"tour.tourCategories.cultural_historical",
	[ENUM_CATALOG_TOUR_CATEGORY.RELIGIOUS_SPIRITUAL]:
		"tour.tourCategories.religious_spiritual",
	[ENUM_CATALOG_TOUR_CATEGORY.ARCHAEOLOGICAL]:
		"tour.tourCategories.archaeological",
	[ENUM_CATALOG_TOUR_CATEGORY.ADVENTURE_OUTDOOR]:
		"tour.tourCategories.adventure_outdoor",
	[ENUM_CATALOG_TOUR_CATEGORY.ECO_NATURE]: "tour.tourCategories.eco_nature",
	[ENUM_CATALOG_TOUR_CATEGORY.HIKING_TREKKING]:
		"tour.tourCategories.hiking_trekking",
	[ENUM_CATALOG_TOUR_CATEGORY.CITY_TOUR]: "tour.tourCategories.city_tour",
	[ENUM_CATALOG_TOUR_CATEGORY.GASTRONOMY_CULINARY]:
		"tour.tourCategories.gastronomy_culinary",
	[ENUM_CATALOG_TOUR_CATEGORY.PHOTOGRAPHY_CREATIVE]:
		"tour.tourCategories.photography_creative",
	[ENUM_CATALOG_TOUR_CATEGORY.EDUCATIONAL]: "tour.tourCategories.educational",
	[ENUM_CATALOG_TOUR_CATEGORY.MASTER_CLASS_WORKSHOP]:
		"tour.tourCategories.master_class_workshop",
	[ENUM_CATALOG_TOUR_CATEGORY.WELLNESS_SPA]:
		"tour.tourCategories.wellness_spa",
	[ENUM_CATALOG_TOUR_CATEGORY.YOGA_MEDITATION]:
		"tour.tourCategories.yoga_meditation",
	[ENUM_CATALOG_TOUR_CATEGORY.BUSINESS_MICE]:
		"tour.tourCategories.business_mice",
	[ENUM_CATALOG_TOUR_CATEGORY.FAMILY_KIDS]: "tour.tourCategories.family_kids",
	[ENUM_CATALOG_TOUR_CATEGORY.MULTI_DESTINATION]:
		"tour.tourCategories.multi_destination"
};

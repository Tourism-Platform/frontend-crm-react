import { TourCategory } from "@/shared/api";
import { createEnumMapper } from "@/shared/utils";

import { ENUM_TOUR_CATEGORY, type ENUM_TOUR_CATEGORY_TYPE } from "../types";

const MAP_AMENITIES: Partial<Record<ENUM_TOUR_CATEGORY_TYPE, TourCategory>> = {
	[ENUM_TOUR_CATEGORY.ADVENTURE_OUTDOOR]: TourCategory.AdventureOutdoor,
	[ENUM_TOUR_CATEGORY.ARCHAEOLOGICAL]: TourCategory.Archaeological,
	[ENUM_TOUR_CATEGORY.BUSINESS_MICE]: TourCategory.BusinessMice,
	[ENUM_TOUR_CATEGORY.CITY_TOUR]: TourCategory.CityTour,
	[ENUM_TOUR_CATEGORY.CULTURAL_HISTORICAL]: TourCategory.CulturalHistorical,
	[ENUM_TOUR_CATEGORY.ECO_NATURE]: TourCategory.EcoNature,
	[ENUM_TOUR_CATEGORY.EDUCATIONAL]: TourCategory.Educational,
	[ENUM_TOUR_CATEGORY.FAMILY_KIDS]: TourCategory.FamilyKids,
	[ENUM_TOUR_CATEGORY.GASTRONOMY_CULINARY]: TourCategory.GastronomyCulinary,
	[ENUM_TOUR_CATEGORY.HIKING_TREKKING]: TourCategory.HikingTrekking,
	[ENUM_TOUR_CATEGORY.MASTER_CLASS_WORKSHOP]:
		TourCategory.MasterClassWorkshop,
	[ENUM_TOUR_CATEGORY.MULTI_DESTINATION]: TourCategory.MultiDestination,
	[ENUM_TOUR_CATEGORY.PHOTOGRAPHY_CREATIVE]: TourCategory.PhotographyCreative,
	[ENUM_TOUR_CATEGORY.RELIGIOUS_SPIRITUAL]: TourCategory.ReligiousSpiritual,
	[ENUM_TOUR_CATEGORY.WELLNESS_SPA]: TourCategory.WellnessSpa,
	[ENUM_TOUR_CATEGORY.YOGA_MEDITATION]: TourCategory.YogaMeditation
};

export const tourCategoriesMapper = createEnumMapper<
	ENUM_TOUR_CATEGORY_TYPE,
	TourCategory
>(MAP_AMENITIES);

import {
	TourCategory,
	TourListSortField,
	TourStatus,
	TourType
} from "@/shared/api";

export const ENUM_TOUR_LIST_SORT_FIELD_BACKEND = {
	TITLE: TourListSortField.Title,
	STATUS: TourListSortField.Status,
	GROUP_SIZE: TourListSortField.GroupSize,
	CREATED_AT: TourListSortField.CreatedAt
} as const;

export type ENUM_TOUR_LIST_SORT_FIELD_BACKEND_TYPE = TourListSortField;

export const ENUM_TOUR_TYPE_BACKEND = {
	REGULAR: TourType.Regular,
	CUSTOM: TourType.Custom
} as const;

export type ENUM_TOUR_TYPE_BACKEND_TYPE = TourType;

export const ENUM_TOUR_CATEGORY_BACKEND = {
	CULTURAL_HISTORICAL: TourCategory.CulturalHistorical,
	RELIGIOUS_SPIRITUAL: TourCategory.ReligiousSpiritual,
	ARCHAEOLOGICAL: TourCategory.Archaeological,
	ADVENTURE_OUTDOOR: TourCategory.AdventureOutdoor,
	ECO_NATURE: TourCategory.EcoNature,
	HIKING_TREKKING: TourCategory.HikingTrekking,
	CITY_TOUR: TourCategory.CityTour,
	GASTRONOMY_CULINARY: TourCategory.GastronomyCulinary,
	PHOTOGRAPHY_CREATIVE: TourCategory.PhotographyCreative,
	EDUCATIONAL: TourCategory.Educational,
	MASTER_CLASS_WORKSHOP: TourCategory.MasterClassWorkshop,
	WELLNESS_SPA: TourCategory.WellnessSpa,
	YOGA_MEDITATION: TourCategory.YogaMeditation,
	BUSINESS_MICE: TourCategory.BusinessMice,
	FAMILY_KIDS: TourCategory.FamilyKids,
	MULTI_DESTINATION: TourCategory.MultiDestination
} as const;

export type ENUM_TOUR_CATEGORY_BACKEND_TYPE = TourCategory;

export const ENUM_TOUR_STATUS_BACKEND = {
	DRAFT: TourStatus.Draft,
	PUBLISHED: TourStatus.Published,
	ARCHIVED: TourStatus.Archived
} as const;

export type ENUM_TOUR_STATUS_BACKEND_TYPE = TourStatus;

import type { TTourSettingsGeneralFormSchema } from "./setting-general-info.types";
import type { ENUM_TOUR_CATEGORY_TYPE } from "./tour-category.types";
import type { ENUM_TOUR_STATUS_TYPE } from "./tour-status.types";
import type { ENUM_TOUR_TYPES_TYPE } from "./tour-type.types";

export interface ITourCard {
	id: string;
	status: ENUM_TOUR_STATUS_TYPE;
	title: string;
	route: string[];
	type: ENUM_TOUR_TYPES_TYPE;
	priceFrom: number;
	priceTo: number;
	imageUrl: string;
	categories: ENUM_TOUR_CATEGORY_TYPE[];
	languages: string[];
	days: number;
	nights: number;
	groupSizeMin: number | null;
	groupSizeMax: number;
	ageFrom: number | null;
	ageTo: number | null;
}

export interface ITourGeneral extends TTourSettingsGeneralFormSchema {
	id: string;
	status: ENUM_TOUR_STATUS_TYPE;
}

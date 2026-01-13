import type { TSettingsGeneralFormSchema } from "./setting-general-info.types";
import type { ENUM_TOUR_STATUS_TYPE } from "./tour-status.types";

export interface ITourCard {
	id: string;
	status: ENUM_TOUR_STATUS_TYPE;
	title: string;
	route: string[];
	type: string;
	priceFrom: number;
	priceTo: number;
	imageUrl: string;
}

export interface ITourGeneral extends TSettingsGeneralFormSchema {
	id: string;
	status: ENUM_TOUR_STATUS_TYPE;
}

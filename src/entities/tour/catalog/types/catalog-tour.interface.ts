import type { ENUM_TOUR_CATEGORY_TYPE } from "../../tour/types";

import type { ENUM_CATALOG_TOUR_TYPES_TYPE } from "./catalog-tour-type.types";

export interface ICatalogTourCard {
	id: string;
	title: string;
	description: string;
	days: number;
	nights: number;
	priceFrom: number;
	priceTo: number;
	currency: string;
	imageUrl: string;
	route: string[];
	type: ENUM_CATALOG_TOUR_TYPES_TYPE;
	categories: ENUM_TOUR_CATEGORY_TYPE[];
	languages: string[];
	groupSizeMin: number | null;
	groupSizeMax: number;
	ageFrom: number | null;
	ageTo: number | null;
	optionCount: number | null;
}

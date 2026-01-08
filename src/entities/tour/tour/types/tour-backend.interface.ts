import type { ENUM_TOUR_CATEGORY_TYPE } from "./tour-category.types";

export interface ITourBackend {
	id: string;
	status: string;
	title: string;
	route: string[];
	type: string;
	price_from: number;
	price_to: number;
	image_url: string;
}

export interface ITourGeneralBackend {
	id: string;
	title: string;
	type: string;
	group_size: number;
	duration_from: number;
	duration_to: number;
	age_requires_from: number;
	age_requires_to: number;
	categories: ENUM_TOUR_CATEGORY_TYPE[];
}

export interface ITourFinanceBackend {
	id: string;
	currency_type: string;
	pricing_visibility: string;
}

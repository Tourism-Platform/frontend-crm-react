import type { ENUM_TOUR_STATUS_TYPE } from "../constants";

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

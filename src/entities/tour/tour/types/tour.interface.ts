import type { ENUM_TOUR_STATUS_TYPE } from "../constants";

export interface ITourCard {
	id: string;
	status: ENUM_TOUR_STATUS_TYPE;
	title: string;
	route: string[];
	type: string;
	price_from: number;
	price_to: number;
	image_url: string;
}

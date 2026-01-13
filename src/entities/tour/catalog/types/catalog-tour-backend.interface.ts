import type { ENUM_CATALOG_TOUR_STATUS_TYPE } from "./catalog-tour-status.types";

export interface ICatalogTourBackend {
	id: string;
	title: string;
	route: string[];
	type: string;
	price_from: number;
	price_to: number;
	image_url: string;
	status: ENUM_CATALOG_TOUR_STATUS_TYPE;
}

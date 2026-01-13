import type { ENUM_CATALOG_TOUR_STATUS_TYPE } from "./catalog-tour-status.types";

export interface ICatalogTourCard {
	id: string;
	status: ENUM_CATALOG_TOUR_STATUS_TYPE;
	title: string;
	route: string[];
	type: string;
	priceFrom: number;
	priceTo: number;
	imageUrl: string;
}

export interface ICatalogTourGeneral {
	id: string;
	status: ENUM_CATALOG_TOUR_STATUS_TYPE;
	title: string;
	route: string[];
	type: string;
	priceFrom: number;
	priceTo: number;
	imageUrl: string;
}

import type {
	TOUR_PATHS,
	TourMetaCreateSchema,
	TourMetaModel
} from "@/shared/api";

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

export type TTourCreateBackend = TourMetaCreateSchema;

export type TTourBackend = TourMetaModel;

export type TCreateTourBackendResponse =
	typeof TOUR_PATHS.createTour._types.response;

export type TUpdateTourBackendResponse = ReturnType<
	typeof TOUR_PATHS.updateTour
>["_types"]["response"];

export type TGetTourBackendResponse = ReturnType<
	typeof TOUR_PATHS.getTour
>["_types"]["response"];

export type TListToursBackendResponse =
	typeof TOUR_PATHS.listTours._types.response;

export interface ITourGeneralBackend {
	id: string;
	status: string;
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

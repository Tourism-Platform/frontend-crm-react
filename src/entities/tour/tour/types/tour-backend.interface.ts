import type {
	TOUR_FINANCIAL_PATHS,
	TOUR_PATHS,
	TourFinSettingsModel,
	TourMetaResponse,
	TourMetaUpdateSchema
} from "@/shared/api";

export type TTourBackend = TourMetaResponse;

export type TTourUpdateBackendBody = TourMetaUpdateSchema;

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

export type TTourFinanceBackendResponse = ReturnType<
	typeof TOUR_FINANCIAL_PATHS.getTourFinancials
>["_types"]["response"];

export type TTourFinanceBackend = TourFinSettingsModel;

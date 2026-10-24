import type {
	CreateFinancialSchema,
	TOUR_FINANCIAL_PATHS,
	TOUR_PATHS,
	TourFinSettingsModel,
	TourMetaCreateSchema,
	TourMetaResponse,
	TourMetaUpdateSchema,
	TourStatisticsResponse
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

export type TTourFinanceCreateBackend = ReturnType<
	typeof TOUR_FINANCIAL_PATHS.createTourFinancials
>["_types"]["body"];
export type TTourStatisticsResponseBackend = TourStatisticsResponse;
export type TCreateFinancialSchemaBackend = CreateFinancialSchema;
export type TTourMetaCreateSchemaBackend = TourMetaCreateSchema;

export type TListToursQueryBackend = typeof TOUR_PATHS.listTours._types.query;

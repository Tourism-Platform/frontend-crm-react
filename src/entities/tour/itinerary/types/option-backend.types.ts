import type { TOUR_OPTION_PATHS, TourOptionModel } from "@/shared/api";

export type TTourOptionBackend = TourOptionModel;

export type TListAllTourOptionsBackendResponce = ReturnType<
	typeof TOUR_OPTION_PATHS.listAllTourOptions
>["_types"]["response"];

export type TCreateTourOptionBackendResponce = ReturnType<
	typeof TOUR_OPTION_PATHS.createTourOption
>["_types"]["response"];

export type TGetTourSummaryBackendResponce = ReturnType<
	typeof TOUR_OPTION_PATHS.getTourSummary
>["_types"]["response"];

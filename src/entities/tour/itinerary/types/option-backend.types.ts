import type {
	TOUR_OPTION_PATHS,
	TourOptionCreateSchema,
	TourOptionModel,
	TourOptionUpdateSchema
} from "@/shared/api";

export type TTourOptionBackend = TourOptionModel;
export type TTourOptionCreateBackend = TourOptionCreateSchema;
export type TTourOptionUpdateBackend = TourOptionUpdateSchema;

export type TListAllTourOptionsBackendResponce = ReturnType<
	typeof TOUR_OPTION_PATHS.listAllTourOptions
>["_types"]["response"];

export type TCreateTourOptionBackendResponce = ReturnType<
	typeof TOUR_OPTION_PATHS.createTourOption
>["_types"]["response"];

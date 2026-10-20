import type {
	TOUR_PUBLIC_PATHS,
	TourOptionPreviewSchemaOutput,
	TourOptionPublicResponse
} from "@/shared/api";

export type TOptionDetailBackend = TourOptionPublicResponse;

export type TPreviewOptionListItemBackend = TourOptionPreviewSchemaOutput;

export type TPreviewOptionsListBackendQuery = ReturnType<
	typeof TOUR_PUBLIC_PATHS.listPublicTourOptions
>["_types"]["query"];

export type TPreviewOptionsListBackendResponse = ReturnType<
	typeof TOUR_PUBLIC_PATHS.listPublicTourOptions
>["_types"]["response"];

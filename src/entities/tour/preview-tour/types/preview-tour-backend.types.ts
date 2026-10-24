import type {
	GeneralActivityPubSchemaOutput,
	LandingPagePubSchema,
	LandingPageResponse,
	TOUR_PUBLIC_PATHS
} from "@/shared/api";

export type TPreviewTourBackend = LandingPagePubSchema;

export type TGetPreviewTourBackendResponse = ReturnType<
	typeof TOUR_PUBLIC_PATHS.getTour
>["_types"]["response"];
export type TLandingPageResponseBackend = LandingPageResponse;
export type TGeneralActivityPubSchemaOutputBackend =
	GeneralActivityPubSchemaOutput;

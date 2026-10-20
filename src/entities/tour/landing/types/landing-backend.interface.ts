import type {
	LandingPagePubSchema,
	TOUR_LANDING_PAGE_PATHS
} from "@/shared/api";

export type TLandingBackend = LandingPagePubSchema;

export type TGetLandingBackendResponse = ReturnType<
	typeof TOUR_LANDING_PAGE_PATHS.getLandingPage
>["_types"]["response"];

export type TUpdateLandingBackendResponse = ReturnType<
	typeof TOUR_LANDING_PAGE_PATHS.updateLandingPage
>["_types"]["response"];

export type TUploadLandingImagesBackendResponse = ReturnType<
	typeof TOUR_LANDING_PAGE_PATHS.uploadLandingImages
>["_types"]["response"];

export type TListLandingImagesBackendQuery = ReturnType<
	typeof TOUR_LANDING_PAGE_PATHS.listLandingImages
>["_types"]["query"];

export type TListLandingImagesBackendResponse = ReturnType<
	typeof TOUR_LANDING_PAGE_PATHS.listLandingImages
>["_types"]["response"];

export type TUpdateLandingImageBackendBody = ReturnType<
	typeof TOUR_LANDING_PAGE_PATHS.updateLandingPage
>["_types"]["body"];

import type { LandingPageModel, TOUR_LANDING_PAGE_PATHS } from "@/shared/api";

import type {
	ENUM_AMENITIES_TYPE,
	ENUM_LANGUAGES_TYPE,
	ENUM_PICKUP_TYPE_TYPE
} from "./index";

export interface ILandingBackend {
	photos: string;
	description: string;
	languages: ENUM_LANGUAGES_TYPE[];
	includedAmenities: ENUM_AMENITIES_TYPE[];
	notIncludedAmenities: ENUM_AMENITIES_TYPE[];
	pickupType: ENUM_PICKUP_TYPE_TYPE[];
	pickupDescription: string;
	cancellationPolicy: string;
	additionalInfo: string;
}

export type TLandingBackend = LandingPageModel;

export type TLandingCreateBackend = Omit<LandingPageModel, "id" | "tour_id">;

export type TCreateLandingBackendResponse = ReturnType<
	typeof TOUR_LANDING_PAGE_PATHS.createLandingPage
>["_types"]["response"];

export type TGetLandingBackendResponse = ReturnType<
	typeof TOUR_LANDING_PAGE_PATHS.getLandingPage
>["_types"]["response"];

export type TUpdateLandingBackendResponse = ReturnType<
	typeof TOUR_LANDING_PAGE_PATHS.updateLandingPage
>["_types"]["response"];

export type TUploadLandingImagesBackendResponse = ReturnType<
	typeof TOUR_LANDING_PAGE_PATHS.uploadLandingImages
>["_types"]["response"];

export type TListLandingImagesBackendResponse = ReturnType<
	typeof TOUR_LANDING_PAGE_PATHS.listLandingImages
>["_types"]["response"];

export type TCreateLandingImageBackendBody = ReturnType<
	typeof TOUR_LANDING_PAGE_PATHS.createLandingPage
>["_types"]["body"];

export type TUpdateLandingImageBackendBody = ReturnType<
	typeof TOUR_LANDING_PAGE_PATHS.updateLandingPage
>["_types"]["body"];

import type { LandingPageImageModel } from "@/shared/api/generated/Api";
import type { IPaginationRequest } from "@/shared/types";

export type TLandingImageBackend = LandingPageImageModel;

export interface IListLandingImagesArgs extends IPaginationRequest {
	tourId: string;
}

export interface ILandingImageSchema {
	id: string;
	landingPageId: string;
	imagePath: string;
	isPrimary: boolean;
}

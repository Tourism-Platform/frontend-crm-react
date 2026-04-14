import type { LandingPageImageModel } from "@/shared/api/generated/Api";

export type TLandingImageBackend = LandingPageImageModel;

export interface ILandingImageSchema {
	id: string;
	landingPageId: string;
	imagePath: string;
	isPrimary: boolean;
}

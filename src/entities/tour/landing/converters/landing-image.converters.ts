import type { ILandingImageSchema, TLandingImageBackend } from "../types";

export const mapLandingImageToFrontend = (
	backend: TLandingImageBackend
): ILandingImageSchema => ({
	id: backend.id,
	landingPageId: backend.landing_page_id,
	imagePath: backend.image_path,
	isPrimary: backend.is_primary
});

export const mapLandingImagesToFrontend = (
	backend: TLandingImageBackend[]
): ILandingImageSchema[] => backend.map(mapLandingImageToFrontend);

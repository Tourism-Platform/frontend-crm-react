import { ENV } from "@/shared/config";

import type { ILandingImageSchema, TLandingImageBackend } from "../types";

export const mapLandingImageToFrontend = (
	backend: TLandingImageBackend
): ILandingImageSchema => ({
	id: backend.id,
	landingPageId: backend.landing_page_id,
	imagePath: `${ENV.VITE_API_URL}/${backend.image_path}`,
	isPrimary: backend.is_primary
});

export const mapLandingImagesToFrontend = (
	backend: TLandingImageBackend[]
): ILandingImageSchema[] => backend.map(mapLandingImageToFrontend);

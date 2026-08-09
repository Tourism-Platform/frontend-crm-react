import type { LandingPageImageModel, LandingPageResponse } from "@/shared/api";

import { languageMapper } from "@/entities/tour/landing/converters/languages.converters";
import { pickupMapper } from "@/entities/tour/landing/converters/pickup.converters";

import type { IPreviewTourData } from "../types";

import { toPublicImageUrl } from "./preview-option-media.utils";

const mapDraftLandingImagesToUrls = (
	images: LandingPageImageModel[]
): string[] =>
	[...images]
		.sort((a, b) => Number(b.is_primary) - Number(a.is_primary))
		.map((image) => toPublicImageUrl(image.image_path))
		.filter(Boolean);

export const composeDraftLandingToPreview = (
	landing: LandingPageResponse,
	images: LandingPageImageModel[]
): IPreviewTourData => ({
	description: landing.description || "",
	images: mapDraftLandingImagesToUrls(images),
	cities: [],
	languages: languageMapper.fromMany(landing.languages ?? []),
	included: landing.amenities_included ?? [],
	not_included: landing.amenities_not_included ?? [],
	pickup_type: pickupMapper.fromMany(landing.pickup_type ?? []),
	pickup_description: landing.pickup_description || "",
	cancellation_policy: landing.cancellation_policy || "",
	additional_info: landing.additional_information || ""
});

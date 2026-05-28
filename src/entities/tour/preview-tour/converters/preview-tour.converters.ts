import type { AmenitiesTypes } from "@/shared/api";

import { amenitiesMapper } from "@/entities/tour/landing/converters/amenities.converters";
import { languageMapper } from "@/entities/tour/landing/converters/languages.converters";
import { pickupMapper } from "@/entities/tour/landing/converters/pickup.converters";

import type { IPreviewTourData, TPreviewTourBackend } from "../types";

export const mapPreviewTourToFrontend = (
	backend: TPreviewTourBackend
): IPreviewTourData => ({
	overview: backend.overview || "",
	description: backend.description || "",
	// cities: backend.cities || [],
	// !!!
	cities: ["Tashkent", "Samarkand"],
	languages: languageMapper.fromMany(backend.languages),
	included: amenitiesMapper.fromMany(
		backend.amenities_included as AmenitiesTypes[]
	),
	not_included: amenitiesMapper.fromMany(
		backend.amenities_not_included as AmenitiesTypes[]
	),
	pickup_type: pickupMapper.fromMany(backend.pickup_type),
	pickup_description: backend.pickup_description || "",
	cancellation_policy: backend.cancellation_policy || "",
	additional_info: backend.additional_information || ""
});

import type { AmenitiesTypes } from "@/shared/api";

import {
	type TGetLandingBackendResponse,
	type TLandingSchema,
	type TUpdateLandingBackendResponse,
	type TUpdateLandingImageBackendBody
} from "../types";

import { amenitiesMapper } from "./amenities.converters";
import { languageMapper } from "./languages.converters";
import { pickupMapper } from "./pickup.converters";

export const mapUpdateLandingToBackend = (
	frontend: TLandingSchema
): TUpdateLandingImageBackendBody => ({
	title: frontend.description,
	overview: frontend.description,
	languages: languageMapper.toMany(frontend.languages),
	amenities_included: amenitiesMapper.toMany(frontend.included),
	amenities_not_included: amenitiesMapper.toMany(frontend.not_included),
	pickup_type: pickupMapper.toMany(frontend.pickup_type),
	pickup_description: frontend.pickup_description,
	cancellation_policy: frontend.cancellation_policy,
	additional_information: frontend.additional_info
});

export const mapLandingToFrontend = (
	backend: TGetLandingBackendResponse | TUpdateLandingBackendResponse
): TLandingSchema => ({
	description: backend.overview || "",
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

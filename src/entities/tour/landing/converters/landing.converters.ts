import {
	type TGetLandingBackendResponse,
	type TLandingSchema,
	type TUpdateLandingBackendResponse,
	type TUpdateLandingImageBackendBody
} from "../types";

import { pickupMapper } from "./pickup.converters";

export const mapUpdateLandingToBackend = (
	frontend: TLandingSchema
): TUpdateLandingImageBackendBody => ({
	description: frontend.description,
	amenities_included: frontend.included ?? [],
	amenities_not_included: frontend.not_included ?? [],
	pickup_type: pickupMapper.toMany(frontend.pickup_type ?? []),
	pickup_description: frontend.pickup_description,
	cancellation_policy: frontend.cancellation_policy,
	additional_information: frontend.additional_info
});

export const mapLandingToFrontend = (
	backend: TGetLandingBackendResponse | TUpdateLandingBackendResponse
): TLandingSchema => ({
	description: backend.description || "",
	included: backend.amenities_included ?? [],
	not_included: backend.amenities_not_included ?? [],
	pickup_type: pickupMapper.fromMany(backend.pickup_type ?? []),
	pickup_description: backend.pickup_description || "",
	cancellation_policy: backend.cancellation_policy || "",
	additional_info: backend.additional_information || ""
});

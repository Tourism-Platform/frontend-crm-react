import { PickupType } from "@/shared/api";

import {
	type TCreateLandingBackendResponse,
	type TCreateLandingImageBackendBody,
	type TGetLandingBackendResponse,
	type TLandingSchema,
	type TUpdateLandingBackendResponse
} from "../types";

import { amenitiesMapper } from "./amenities.converters";
import { languageMapper } from "./languages.converters";
import { pickupMapper } from "./pickup.converters";

export const mapCreateLandingToBackend = (
	frontend: TLandingSchema
): TCreateLandingImageBackendBody => ({
	title: frontend.description,
	overview: frontend.description,
	languages: languageMapper.toMany(frontend.languages),
	amenities_included: amenitiesMapper.toMany(frontend.included),
	amenities_not_included: amenitiesMapper.toMany(frontend.not_included),
	pickup_details: pickupMapper.to(frontend.pickup_type[0]!) ?? null, // !!! Костыль потом убрать
	cancellation_policy: frontend.cancellation_policy,
	additional_info: frontend.additional_info
});

export const mapUpdateLandingToBackend = mapCreateLandingToBackend;

export const mapLandingToFrontend = (
	backend:
		| TCreateLandingBackendResponse
		| TGetLandingBackendResponse
		| TUpdateLandingBackendResponse
): TLandingSchema => ({
	description: backend.overview,
	languages: languageMapper.fromMany(backend.languages),
	included: amenitiesMapper.fromMany(backend.amenities_included),
	not_included: amenitiesMapper.fromMany(backend.amenities_not_included),
	pickup_type: pickupMapper.fromMany([
		backend.pickup_details || PickupType.Airport
	]), // !!! Костыль потом убрать
	pickup_description: "",
	cancellation_policy: backend.cancellation_policy,
	additional_info: backend.additional_info
});

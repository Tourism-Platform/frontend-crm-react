import type { ILandingBackend, TLandingSchema } from "../types";

export const mapLandingToBackend = (
	frontend: TLandingSchema
): ILandingBackend => ({
	photos: frontend.photos,
	description: frontend.description,
	languages: frontend.languages,
	includedAmenities: frontend.included,
	notIncludedAmenities: frontend.not_included,
	pickupType: frontend.pickup_type,
	pickupDescription: frontend.pickup_description,
	cancellationPolicy: frontend.cancellation_policy,
	additionalInfo: frontend.additional_info
});

export const mapLandingToFrontend = (
	backend: ILandingBackend
): TLandingSchema => ({
	photos: backend.photos,
	description: backend.description,
	languages: backend.languages,
	included: backend.includedAmenities,
	not_included: backend.notIncludedAmenities,
	pickup_type: backend.pickupType,
	pickup_description: backend.pickupDescription,
	cancellation_policy: backend.cancellationPolicy,
	additional_info: backend.additionalInfo
});

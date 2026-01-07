import type {
	ENUM_AMENITIES_TYPE,
	ENUM_LANGUAGES_TYPE,
	ENUM_PICKUP_TYPE_TYPE
} from "./index";

export interface ILandingBackend {
	photos: string;
	description: string;
	languages: ENUM_LANGUAGES_TYPE[];
	includedAmenities: ENUM_AMENITIES_TYPE[];
	notIncludedAmenities: ENUM_AMENITIES_TYPE[];
	pickupType: ENUM_PICKUP_TYPE_TYPE[];
	pickupDescription: string;
	cancellationPolicy: string;
	additionalInfo: string;
}

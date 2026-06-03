import type {
	ENUM_AMENITIES_TYPE,
	ENUM_LANGUAGES_TYPE,
	ENUM_PICKUP_TYPE_TYPE
} from "@/entities/tour";

export interface IPreviewTourData {
	// overview: string;
	description: string;
	images: string[];
	cities: string[];
	languages: ENUM_LANGUAGES_TYPE[];
	included: ENUM_AMENITIES_TYPE[];
	not_included: ENUM_AMENITIES_TYPE[];
	pickup_type: ENUM_PICKUP_TYPE_TYPE[];
	pickup_description: string;
	cancellation_policy: string;
	additional_info: string;
}

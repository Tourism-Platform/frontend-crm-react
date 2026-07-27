import type {
	ENUM_LANGUAGES_TYPE,
	ENUM_PICKUP_TYPE_TYPE
} from "@/entities/tour";

export interface IPreviewTourData {
	// overview: string;
	description: string;
	images: string[];
	cities: string[];
	languages: ENUM_LANGUAGES_TYPE[];
	included: string[];
	not_included: string[];
	pickup_type: ENUM_PICKUP_TYPE_TYPE[];
	pickup_description: string;
	cancellation_policy: string;
	additional_info: string;
}

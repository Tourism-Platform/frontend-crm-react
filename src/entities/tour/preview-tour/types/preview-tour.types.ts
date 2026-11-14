import type {
	ENUM_LANGUAGES_TYPE,
	ENUM_PICKUP_TYPE_TYPE
} from "@/entities/tour";

export interface IPreviewTourData {
	/** «Краткий обзор» лендинга — подзаголовок в шапке превью */
	overview: string;
	description: string;
	/** «Подробный обзор» лендинга — в карточке «Обзор» под описанием */
	overview_description: string;
	images: string[];
	languages: ENUM_LANGUAGES_TYPE[];
	included: string[];
	not_included: string[];
	pickup_type: ENUM_PICKUP_TYPE_TYPE[];
	pickup_description: string;
	cancellation_policy: string;
	additional_info: string;
}

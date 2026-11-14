import { ENUM_LANGUAGES_BACKEND } from "@/entities/tour/landing/types/languages.types";
import {
	ENUM_TOUR_CATEGORY_BACKEND,
	ENUM_TOUR_STATUS_BACKEND,
	ENUM_TOUR_TYPE_BACKEND
} from "@/entities/tour/tour/types/tour-backend-enum.types";

export const PREVIEW_TOUR_GENERAL_MOCK = {
	id: "9f2b3d82-5c4d-4b9f-9f7a-1a42e71d1b11",
	status: ENUM_TOUR_STATUS_BACKEND.ARCHIVED,
	operator_id: "123",
	schedule_id: "123",
	agency_id: "123",
	landing_id: "123",
	cover_image_path: "123",
	duration_hours: 10,
	typ: ENUM_TOUR_TYPE_BACKEND.REGULAR,
	// Поле — `title` (`TourMetaResponse`), не `name`: иначе в публичном превью пустое название
	title: "Embark on an Unforgettable Archaeological Journey",
	group_size: 15,
	group_size_min: 2,
	days: 10,
	nights: 10,
	age_from: 18,
	age_to: 65,
	categories: [ENUM_TOUR_CATEGORY_BACKEND.ADVENTURE_OUTDOOR],
	languages: [ENUM_LANGUAGES_BACKEND.ENGLISH, ENUM_LANGUAGES_BACKEND.RUSSIAN]
};

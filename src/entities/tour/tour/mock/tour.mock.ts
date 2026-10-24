import { createMockId, mockImageUrl } from "@/shared/api";

import { MOCK_TOUR_ID } from "@/entities/booking/order/mock/booking-order.mock.constants";
import { ENUM_CURRENCY_BACKEND } from "@/entities/commission/types/currency.types";
import { ENUM_LANGUAGES_BACKEND } from "@/entities/tour/landing/types/languages.types";

import {
	ENUM_TOUR_CATEGORY_BACKEND,
	ENUM_TOUR_STATUS_BACKEND,
	ENUM_TOUR_TYPE_BACKEND,
	type TTourBackend,
	type TTourFinanceBackend
} from "../types";

export const MOCK_TOUR_OPERATOR_ID = "00000000-0000-4000-8000-000000000003";

export const buildTourId = (index: number) =>
	index === 0 ? MOCK_TOUR_ID : createMockId("b100", index);

const TOUR_TITLES = [
	"Uzbekistan Cultural Tour",
	"Silk Road Highlights Expedition",
	"Desert Adventure: Khiva to Nukus",
	"Cultural Treasures of Samarkand",
	"Fergana Valley Crafts",
	"Chimgan Mountains Trek",
	"Bukhara Gastronomy Weekend",
	"Aral Sea Expedition",
	"Tashkent City Tour",
	"Great Silk Road Grand Tour",
	"Nuratau Eco Village Stay",
	"Termez Buddhist Heritage"
];

const STATUSES = [
	ENUM_TOUR_STATUS_BACKEND.PUBLISHED,
	ENUM_TOUR_STATUS_BACKEND.DRAFT,
	ENUM_TOUR_STATUS_BACKEND.ARCHIVED
];
const CATEGORY_SETS = [
	[
		ENUM_TOUR_CATEGORY_BACKEND.CULTURAL_HISTORICAL,
		ENUM_TOUR_CATEGORY_BACKEND.CITY_TOUR
	],
	[
		ENUM_TOUR_CATEGORY_BACKEND.ADVENTURE_OUTDOOR,
		ENUM_TOUR_CATEGORY_BACKEND.HIKING_TREKKING
	],
	[ENUM_TOUR_CATEGORY_BACKEND.GASTRONOMY_CULINARY],
	[
		ENUM_TOUR_CATEGORY_BACKEND.ECO_NATURE,
		ENUM_TOUR_CATEGORY_BACKEND.FAMILY_KIDS
	],
	[
		ENUM_TOUR_CATEGORY_BACKEND.ARCHAEOLOGICAL,
		ENUM_TOUR_CATEGORY_BACKEND.RELIGIOUS_SPIRITUAL
	]
];
const LANGUAGE_SETS = [
	[ENUM_LANGUAGES_BACKEND.ENGLISH, ENUM_LANGUAGES_BACKEND.RUSSIAN],
	[ENUM_LANGUAGES_BACKEND.ENGLISH],
	[ENUM_LANGUAGES_BACKEND.RUSSIAN, ENUM_LANGUAGES_BACKEND.UZBEK],
	[
		ENUM_LANGUAGES_BACKEND.ENGLISH,
		ENUM_LANGUAGES_BACKEND.GERMAN,
		ENUM_LANGUAGES_BACKEND.FRENCH
	]
];

/** 24 тура: все статусы и типы, первый — тур из моков бронирований */
export const TOURS_MOCK: TTourBackend[] = Array.from(
	{ length: 24 },
	(_, index) => {
		const days = 1 + (index % 9);
		const created = new Date(Date.UTC(2026, 0, 1 + index * 7));
		const id = buildTourId(index);

		return {
			id,
			created_at: created.toISOString(),
			updated_at: new Date(created.getTime() + 86_400_000).toISOString(),
			operator_id: MOCK_TOUR_OPERATOR_ID,
			schedule_id: createMockId("b110", index),
			agency_id: null,
			landing_id: createMockId("b120", index),
			title:
				index < TOUR_TITLES.length
					? TOUR_TITLES[index]
					: `${TOUR_TITLES[index % TOUR_TITLES.length]} ${Math.floor(index / TOUR_TITLES.length) + 1}`,
			slug: `tour-${index + 1}`,
			cover_image_path: mockImageUrl(`tour-${index}`),
			group_size: 8 + (index % 4) * 4,
			group_size_min: 2,
			days,
			nights: Math.max(days - 1, 0),
			duration_hours: days === 1 ? 8 : null,
			age_from: index % 3 === 0 ? 12 : null,
			age_to: null,
			typ:
				index % 4 === 3
					? ENUM_TOUR_TYPE_BACKEND.CUSTOM
					: ENUM_TOUR_TYPE_BACKEND.REGULAR,
			status:
				index === 0
					? ENUM_TOUR_STATUS_BACKEND.PUBLISHED
					: STATUSES[index % 3],
			categories: CATEGORY_SETS[index % CATEGORY_SETS.length],
			languages: LANGUAGE_SETS[index % LANGUAGE_SETS.length]
		};
	}
);

export const createTourFinancialsMock = (
	tourId: string,
	index: number
): TTourFinanceBackend => ({
	id: createMockId("b130", index),
	tour_meta_id: tourId,
	currency_type: ENUM_CURRENCY_BACKEND.USD,
	markup: { typ: "percentage", percentage: 15 },
	foc: { tiers: [{ min_pax: 10, free: 1 }] }
});

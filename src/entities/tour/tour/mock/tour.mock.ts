import {
	Currency,
	LanguageCode,
	TourCategory,
	type TourFinSettingsModel,
	type TourMetaResponse,
	TourStatus,
	TourType,
	createMockId,
	mockImageUrl
} from "@/shared/api";

import { MOCK_TOUR_ID } from "@/entities/booking/order/mock/booking-order.mock.constants";

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

const STATUSES = [TourStatus.Published, TourStatus.Draft, TourStatus.Archived];
const CATEGORY_SETS = [
	[TourCategory.CulturalHistorical, TourCategory.CityTour],
	[TourCategory.AdventureOutdoor, TourCategory.HikingTrekking],
	[TourCategory.GastronomyCulinary],
	[TourCategory.EcoNature, TourCategory.FamilyKids],
	[TourCategory.Archaeological, TourCategory.ReligiousSpiritual]
];
const LANGUAGE_SETS = [
	[LanguageCode.En, LanguageCode.Ru],
	[LanguageCode.En],
	[LanguageCode.Ru, LanguageCode.Uz],
	[LanguageCode.En, LanguageCode.De, LanguageCode.Fr]
];

/** 24 тура: все статусы и типы, первый — тур из моков бронирований */
export const TOURS_MOCK: TourMetaResponse[] = Array.from(
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
			typ: index % 4 === 3 ? TourType.Custom : TourType.Regular,
			status: index === 0 ? TourStatus.Published : STATUSES[index % 3],
			categories: CATEGORY_SETS[index % CATEGORY_SETS.length],
			languages: LANGUAGE_SETS[index % LANGUAGE_SETS.length]
		};
	}
);

export const createTourFinancialsMock = (
	tourId: string,
	index: number
): TourFinSettingsModel => ({
	id: createMockId("b130", index),
	tour_meta_id: tourId,
	currency_type: Currency.USD,
	markup: { typ: "percentage", percentage: 15 },
	foc: { tiers: [{ min_pax: 10, free: 1 }] }
});

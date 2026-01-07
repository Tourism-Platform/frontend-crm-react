import type { TOptionsKeys } from "@/shared/config";

import { ENUM_AMENITIES, type ENUM_AMENITIES_TYPE } from "../types";

export const AMENITIES_INCLUDED_LABELS: Partial<
	Record<ENUM_AMENITIES_TYPE, TOptionsKeys>
> = {
	[ENUM_AMENITIES.PROFESSIONAL_GUIDE]: "tour.amenities.professional_guide",
	[ENUM_AMENITIES.HOTEL_ACCOMMODATION]: "tour.amenities.hotel_accommodation",
	[ENUM_AMENITIES.BREAKFAST]: "tour.amenities.breakfast",
	[ENUM_AMENITIES.LUNCH]: "tour.amenities.lunch",
	[ENUM_AMENITIES.DINNER]: "tour.amenities.dinner",
	[ENUM_AMENITIES.AIRPORT_TRANSFER]: "tour.amenities.airport_transfer",
	[ENUM_AMENITIES.ENTRANCE_FEES]: "tour.amenities.entrance_fees",
	[ENUM_AMENITIES.TRAVEL_INSURANCE]: "tour.amenities.travel_insurance",
	[ENUM_AMENITIES.TRANSPORTATION]: "tour.amenities.transportation",
	[ENUM_AMENITIES.BOTTLED_WATER]: "tour.amenities.bottled_water",
	[ENUM_AMENITIES.WIFI_ON_BOARD]: "tour.amenities.wifi_on_board",
	[ENUM_AMENITIES.AIR_CONDITIONING]: "tour.amenities.air_conditioning",
	[ENUM_AMENITIES.LUGGAGE_HANDLING]: "tour.amenities.luggage_handling",
	[ENUM_AMENITIES.SUPPORT_24_7]: "tour.amenities.support_24_7"
};

export const AMENITIES_NOT_INCLUDED_LABELS: Partial<
	Record<ENUM_AMENITIES_TYPE, TOptionsKeys>
> = {
	[ENUM_AMENITIES.INTERNATIONAL_FLIGHTS]:
		"tour.amenities.international_flights",
	[ENUM_AMENITIES.VISA_FEES]: "tour.amenities.visa_fees",
	[ENUM_AMENITIES.PERSONAL_EXPENSES]: "tour.amenities.personal_expenses",
	[ENUM_AMENITIES.TIPS_GRATUITIES]: "tour.amenities.tips_gratuities",
	[ENUM_AMENITIES.CAMERA_VIDEO_FEES]: "tour.amenities.camera_video_fees",
	[ENUM_AMENITIES.OPTIONAL_ACTIVITIES]: "tour.amenities.optional_activities",
	[ENUM_AMENITIES.TRAVEL_INSURANCE]: "tour.amenities.travel_insurance",
	[ENUM_AMENITIES.ALCOHOLIC_BEVERAGES]: "tour.amenities.alcoholic_beverages",
	[ENUM_AMENITIES.SOUVENIRS]: "tour.amenities.souvenirs",
	[ENUM_AMENITIES.EXTRA_MEALS]: "tour.amenities.extra_meals",
	[ENUM_AMENITIES.ROOM_SERVICE]: "tour.amenities.room_service",
	[ENUM_AMENITIES.LAUNDRY_SERVICE]: "tour.amenities.laundry_service",
	[ENUM_AMENITIES.PHONE_CALLS]: "tour.amenities.phone_calls",
	[ENUM_AMENITIES.MEDICAL_EXPENSES]: "tour.amenities.medical_expenses"
};

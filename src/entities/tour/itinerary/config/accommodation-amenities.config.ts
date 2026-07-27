import type { TOptionsKeys } from "@/shared/config";

import {
	ENUM_ACCOMMODATION_AMENITY,
	type ENUM_ACCOMMODATION_AMENITY_TYPE
} from "../types";

export const ACCOMMODATION_AMENITIES_LABELS: Record<
	ENUM_ACCOMMODATION_AMENITY_TYPE,
	TOptionsKeys
> = {
	[ENUM_ACCOMMODATION_AMENITY.WIFI]: "tour.accommodationAmenities.wifi",
	[ENUM_ACCOMMODATION_AMENITY.POOL]: "tour.accommodationAmenities.pool",
	[ENUM_ACCOMMODATION_AMENITY.BREAKFAST]:
		"tour.accommodationAmenities.breakfast",
	[ENUM_ACCOMMODATION_AMENITY.PARKING]: "tour.accommodationAmenities.parking",
	[ENUM_ACCOMMODATION_AMENITY.GYM]: "tour.accommodationAmenities.gym",
	[ENUM_ACCOMMODATION_AMENITY.SPA]: "tour.accommodationAmenities.spa",
	[ENUM_ACCOMMODATION_AMENITY.RESTAURANT]:
		"tour.accommodationAmenities.restaurant",
	[ENUM_ACCOMMODATION_AMENITY.BAR]: "tour.accommodationAmenities.bar",
	[ENUM_ACCOMMODATION_AMENITY.AIRPORT_SHUTTLE]:
		"tour.accommodationAmenities.airport_shuttle",
	[ENUM_ACCOMMODATION_AMENITY.AIR_CONDITIONING]:
		"tour.accommodationAmenities.air_conditioning",
	[ENUM_ACCOMMODATION_AMENITY.ROOM_SERVICE]:
		"tour.accommodationAmenities.room_service",
	[ENUM_ACCOMMODATION_AMENITY.LAUNDRY]: "tour.accommodationAmenities.laundry",
	[ENUM_ACCOMMODATION_AMENITY.CONCIERGE]:
		"tour.accommodationAmenities.concierge",
	[ENUM_ACCOMMODATION_AMENITY.BUSINESS_CENTER]:
		"tour.accommodationAmenities.business_center",
	[ENUM_ACCOMMODATION_AMENITY.KIDS_CLUB]:
		"tour.accommodationAmenities.kids_club",
	[ENUM_ACCOMMODATION_AMENITY.BEACH_ACCESS]:
		"tour.accommodationAmenities.beach_access",
	[ENUM_ACCOMMODATION_AMENITY.SAUNA]: "tour.accommodationAmenities.sauna",
	[ENUM_ACCOMMODATION_AMENITY.JACUZZI]: "tour.accommodationAmenities.jacuzzi",
	[ENUM_ACCOMMODATION_AMENITY.PET_FRIENDLY]:
		"tour.accommodationAmenities.pet_friendly",
	[ENUM_ACCOMMODATION_AMENITY.WHEELCHAIR_ACCESSIBLE]:
		"tour.accommodationAmenities.wheelchair_accessible"
};

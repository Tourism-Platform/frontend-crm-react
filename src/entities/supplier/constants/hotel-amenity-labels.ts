import {
	ENUM_HOTEL_AMENITY,
	type ENUM_HOTEL_AMENITY_TYPE
} from "../types/hotel/amenity.types";

export const HOTEL_AMENITY_LABELS: Record<
	ENUM_HOTEL_AMENITY_TYPE,
	`hotel_amenity.${ENUM_HOTEL_AMENITY_TYPE}`
> = {
	[ENUM_HOTEL_AMENITY.WIFI]: "hotel_amenity.wifi",
	[ENUM_HOTEL_AMENITY.POOL]: "hotel_amenity.pool",
	[ENUM_HOTEL_AMENITY.BREAKFAST]: "hotel_amenity.breakfast",
	[ENUM_HOTEL_AMENITY.PARKING]: "hotel_amenity.parking",
	[ENUM_HOTEL_AMENITY.GYM]: "hotel_amenity.gym",
	[ENUM_HOTEL_AMENITY.SPA]: "hotel_amenity.spa",
	[ENUM_HOTEL_AMENITY.RESTAURANT]: "hotel_amenity.restaurant",
	[ENUM_HOTEL_AMENITY.BAR]: "hotel_amenity.bar",
	[ENUM_HOTEL_AMENITY.AIRPORT_SHUTTLE]: "hotel_amenity.airport_shuttle",
	[ENUM_HOTEL_AMENITY.AIR_CONDITIONING]: "hotel_amenity.air_conditioning",
	[ENUM_HOTEL_AMENITY.ROOM_SERVICE]: "hotel_amenity.room_service",
	[ENUM_HOTEL_AMENITY.LAUNDRY]: "hotel_amenity.laundry",
	[ENUM_HOTEL_AMENITY.CONCIERGE]: "hotel_amenity.concierge",
	[ENUM_HOTEL_AMENITY.BUSINESS_CENTER]: "hotel_amenity.business_center",
	[ENUM_HOTEL_AMENITY.KIDS_CLUB]: "hotel_amenity.kids_club",
	[ENUM_HOTEL_AMENITY.BEACH_ACCESS]: "hotel_amenity.beach_access",
	[ENUM_HOTEL_AMENITY.SAUNA]: "hotel_amenity.sauna",
	[ENUM_HOTEL_AMENITY.JACUZZI]: "hotel_amenity.jacuzzi",
	[ENUM_HOTEL_AMENITY.PET_FRIENDLY]: "hotel_amenity.pet_friendly",
	[ENUM_HOTEL_AMENITY.WHEELCHAIR_ACCESSIBLE]:
		"hotel_amenity.wheelchair_accessible"
};

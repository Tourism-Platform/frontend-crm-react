export const ENUM_HOTEL_AMENITY = {
	WIFI: "wifi",
	POOL: "pool",
	BREAKFAST: "breakfast",
	PARKING: "parking",
	GYM: "gym",
	SPA: "spa",
	RESTAURANT: "restaurant",
	BAR: "bar",
	AIRPORT_SHUTTLE: "airport_shuttle",
	AIR_CONDITIONING: "air_conditioning",
	ROOM_SERVICE: "room_service",
	LAUNDRY: "laundry",
	CONCIERGE: "concierge",
	BUSINESS_CENTER: "business_center",
	KIDS_CLUB: "kids_club",
	BEACH_ACCESS: "beach_access",
	SAUNA: "sauna",
	JACUZZI: "jacuzzi",
	PET_FRIENDLY: "pet_friendly",
	WHEELCHAIR_ACCESSIBLE: "wheelchair_accessible"
} as const;

export type ENUM_HOTEL_AMENITY_TYPE =
	(typeof ENUM_HOTEL_AMENITY)[keyof typeof ENUM_HOTEL_AMENITY];

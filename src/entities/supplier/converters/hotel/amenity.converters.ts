import { AmenitiesTypes } from "@/shared/api/generated/Api";
import { createEnumMapper } from "@/shared/utils";

import { ENUM_HOTEL_AMENITY, type ENUM_HOTEL_AMENITY_TYPE } from "../../types";

const MAP_HOTEL_AMENITY: Record<ENUM_HOTEL_AMENITY_TYPE, AmenitiesTypes> = {
	[ENUM_HOTEL_AMENITY.WIFI]: AmenitiesTypes.Wifi,
	[ENUM_HOTEL_AMENITY.POOL]: AmenitiesTypes.Pool,
	[ENUM_HOTEL_AMENITY.BREAKFAST]: AmenitiesTypes.Breakfast,
	[ENUM_HOTEL_AMENITY.PARKING]: AmenitiesTypes.Parking,
	[ENUM_HOTEL_AMENITY.GYM]: AmenitiesTypes.Gym,
	[ENUM_HOTEL_AMENITY.SPA]: AmenitiesTypes.Spa,
	[ENUM_HOTEL_AMENITY.RESTAURANT]: AmenitiesTypes.Restaurant,
	[ENUM_HOTEL_AMENITY.BAR]: AmenitiesTypes.Bar,
	[ENUM_HOTEL_AMENITY.AIRPORT_SHUTTLE]: AmenitiesTypes.AirportShuttle,
	[ENUM_HOTEL_AMENITY.AIR_CONDITIONING]: AmenitiesTypes.AirConditioning,
	[ENUM_HOTEL_AMENITY.ROOM_SERVICE]: AmenitiesTypes.RoomService,
	[ENUM_HOTEL_AMENITY.LAUNDRY]: AmenitiesTypes.Laundry,
	[ENUM_HOTEL_AMENITY.CONCIERGE]: AmenitiesTypes.Concierge,
	[ENUM_HOTEL_AMENITY.BUSINESS_CENTER]: AmenitiesTypes.BusinessCenter,
	[ENUM_HOTEL_AMENITY.KIDS_CLUB]: AmenitiesTypes.KidsClub,
	[ENUM_HOTEL_AMENITY.BEACH_ACCESS]: AmenitiesTypes.BeachAccess,
	[ENUM_HOTEL_AMENITY.SAUNA]: AmenitiesTypes.Sauna,
	[ENUM_HOTEL_AMENITY.JACUZZI]: AmenitiesTypes.Jacuzzi,
	[ENUM_HOTEL_AMENITY.PET_FRIENDLY]: AmenitiesTypes.PetFriendly,
	[ENUM_HOTEL_AMENITY.WHEELCHAIR_ACCESSIBLE]:
		AmenitiesTypes.WheelchairAccessible
};

export const hotelAmenityConverter = createEnumMapper<
	ENUM_HOTEL_AMENITY_TYPE,
	AmenitiesTypes
>(MAP_HOTEL_AMENITY);

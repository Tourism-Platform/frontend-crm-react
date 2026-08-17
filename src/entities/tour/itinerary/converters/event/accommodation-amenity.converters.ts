import { AmenitiesTypes } from "@/shared/api";
import { createEnumMapper } from "@/shared/utils";

import {
	ENUM_ACCOMMODATION_AMENITY,
	type ENUM_ACCOMMODATION_AMENITY_TYPE
} from "../../types";

const MAP_ACCOMMODATION_AMENITY: Record<
	ENUM_ACCOMMODATION_AMENITY_TYPE,
	AmenitiesTypes
> = {
	[ENUM_ACCOMMODATION_AMENITY.WIFI]: AmenitiesTypes.Wifi,
	[ENUM_ACCOMMODATION_AMENITY.POOL]: AmenitiesTypes.Pool,
	[ENUM_ACCOMMODATION_AMENITY.BREAKFAST]: AmenitiesTypes.Breakfast,
	[ENUM_ACCOMMODATION_AMENITY.PARKING]: AmenitiesTypes.Parking,
	[ENUM_ACCOMMODATION_AMENITY.GYM]: AmenitiesTypes.Gym,
	[ENUM_ACCOMMODATION_AMENITY.SPA]: AmenitiesTypes.Spa,
	[ENUM_ACCOMMODATION_AMENITY.RESTAURANT]: AmenitiesTypes.Restaurant,
	[ENUM_ACCOMMODATION_AMENITY.BAR]: AmenitiesTypes.Bar,
	[ENUM_ACCOMMODATION_AMENITY.AIRPORT_SHUTTLE]: AmenitiesTypes.AirportShuttle,
	[ENUM_ACCOMMODATION_AMENITY.AIR_CONDITIONING]:
		AmenitiesTypes.AirConditioning,
	[ENUM_ACCOMMODATION_AMENITY.ROOM_SERVICE]: AmenitiesTypes.RoomService,
	[ENUM_ACCOMMODATION_AMENITY.LAUNDRY]: AmenitiesTypes.Laundry,
	[ENUM_ACCOMMODATION_AMENITY.CONCIERGE]: AmenitiesTypes.Concierge,
	[ENUM_ACCOMMODATION_AMENITY.BUSINESS_CENTER]: AmenitiesTypes.BusinessCenter,
	[ENUM_ACCOMMODATION_AMENITY.KIDS_CLUB]: AmenitiesTypes.KidsClub,
	[ENUM_ACCOMMODATION_AMENITY.BEACH_ACCESS]: AmenitiesTypes.BeachAccess,
	[ENUM_ACCOMMODATION_AMENITY.SAUNA]: AmenitiesTypes.Sauna,
	[ENUM_ACCOMMODATION_AMENITY.JACUZZI]: AmenitiesTypes.Jacuzzi,
	[ENUM_ACCOMMODATION_AMENITY.PET_FRIENDLY]: AmenitiesTypes.PetFriendly,
	[ENUM_ACCOMMODATION_AMENITY.WHEELCHAIR_ACCESSIBLE]:
		AmenitiesTypes.WheelchairAccessible
};

export const accommodationAmenityConverter = createEnumMapper<
	ENUM_ACCOMMODATION_AMENITY_TYPE,
	AmenitiesTypes
>(MAP_ACCOMMODATION_AMENITY);

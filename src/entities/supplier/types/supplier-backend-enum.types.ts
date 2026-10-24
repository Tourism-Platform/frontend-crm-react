import {
	ActivityType,
	AmenitiesTypes,
	GeneralVenueOutputSubTypEnum,
	HousingRoomTypes,
	ToPerFareTypEnum,
	ToWholeRouteTypEnum,
	VehicleBodyType
} from "@/shared/api";

export const ENUM_ACTIVITY_TYPE_BACKEND = {
	FOOD: ActivityType.Food,
	MASTER_CLASS: ActivityType.MasterClass,
	SIGHTSEEING: ActivityType.Sightseeing,
	OUTDOOR: ActivityType.Outdoor,
	RIDING: ActivityType.Riding,
	EXTREME: ActivityType.Extreme,
	WELLNESS: ActivityType.Wellness,
	ENTERTAINMENT: ActivityType.Entertainment,
	WATER_ACTIVITIES: ActivityType.WaterActivities,
	PHOTOGRAPHY: ActivityType.Photography,
	SPIRITUAL: ActivityType.Spiritual,
	OTHER: ActivityType.Other
} as const;

export type ENUM_ACTIVITY_TYPE_BACKEND_TYPE = ActivityType;

export const ENUM_TO_PER_FARE_TYP_BACKEND = {
	TRAIN: ToPerFareTypEnum.Train,
	FLIGHT: ToPerFareTypEnum.Flight
} as const;

export type ENUM_TO_PER_FARE_TYP_BACKEND_TYPE = ToPerFareTypEnum;

export const ENUM_TO_WHOLE_ROUTE_TYP_BACKEND = {
	TRAIN: ToWholeRouteTypEnum.Train,
	FLIGHT: ToWholeRouteTypEnum.Flight
} as const;

export type ENUM_TO_WHOLE_ROUTE_TYP_BACKEND_TYPE = ToWholeRouteTypEnum;

export const ENUM_AMENITIES_TYPES_BACKEND = {
	WIFI: AmenitiesTypes.Wifi,
	POOL: AmenitiesTypes.Pool,
	BREAKFAST: AmenitiesTypes.Breakfast,
	PARKING: AmenitiesTypes.Parking,
	GYM: AmenitiesTypes.Gym,
	SPA: AmenitiesTypes.Spa,
	RESTAURANT: AmenitiesTypes.Restaurant,
	BAR: AmenitiesTypes.Bar,
	AIRPORT_SHUTTLE: AmenitiesTypes.AirportShuttle,
	AIR_CONDITIONING: AmenitiesTypes.AirConditioning,
	ROOM_SERVICE: AmenitiesTypes.RoomService,
	LAUNDRY: AmenitiesTypes.Laundry,
	CONCIERGE: AmenitiesTypes.Concierge,
	BUSINESS_CENTER: AmenitiesTypes.BusinessCenter,
	KIDS_CLUB: AmenitiesTypes.KidsClub,
	BEACH_ACCESS: AmenitiesTypes.BeachAccess,
	SAUNA: AmenitiesTypes.Sauna,
	JACUZZI: AmenitiesTypes.Jacuzzi,
	PET_FRIENDLY: AmenitiesTypes.PetFriendly,
	WHEELCHAIR_ACCESSIBLE: AmenitiesTypes.WheelchairAccessible
} as const;

export type ENUM_AMENITIES_TYPES_BACKEND_TYPE = AmenitiesTypes;

export const ENUM_HOUSING_ROOM_TYPES_BACKEND = {
	SINGLE: HousingRoomTypes.Single,
	DOUBLE: HousingRoomTypes.Double,
	TWIN: HousingRoomTypes.Twin,
	TRIPLE: HousingRoomTypes.Triple,
	QUADRUPLE: HousingRoomTypes.Quadruple,
	SUITE: HousingRoomTypes.Suite,
	FAMILY: HousingRoomTypes.Family
} as const;

export type ENUM_HOUSING_ROOM_TYPES_BACKEND_TYPE = HousingRoomTypes;

export const ENUM_VEHICLE_BODY_TYPE_BACKEND = {
	SEDAN: VehicleBodyType.Sedan,
	MINIVAN: VehicleBodyType.Minivan,
	MINIBUS: VehicleBodyType.Minibus,
	MINIBUS_PLUS: VehicleBodyType.MinibusPlus,
	BUS: VehicleBodyType.Bus,
	SUV: VehicleBodyType.Suv,
	COACH: VehicleBodyType.Coach
} as const;

export type ENUM_VEHICLE_BODY_TYPE_BACKEND_TYPE = VehicleBodyType;

export const ENUM_GENERAL_VENUE_OUTPUT_SUB_TYP_BACKEND = {
	MASTER_CLASS: GeneralVenueOutputSubTypEnum.MasterClass,
	SIGHTSEEING: GeneralVenueOutputSubTypEnum.Sightseeing,
	OUTDOOR: GeneralVenueOutputSubTypEnum.Outdoor,
	RIDING: GeneralVenueOutputSubTypEnum.Riding,
	EXTREME: GeneralVenueOutputSubTypEnum.Extreme,
	WELLNESS: GeneralVenueOutputSubTypEnum.Wellness,
	ENTERTAINMENT: GeneralVenueOutputSubTypEnum.Entertainment,
	WATER_ACTIVITIES: GeneralVenueOutputSubTypEnum.WaterActivities,
	PHOTOGRAPHY: GeneralVenueOutputSubTypEnum.Photography,
	SPIRITUAL: GeneralVenueOutputSubTypEnum.Spiritual,
	OTHER: GeneralVenueOutputSubTypEnum.Other
} as const;

export type ENUM_GENERAL_VENUE_OUTPUT_SUB_TYP_BACKEND_TYPE =
	GeneralVenueOutputSubTypEnum;

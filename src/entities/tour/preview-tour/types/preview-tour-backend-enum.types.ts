import { GeneralActivityPubSchemaOutputTypEnum, HotelKind } from "@/shared/api";

export const ENUM_HOTEL_KIND_BACKEND = {
	HOTEL: HotelKind.Hotel,
	BOUTIQUE: HotelKind.Boutique,
	RESORT: HotelKind.Resort,
	GUESTHOUSE: HotelKind.Guesthouse,
	HOSTEL: HotelKind.Hostel,
	APARTMENT: HotelKind.Apartment,
	VILLA: HotelKind.Villa,
	YURT: HotelKind.Yurt,
	CAMP: HotelKind.Camp
} as const;

export type ENUM_HOTEL_KIND_BACKEND_TYPE = HotelKind;

export const ENUM_GENERAL_ACTIVITY_PUB_SCHEMA_OUTPUT_TYP_BACKEND = {
	MASTER_CLASS: GeneralActivityPubSchemaOutputTypEnum.MasterClass,
	SIGHTSEEING: GeneralActivityPubSchemaOutputTypEnum.Sightseeing,
	OUTDOOR: GeneralActivityPubSchemaOutputTypEnum.Outdoor,
	RIDING: GeneralActivityPubSchemaOutputTypEnum.Riding,
	EXTREME: GeneralActivityPubSchemaOutputTypEnum.Extreme,
	WELLNESS: GeneralActivityPubSchemaOutputTypEnum.Wellness,
	ENTERTAINMENT: GeneralActivityPubSchemaOutputTypEnum.Entertainment,
	WATER_ACTIVITIES: GeneralActivityPubSchemaOutputTypEnum.WaterActivities,
	PHOTOGRAPHY: GeneralActivityPubSchemaOutputTypEnum.Photography,
	SPIRITUAL: GeneralActivityPubSchemaOutputTypEnum.Spiritual,
	OTHER: GeneralActivityPubSchemaOutputTypEnum.Other
} as const;

export type ENUM_GENERAL_ACTIVITY_PUB_SCHEMA_OUTPUT_TYP_BACKEND_TYPE =
	GeneralActivityPubSchemaOutputTypEnum;

import { AmenitiesTypes } from "@/shared/api";
import { createEnumMapper } from "@/shared/utils";

import { ENUM_AMENITIES, type ENUM_AMENITIES_TYPE } from "../types";

const MAP_AMENITIES: Partial<Record<ENUM_AMENITIES_TYPE, AmenitiesTypes>> = {
	[ENUM_AMENITIES.AIR_CONDITIONING]: AmenitiesTypes.Conditioner,
	[ENUM_AMENITIES.WIFI_ON_BOARD]: AmenitiesTypes.Wifi
};

export const amenitiesMapper = createEnumMapper<
	ENUM_AMENITIES_TYPE,
	AmenitiesTypes
>(MAP_AMENITIES);

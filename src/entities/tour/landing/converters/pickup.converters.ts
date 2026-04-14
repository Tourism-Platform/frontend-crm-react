import { PickupType } from "@/shared/api";
import { createEnumMapper } from "@/shared/utils";

import { ENUM_PICKUP_TYPE, type ENUM_PICKUP_TYPE_TYPE } from "../types";

const MAP_PICKUP: Partial<Record<ENUM_PICKUP_TYPE_TYPE, PickupType>> = {
	[ENUM_PICKUP_TYPE.AIRPORT]: PickupType.Airport,
	[ENUM_PICKUP_TYPE.HOTEL]: PickupType.Hotel
};

export const pickupMapper = createEnumMapper<ENUM_PICKUP_TYPE_TYPE, PickupType>(
	MAP_PICKUP
);

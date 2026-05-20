import { PickupType } from "@/shared/api";
import { createEnumMapper } from "@/shared/utils";

import { ENUM_PICKUP_TYPE, type ENUM_PICKUP_TYPE_TYPE } from "../types";

const MAP_PICKUP: Partial<Record<ENUM_PICKUP_TYPE_TYPE, PickupType>> = {
	[ENUM_PICKUP_TYPE.AIRPORT]: PickupType.AirportPickup,
	[ENUM_PICKUP_TYPE.HOTEL]: PickupType.HotelPickup
};

export const pickupMapper = createEnumMapper<ENUM_PICKUP_TYPE_TYPE, PickupType>(
	MAP_PICKUP
);

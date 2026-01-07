import type { TOptionsKeys } from "@/shared/config";

import { ENUM_PICKUP_TYPE, type ENUM_PICKUP_TYPE_TYPE } from "../types";

export const PICKUP_TYPE_LABELS: Record<ENUM_PICKUP_TYPE_TYPE, TOptionsKeys> = {
	[ENUM_PICKUP_TYPE.AIRPORT]: "tour.pickup.airport",
	[ENUM_PICKUP_TYPE.HOTEL]: "tour.pickup.hotel"
};

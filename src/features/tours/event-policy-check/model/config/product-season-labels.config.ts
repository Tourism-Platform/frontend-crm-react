import type { TTourCommonEventsKeys } from "@/shared/config";

import {
	ENUM_HOTEL_ROOM_CHARGE,
	type ENUM_HOTEL_ROOM_CHARGE_TYPE
} from "@/entities/supplier";

export const PRODUCT_SEASON_CHARGE_LABELS: Record<
	ENUM_HOTEL_ROOM_CHARGE_TYPE,
	TTourCommonEventsKeys
> = {
	[ENUM_HOTEL_ROOM_CHARGE.FIXED]: "product_seasons.charge.fixed",
	[ENUM_HOTEL_ROOM_CHARGE.PER_DURATION]: "product_seasons.charge.per_duration"
};

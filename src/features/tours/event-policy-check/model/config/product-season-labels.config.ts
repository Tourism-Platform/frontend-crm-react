import type { TTourCommonEventsKeys } from "@/shared/config";

import {
	ENUM_HOTEL_ROOM_CHARGE,
	type ENUM_HOTEL_ROOM_CHARGE_TYPE
} from "@/entities/supplier";
import {
	ENUM_EXTRA_COST_MODE,
	type ENUM_EXTRA_COST_MODE_TYPE
} from "@/entities/tour";

export const PRODUCT_SEASON_CHARGE_LABELS: Record<
	ENUM_HOTEL_ROOM_CHARGE_TYPE,
	TTourCommonEventsKeys
> = {
	[ENUM_HOTEL_ROOM_CHARGE.FIXED]: "product_seasons.charge.fixed",
	[ENUM_HOTEL_ROOM_CHARGE.PER_DURATION]: "product_seasons.charge.per_duration"
};

/** Для отеля `per_duration` — это ночь, а не день, как у гида */
export const PRODUCT_SEASON_EXTRA_COST_MODE_LABELS: Record<
	ENUM_EXTRA_COST_MODE_TYPE,
	TTourCommonEventsKeys
> = {
	[ENUM_EXTRA_COST_MODE.TRIP]: "product_seasons.extra_cost_modes.trip",
	[ENUM_EXTRA_COST_MODE.PER_DAY]: "product_seasons.extra_cost_modes.per_day",
	[ENUM_EXTRA_COST_MODE.PER_PERSON]:
		"product_seasons.extra_cost_modes.per_person",
	[ENUM_EXTRA_COST_MODE.PER_PERSON_DAY]:
		"product_seasons.extra_cost_modes.per_person_day"
};

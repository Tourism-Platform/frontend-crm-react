import type { TOptionsKeys } from "@/shared/config";

import {
	ENUM_HOTEL_ROOM_CHARGE,
	type ENUM_HOTEL_ROOM_CHARGE_TYPE
} from "../types/hotel/rooms.types";

export const HOTEL_ROOM_CHARGE_LABELS: Record<
	ENUM_HOTEL_ROOM_CHARGE_TYPE,
	TOptionsKeys
> = {
	[ENUM_HOTEL_ROOM_CHARGE.FIXED]: "hotel_room_charge.fixed",
	[ENUM_HOTEL_ROOM_CHARGE.PER_DURATION]: "hotel_room_charge.per_duration"
};

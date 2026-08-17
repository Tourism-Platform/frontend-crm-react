import type { TOptionsKeys } from "@/shared/config";

import {
	ENUM_HOUSING_ROOM_TYPE,
	type ENUM_HOUSING_ROOM_TYPE_TYPE
} from "../types";

export const HOUSING_ROOM_TYPE_LABELS: Record<
	ENUM_HOUSING_ROOM_TYPE_TYPE,
	TOptionsKeys
> = {
	[ENUM_HOUSING_ROOM_TYPE.SINGLE]: "tour.housingRoomTypes.single",
	[ENUM_HOUSING_ROOM_TYPE.DOUBLE]: "tour.housingRoomTypes.double",
	[ENUM_HOUSING_ROOM_TYPE.TWIN]: "tour.housingRoomTypes.twin",
	[ENUM_HOUSING_ROOM_TYPE.TRIPLE]: "tour.housingRoomTypes.triple",
	[ENUM_HOUSING_ROOM_TYPE.QUADRUPLE]: "tour.housingRoomTypes.quadruple",
	[ENUM_HOUSING_ROOM_TYPE.SUITE]: "tour.housingRoomTypes.suite",
	[ENUM_HOUSING_ROOM_TYPE.FAMILY]: "tour.housingRoomTypes.family"
};

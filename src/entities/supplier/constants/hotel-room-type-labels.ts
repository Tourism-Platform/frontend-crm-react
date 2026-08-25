import {
	ENUM_HOTEL_ROOM_TYPE,
	type ENUM_HOTEL_ROOM_TYPE_TYPE
} from "../types/hotel/room-type.types";

export const HOTEL_ROOM_TYPE_LABELS: Record<
	ENUM_HOTEL_ROOM_TYPE_TYPE,
	`hotel_room_type.${ENUM_HOTEL_ROOM_TYPE_TYPE}`
> = {
	[ENUM_HOTEL_ROOM_TYPE.SINGLE]: "hotel_room_type.single",
	[ENUM_HOTEL_ROOM_TYPE.DOUBLE]: "hotel_room_type.double",
	[ENUM_HOTEL_ROOM_TYPE.TWIN]: "hotel_room_type.twin",
	[ENUM_HOTEL_ROOM_TYPE.TRIPLE]: "hotel_room_type.triple",
	[ENUM_HOTEL_ROOM_TYPE.QUADRUPLE]: "hotel_room_type.quadruple",
	[ENUM_HOTEL_ROOM_TYPE.SUITE]: "hotel_room_type.suite",
	[ENUM_HOTEL_ROOM_TYPE.FAMILY]: "hotel_room_type.family"
};

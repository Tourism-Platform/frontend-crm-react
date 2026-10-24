import {
	Bed,
	BedDouble,
	BedSingle,
	Bus,
	Car,
	type LucideIcon
} from "lucide-react";

import {
	ENUM_HOUSING_ROOM_TYPE,
	type ENUM_HOUSING_ROOM_TYPE_TYPE,
	ENUM_VEHICLE_BODY_TYPE,
	type ENUM_VEHICLE_BODY_TYPE_TYPE
} from "@/entities/tour";

export const SHEET_CAR_ICONS: Record<ENUM_VEHICLE_BODY_TYPE_TYPE, LucideIcon> =
	{
		[ENUM_VEHICLE_BODY_TYPE.SEDAN]: Car,
		[ENUM_VEHICLE_BODY_TYPE.SUV]: Car,
		[ENUM_VEHICLE_BODY_TYPE.MINIVAN]: Car,
		[ENUM_VEHICLE_BODY_TYPE.MINIBUS]: Bus,
		[ENUM_VEHICLE_BODY_TYPE.MINIBUS_PLUS]: Bus,
		[ENUM_VEHICLE_BODY_TYPE.BUS]: Bus,
		[ENUM_VEHICLE_BODY_TYPE.COACH]: Bus
	};

export const SHEET_ROOM_ICONS: Record<ENUM_HOUSING_ROOM_TYPE_TYPE, LucideIcon> =
	{
		[ENUM_HOUSING_ROOM_TYPE.SINGLE]: BedSingle,
		[ENUM_HOUSING_ROOM_TYPE.DOUBLE]: BedDouble,
		[ENUM_HOUSING_ROOM_TYPE.TWIN]: BedDouble,
		[ENUM_HOUSING_ROOM_TYPE.TRIPLE]: Bed,
		[ENUM_HOUSING_ROOM_TYPE.QUADRUPLE]: Bed,
		[ENUM_HOUSING_ROOM_TYPE.SUITE]: BedDouble,
		[ENUM_HOUSING_ROOM_TYPE.FAMILY]: Bed
	};

export const getSheetCarIcon = (
	typ: ENUM_VEHICLE_BODY_TYPE_TYPE | null
): LucideIcon => (typ ? SHEET_CAR_ICONS[typ] : Car);

export const getSheetRoomIcon = (
	typ: ENUM_HOUSING_ROOM_TYPE_TYPE | null
): LucideIcon => (typ ? SHEET_ROOM_ICONS[typ] : Bed);

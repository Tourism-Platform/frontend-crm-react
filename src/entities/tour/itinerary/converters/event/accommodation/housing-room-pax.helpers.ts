import {
	ENUM_HOUSING_ROOM_TYPES_BACKEND,
	type ENUM_HOUSING_ROOM_TYPES_BACKEND_TYPE
} from "@/entities/supplier/types/supplier-backend-enum.types";

export const DEFAULT_HOUSING_ROOM_TYP = ENUM_HOUSING_ROOM_TYPES_BACKEND.DOUBLE;

/** Pax the backend expects for fixed-size room types (fe6.4 §12). */
const FIXED_ROOM_PAX: Partial<
	Record<ENUM_HOUSING_ROOM_TYPES_BACKEND_TYPE, number>
> = {
	[ENUM_HOUSING_ROOM_TYPES_BACKEND.SINGLE]: 1,
	[ENUM_HOUSING_ROOM_TYPES_BACKEND.DOUBLE]: 2,
	[ENUM_HOUSING_ROOM_TYPES_BACKEND.TWIN]: 2,
	[ENUM_HOUSING_ROOM_TYPES_BACKEND.TRIPLE]: 3,
	[ENUM_HOUSING_ROOM_TYPES_BACKEND.QUADRUPLE]: 4
};

const HOUSING_ROOM_TYPES = new Set<string>(
	Object.values(ENUM_HOUSING_ROOM_TYPES_BACKEND)
);

/** The room type read back from the backend, or the default for a new room. */
export const resolveRoomTyp = (
	typ?: string | null
): ENUM_HOUSING_ROOM_TYPES_BACKEND_TYPE =>
	typ && HOUSING_ROOM_TYPES.has(typ)
		? (typ as ENUM_HOUSING_ROOM_TYPES_BACKEND_TYPE)
		: DEFAULT_HOUSING_ROOM_TYP;

/**
 * Pax written for a room: fixed by its type (the backend rejects a mismatch),
 * otherwise (suite / family) the pax read back, else 2.
 */
export const resolveRoomPax = (
	typ: ENUM_HOUSING_ROOM_TYPES_BACKEND_TYPE,
	storedPax?: number | null
): number =>
	FIXED_ROOM_PAX[typ] ?? (storedPax && storedPax >= 1 ? storedPax : 2);

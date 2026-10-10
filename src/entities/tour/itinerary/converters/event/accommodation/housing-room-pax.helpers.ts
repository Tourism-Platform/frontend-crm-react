import { HousingRoomTypes } from "@/shared/api";

/** Room type a new room is written with — the form has no type field. */
export const DEFAULT_HOUSING_ROOM_TYP = HousingRoomTypes.Double;

/** Pax the backend expects for fixed-size room types (fe6.4 §12). */
const FIXED_ROOM_PAX: Partial<Record<HousingRoomTypes, number>> = {
	[HousingRoomTypes.Single]: 1,
	[HousingRoomTypes.Double]: 2,
	[HousingRoomTypes.Twin]: 2,
	[HousingRoomTypes.Triple]: 3,
	[HousingRoomTypes.Quadruple]: 4
};

const HOUSING_ROOM_TYPES = new Set<string>(Object.values(HousingRoomTypes));

/** The room type read back from the backend, or the default for a new room. */
export const resolveRoomTyp = (typ?: string | null): HousingRoomTypes =>
	typ && HOUSING_ROOM_TYPES.has(typ)
		? (typ as HousingRoomTypes)
		: DEFAULT_HOUSING_ROOM_TYP;

/**
 * Pax written for a room: fixed by its type (the backend rejects a mismatch),
 * otherwise (suite / family) the pax read back, else 2.
 */
export const resolveRoomPax = (
	typ: HousingRoomTypes,
	storedPax?: number | null
): number =>
	FIXED_ROOM_PAX[typ] ?? (storedPax && storedPax >= 1 ? storedPax : 2);

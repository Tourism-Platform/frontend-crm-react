import type { HousingDetailsOutput } from "@/shared/api";

import { ENUM_FORM_ROOMS, type TRoomsSchema } from "../../types";

type TRoomsList = TRoomsSchema[typeof ENUM_FORM_ROOMS.ROOMS_LIST];

/** Read-side housing spec (`details.spec`, contract 3.1). */
type THousingSpecOutput = HousingDetailsOutput["spec"];

/**
 * Contract 3.1 merged the old flat `per_room` / `per_room_category`
 * expenses into one per-room spec whose rooms always sit inside
 * `categories`. A stay with no bands of its own arrives as a single
 * UNNAMED category, so the form's "price based on class" mode is
 * recognised by: several categories, or one category that carries a name.
 */
export const isClassPricedHousingSpec = (
	spec: THousingSpecOutput | null | undefined
): boolean =>
	spec?.pricing === "per_room" &&
	(spec.categories.length > 1 ||
		(spec.categories.length === 1 && spec.categories[0]?.name != null));

/**
 * Rooms section of the form, read from `details.spec` (3.1):
 * - per-room spec, flat mode — the single category's rooms;
 * - per-room spec, class mode — one form "room" per category;
 * - whole spec — the descriptive rooms of all categories (they carry no
 *   rate of their own).
 */
export const mapRoomsFromBackend = (
	spec?: THousingSpecOutput | null
): { rooms: TRoomsList } => {
	if (!spec) {
		return { rooms: [] };
	}

	if (spec.pricing === "per_room") {
		if (isClassPricedHousingSpec(spec)) {
			return {
				rooms: spec.categories.map((category) => ({
					[ENUM_FORM_ROOMS.ID]: category.id,
					[ENUM_FORM_ROOMS.ROOM_NAME]: category.name ?? "",
					[ENUM_FORM_ROOMS.DESCRIPTION]: ""
				}))
			};
		}

		return {
			rooms: (spec.categories[0]?.rooms ?? []).map((room) => ({
				[ENUM_FORM_ROOMS.ID]: room.id,
				[ENUM_FORM_ROOMS.ROOM_NAME]: room.name ?? "",
				[ENUM_FORM_ROOMS.DESCRIPTION]: room.description ?? ""
			}))
		};
	}

	return {
		rooms: (spec.categories ?? []).flatMap((category) =>
			(category.rooms ?? []).map((room) => ({
				[ENUM_FORM_ROOMS.ID]: room.id,
				[ENUM_FORM_ROOMS.ROOM_NAME]: room.name ?? room.typ ?? "Room",
				[ENUM_FORM_ROOMS.DESCRIPTION]: room.description ?? ""
			}))
		)
	};
};

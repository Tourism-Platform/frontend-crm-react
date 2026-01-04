import { z } from "zod";

import { type TTourAccommodationEditPageKeys, i18nKey } from "@/shared/config";

import { ENUM_FORM_ROOM } from "../types";

const msg = i18nKey<TTourAccommodationEditPageKeys>();

const ROOM_SCHEMA = z.object({
	[ENUM_FORM_ROOM.NAME]: z
		.string()
		.min(1, { message: msg("rooms.form.fields.name.errors.required") })
		.min(1, { message: msg("rooms.form.fields.name.errors.min") })
		.max(100, { message: msg("rooms.form.fields.name.errors.max") }),
	[ENUM_FORM_ROOM.DETAILS]: z
		.string()
		.min(1, { message: msg("rooms.form.fields.details.errors.required") })
		.min(1, { message: msg("rooms.form.fields.details.errors.min") })
		.max(500, { message: msg("rooms.form.fields.details.errors.max") })
});

export const ROOMS_SCHEMA = z.object({
	rooms: z
		.array(ROOM_SCHEMA)
		.min(1, { message: msg("rooms.form.fields.rooms.errors.required") })
});

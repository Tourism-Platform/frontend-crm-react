import { z } from "zod";

import { ENUM_FORM_ROOM } from "../types";

const ROOM_SCHEMA = z.object({
	[ENUM_FORM_ROOM.NAME]: z
		.string()
		.min(1, {
			message: "general.rooms.form.fields.name.errors.required"
		})
		.max(100, {
			message: "general.rooms.form.fields.name.errors.max"
		}),
	[ENUM_FORM_ROOM.DETAILS]: z
		.string()
		.min(1, {
			message: "general.rooms.form.fields.details.errors.required"
		})
		.max(500, {
			message: "general.rooms.form.fields.details.errors.max"
		})
});

export const ROOMS_SCHEMA = z.object({
	rooms: z
		.array(ROOM_SCHEMA)
		.min(1, { message: "general.rooms.form.fields.rooms.errors.required" })
});

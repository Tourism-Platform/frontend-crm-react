import { z } from "zod";

import { ENUM_FORM_ROOM } from "../types";

const ROOM_SCHEMA = z.object({
	[ENUM_FORM_ROOM.NAME]: z
		.string({ message: "rooms.form.fields.name.errors.required" })
		.min(1, {
			message: "rooms.form.fields.name.errors.min"
		})
		.max(100, {
			message: "rooms.form.fields.name.errors.max"
		}),
	[ENUM_FORM_ROOM.DETAILS]: z
		.string({ message: "rooms.form.fields.details.errors.required" })
		.min(1, {
			message: "rooms.form.fields.details.errors.min"
		})
		.max(500, {
			message: "rooms.form.fields.details.errors.max"
		})
});

export const ROOMS_SCHEMA = z.object({
	rooms: z
		.array(ROOM_SCHEMA)
		.min(1, { message: "rooms.form.fields.rooms.errors.required" })
});

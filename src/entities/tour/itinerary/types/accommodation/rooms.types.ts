import { z } from "zod";

import type { ACCOMMODATION_ROOMS_SCHEMA as ROOMS_SCHEMA } from "../../schema";

export const ENUM_FORM_ROOMS = {
	ROOMS_LIST: "rooms",
	ROOM_NAME: "room_name",
	DESCRIPTION: "description"
} as const;

export type ENUM_FORM_ROOMS_TYPE =
	(typeof ENUM_FORM_ROOMS)[keyof typeof ENUM_FORM_ROOMS];

export type TRoomsSchema = z.infer<typeof ROOMS_SCHEMA>;

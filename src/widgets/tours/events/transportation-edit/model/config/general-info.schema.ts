import { z } from "zod";

import { ENUM_FORM_TRANSPORTATION } from "../types";

// схема одного сегмента маршрута (всё кроме description)
export const FLIGHT_SEGMENT_SCHEMA = z.object({});

// главная схема маршрута
export const GENERAL_INFO_SCHEMA = z.object({
	[ENUM_FORM_TRANSPORTATION.DESCRIPTION]: z
		.string()
		.min(2, { message: "general.description.description.errors.min" })
		.max(50, { message: "general.description.description.errors.max" })
		.optional(),

	transportation: z
		.array(FLIGHT_SEGMENT_SCHEMA)
		.min(1, { message: "Должен быть хотя бы один сегмент маршрута" })
});

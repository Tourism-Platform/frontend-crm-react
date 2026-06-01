import { z } from "zod";

import type { ACTIVITY_EDIT_SCHEMA } from "../../schema";

export const ENUM_FORM_ACTIVITY = {
	ACTIVITY_SUBTYPE: "activity_subtype",
	LOCATION: "location",
	ACTIVITY_START_TIME: "activity_start_time",
	ACTIVITY_START_TIMEZONE: "activity_start_timezone",
	ACTIVITY_END_TIME: "activity_end_time",
	ACTIVITY_END_TIMEZONE: "activity_end_timezone",
	DESCRIPTION: "description"
} as const;

export type ENUM_FORM_ACTIVITY_TYPE =
	(typeof ENUM_FORM_ACTIVITY)[keyof typeof ENUM_FORM_ACTIVITY];

export type TActivityEditSchema = z.infer<typeof ACTIVITY_EDIT_SCHEMA>;

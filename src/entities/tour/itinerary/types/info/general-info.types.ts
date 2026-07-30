import { z } from "zod";

import type { INFO_EDIT_SCHEMA } from "../../schema";

export const ENUM_FORM_INFORMATION = {
	INFO_START_TIME: "info_start_time",
	INFO_START_TIMEZONE: "info_start_timezone",
	INFO_END_TIME: "info_end_time",
	INFO_END_TIMEZONE: "info_end_timezone",
	DESCRIPTION: "description"
} as const;

export type ENUM_FORM_INFORMATION_TYPE =
	(typeof ENUM_FORM_INFORMATION)[keyof typeof ENUM_FORM_INFORMATION];

export type TInfoEditSchema = z.infer<typeof INFO_EDIT_SCHEMA>;

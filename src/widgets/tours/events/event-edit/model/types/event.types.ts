import { z } from "zod";

import type { TTourEventEditPageKeys } from "@/shared/config";
import type { TFormField } from "@/shared/types";

import type { GENERAL_INFO_SCHEMA } from "../config";

export type TForm = TFormField<TTourEventEditPageKeys, ENUM_FORM_EVENT_TYPE>;

export const ENUM_FORM_EVENT = {
	EVENT_SUBTYPE: "event_subtype",
	LOCATION: "location",
	EVENT_START_TIME: "event_start_time",
	START_TIMEZONE: "start_timezone",
	EVENT_END_TIME: "event_end_time",
	END_TIMEZONE: "end_timezone",
	DESCRIPTION: "description"
} as const;

export type ENUM_FORM_EVENT_TYPE =
	(typeof ENUM_FORM_EVENT)[keyof typeof ENUM_FORM_EVENT];

export type TGeneralInfoSchema = z.infer<typeof GENERAL_INFO_SCHEMA>;

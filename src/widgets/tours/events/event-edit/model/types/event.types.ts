import { z } from "zod";

import type { TTourEventEditPageKeys } from "@/shared/config";
import type { CustomFieldVariant, SelectPickerOption } from "@/shared/ui";

import type { GENERAL_INFO_SCHEMA } from "../config";

interface IFormEventBase {
	label: TTourEventEditPageKeys;
	key: ENUM_FORM_EVENT_TYPE;
}

type TFormEventBaseRequired = IFormEventBase & {
	fieldType: Exclude<CustomFieldVariant, "date" | "time" | "select">;
	placeholder: TTourEventEditPageKeys;
};

type TFormEventBaseOptional = IFormEventBase & {
	fieldType: "date" | "time";
	placeholder?: TTourEventEditPageKeys;
};
type TFormEventBaseSelect = IFormEventBase & {
	fieldType: "select";
	options: SelectPickerOption[];
	placeholder?: TTourEventEditPageKeys;
	defaultValue: string;
};

export type TFormEvent =
	| TFormEventBaseRequired
	| TFormEventBaseOptional
	| TFormEventBaseSelect;

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

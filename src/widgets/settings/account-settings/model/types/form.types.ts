import type { HTMLInputTypeAttribute } from "react";
import { z } from "zod";

import type { TAccountSettingsPageKeys } from "@/shared/config";
import type { CustomFieldVariant, SelectPickerOption } from "@/shared/ui";

import type { CHANGE_ACCOUNT_SCHEMA } from "../config";

interface IFormChangeAccountBase {
	label: TAccountSettingsPageKeys;
	key: ENUM_FORM_CHANGE_ACCOUNT_TYPE;
}

type TFormBaseRequired = IFormChangeAccountBase & {
	fieldType: Exclude<CustomFieldVariant, "date" | "time" | "select">;
	placeholder: string;
	type?: HTMLInputTypeAttribute;
};

type TFormBaseOptional = IFormChangeAccountBase & {
	fieldType: "date" | "time";
	placeholder?: string;
};
type TFormBaseSelect = IFormChangeAccountBase & {
	fieldType: "select";
	options: SelectPickerOption[];
	placeholder?: string;
	defaultValue: string;
};

export type TFormChangeAccount =
	| TFormBaseRequired
	| TFormBaseOptional
	| TFormBaseSelect;

export const ENUM_FORM_CHANGE_ACCOUNT = {
	LOGIN: "login",
	FIRST_NAME: "first_name",
	LAST_NAME: "last_name",
	TITLE: "title",
	PHONE_NUMBER: "phone_number",
	LOCATION: "location",
	CURRENCY: "currency"
} as const;

export type ENUM_FORM_CHANGE_ACCOUNT_TYPE =
	(typeof ENUM_FORM_CHANGE_ACCOUNT)[keyof typeof ENUM_FORM_CHANGE_ACCOUNT];

export type TChangeAccountSchema = z.infer<typeof CHANGE_ACCOUNT_SCHEMA>;

import { z } from "zod";

import type { TAccountSettingsPageKeys } from "@/shared/config";
import type { TFormField } from "@/shared/types";

import type { CHANGE_ACCOUNT_SCHEMA } from "../config";

export type TForm = TFormField<
	TAccountSettingsPageKeys,
	ENUM_FORM_CHANGE_ACCOUNT_TYPE
>;

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

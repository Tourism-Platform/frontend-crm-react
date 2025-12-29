import type z from "zod";

import type { ACCOUNT_SCHEMA } from "../schema";

export const ENUM_FORM_ACCOUNT = {
	AVATAR: "avatar",
	LOGIN: "login",
	FIRST_NAME: "first_name",
	LAST_NAME: "last_name",
	TITLE: "title",
	PHONE_NUMBER: "phone_number",
	LOCATION: "location",
	CURRENCY: "currency"
} as const;

export type ENUM_FORM_ACCOUNT_TYPE =
	(typeof ENUM_FORM_ACCOUNT)[keyof typeof ENUM_FORM_ACCOUNT];

export type TAccountSchema = z.infer<typeof ACCOUNT_SCHEMA>;

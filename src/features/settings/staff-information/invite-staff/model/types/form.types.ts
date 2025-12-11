import { z } from "zod";

import type { TStaffInformationPageKeys } from "@/shared/config";
import type { TFormField } from "@/shared/types";

import type { INVITE_STAFF_SCHEMA } from "../config";

export type TForm = TFormField<
	TStaffInformationPageKeys,
	ENUM_FORM_INVITE_STAFF_TYPE
>;

export const ENUM_FORM_INVITE_STAFF = {
	EMAIL: "email",
	ROLE: "role"
} as const;

export type ENUM_FORM_INVITE_STAFF_TYPE =
	(typeof ENUM_FORM_INVITE_STAFF)[keyof typeof ENUM_FORM_INVITE_STAFF];

export type TAddStaffSchema = z.infer<typeof INVITE_STAFF_SCHEMA>;

import { z } from "zod";

import type { TStaffInformationPageKeys } from "@/shared/config";
import type { TFormField } from "@/shared/types";

import type { EDIT_STAFF_SCHEMA } from "../config";

export type TForm = TFormField<
	TStaffInformationPageKeys,
	ENUM_FORM_EDIT_STAFF_TYPE
>;

export const ENUM_FORM_EDIT_STAFF = {
	FIRST_NAME: "firstName",
	LAST_NAME: "lastName",
	EMAIL: "email",
	ROLE: "role",
	STATUS: "status",
	TYPE: "type",
	SPLIT: "split"
} as const;

export type ENUM_FORM_EDIT_STAFF_TYPE =
	(typeof ENUM_FORM_EDIT_STAFF)[keyof typeof ENUM_FORM_EDIT_STAFF];

export type TEditStaffSchema = z.infer<typeof EDIT_STAFF_SCHEMA>;

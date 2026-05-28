import { ENUM_FORM_INVITE_STAFF, STAFF_ROLE_OPTIONS } from "@/entities/staff";

import type { TForm } from "../types";

export const FORM_INVITE_STAFF_LIST: TForm[] = [
	{
		label: "invite.form.fields.firstName.label",
		placeholder: "invite.form.fields.firstName.placeholder",
		key: ENUM_FORM_INVITE_STAFF.FIRST_NAME,
		fieldType: "input"
	},
	{
		label: "invite.form.fields.lastName.label",
		placeholder: "invite.form.fields.lastName.placeholder",
		key: ENUM_FORM_INVITE_STAFF.LAST_NAME,
		fieldType: "input"
	},
	{
		label: "invite.form.fields.email.label",
		placeholder: "invite.form.fields.email.placeholder",
		key: ENUM_FORM_INVITE_STAFF.EMAIL,
		fieldType: "input"
	},
	{
		label: "invite.form.fields.role.label",
		placeholder: "invite.form.fields.role.placeholder",
		key: ENUM_FORM_INVITE_STAFF.ROLE,
		fieldType: "select",
		options: STAFF_ROLE_OPTIONS
	}
];

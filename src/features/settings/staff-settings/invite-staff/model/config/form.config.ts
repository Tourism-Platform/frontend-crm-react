import { STAFF_OPTIONS } from "@/shared/config";

import { ENUM_FORM_INVITE_STAFF, type TForm } from "../types";

export const FORM_INVITE_STAFF_LIST: TForm[] = [
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
		options: STAFF_OPTIONS
	}
];

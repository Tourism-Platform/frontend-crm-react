import { useValueToTranslateLabel } from "@/shared/utils";

import { ENUM_FORM_INVITE_STAFF, PERMISSION_LABELS } from "@/entities/staff";

import type { TForm } from "../types";

export const FORM_INVITE_STAFF_LIST = (): TForm[] => [
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
		fieldType: "input",
		className: "col-span-2"
	},
	{
		label: "invite.form.fields.permissions.label",
		placeholder: "invite.form.fields.permissions.placeholder",
		key: ENUM_FORM_INVITE_STAFF.PERMISSIONS,
		fieldType: "multiselect",
		options: useValueToTranslateLabel(PERMISSION_LABELS),
		className: "col-span-2"
	}
];

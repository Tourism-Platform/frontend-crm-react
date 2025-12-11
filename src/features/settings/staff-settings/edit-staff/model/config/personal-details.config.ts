import { STAFF_OPTIONS, STAFF_STATUS_OPTIONS } from "@/shared/config";

import { ENUM_FORM_EDIT_STAFF, type TForm } from "../types/form.types";

export const PERSONAL_DETAILS_LIST: TForm[] = [
	{
		label: "menu.edit.form.details.fields.name.label",
		placeholder: "menu.edit.form.details.fields.name.placeholder",
		key: ENUM_FORM_EDIT_STAFF.NAME,
		fieldType: "input"
	},
	{
		label: "menu.edit.form.details.fields.email.label",
		placeholder: "menu.edit.form.details.fields.email.placeholder",
		key: ENUM_FORM_EDIT_STAFF.EMAIL,
		fieldType: "input"
	},
	{
		label: "menu.edit.form.details.fields.role.label",
		placeholder: "menu.edit.form.details.fields.role.placeholder",
		key: ENUM_FORM_EDIT_STAFF.ROLE,
		fieldType: "select",
		options: STAFF_OPTIONS
	},
	{
		label: "menu.edit.form.details.fields.status.label",
		placeholder: "menu.edit.form.details.fields.status.placeholder",
		key: ENUM_FORM_EDIT_STAFF.STATUS,
		fieldType: "select",
		options: STAFF_STATUS_OPTIONS
	}
];

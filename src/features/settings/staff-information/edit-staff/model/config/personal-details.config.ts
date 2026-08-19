import { useValueToTranslateLabel } from "@/shared/utils";

import { ENUM_FORM_EDIT_STAFF, STAFF_STATUS_LABELS } from "@/entities/staff";

import { type TForm } from "../types";

export const PERSONAL_DETAILS_LIST = (): TForm[] => [
	{
		label: "menu.edit.form.details.fields.firstName.label",
		placeholder: "menu.edit.form.details.fields.firstName.placeholder",
		key: ENUM_FORM_EDIT_STAFF.FIRST_NAME,
		fieldType: "input"
	},
	{
		label: "menu.edit.form.details.fields.lastName.label",
		placeholder: "menu.edit.form.details.fields.lastName.placeholder",
		key: ENUM_FORM_EDIT_STAFF.LAST_NAME,
		fieldType: "input"
	},
	{
		label: "menu.edit.form.details.fields.email.label",
		placeholder: "menu.edit.form.details.fields.email.placeholder",
		key: ENUM_FORM_EDIT_STAFF.EMAIL,
		fieldType: "input",
		disabled: true
	},
	{
		label: "menu.edit.form.details.fields.status.label",
		placeholder: "menu.edit.form.details.fields.status.placeholder",
		key: ENUM_FORM_EDIT_STAFF.STATUS,
		fieldType: "select",
		options: useValueToTranslateLabel(STAFF_STATUS_LABELS)
	}
];

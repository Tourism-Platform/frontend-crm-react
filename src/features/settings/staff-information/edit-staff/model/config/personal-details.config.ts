import { useValueToTranslateLabel } from "@/shared/utils";

import { STAFF_ROLE_OPTIONS, STAFF_STATUS_LABELS } from "@/entities/staff";

import { ENUM_FORM_EDIT_STAFF, type TForm } from "../types";

export const PERSONAL_DETAILS_LIST = (): TForm[] => [
	{
		label: "menu.edit.form.details.fields.firstName.label",
		placeholder: "menu.edit.form.details.fields.firstName.placeholder",
		key: ENUM_FORM_EDIT_STAFF.FIRST_NAME,
		fieldType: "input",
		className: "col-span-2"
	},
	{
		label: "menu.edit.form.details.fields.lastName.label",
		placeholder: "menu.edit.form.details.fields.lastName.placeholder",
		key: ENUM_FORM_EDIT_STAFF.LAST_NAME,
		fieldType: "input",
		className: "col-span-2"
	},
	{
		label: "menu.edit.form.details.fields.email.label",
		placeholder: "menu.edit.form.details.fields.email.placeholder",
		key: ENUM_FORM_EDIT_STAFF.EMAIL,
		fieldType: "input",
		className: "col-span-2"
	},
	{
		label: "menu.edit.form.details.fields.role.label",
		placeholder: "menu.edit.form.details.fields.role.placeholder",
		key: ENUM_FORM_EDIT_STAFF.ROLE,
		fieldType: "select",
		options: STAFF_ROLE_OPTIONS,
		className: "col-span-3"
	},
	{
		label: "menu.edit.form.details.fields.status.label",
		placeholder: "menu.edit.form.details.fields.status.placeholder",
		key: ENUM_FORM_EDIT_STAFF.STATUS,
		fieldType: "select",
		options: useValueToTranslateLabel(STAFF_STATUS_LABELS),
		className: "col-span-3"
	}
];

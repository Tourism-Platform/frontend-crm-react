import { COMMISSION_OPTIONS } from "@/shared/config";

import { ENUM_FORM_EDIT_STAFF, type TForm } from "../types/form.types";

export const COMMISSION_LIST: TForm[] = [
	{
		label: "menu.edit.form.commission.fields.type.label",
		placeholder: "menu.edit.form.commission.fields.type.placeholder",
		key: ENUM_FORM_EDIT_STAFF.TYPE,
		fieldType: "select",
		options: COMMISSION_OPTIONS,
		defaultValue: COMMISSION_OPTIONS?.[0]?.value
	},
	{
		label: "menu.edit.form.commission.fields.split.label",
		placeholder: "menu.edit.form.commission.fields.split.placeholder",
		key: ENUM_FORM_EDIT_STAFF.SPLIT,
		fieldType: "input",
		type: "number"
	}
];

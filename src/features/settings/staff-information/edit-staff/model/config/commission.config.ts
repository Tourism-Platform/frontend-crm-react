import { useValueToTranslateLabel } from "@/shared/utils";

import { COMMISSION_LABELS } from "@/entities/commission";
import { ENUM_FORM_EDIT_STAFF } from "@/entities/staff";

import { type TForm } from "../types";

export const COMMISSION_LIST = (): TForm[] => [
	{
		label: "menu.edit.form.commission.fields.type.label",
		placeholder: "menu.edit.form.commission.fields.type.placeholder",
		key: ENUM_FORM_EDIT_STAFF.TYPE,
		fieldType: "select",
		options: useValueToTranslateLabel(COMMISSION_LABELS)
	},
	{
		label: "menu.edit.form.commission.fields.split.label",
		placeholder: "menu.edit.form.commission.fields.split.placeholder",
		key: ENUM_FORM_EDIT_STAFF.SPLIT,
		fieldType: "input",
		type: "number",
		step: "0.1",
		min: 0,
		max: 100
	}
];

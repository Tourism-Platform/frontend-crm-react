import { useValueToTranslateLabel } from "@/shared/utils";

import { COMMISSION_LABELS } from "@/entities/commission";

import { ENUM_FORM_EDIT_STAFF, type TForm } from "../types/form.types";

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
		type: "number"
	}
];

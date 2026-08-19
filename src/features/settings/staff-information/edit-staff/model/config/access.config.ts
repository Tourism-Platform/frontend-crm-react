import { useValueToTranslateLabel } from "@/shared/utils";

import { ENUM_FORM_EDIT_STAFF, PERMISSION_LABELS } from "@/entities/staff";

import { type TForm } from "../types";

export const ACCESS_LIST = (): TForm[] => [
	{
		label: "menu.edit.form.access.fields.permissions.label",
		placeholder: "menu.edit.form.access.fields.permissions.placeholder",
		key: ENUM_FORM_EDIT_STAFF.PERMISSIONS,
		fieldType: "multiselect",
		options: useValueToTranslateLabel(PERMISSION_LABELS),
		className: "col-span-2"
	}
];

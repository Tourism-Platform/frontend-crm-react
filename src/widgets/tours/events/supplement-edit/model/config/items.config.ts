import { ENUM_FORM_SUPPLEMENT_ITEMS } from "@/entities/tour";

import type { TForm } from "../types";

export const ITEMS_DATA_LIST: TForm[] = [
	{
		label: "form.items.details.form.fields.name.label",
		placeholder: "form.items.details.form.fields.name.placeholder",
		key: ENUM_FORM_SUPPLEMENT_ITEMS.NAME,
		fieldType: "input"
	},
	{
		label: "form.items.details.form.fields.description.label",
		placeholder: "form.items.details.form.fields.description.placeholder",
		key: ENUM_FORM_SUPPLEMENT_ITEMS.DESCRIPTION,
		fieldType: "editor",
		className: "col-span-2"
	}
];

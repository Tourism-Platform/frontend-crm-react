import { ENUM_FORM_SUPPLEMENT_ITEMS } from "@/entities/tour";

import type { TForm } from "../types";

export const ITEMS_DATA_LIST: TForm[] = [
	{
		label: "form.items.details.form.fields.name.label",
		placeholder: "form.items.details.form.fields.name.placeholder",
		key: ENUM_FORM_SUPPLEMENT_ITEMS.NAME,
		fieldType: "input"
	}
	// No item description: the backend item has none and drops it (fe6.4 §14).
];

import type { SelectPickerOption } from "@/shared/ui";

import { ENUM_FORM_ATTACH_PRODUCT, type TForm } from "../types";

export const FORM_ATTACH_PRODUCT_SEARCH_LIST: TForm[] = [
	{
		label: "attach_product.dialog.fields.search.label",
		placeholder: "attach_product.dialog.fields.search.placeholder",
		key: ENUM_FORM_ATTACH_PRODUCT.SEARCH,
		fieldType: "input"
	}
];

export const FORM_ATTACH_PRODUCT_VARIANT_FIELD = (
	options: SelectPickerOption[]
): TForm => ({
	label: "attach_product.dialog.fields.variant.label",
	placeholder: "attach_product.dialog.fields.variant.all",
	key: ENUM_FORM_ATTACH_PRODUCT.VARIANT_ID,
	fieldType: "select",
	options
});

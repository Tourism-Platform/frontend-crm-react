import {
	ENUM_FORM_OVERRIDE_PRODUCT,
	type TOverrideProductForm
} from "../types";

export const FORM_OVERRIDE_POLICY_LIST: TOverrideProductForm[] = [
	{
		label: "override_product.dialog.fields.check_in_from.label",
		placeholder: "override_product.dialog.fields.check_in_from.placeholder",
		key: ENUM_FORM_OVERRIDE_PRODUCT.CHECK_IN_FROM,
		fieldType: "input"
	},
	{
		label: "override_product.dialog.fields.check_out_until.label",
		placeholder:
			"override_product.dialog.fields.check_out_until.placeholder",
		key: ENUM_FORM_OVERRIDE_PRODUCT.CHECK_OUT_UNTIL,
		fieldType: "input"
	}
];

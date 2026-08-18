import {
	CURRENCY_OPTIONS,
	DEFAULT_EVENT_CURRENCY
} from "@/entities/commission";
import { ENUM_PACKAGE_FIELD } from "@/entities/tour";

import type { TPackageFormField } from "../types";

export const PACKAGE_FLAT_RATE_PRICE_DETAILS_LIST: TPackageFormField[] = [
	{
		label: "form.pricing.form.pricing_details.fields.total_price.label",
		placeholder:
			"form.pricing.form.pricing_details.fields.total_price.placeholder",
		key: ENUM_PACKAGE_FIELD.TOTAL_PRICE,
		type: "number",
		fieldType: "input"
	},
	{
		label: "form.pricing.form.pricing_details.fields.taxes_and_fees.label",
		placeholder:
			"form.pricing.form.pricing_details.fields.taxes_and_fees.placeholder",
		key: ENUM_PACKAGE_FIELD.TAXES,
		type: "number",
		fieldType: "input"
	},
	{
		label: "form.pricing.form.pricing_details.fields.currency.label",
		placeholder:
			"form.pricing.form.pricing_details.fields.currency.placeholder",
		key: ENUM_PACKAGE_FIELD.CURRENCY,
		fieldType: "select",
		options: CURRENCY_OPTIONS,
		defaultValue: DEFAULT_EVENT_CURRENCY
	}
];

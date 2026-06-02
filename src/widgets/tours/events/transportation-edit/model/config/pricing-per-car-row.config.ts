import { CURRENCY_OPTIONS } from "@/entities/commission";
import { ENUM_TRANSPORTATION_PRICE_ROW_FIELD } from "@/entities/tour";

import type { TTransportationPricingFormField } from "../types";

export const PER_CAR_ROW_FIELDS_LIST: TTransportationPricingFormField[] = [
	{
		key: ENUM_TRANSPORTATION_PRICE_ROW_FIELD.COST,
		label: "form.pricing.form.per_car.fields.total_cost.label",
		placeholder: "form.pricing.form.per_car.fields.total_cost.placeholder",
		fieldType: "input",
		type: "number"
	},
	{
		key: ENUM_TRANSPORTATION_PRICE_ROW_FIELD.FEES,
		label: "form.pricing.form.per_car.fields.taxes_fees.label",
		placeholder: "form.pricing.form.per_car.fields.taxes_fees.placeholder",
		fieldType: "input",
		type: "number"
	},
	{
		key: ENUM_TRANSPORTATION_PRICE_ROW_FIELD.CURRENCY,
		label: "form.pricing.form.pricing_details.fields.currency.label",
		placeholder:
			"form.pricing.form.pricing_details.fields.currency.placeholder",
		fieldType: "select",
		options: CURRENCY_OPTIONS
	}
];

import {
	CURRENCY_OPTIONS,
	DEFAULT_EVENT_CURRENCY
} from "@/entities/commission";
import { ENUM_BUS_PRODUCT_VEHICLE_PRICE_ROW_FIELD } from "@/entities/supplier";

import type { TBusProductPricingFormField } from "../types";

export const PER_VEHICLE_ROW_FIELDS_LIST: TBusProductPricingFormField[] = [
	{
		key: ENUM_BUS_PRODUCT_VEHICLE_PRICE_ROW_FIELD.COST,
		label: "form.pricing.form.per_vehicle.fields.total_cost.label",
		placeholder:
			"form.pricing.form.per_vehicle.fields.total_cost.placeholder",
		fieldType: "input",
		type: "number"
	},
	{
		key: ENUM_BUS_PRODUCT_VEHICLE_PRICE_ROW_FIELD.CURRENCY,
		label: "form.pricing.form.pricing_details.fields.currency.label",
		placeholder:
			"form.pricing.form.pricing_details.fields.currency.placeholder",
		fieldType: "select",
		options: CURRENCY_OPTIONS,
		defaultValue: DEFAULT_EVENT_CURRENCY
	}
];

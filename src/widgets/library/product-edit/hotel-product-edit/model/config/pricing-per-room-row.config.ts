import {
	CURRENCY_OPTIONS,
	DEFAULT_EVENT_CURRENCY
} from "@/entities/commission";
import { ENUM_HOTEL_PRODUCT_PRICE_ROW_FIELD } from "@/entities/supplier";

import type { THotelProductPricingFormField } from "../types";

export const PER_ROOM_ROW_FIELDS_LIST: THotelProductPricingFormField[] = [
	{
		key: ENUM_HOTEL_PRODUCT_PRICE_ROW_FIELD.COST,
		label: "form.pricing.form.per_room.fields.total_cost.label",
		placeholder: "form.pricing.form.per_room.fields.total_cost.placeholder",
		fieldType: "input",
		type: "number"
	},
	{
		key: ENUM_HOTEL_PRODUCT_PRICE_ROW_FIELD.CURRENCY,
		label: "form.pricing.form.pricing_details.fields.currency.label",
		placeholder:
			"form.pricing.form.pricing_details.fields.currency.placeholder",
		fieldType: "select",
		options: CURRENCY_OPTIONS,
		defaultValue: DEFAULT_EVENT_CURRENCY
	}
];

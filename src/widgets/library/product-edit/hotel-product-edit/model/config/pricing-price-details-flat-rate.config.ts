import {
	CURRENCY_OPTIONS,
	DEFAULT_EVENT_CURRENCY
} from "@/entities/commission";
import { ENUM_HOTEL_PRODUCT_PRICING_FIELD } from "@/entities/supplier";

import type { THotelProductPricingFormField } from "../types";

export const PRICING_FLAT_RATE_PRICE_DETAILS_LIST: THotelProductPricingFormField[] =
	[
		{
			label: "form.pricing.form.pricing_details.fields.total_price.label",
			placeholder:
				"form.pricing.form.pricing_details.fields.total_price.placeholder",
			key: ENUM_HOTEL_PRODUCT_PRICING_FIELD.TOTAL_PRICE,
			type: "number",
			fieldType: "input"
		},
		{
			label: "form.pricing.form.pricing_details.fields.currency.label",
			placeholder:
				"form.pricing.form.pricing_details.fields.currency.placeholder",
			key: ENUM_HOTEL_PRODUCT_PRICING_FIELD.CURRENCY,
			fieldType: "select",
			options: CURRENCY_OPTIONS,
			defaultValue: DEFAULT_EVENT_CURRENCY
		}
	];

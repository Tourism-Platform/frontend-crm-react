import {
	CURRENCY_OPTIONS,
	DEFAULT_EVENT_CURRENCY
} from "@/entities/commission";
import { ENUM_FLIGHT_PRODUCT_PRICING_FIELD } from "@/entities/supplier";

import type { TFlightProductPricingFormField } from "../types";

export const PRICING_PER_PERSON_PRICE_DETAILS_LIST: TFlightProductPricingFormField[] =
	[
		{
			label: "form.pricing.form.pricing_details.fields.total_price_per_person.label",
			placeholder:
				"form.pricing.form.pricing_details.fields.total_price_per_person.placeholder",
			key: ENUM_FLIGHT_PRODUCT_PRICING_FIELD.TOTAL_PRICE,
			fieldType: "input",
			type: "number"
		},
		{
			label: "form.pricing.form.pricing_details.fields.currency.label",
			placeholder:
				"form.pricing.form.pricing_details.fields.currency.placeholder",
			key: ENUM_FLIGHT_PRODUCT_PRICING_FIELD.CURRENCY,
			fieldType: "select",
			options: CURRENCY_OPTIONS,
			defaultValue: DEFAULT_EVENT_CURRENCY
		}
	];

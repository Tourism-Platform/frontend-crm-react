import { CURRENCY_OPTIONS } from "@/entities/commission";
import { ENUM_ACCOMMODATION_PRICING_FIELD } from "@/entities/tour";

import type { TAccommodationPricingFormField } from "../types";

export const PRICING_FLAT_RATE_PRICE_DETAILS_LIST: TAccommodationPricingFormField[] =
	[
		{
			label: "form.pricing.form.pricing_details.fields.total_price.label",
			placeholder:
				"form.pricing.form.pricing_details.fields.total_price.placeholder",
			key: ENUM_ACCOMMODATION_PRICING_FIELD.TOTAL_PRICE,
			type: "number",
			fieldType: "input"
		},
		{
			label: "form.pricing.form.pricing_details.fields.taxes_and_fees.label",
			placeholder:
				"form.pricing.form.pricing_details.fields.taxes_and_fees.placeholder",
			key: ENUM_ACCOMMODATION_PRICING_FIELD.TAXES,
			type: "number",
			fieldType: "input"
		},
		{
			label: "form.pricing.form.pricing_details.fields.currency.label",
			placeholder:
				"form.pricing.form.pricing_details.fields.currency.placeholder",
			key: ENUM_ACCOMMODATION_PRICING_FIELD.CURRENCY,
			fieldType: "select",
			options: CURRENCY_OPTIONS
		}
	];

import { DEFAULT_EVENT_CURRENCY } from "@/entities/commission";
import { useAcceptedCurrencyOptions } from "@/entities/finance";
import { ENUM_BUS_PRODUCT_PRICING_FIELD } from "@/entities/supplier";

import type { TBusProductPricingFormField } from "../types";

export const PRICING_PER_PERSON_PRICE_DETAILS_LIST =
	(): TBusProductPricingFormField[] => [
		{
			label: "form.pricing.form.pricing_details.fields.total_price_per_person.label",
			placeholder:
				"form.pricing.form.pricing_details.fields.total_price_per_person.placeholder",
			key: ENUM_BUS_PRODUCT_PRICING_FIELD.TOTAL_PRICE,
			fieldType: "input",
			type: "number"
		},
		{
			label: "form.pricing.form.pricing_details.fields.currency.label",
			placeholder:
				"form.pricing.form.pricing_details.fields.currency.placeholder",
			key: ENUM_BUS_PRODUCT_PRICING_FIELD.CURRENCY,
			fieldType: "select",
			options: useAcceptedCurrencyOptions().currencyOptions,
			defaultValue: DEFAULT_EVENT_CURRENCY
		}
	];

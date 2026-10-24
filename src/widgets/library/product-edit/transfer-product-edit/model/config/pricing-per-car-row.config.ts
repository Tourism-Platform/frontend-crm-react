import { DEFAULT_EVENT_CURRENCY } from "@/entities/commission";
import { useAcceptedCurrencyOptions } from "@/entities/finance";
import { ENUM_TRANSFER_PRODUCT_PRICE_ROW_FIELD } from "@/entities/supplier";

import type { TTransferProductPricingFormField } from "../types";

export const PER_CAR_ROW_FIELDS_LIST =
	(): TTransferProductPricingFormField[] => [
		{
			key: ENUM_TRANSFER_PRODUCT_PRICE_ROW_FIELD.COST,
			label: "form.pricing.form.per_car.fields.total_cost.label",
			placeholder:
				"form.pricing.form.per_car.fields.total_cost.placeholder",
			fieldType: "input",
			type: "number"
		},
		{
			key: ENUM_TRANSFER_PRODUCT_PRICE_ROW_FIELD.CURRENCY,
			label: "form.pricing.form.pricing_details.fields.currency.label",
			placeholder:
				"form.pricing.form.pricing_details.fields.currency.placeholder",
			fieldType: "select",
			options: useAcceptedCurrencyOptions().currencyOptions,
			defaultValue: DEFAULT_EVENT_CURRENCY
		}
	];

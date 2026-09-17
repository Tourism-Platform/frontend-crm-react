import { useValueToTranslateLabel } from "@/shared/utils";

import {
	CURRENCY_OPTIONS,
	DEFAULT_EVENT_CURRENCY
} from "@/entities/commission";
import {
	ENUM_FLIGHT_PRODUCT_FARE_PRICE_ROW_FIELD,
	ENUM_FLIGHT_VARIANT_CHARGE,
	FLIGHT_VARIANT_CHARGE_LABELS
} from "@/entities/supplier";

import type { TFlightProductPricingFormField } from "../types";

export const PER_FARE_ROW_FIELDS_LIST =
	(): TFlightProductPricingFormField[] => [
		{
			key: ENUM_FLIGHT_PRODUCT_FARE_PRICE_ROW_FIELD.CHARGE_TYP,
			label: "form.pricing.form.per_fare.fields.charge_typ.label",
			placeholder:
				"form.pricing.form.per_fare.fields.charge_typ.placeholder",
			fieldType: "select",
			options: useValueToTranslateLabel(FLIGHT_VARIANT_CHARGE_LABELS),
			defaultValue: ENUM_FLIGHT_VARIANT_CHARGE.FIXED
		},
		{
			key: ENUM_FLIGHT_PRODUCT_FARE_PRICE_ROW_FIELD.COST,
			label: "form.pricing.form.per_fare.fields.total_cost.label",
			placeholder:
				"form.pricing.form.per_fare.fields.total_cost.placeholder",
			fieldType: "input",
			type: "number"
		},
		{
			key: ENUM_FLIGHT_PRODUCT_FARE_PRICE_ROW_FIELD.CURRENCY,
			label: "form.pricing.form.pricing_details.fields.currency.label",
			placeholder:
				"form.pricing.form.pricing_details.fields.currency.placeholder",
			fieldType: "select",
			options: CURRENCY_OPTIONS,
			defaultValue: DEFAULT_EVENT_CURRENCY
		}
	];

import { CURRENCY_OPTIONS } from "@/entities/commission";
import { ENUM_ACCOMMODATION_PRICE_ROW_FIELD } from "@/entities/tour";

import type { TAccommodationPricingFormField } from "../types";

export const PER_ROOM_ROW_FIELDS_LIST: TAccommodationPricingFormField[] = [
	{
		key: ENUM_ACCOMMODATION_PRICE_ROW_FIELD.COST,
		label: "form.pricing.form.per_room.fields.total_cost.label",
		placeholder: "form.pricing.form.per_room.fields.total_cost.placeholder",
		fieldType: "input",
		type: "number"
	},
	{
		key: ENUM_ACCOMMODATION_PRICE_ROW_FIELD.FEES,
		label: "form.pricing.form.per_room.fields.taxes_fees.label",
		placeholder: "form.pricing.form.per_room.fields.taxes_fees.placeholder",
		fieldType: "input",
		type: "number"
	},
	{
		key: ENUM_ACCOMMODATION_PRICE_ROW_FIELD.CURRENCY,
		label: "form.pricing.form.pricing_details.fields.currency.label",
		placeholder:
			"form.pricing.form.pricing_details.fields.currency.placeholder",
		fieldType: "select",
		options: CURRENCY_OPTIONS
	}
];

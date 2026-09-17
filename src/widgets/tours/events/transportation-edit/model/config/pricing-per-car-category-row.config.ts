import {
	CURRENCY_OPTIONS,
	DEFAULT_EVENT_CURRENCY
} from "@/entities/commission";
import { ENUM_TRANSPORTATION_CATEGORY_ROW_FIELD } from "@/entities/tour";

import type { TTransportationPricingFormField } from "../types";

export const PER_CAR_CATEGORY_ROW_FIELDS_LIST: TTransportationPricingFormField[] =
	[
		{
			key: ENUM_TRANSPORTATION_CATEGORY_ROW_FIELD.NAME,
			label: "form.pricing.form.per_car.table.type",
			placeholder:
				"form.pricing.form.per_car.fields.category_name.placeholder",
			fieldType: "input"
		},
		{
			key: ENUM_TRANSPORTATION_CATEGORY_ROW_FIELD.COST,
			label: "form.pricing.form.per_car.table.cost",
			placeholder:
				"form.pricing.form.per_car.fields.total_cost.placeholder",
			fieldType: "input",
			type: "number"
		},
		{
			key: ENUM_TRANSPORTATION_CATEGORY_ROW_FIELD.CURRENCY,
			label: "form.pricing.form.per_car.table.currency",
			placeholder:
				"form.pricing.form.pricing_details.fields.currency.placeholder",
			fieldType: "select",
			options: CURRENCY_OPTIONS,
			defaultValue: DEFAULT_EVENT_CURRENCY
		}
	];

export const createEmptyPerCarCategoryRow = () => ({
	[ENUM_TRANSPORTATION_CATEGORY_ROW_FIELD.CATEGORY_ID]: crypto.randomUUID(),
	[ENUM_TRANSPORTATION_CATEGORY_ROW_FIELD.PRICE_ID]: undefined,
	[ENUM_TRANSPORTATION_CATEGORY_ROW_FIELD.NAME]: "",
	[ENUM_TRANSPORTATION_CATEGORY_ROW_FIELD.COST]: null,
	[ENUM_TRANSPORTATION_CATEGORY_ROW_FIELD.FEES]: [],
	[ENUM_TRANSPORTATION_CATEGORY_ROW_FIELD.CURRENCY]: DEFAULT_EVENT_CURRENCY,
	[ENUM_TRANSPORTATION_CATEGORY_ROW_FIELD.MARKUP]: null
});

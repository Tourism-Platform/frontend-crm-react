import {
	CURRENCY_OPTIONS,
	DEFAULT_EVENT_CURRENCY
} from "@/entities/commission";
import {
	ENUM_TRANSFER_PRODUCT_CATEGORY_ROW_FIELD,
	createEmptyTransferProductCategoryRow
} from "@/entities/supplier";

import type { TTransferProductPricingFormField } from "../types";

export const PER_CAR_CATEGORY_ROW_FIELDS_LIST: TTransferProductPricingFormField[] =
	[
		{
			key: ENUM_TRANSFER_PRODUCT_CATEGORY_ROW_FIELD.NAME,
			label: "form.pricing.form.per_car.table.type",
			placeholder:
				"form.pricing.form.per_car.fields.category_name.placeholder",
			fieldType: "input"
		},
		{
			key: ENUM_TRANSFER_PRODUCT_CATEGORY_ROW_FIELD.COST,
			label: "form.pricing.form.per_car.table.cost",
			placeholder:
				"form.pricing.form.per_car.fields.total_cost.placeholder",
			fieldType: "input",
			type: "number"
		},
		{
			key: ENUM_TRANSFER_PRODUCT_CATEGORY_ROW_FIELD.CURRENCY,
			label: "form.pricing.form.per_car.table.currency",
			placeholder:
				"form.pricing.form.pricing_details.fields.currency.placeholder",
			fieldType: "select",
			options: CURRENCY_OPTIONS,
			defaultValue: DEFAULT_EVENT_CURRENCY
		}
	];

export const createEmptyPerCarCategoryRow =
	createEmptyTransferProductCategoryRow;

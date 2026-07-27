import { CURRENCY_OPTIONS } from "@/entities/commission";
import { ENUM_ACCOMMODATION_CATEGORY_ROW_FIELD } from "@/entities/tour";

import { DEFAULT_EVENT_CURRENCY } from "../../../model";
import type { TAccommodationPricingFormField } from "../types";

export const PER_ROOM_CATEGORY_ROW_FIELDS_LIST: TAccommodationPricingFormField[] =
	[
		{
			key: ENUM_ACCOMMODATION_CATEGORY_ROW_FIELD.NAME,
			label: "form.pricing.form.per_room.table.type",
			placeholder:
				"form.pricing.form.per_room.fields.category_name.placeholder",
			fieldType: "input"
		},
		{
			key: ENUM_ACCOMMODATION_CATEGORY_ROW_FIELD.COST,
			label: "form.pricing.form.per_room.table.cost",
			placeholder:
				"form.pricing.form.per_room.fields.total_cost.placeholder",
			fieldType: "input",
			type: "number"
		},
		{
			key: ENUM_ACCOMMODATION_CATEGORY_ROW_FIELD.FEES,
			label: "form.pricing.form.per_room.table.fees",
			placeholder:
				"form.pricing.form.per_room.fields.taxes_fees.placeholder",
			fieldType: "input",
			type: "number"
		},
		{
			key: ENUM_ACCOMMODATION_CATEGORY_ROW_FIELD.CURRENCY,
			label: "form.pricing.form.per_room.table.currency",
			placeholder:
				"form.pricing.form.pricing_details.fields.currency.placeholder",
			fieldType: "select",
			options: CURRENCY_OPTIONS,
			defaultValue: DEFAULT_EVENT_CURRENCY
		}
	];

export const createEmptyPerRoomCategoryRow = () => ({
	[ENUM_ACCOMMODATION_CATEGORY_ROW_FIELD.NAME]: "",
	[ENUM_ACCOMMODATION_CATEGORY_ROW_FIELD.COST]: null,
	[ENUM_ACCOMMODATION_CATEGORY_ROW_FIELD.FEES]: null,
	[ENUM_ACCOMMODATION_CATEGORY_ROW_FIELD.CURRENCY]: DEFAULT_EVENT_CURRENCY,
	[ENUM_ACCOMMODATION_CATEGORY_ROW_FIELD.MARKUP]: null
});

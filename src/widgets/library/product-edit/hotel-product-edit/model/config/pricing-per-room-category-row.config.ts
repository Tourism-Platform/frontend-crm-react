import { useValueToTranslateLabel } from "@/shared/utils";

import {
	CURRENCY_OPTIONS,
	DEFAULT_EVENT_CURRENCY
} from "@/entities/commission";
import {
	ENUM_HOTEL_PRODUCT_CATEGORY_ROW_FIELD,
	HOTEL_ROOM_TYPE_LABELS,
	createEmptyHotelProductCategoryRow
} from "@/entities/supplier";

import type { THotelProductPricingFormField } from "../types";

export const PER_ROOM_CATEGORY_ROW_FIELDS_LIST =
	(): THotelProductPricingFormField[] => [
		{
			key: ENUM_HOTEL_PRODUCT_CATEGORY_ROW_FIELD.NAME,
			label: "form.pricing.form.per_room.table.type",
			placeholder:
				"form.pricing.form.per_room.fields.category_name.placeholder",
			fieldType: "select",
			options: useValueToTranslateLabel(HOTEL_ROOM_TYPE_LABELS)
		},
		{
			key: ENUM_HOTEL_PRODUCT_CATEGORY_ROW_FIELD.COST,
			label: "form.pricing.form.per_room.table.cost",
			placeholder:
				"form.pricing.form.per_room.fields.total_cost.placeholder",
			fieldType: "input",
			type: "number"
		},
		{
			key: ENUM_HOTEL_PRODUCT_CATEGORY_ROW_FIELD.CURRENCY,
			label: "form.pricing.form.per_room.table.currency",
			placeholder:
				"form.pricing.form.pricing_details.fields.currency.placeholder",
			fieldType: "select",
			options: CURRENCY_OPTIONS,
			defaultValue: DEFAULT_EVENT_CURRENCY
		}
	];

export const createEmptyPerRoomCategoryRow = createEmptyHotelProductCategoryRow;

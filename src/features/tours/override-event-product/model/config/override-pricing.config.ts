import { useValueToTranslateLabel } from "@/shared/utils";

import { DEFAULT_EVENT_CURRENCY } from "@/entities/commission";
import { useAcceptedCurrencyOptions } from "@/entities/finance";
import { HOTEL_ROOM_CHARGE_LABELS } from "@/entities/supplier";
import {
	ENUM_EVENT_KIND,
	type ENUM_EVENT_KIND_TYPE,
	ENUM_FORM_OVERRIDE_PRODUCT,
	ENUM_OVERRIDE_CHARGE,
	ENUM_OVERRIDE_PRICING_ARM,
	ENUM_OVERRIDE_UNIT_CHARGE,
	type ENUM_OVERRIDE_UNIT_CHARGE_TYPE,
	type TOverridePerUnitPricing,
	type TOverrideProductForm
} from "@/entities/tour";

export const FORM_OVERRIDE_FLAT_RATE_PRICE_DETAILS_LIST =
	(): TOverrideProductForm[] => [
		{
			label: "override_product.dialog.fields.total_price.label",
			placeholder:
				"override_product.dialog.fields.total_price.placeholder",
			key: ENUM_FORM_OVERRIDE_PRODUCT.TOTAL_PRICE,
			fieldType: "input",
			type: "number"
		},
		{
			label: "override_product.dialog.fields.currency.label",
			placeholder: "override_product.dialog.fields.currency.placeholder",
			key: ENUM_FORM_OVERRIDE_PRODUCT.CURRENCY,
			fieldType: "select",
			options: useAcceptedCurrencyOptions().currencyOptions,
			defaultValue: DEFAULT_EVENT_CURRENCY
		}
	];

export const FORM_OVERRIDE_PER_PERSON_PRICE_DETAILS_LIST =
	(): TOverrideProductForm[] => [
		{
			label: "override_product.dialog.fields.total_price_per_person.label",
			placeholder:
				"override_product.dialog.fields.total_price_per_person.placeholder",
			key: ENUM_FORM_OVERRIDE_PRODUCT.TOTAL_PRICE,
			fieldType: "input",
			type: "number"
		},
		{
			label: "override_product.dialog.fields.currency.label",
			placeholder: "override_product.dialog.fields.currency.placeholder",
			key: ENUM_FORM_OVERRIDE_PRODUCT.CURRENCY,
			fieldType: "select",
			options: useAcceptedCurrencyOptions().currencyOptions,
			defaultValue: DEFAULT_EVENT_CURRENCY
		}
	];

export const FORM_OVERRIDE_UNIT_ROW_FIELDS_LIST =
	(): TOverrideProductForm[] => [
		{
			label: "override_product.dialog.fields.total_price.label",
			placeholder:
				"override_product.dialog.fields.total_price.placeholder",
			key: ENUM_FORM_OVERRIDE_PRODUCT.TOTAL_PRICE,
			fieldType: "input",
			type: "number"
		},
		{
			label: "override_product.dialog.fields.currency.label",
			placeholder: "override_product.dialog.fields.currency.placeholder",
			key: ENUM_FORM_OVERRIDE_PRODUCT.CURRENCY,
			fieldType: "select",
			options: useAcceptedCurrencyOptions().currencyOptions,
			defaultValue: DEFAULT_EVENT_CURRENCY
		}
	];

export const FORM_OVERRIDE_HOUSING_CHARGE_LIST = (): TOverrideProductForm[] => [
	{
		label: "override_product.dialog.fields.charge_typ.label",
		placeholder: "override_product.dialog.fields.charge_typ.placeholder",
		key: ENUM_FORM_OVERRIDE_PRODUCT.CHARGE_TYP,
		fieldType: "select",
		options: useValueToTranslateLabel(HOTEL_ROOM_CHARGE_LABELS),
		defaultValue: ENUM_OVERRIDE_CHARGE.FIXED
	}
];

const UNIT_CHARGE_LABELS: Record<
	ENUM_OVERRIDE_UNIT_CHARGE_TYPE,
	| "override_product.dialog.fields.unit_charge.options.fixed"
	| "override_product.dialog.fields.unit_charge.options.per_person"
	| "override_product.dialog.fields.unit_charge.options.per_duration"
> = {
	[ENUM_OVERRIDE_UNIT_CHARGE.FIXED]:
		"override_product.dialog.fields.unit_charge.options.fixed",
	[ENUM_OVERRIDE_UNIT_CHARGE.PER_PERSON]:
		"override_product.dialog.fields.unit_charge.options.per_person",
	[ENUM_OVERRIDE_UNIT_CHARGE.PER_DURATION]:
		"override_product.dialog.fields.unit_charge.options.per_duration"
};

/**
 * Charge modes a per-unit row allows, per event type (contract 6):
 * rooms — fixed/per-night; fares & offerings — fixed/per-person;
 * vehicles, cars and car categories — fixed only.
 */
export const getUnitChargeOptions = (
	eventKind: ENUM_EVENT_KIND_TYPE
): {
	value: ENUM_OVERRIDE_UNIT_CHARGE_TYPE;
	label: (typeof UNIT_CHARGE_LABELS)[ENUM_OVERRIDE_UNIT_CHARGE_TYPE];
}[] => {
	let values: ENUM_OVERRIDE_UNIT_CHARGE_TYPE[];
	switch (eventKind) {
		case ENUM_EVENT_KIND.HOUSING:
			values = [
				ENUM_OVERRIDE_UNIT_CHARGE.FIXED,
				ENUM_OVERRIDE_UNIT_CHARGE.PER_DURATION
			];
			break;
		case ENUM_EVENT_KIND.BUS:
		case ENUM_EVENT_KIND.TRANSFER:
			values = [ENUM_OVERRIDE_UNIT_CHARGE.FIXED];
			break;
		default:
			values = [
				ENUM_OVERRIDE_UNIT_CHARGE.FIXED,
				ENUM_OVERRIDE_UNIT_CHARGE.PER_PERSON
			];
	}
	return values.map((value) => ({
		value,
		label: UNIT_CHARGE_LABELS[value]
	}));
};

/**
 * Per-unit arm for the dialog: the spec-derived pricing key when the member
 * spec is loaded, otherwise the type's fixed default (transfer falls back to
 * per_car).
 */
export const getPerUnitArm = (
	eventKind: ENUM_EVENT_KIND_TYPE,
	specArm: TOverridePerUnitPricing | null
): TOverridePerUnitPricing => {
	if (specArm) {
		return specArm;
	}
	switch (eventKind) {
		case ENUM_EVENT_KIND.HOUSING:
			return ENUM_OVERRIDE_PRICING_ARM.PER_ROOM;
		case ENUM_EVENT_KIND.BUS:
			return ENUM_OVERRIDE_PRICING_ARM.PER_VEHICLE;
		case ENUM_EVENT_KIND.TRANSFER:
			return ENUM_OVERRIDE_PRICING_ARM.PER_CAR;
		case ENUM_EVENT_KIND.ACTIVITY:
			return ENUM_OVERRIDE_PRICING_ARM.OFFERINGS;
		default:
			return ENUM_OVERRIDE_PRICING_ARM.PER_FARE;
	}
};

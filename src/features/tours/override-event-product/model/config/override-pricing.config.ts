import { useValueToTranslateLabel } from "@/shared/utils";

import { CURRENCY_OPTIONS } from "@/entities/commission";
import { HOTEL_ROOM_CHARGE_LABELS } from "@/entities/supplier";
import {
	ENUM_EVENT_BACKEND,
	type ENUM_EVENT_BACKEND_TYPE,
	ENUM_FLIGHT_PRICING_TYPE,
	ENUM_FORM_OVERRIDE_PRODUCT,
	ENUM_OVERRIDE_CHARGE,
	ENUM_OVERRIDE_PRICING_ARM,
	type ENUM_OVERRIDE_PRICING_ARM_TYPE,
	ENUM_OVERRIDE_UNIT_CHARGE,
	type ENUM_OVERRIDE_UNIT_CHARGE_TYPE,
	type TOverridePerUnitPricing,
	type TOverrideProductForm
} from "@/entities/tour";

const PRICING_TYPE_OPTIONS = [
	{
		value: ENUM_FLIGHT_PRICING_TYPE.FLAT_RATE,
		label: "override_product.dialog.fields.pricing_type.options.flat_rate"
	},
	{
		value: ENUM_FLIGHT_PRICING_TYPE.PER_PERSON,
		label: "override_product.dialog.fields.pricing_type.options.per_person"
	}
];

export const FORM_OVERRIDE_PRICING_LIST: TOverrideProductForm[] = [
	{
		label: "override_product.dialog.fields.pricing_type.label",
		placeholder: "override_product.dialog.fields.pricing_type.placeholder",
		key: ENUM_FORM_OVERRIDE_PRODUCT.PRICING_TYPE,
		fieldType: "select",
		options: PRICING_TYPE_OPTIONS
	},
	{
		label: "override_product.dialog.fields.total_price.label",
		placeholder: "override_product.dialog.fields.total_price.placeholder",
		key: ENUM_FORM_OVERRIDE_PRODUCT.TOTAL_PRICE,
		fieldType: "input",
		type: "number"
	},
	{
		label: "override_product.dialog.fields.currency.label",
		placeholder: "override_product.dialog.fields.currency.placeholder",
		key: ENUM_FORM_OVERRIDE_PRODUCT.CURRENCY,
		fieldType: "select",
		options: CURRENCY_OPTIONS
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

/** Arm selector: reprice whole vs per unit. `perUnitArm` is the backend pricing key for this event type. */
export const FORM_OVERRIDE_ARM_LIST = (
	perUnitArm: ENUM_OVERRIDE_PRICING_ARM_TYPE
): TOverrideProductForm[] => [
	{
		label: "override_product.dialog.fields.pricing_arm.label",
		placeholder: "override_product.dialog.fields.pricing_arm.placeholder",
		key: ENUM_FORM_OVERRIDE_PRODUCT.PRICING_ARM,
		fieldType: "select",
		options: [
			{
				value: ENUM_OVERRIDE_PRICING_ARM.WHOLE,
				label: "override_product.dialog.fields.pricing_arm.options.whole"
			},
			{
				value: perUnitArm,
				label: "override_product.dialog.fields.pricing_arm.options.per_unit"
			}
		]
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
	eventTyp: ENUM_EVENT_BACKEND_TYPE
): {
	value: ENUM_OVERRIDE_UNIT_CHARGE_TYPE;
	label: (typeof UNIT_CHARGE_LABELS)[ENUM_OVERRIDE_UNIT_CHARGE_TYPE];
}[] => {
	let values: ENUM_OVERRIDE_UNIT_CHARGE_TYPE[];
	switch (eventTyp) {
		case ENUM_EVENT_BACKEND.HOUSING:
			values = [
				ENUM_OVERRIDE_UNIT_CHARGE.FIXED,
				ENUM_OVERRIDE_UNIT_CHARGE.PER_DURATION
			];
			break;
		case ENUM_EVENT_BACKEND.BUS:
		case ENUM_EVENT_BACKEND.TRANSFER:
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
	eventTyp: ENUM_EVENT_BACKEND_TYPE,
	specArm: TOverridePerUnitPricing | null
): ENUM_OVERRIDE_PRICING_ARM_TYPE => {
	if (specArm) {
		return specArm;
	}
	switch (eventTyp) {
		case ENUM_EVENT_BACKEND.HOUSING:
			return ENUM_OVERRIDE_PRICING_ARM.PER_ROOM;
		case ENUM_EVENT_BACKEND.BUS:
			return ENUM_OVERRIDE_PRICING_ARM.PER_VEHICLE;
		case ENUM_EVENT_BACKEND.TRANSFER:
			return ENUM_OVERRIDE_PRICING_ARM.PER_CAR;
		case ENUM_EVENT_BACKEND.ACTIVITY:
			return ENUM_OVERRIDE_PRICING_ARM.OFFERINGS;
		default:
			return ENUM_OVERRIDE_PRICING_ARM.PER_FARE;
	}
};

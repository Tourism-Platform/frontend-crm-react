import type { TTourCommonEventsKeys } from "@/shared/config";
import type { TFormField } from "@/shared/types";

import type { ENUM_CURRENCY_OPTIONS_TYPE } from "@/entities/commission";

import type { IFeeFormRow } from "./fee.types";
import type {
	ENUM_FLIGHT_PRICING_TYPE_TYPE,
	IFlightPriceRowMarkup
} from "./flight/pricing.types";

/** Housing whole-arm charge modes (fixed whole stay vs per-night rate). */
export const ENUM_OVERRIDE_CHARGE = {
	FIXED: "fixed",
	PER_DURATION: "per_duration"
} as const;

export type ENUM_OVERRIDE_CHARGE_TYPE =
	(typeof ENUM_OVERRIDE_CHARGE)[keyof typeof ENUM_OVERRIDE_CHARGE];

/** Per-unit row charge modes — the allowed subset depends on the event type. */
export const ENUM_OVERRIDE_UNIT_CHARGE = {
	FIXED: "fixed",
	PER_PERSON: "per_person",
	PER_DURATION: "per_duration"
} as const;

export type ENUM_OVERRIDE_UNIT_CHARGE_TYPE =
	(typeof ENUM_OVERRIDE_UNIT_CHARGE)[keyof typeof ENUM_OVERRIDE_UNIT_CHARGE];

/**
 * Override pricing arm — the values ARE the backend pricing keys (contract
 * 6), so the form arm maps 1:1 onto the `rates.pricing` discriminator.
 * Activity has no whole arm: its "arm" is the offerings list.
 */
export const ENUM_OVERRIDE_PRICING_ARM = {
	WHOLE: "whole",
	PER_ROOM: "per_room",
	PER_FARE: "per_fare",
	PER_VEHICLE: "per_vehicle",
	PER_CAR: "per_car",
	PER_CAR_CATEGORY: "per_car_category",
	OFFERINGS: "offerings"
} as const;

export type ENUM_OVERRIDE_PRICING_ARM_TYPE =
	(typeof ENUM_OVERRIDE_PRICING_ARM)[keyof typeof ENUM_OVERRIDE_PRICING_ARM];

export const ENUM_FORM_OVERRIDE_PRODUCT = {
	PRICING_TYPE: "pricing_type",
	CHARGE_TYP: "charge_typ",
	TOTAL_PRICE: "total_price",
	FEES: "fees",
	CURRENCY: "currency",
	CHECK_IN_FROM: "check_in_from",
	CHECK_OUT_UNTIL: "check_out_until",
	PRICING_ARM: "pricing_arm",
	UNITS: "units",
	ADD_MARGIN_SEPARATELY: "add_margin_separately",
	MARKUP: "markup"
} as const;

export type ENUM_FORM_OVERRIDE_PRODUCT_TYPE =
	(typeof ENUM_FORM_OVERRIDE_PRODUCT)[keyof typeof ENUM_FORM_OVERRIDE_PRODUCT];

export type TOverrideProductForm = TFormField<
	TTourCommonEventsKeys,
	ENUM_FORM_OVERRIDE_PRODUCT_TYPE
>;

/** One repriced unit row (fare / vehicle / car / category / room / offering). */
export interface IOverrideUnitFormRow {
	unit_id: string;
	/** Readonly label from the product spec. */
	name: string;
	charge_typ: ENUM_OVERRIDE_UNIT_CHARGE_TYPE;
	total_price: number | null;
	currency: ENUM_CURRENCY_OPTIONS_TYPE;
	fees: IFeeFormRow[];
	markup: IFlightPriceRowMarkup | null;
}

export type TOverrideProductFormValues = {
	[ENUM_FORM_OVERRIDE_PRODUCT.PRICING_TYPE]: ENUM_FLIGHT_PRICING_TYPE_TYPE;
	[ENUM_FORM_OVERRIDE_PRODUCT.CHARGE_TYP]: ENUM_OVERRIDE_CHARGE_TYPE;
	[ENUM_FORM_OVERRIDE_PRODUCT.TOTAL_PRICE]: number | null;
	[ENUM_FORM_OVERRIDE_PRODUCT.FEES]: IFeeFormRow[];
	[ENUM_FORM_OVERRIDE_PRODUCT.CURRENCY]: ENUM_CURRENCY_OPTIONS_TYPE;
	[ENUM_FORM_OVERRIDE_PRODUCT.CHECK_IN_FROM]: string;
	[ENUM_FORM_OVERRIDE_PRODUCT.CHECK_OUT_UNTIL]: string;
	[ENUM_FORM_OVERRIDE_PRODUCT.PRICING_ARM]: ENUM_OVERRIDE_PRICING_ARM_TYPE;
	[ENUM_FORM_OVERRIDE_PRODUCT.UNITS]: IOverrideUnitFormRow[];
	[ENUM_FORM_OVERRIDE_PRODUCT.ADD_MARGIN_SEPARATELY]: boolean;
	[ENUM_FORM_OVERRIDE_PRODUCT.MARKUP]: IFlightPriceRowMarkup | null;
};

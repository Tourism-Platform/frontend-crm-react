import type { z } from "zod";

import type { GUIDE_PRICING_SCHEMA } from "../../schema/guide/pricing.schema";

export const ENUM_GUIDE_PRICING_INVOICING = {
	INDIVIDUAL: "individual",
	PART_OF_PACKAGE: "part_of_package"
} as const;

export type ENUM_GUIDE_PRICING_INVOICING_TYPE =
	(typeof ENUM_GUIDE_PRICING_INVOICING)[keyof typeof ENUM_GUIDE_PRICING_INVOICING];

/** `GuideByLanguageCategory.expenses.typ`: flat for the engagement or per day. */
export const ENUM_GUIDE_CHARGE = {
	FIXED: "fixed",
	PER_DURATION: "per_duration"
} as const;

export type ENUM_GUIDE_CHARGE_TYPE =
	(typeof ENUM_GUIDE_CHARGE)[keyof typeof ENUM_GUIDE_CHARGE];

export const ENUM_GUIDE_MARKUP_TYP = {
	FIXED: "fixed",
	PERCENTAGE: "percentage"
} as const;

export type ENUM_GUIDE_MARKUP_TYP_TYPE =
	(typeof ENUM_GUIDE_MARKUP_TYP)[keyof typeof ENUM_GUIDE_MARKUP_TYP];

/**
 * One price matrix for every language of the pool member: charge mode,
 * currency, group-size bounds, fees, markup and extra costs are shared,
 * each row holds one language's price per column (fe6.6 §10).
 */
export const ENUM_GUIDE_PRICING_FIELD = {
	INVOICING: "invoicing",
	ADD_MARGIN_SEPARATELY: "add_margin_separately",
	CHARGE_TYP: "charge_typ",
	CURRENCY: "currency",
	BOUNDS: "bounds",
	ROWS: "rows",
	FEES: "fees",
	MARKUP: "markup",
	EXTRA_COSTS: "extra_costs",
	/** Read only: the stored categories did not share one shape. */
	IS_LEGACY_SHAPE: "is_legacy_shape",
	PACKAGE_ID: "package_id"
} as const;

export type ENUM_GUIDE_PRICING_FIELD_TYPE =
	(typeof ENUM_GUIDE_PRICING_FIELD)[keyof typeof ENUM_GUIDE_PRICING_FIELD];

export const ENUM_GUIDE_PRICE_ROW_FIELD = {
	LANG: "lang",
	COSTS: "costs"
} as const;

export type ENUM_GUIDE_PRICE_ROW_FIELD_TYPE =
	(typeof ENUM_GUIDE_PRICE_ROW_FIELD)[keyof typeof ENUM_GUIDE_PRICE_ROW_FIELD];

export const ENUM_GUIDE_PRICE_BOUND_FIELD = {
	UP_TO_PAX: "up_to_pax"
} as const;

export type ENUM_GUIDE_PRICE_BOUND_FIELD_TYPE =
	(typeof ENUM_GUIDE_PRICE_BOUND_FIELD)[keyof typeof ENUM_GUIDE_PRICE_BOUND_FIELD];

/** Row language for `lang: null` — the fallback price of any tour language. */
export const GUIDE_ANY_LANGUAGE = "any";

/** Bounds plus the open-ended last column. */
export const GUIDE_MAX_PRICE_COLUMNS = 10;

export interface IGuidePriceRowMarkup {
	typ: ENUM_GUIDE_MARKUP_TYP_TYPE;
	value: string;
}

/** Column `i` covers previous bound + 1 .. `up_to_pax`; the last column has no bound. */
export interface IGuidePriceBound {
	[ENUM_GUIDE_PRICE_BOUND_FIELD.UP_TO_PAX]: number | null;
}

/** One `GuideByLanguageCategory`; with the flat charge only `costs[0]` counts. */
export interface IGuidePriceRow {
	[ENUM_GUIDE_PRICE_ROW_FIELD.LANG]: string;
	[ENUM_GUIDE_PRICE_ROW_FIELD.COSTS]: (number | null)[];
}

export type TGuidePricingSchema = z.infer<typeof GUIDE_PRICING_SCHEMA>;

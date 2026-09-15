export const ENUM_BREAKDOWN_LINE_KIND = {
	UNIT: "unit",
	EXTRA_COST: "extra_cost",
	SURCHARGE: "surcharge"
} as const;

export type ENUM_BREAKDOWN_LINE_KIND_TYPE =
	(typeof ENUM_BREAKDOWN_LINE_KIND)[keyof typeof ENUM_BREAKDOWN_LINE_KIND];

export const ENUM_BREAKDOWN_PRICING = {
	FIXED: "fixed",
	PER_PERSON: "per_person",
	PER_GROUP: "per_group",
	PER_DURATION: "per_duration"
} as const;

export type ENUM_BREAKDOWN_PRICING_TYPE =
	(typeof ENUM_BREAKDOWN_PRICING)[keyof typeof ENUM_BREAKDOWN_PRICING];

export const ENUM_PRICING_WARNING = {
	FLAT_CHARGE_ON_MULTI_NIGHT_STAY: "flat_charge_on_multi_night_stay",
	FLAT_CHARGE_ON_MULTI_DAY_GUIDE: "flat_charge_on_multi_day_guide",
	FIXED_CHARGE_ON_SIGHTSEEING: "fixed_charge_on_sightseeing",
	EMPTY_SUPPLY: "empty_supply",
	ZERO_COST: "zero_cost"
} as const;

export type ENUM_PRICING_WARNING_TYPE =
	(typeof ENUM_PRICING_WARNING)[keyof typeof ENUM_PRICING_WARNING];

export const ENUM_PRICING_REVIEW_ROW = {
	EVENT: "event",
	BREAKDOWN_GROUP: "breakdown-group",
	BREAKDOWN_LINE: "breakdown-line"
} as const;

export type ENUM_PRICING_REVIEW_ROW_TYPE =
	(typeof ENUM_PRICING_REVIEW_ROW)[keyof typeof ENUM_PRICING_REVIEW_ROW];

export const ENUM_BREAKDOWN_LEG = {
	MIN: "min",
	MAX: "max"
} as const;

export type ENUM_BREAKDOWN_LEG_TYPE =
	(typeof ENUM_BREAKDOWN_LEG)[keyof typeof ENUM_BREAKDOWN_LEG];

export interface IPricingMoney {
	val: number;
	currency?: string;
}

export interface IPricingBreakdownLine {
	kind: ENUM_BREAKDOWN_LINE_KIND_TYPE;
	label: string | null;
	unitId: string | null;
	pricing: ENUM_BREAKDOWN_PRICING_TYPE | null;
	rate: ENUM_BREAKDOWN_PRICING_TYPE | null;
	unitCost: IPricingMoney;
	quantity: number;
	pax: number | null;
	duration: number | null;
	fxRate: string | null;
	cost: IPricingMoney;
	fee: IPricingMoney;
	markup: IPricingMoney;
}

export interface IPricingBreakdownSpread {
	min: IPricingBreakdownLine[];
	max: IPricingBreakdownLine[];
}

export const isPricingReviewBreakdownRow = (
	row: { rowKind?: ENUM_PRICING_REVIEW_ROW_TYPE } | null | undefined
): boolean =>
	row?.rowKind === ENUM_PRICING_REVIEW_ROW.BREAKDOWN_GROUP ||
	row?.rowKind === ENUM_PRICING_REVIEW_ROW.BREAKDOWN_LINE;

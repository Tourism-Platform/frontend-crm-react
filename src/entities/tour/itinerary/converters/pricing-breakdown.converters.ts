import { createEnumMapper, formatToDollars } from "@/shared/utils";

import type { TMonetaryValueBackend } from "@/entities/supplier/types/supplier-money-backend.types";
import {
	ENUM_BREAKDOWN_LEG,
	ENUM_BREAKDOWN_LINE_KIND,
	type ENUM_BREAKDOWN_LINE_KIND_TYPE,
	ENUM_BREAKDOWN_PRICING,
	type ENUM_BREAKDOWN_PRICING_TYPE,
	ENUM_PRICING_REVIEW_ROW,
	ENUM_PRICING_WARNING,
	type ENUM_PRICING_WARNING_TYPE,
	type IPricingBreakdownLine,
	type IPricingBreakdownSpread,
	type IPricingMoney
} from "@/entities/tour/tour/types/pricing-breakdown.types";
import type { ITourReviewItem } from "@/entities/tour/tour/types/tour-review.interface";

import {
	ENUM_BREAKDOWN_LINE_KIND_BACKEND,
	type ENUM_BREAKDOWN_LINE_KIND_BACKEND_TYPE,
	ENUM_EXPENSE_TYPE_BACKEND,
	type ENUM_EXPENSE_TYPE_BACKEND_TYPE,
	ENUM_PRICING_WARNING_BACKEND,
	type ENUM_PRICING_WARNING_BACKEND_TYPE,
	type TBreakdownLineBackend,
	type TBreakdownSpreadBackend,
	type TPricingWarningBackend
} from "../types";

const MAP_BREAKDOWN_LINE_KIND: Partial<
	Record<ENUM_BREAKDOWN_LINE_KIND_BACKEND_TYPE, ENUM_BREAKDOWN_LINE_KIND_TYPE>
> = {
	[ENUM_BREAKDOWN_LINE_KIND_BACKEND.UNIT]: ENUM_BREAKDOWN_LINE_KIND.UNIT,
	[ENUM_BREAKDOWN_LINE_KIND_BACKEND.EXTRA_COST]:
		ENUM_BREAKDOWN_LINE_KIND.EXTRA_COST,
	[ENUM_BREAKDOWN_LINE_KIND_BACKEND.SURCHARGE]:
		ENUM_BREAKDOWN_LINE_KIND.SURCHARGE
};

export const breakdownLineKindMapper = createEnumMapper<
	ENUM_BREAKDOWN_LINE_KIND_BACKEND_TYPE,
	ENUM_BREAKDOWN_LINE_KIND_TYPE
>(MAP_BREAKDOWN_LINE_KIND);

const MAP_BREAKDOWN_PRICING: Partial<
	Record<ENUM_EXPENSE_TYPE_BACKEND_TYPE, ENUM_BREAKDOWN_PRICING_TYPE>
> = {
	[ENUM_EXPENSE_TYPE_BACKEND.FIXED]: ENUM_BREAKDOWN_PRICING.FIXED,
	[ENUM_EXPENSE_TYPE_BACKEND.PER_PERSON]: ENUM_BREAKDOWN_PRICING.PER_PERSON,
	[ENUM_EXPENSE_TYPE_BACKEND.PER_GROUP]: ENUM_BREAKDOWN_PRICING.PER_GROUP,
	[ENUM_EXPENSE_TYPE_BACKEND.PER_DURATION]:
		ENUM_BREAKDOWN_PRICING.PER_DURATION
};

export const breakdownPricingMapper = createEnumMapper<
	ENUM_EXPENSE_TYPE_BACKEND_TYPE,
	ENUM_BREAKDOWN_PRICING_TYPE
>(MAP_BREAKDOWN_PRICING);

const MAP_PRICING_WARNING: Partial<
	Record<ENUM_PRICING_WARNING_BACKEND_TYPE, ENUM_PRICING_WARNING_TYPE>
> = {
	[ENUM_PRICING_WARNING_BACKEND.FLAT_CHARGE_ON_MULTI_NIGHT_STAY]:
		ENUM_PRICING_WARNING.FLAT_CHARGE_ON_MULTI_NIGHT_STAY,
	[ENUM_PRICING_WARNING_BACKEND.FLAT_CHARGE_ON_MULTI_DAY_GUIDE]:
		ENUM_PRICING_WARNING.FLAT_CHARGE_ON_MULTI_DAY_GUIDE,
	[ENUM_PRICING_WARNING_BACKEND.FIXED_CHARGE_ON_SIGHTSEEING]:
		ENUM_PRICING_WARNING.FIXED_CHARGE_ON_SIGHTSEEING,
	[ENUM_PRICING_WARNING_BACKEND.EMPTY_SUPPLY]:
		ENUM_PRICING_WARNING.EMPTY_SUPPLY,
	[ENUM_PRICING_WARNING_BACKEND.ZERO_COST]: ENUM_PRICING_WARNING.ZERO_COST
};

export const pricingWarningMapper = createEnumMapper<
	ENUM_PRICING_WARNING_BACKEND_TYPE,
	ENUM_PRICING_WARNING_TYPE
>(MAP_PRICING_WARNING);

export const mapPricingMoneyToFrontend = (
	backend: TMonetaryValueBackend
): IPricingMoney => ({
	val: backend.val,
	currency: backend.currency
});

export const mapBreakdownLineToFrontend = (
	backend: TBreakdownLineBackend
): IPricingBreakdownLine => ({
	kind:
		breakdownLineKindMapper.to(backend.kind) ??
		ENUM_BREAKDOWN_LINE_KIND.UNIT,
	label: backend.label,
	unitId: backend.unit_id,
	pricing: backend.pricing
		? (breakdownPricingMapper.to(backend.pricing) ?? null)
		: null,
	rate: backend.rate
		? (breakdownPricingMapper.to(backend.rate) ?? null)
		: null,
	unitCost: mapPricingMoneyToFrontend(backend.unit_cost),
	quantity: backend.quantity,
	pax: backend.pax,
	duration: backend.duration,
	fxRate: backend.fx_rate,
	cost: mapPricingMoneyToFrontend(backend.cost),
	fee: mapPricingMoneyToFrontend(backend.fee),
	markup: mapPricingMoneyToFrontend(backend.markup),
	supplyId: backend.supply_id
});

export const mapBreakdownSpreadToFrontend = (
	backend: TBreakdownSpreadBackend
): IPricingBreakdownSpread => ({
	min: backend.min.map(mapBreakdownLineToFrontend),
	max: backend.max.map(mapBreakdownLineToFrontend)
});

export const mapPricingWarningsToFrontend = (
	warnings: TPricingWarningBackend[]
): ENUM_PRICING_WARNING_TYPE[] => pricingWarningMapper.toMany(warnings);

const formatBreakdownLineTitle = (line: IPricingBreakdownLine): string => {
	const label = line.label?.trim() || "-";
	if (line.quantity > 1) {
		return `${label} × ${line.quantity}`;
	}
	return label;
};

const mapBreakdownLineToReviewItem = (
	parentId: string,
	leg: (typeof ENUM_BREAKDOWN_LEG)[keyof typeof ENUM_BREAKDOWN_LEG],
	line: IPricingBreakdownLine,
	index: number,
	day: number,
	position: number
): ITourReviewItem => ({
	id: `${parentId}:${leg}:${line.supplyId ?? ""}:${line.unitId ?? index}`,
	item: formatBreakdownLineTitle(line),
	supplier: line.kind,
	plannedCost: formatToDollars(line.cost.val),
	estimatedRevenue: formatToDollars(line.markup.val),
	day,
	position,
	optionIndex: 0,
	rowKind: ENUM_PRICING_REVIEW_ROW.BREAKDOWN_LINE
});

const mapBreakdownLegToReviewItem = (
	parentId: string,
	leg: (typeof ENUM_BREAKDOWN_LEG)[keyof typeof ENUM_BREAKDOWN_LEG],
	lines: IPricingBreakdownLine[],
	day: number,
	position: number
): ITourReviewItem | null => {
	if (!lines.length) return null;

	return {
		id: `${parentId}:${leg}`,
		item: leg,
		supplier: "-",
		day,
		position,
		optionIndex: 0,
		rowKind: ENUM_PRICING_REVIEW_ROW.BREAKDOWN_GROUP,
		breakdownLeg: leg,
		subRows: lines.map((line, index) =>
			mapBreakdownLineToReviewItem(
				parentId,
				leg,
				line,
				index,
				day,
				position
			)
		)
	};
};

export const mapBreakdownSpreadToReviewSubRows = (
	parentId: string,
	spread: IPricingBreakdownSpread,
	day: number,
	position: number
): ITourReviewItem[] =>
	[
		mapBreakdownLegToReviewItem(
			parentId,
			ENUM_BREAKDOWN_LEG.MIN,
			spread.min,
			day,
			position
		),
		mapBreakdownLegToReviewItem(
			parentId,
			ENUM_BREAKDOWN_LEG.MAX,
			spread.max,
			day,
			position
		)
	].filter((row): row is ITourReviewItem => row !== null);

export const attachBreakdownToReviewItem = (
	item: ITourReviewItem,
	spread: TBreakdownSpreadBackend,
	warnings?: TPricingWarningBackend[]
): ITourReviewItem => {
	const breakdown = mapBreakdownSpreadToFrontend(spread);
	const breakdownRows = mapBreakdownSpreadToReviewSubRows(
		item.id,
		breakdown,
		item.day,
		item.position
	);
	const eventChildren = item.subRows ?? [];

	return {
		...item,
		breakdown,
		warnings: warnings ? mapPricingWarningsToFrontend(warnings) : undefined,
		subRows:
			breakdownRows.length || eventChildren.length
				? [...breakdownRows, ...eventChildren]
				: undefined
	};
};

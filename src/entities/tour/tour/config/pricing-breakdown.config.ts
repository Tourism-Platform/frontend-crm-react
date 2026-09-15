import type { LucideIcon } from "lucide-react";
import {
	Layers,
	Percent,
	Receipt,
	TrendingDown,
	TrendingUp
} from "lucide-react";

import {
	ENUM_BREAKDOWN_LEG,
	type ENUM_BREAKDOWN_LEG_TYPE,
	ENUM_BREAKDOWN_LINE_KIND,
	type ENUM_BREAKDOWN_LINE_KIND_TYPE,
	ENUM_PRICING_REVIEW_ROW,
	type ENUM_PRICING_REVIEW_ROW_TYPE
} from "../types/pricing-breakdown.types";

export interface IBreakdownRowMetadata {
	icon: LucideIcon;
	color_bg: string;
}

export const BREAKDOWN_LEG_METADATA: Record<
	ENUM_BREAKDOWN_LEG_TYPE,
	IBreakdownRowMetadata
> = {
	[ENUM_BREAKDOWN_LEG.MIN]: {
		icon: TrendingDown,
		color_bg: "bg-teal-600"
	},
	[ENUM_BREAKDOWN_LEG.MAX]: {
		icon: TrendingUp,
		color_bg: "bg-rose-600"
	}
};

export const BREAKDOWN_LINE_KIND_METADATA: Record<
	ENUM_BREAKDOWN_LINE_KIND_TYPE,
	IBreakdownRowMetadata
> = {
	[ENUM_BREAKDOWN_LINE_KIND.UNIT]: {
		icon: Layers,
		color_bg: "bg-stone-600"
	},
	[ENUM_BREAKDOWN_LINE_KIND.EXTRA_COST]: {
		icon: Receipt,
		color_bg: "bg-yellow-600"
	},
	[ENUM_BREAKDOWN_LINE_KIND.SURCHARGE]: {
		icon: Percent,
		color_bg: "bg-fuchsia-600"
	}
};

const isBreakdownLineKind = (
	value: string | undefined
): value is ENUM_BREAKDOWN_LINE_KIND_TYPE =>
	value === ENUM_BREAKDOWN_LINE_KIND.UNIT ||
	value === ENUM_BREAKDOWN_LINE_KIND.EXTRA_COST ||
	value === ENUM_BREAKDOWN_LINE_KIND.SURCHARGE;

export const getBreakdownRowMetadata = (item: {
	rowKind?: ENUM_PRICING_REVIEW_ROW_TYPE;
	breakdownLeg?: ENUM_BREAKDOWN_LEG_TYPE;
	supplier?: string;
}): IBreakdownRowMetadata | null => {
	if (item.rowKind === ENUM_PRICING_REVIEW_ROW.BREAKDOWN_GROUP) {
		return item.breakdownLeg
			? BREAKDOWN_LEG_METADATA[item.breakdownLeg]
			: BREAKDOWN_LEG_METADATA[ENUM_BREAKDOWN_LEG.MIN];
	}

	if (
		item.rowKind === ENUM_PRICING_REVIEW_ROW.BREAKDOWN_LINE &&
		isBreakdownLineKind(item.supplier)
	) {
		return BREAKDOWN_LINE_KIND_METADATA[item.supplier];
	}

	return null;
};

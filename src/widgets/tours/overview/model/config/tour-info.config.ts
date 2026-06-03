import type { TTourOverviewPageKeys } from "@/shared/config";
import {
	formatCompactAmount,
	isDecimalRangeEqual,
	isDecimalRangeZero
} from "@/shared/utils";

import type { ITourStatRange, ITourStatistics } from "@/entities/tour";

import type { ITourStatCardConfig } from "../types";

const REVENUE_STAT_FIELDS = [
	{
		label: "info.fields.estimated_revenue",
		key: "estimatedRevenue"
	},
	{
		label: "info.fields.confirmed_revenue",
		key: "confirmedRevenue"
	},
	{
		label: "info.fields.unconfirmed_revenue",
		key: "unconfirmedRevenue"
	}
] as const satisfies ReadonlyArray<{
	label: TTourOverviewPageKeys;
	key: keyof Pick<
		ITourStatistics,
		"estimatedRevenue" | "confirmedRevenue" | "unconfirmedRevenue"
	>;
}>;

const buildRevenueCardValue = (
	currency: string,
	range: ITourStatRange
): string => {
	const { min, max } = range;

	if (isDecimalRangeZero(min, max)) {
		return `${currency} ${formatCompactAmount(0)}`;
	}

	if (isDecimalRangeEqual(min, max)) {
		return `${currency} ${formatCompactAmount(min)}`;
	}

	return `${currency} ${formatCompactAmount(min)} – ${formatCompactAmount(max)}`;
};

export const TOUR_ORDERS_STATS_CONFIG: ITourStatCardConfig[] = [
	{
		label: "info.fields.total_sales",
		getValue: (stats) => stats.totalOrders
	},
	{
		label: "info.fields.completed",
		getValue: (stats) => stats.completed
	},
	{
		label: "info.fields.in_progress",
		getValue: (stats) => stats.inProgress
	},
	{
		label: "info.fields.tourists",
		getValue: (stats) => stats.tourists
	}
];

export const TOUR_REVENUE_STATS_CONFIG: ITourStatCardConfig[] =
	REVENUE_STAT_FIELDS.map(({ label, key }) => ({
		label,
		getValue: (stats) => buildRevenueCardValue(stats.currency, stats[key])
	}));

export const getTourStatCardValue = (
	config: ITourStatCardConfig,
	stats?: ITourStatistics
): string | number => {
	if (!stats) {
		return "-";
	}

	return config.getValue(stats);
};

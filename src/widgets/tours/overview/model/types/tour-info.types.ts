import type { TTourOverviewPageKeys } from "@/shared/config";

import type { ITourStatistics } from "@/entities/tour";

export interface ITourStatCardConfig {
	label: TTourOverviewPageKeys;
	getValue: (stats: ITourStatistics) => string | number;
}

export type TTourRevenueStatKey = keyof Pick<
	ITourStatistics,
	"estimatedRevenue" | "confirmedRevenue" | "unconfirmedRevenue"
>;

export interface ITourRevenueStatField {
	label: TTourOverviewPageKeys;
	key: TTourRevenueStatKey;
}

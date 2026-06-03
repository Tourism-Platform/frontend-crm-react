import type { TTourOverviewPageKeys } from "@/shared/config";

import type { ITourStatistics } from "@/entities/tour";

export interface ITourStatCardConfig {
	label: TTourOverviewPageKeys;
	getValue: (stats: ITourStatistics) => string | number;
}

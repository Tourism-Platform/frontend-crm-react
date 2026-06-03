import type { TourStatisticsResponse } from "@/shared/api";

import type { ITourStatistics } from "../types/tour-statistics.types";
import { subtractDecimalMaxZero } from "../utils/decimal-stat.utils";

export const mapTourStatisticsToFrontend = (
	data: TourStatisticsResponse
): ITourStatistics => {
	const confirmed = data.confirmed_revenue ?? "0";
	const plannedMin = data.planned_revenue_min ?? "0";
	const plannedMax = data.planned_revenue_max ?? "0";

	return {
		totalOrders: data.total_orders ?? 0,
		completed: data.completed ?? 0,
		inProgress: data.in_progress ?? 0,
		tourists: data.tourists ?? 0,
		estimatedRevenue: { min: plannedMin, max: plannedMax },
		confirmedRevenue: { min: confirmed, max: confirmed },
		// Нет в API: оценка неподтверждённого дохода = planned − confirmed
		unconfirmedRevenue: {
			min: subtractDecimalMaxZero(plannedMin, confirmed),
			max: subtractDecimalMaxZero(plannedMax, confirmed)
		},
		currency: data.currency ?? "USD"
	};
};

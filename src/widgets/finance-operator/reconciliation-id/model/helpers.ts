import { type TFunction } from "i18next";

import { type IBookingFinancials } from "@/entities/finance";

import { type IStatItem } from "./types";

export const getStatsItems = (
	data: IBookingFinancials,
	t: TFunction<"reconciliation_id_page", undefined>
): IStatItem[] => [
	{ label: t("stats.plannedRevenue"), value: data.plannedRevenue },
	{ label: t("stats.plannedCost"), value: data.plannedCost },
	{ label: t("stats.plannedMargin"), value: data.plannedProfit },
	{ label: t("stats.actualRevenue"), value: data.revenueAccrued },
	{ label: t("stats.actualCost"), value: data.costAccrued },
	{ label: t("stats.actualMargin"), value: data.accrualProfit }
];

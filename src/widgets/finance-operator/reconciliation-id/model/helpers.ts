import { type TFunction } from "i18next";

import { type IReconciliationDetail } from "@/entities/finance";

import { type IStatItem } from "./types";

export const getStatsItems = (
	data: IReconciliationDetail,
	t: TFunction<"reconciliation_id_page", undefined>
): IStatItem[] => [
	{ label: t("stats.plannedRevenue"), value: data.plannedRevenue },
	{ label: t("stats.plannedCost"), value: data.plannedCost },
	{ label: t("stats.plannedMargin"), value: data.plannedMargin },
	{ label: t("stats.actualRevenue"), value: data.actualRevenue },
	{ label: t("stats.actualCost"), value: data.actualCost },
	{ label: t("stats.actualMargin"), value: data.actualMargin }
];

import { type TFunction } from "i18next";

import { formatToDollars } from "@/shared/utils";

import { type IBookingFinancials } from "@/entities/finance";

export interface IFinancialsStatColumn {
	label: string;
	planned: string;
	actual: string;
}

export const getFinancialsStats = (
	data: IBookingFinancials,
	t: TFunction<"order_id_page", undefined>
): IFinancialsStatColumn[] => [
	{
		label: t("stats.revenue"),
		planned: formatToDollars(data.plannedRevenue),
		actual: formatToDollars(data.revenueAccrued)
	},
	{
		label: t("stats.cost"),
		planned: formatToDollars(data.plannedCost),
		actual: formatToDollars(data.costAccrued)
	},
	{
		label: t("stats.margin"),
		planned: formatToDollars(data.plannedProfit),
		actual: formatToDollars(data.accrualProfit)
	}
];

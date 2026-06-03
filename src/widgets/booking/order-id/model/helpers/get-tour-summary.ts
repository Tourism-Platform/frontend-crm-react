import type { TFunction } from "i18next";

import { formatToDollars } from "@/shared/utils";

import {
	ENUM_ORDER_STATUS,
	type ENUM_ORDER_STATUS_TYPE,
	type TOrderTourReviewSummary,
	isOrderTourSummaryAmounts
} from "@/entities/booking";

import type { IInfoItem } from "../types";

export const getTourSummary = (
	summary: TOrderTourReviewSummary,
	status: ENUM_ORDER_STATUS_TYPE,
	t: TFunction<"order_id_page">
): IInfoItem[] => {
	if (status === ENUM_ORDER_STATUS.NEW && summary.kind === "pricing") {
		return [
			{
				label: t("tour_review.revenue"),
				value: `${formatToDollars(summary.revenue.from)} - ${formatToDollars(summary.revenue.to)}`
			},
			{
				label: t("tour_review.profit"),
				value: `${formatToDollars(summary.profit.from)} - ${formatToDollars(summary.profit.to)}`
			}
		];
	}

	if (isOrderTourSummaryAmounts(summary)) {
		return [
			{
				label: t("tour_review.revenue"),
				value: formatToDollars(summary.revenue)
			},
			{
				label: t("tour_review.profit"),
				value: formatToDollars(summary.profit)
			},
			{
				label: t("tour_review.unpaid"),
				value: formatToDollars(summary.unpaid),
				className: "text-red-500"
			},
			{
				label: t("tour_review.paid"),
				value: formatToDollars(summary.paid),
				className: "text-green-500"
			}
		];
	}

	return [];
};

import type { TFunction } from "i18next";

import { formatToDollars } from "@/shared/utils";

import {
	type TOrderTourReviewSummary,
	isOrderTourSummaryAmounts
} from "@/entities/booking";

import type { IInfoItem } from "../types";

export const getTourSummary = (
	summary: TOrderTourReviewSummary,
	t: TFunction<"order_id_page">
): IInfoItem[] => {
	if (!isOrderTourSummaryAmounts(summary)) {
		return [];
	}

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
};

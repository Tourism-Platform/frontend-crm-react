import type { TFunction } from "i18next";

import { formatToDollars } from "@/shared/utils";

import {
	ENUM_ORDER_STATUS,
	type ENUM_ORDER_STATUS_TYPE,
	type ITourSummary,
	type ITourSummaryRange
} from "@/entities/booking";

import type { IInfoItem } from "../types";

export const getTourSummary = (
	summary: ITourSummary,
	status: ENUM_ORDER_STATUS_TYPE,
	t: TFunction<"order_id_page">
): IInfoItem[] => {
	if (status === ENUM_ORDER_STATUS.NEW) {
		return [
			{
				label: t("tour_review.revenue"),
				value: `${formatToDollars((summary?.revenue as ITourSummaryRange).from)} - ${formatToDollars((summary?.revenue as ITourSummaryRange).to)}`
			},
			{
				label: t("tour_review.profit"),
				value: `${formatToDollars((summary?.profit as ITourSummaryRange).from)} - ${formatToDollars((summary?.profit as ITourSummaryRange).to)}`
			}
		];
	}
	return [
		{
			label: t("tour_review.revenue"),
			value: formatToDollars(summary?.revenue as number)
		},
		{
			label: t("tour_review.profit"),
			value: formatToDollars(summary?.profit as number)
		},
		{
			label: t("tour_review.unpaid"),
			value: formatToDollars(summary?.unpaid as number),
			className: "text-red-500"
		},
		{
			label: t("tour_review.paid"),
			value: formatToDollars(summary?.paid as number),
			className: "text-green-500"
		}
	];
};

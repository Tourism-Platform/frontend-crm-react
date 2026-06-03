import type { ITourPricingReview } from "@/entities/tour";
import type { ITourSummaryRange } from "@/entities/tour/tour/types/tour-review.interface";

import { ENUM_ORDER_STATUS } from "../types/order-status.types";
import type {
	IOrderTourReviewData,
	IOrderTourReviewItem,
	TOrderTourReviewSummary
} from "../types/order-tour-review.types";
import type { IOrderDetail } from "../types/order.interface";

const getProfitMidpoint = (profit: ITourSummaryRange): number =>
	(profit.from + profit.to) / 2;

export const EMPTY_ORDER_TOUR_REVIEW_SUMMARY: TOrderTourReviewSummary = {
	kind: "pricing",
	revenue: { from: 0, to: 0 },
	profit: { from: 0, to: 0 }
};

export const buildOrderTourReviewData = (
	pricing: ITourPricingReview | undefined,
	order: IOrderDetail
): IOrderTourReviewData => {
	const items = (pricing?.items ?? []) as IOrderTourReviewItem[];

	if (order.status === ENUM_ORDER_STATUS.NEW && pricing) {
		return {
			items,
			summary: {
				kind: "pricing",
				revenue: pricing.summary.revenue,
				profit: pricing.summary.profit,
				cost: pricing.summary.cost
			}
		};
	}

	const tourAmount = Number(order.tourAmount) || 0;
	const paidAmount = Number(order.paidAmount) || 0;
	const profit = pricing
		? getProfitMidpoint(pricing.summary.profit)
		: tourAmount - paidAmount;

	return {
		items,
		summary: {
			kind: "amounts",
			revenue: tourAmount,
			profit,
			paid: paidAmount,
			unpaid: Math.max(tourAmount - paidAmount, 0)
		}
	};
};

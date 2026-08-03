import type {
	IOrderTourReviewData,
	IOrderTourReviewItem
} from "../types/order-tour-review.types";
import type { IOrderDetail } from "../types/order.interface";

export const EMPTY_ORDER_TOUR_REVIEW_SUMMARY: IOrderTourReviewData["summary"] =
	{
		kind: "amounts",
		revenue: 0,
		profit: 0,
		paid: 0,
		unpaid: 0
	};

export const buildOrderTourReviewData = (
	items: IOrderTourReviewItem[],
	order: IOrderDetail
): IOrderTourReviewData => {
	const tourAmount = Number(order.tourAmount) || 0;
	const paidAmount = Number(order.paidAmount) || 0;

	return {
		items,
		summary: {
			kind: "amounts",
			revenue: tourAmount,
			profit: tourAmount - paidAmount,
			paid: paidAmount,
			unpaid: Math.max(tourAmount - paidAmount, 0)
		}
	};
};

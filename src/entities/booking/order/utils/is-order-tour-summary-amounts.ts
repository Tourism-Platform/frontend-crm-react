import type {
	IOrderTourReviewSummaryAmounts,
	TOrderTourReviewSummary
} from "../types/order-tour-review.types";

export const isOrderTourSummaryAmounts = (
	summary: TOrderTourReviewSummary
): summary is IOrderTourReviewSummaryAmounts => summary.kind === "amounts";

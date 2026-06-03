import type { AvailabilityStatus } from "@/shared/api";

import type {
	ITourReviewItem,
	ITourSummaryRange
} from "@/entities/tour/tour/types/tour-review.interface";

export interface IOrderTourReviewItem extends ITourReviewItem {
	eventId?: string;
	availabilityStatus?: AvailabilityStatus;
	isApplied?: boolean;
	subRows?: IOrderTourReviewItem[];
}

export interface IOrderTourReviewSummaryPricing {
	kind: "pricing";
	revenue: ITourSummaryRange;
	profit: ITourSummaryRange;
	cost?: ITourSummaryRange;
}

export interface IOrderTourReviewSummaryAmounts {
	kind: "amounts";
	revenue: number;
	profit: number;
	paid: number;
	unpaid: number;
}

export type TOrderTourReviewSummary =
	| IOrderTourReviewSummaryPricing
	| IOrderTourReviewSummaryAmounts;

export interface IOrderTourReviewData {
	items: IOrderTourReviewItem[];
	summary: TOrderTourReviewSummary;
}

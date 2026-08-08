import type {
	ITourReviewItem,
	ITourSummaryRange
} from "@/entities/tour/tour/types/tour-review.interface";

import type { IBookingEventAvailability } from "./booking-availability.types";

export interface IOrderTourReviewItem extends ITourReviewItem {
	eventId?: string;
	availability?: IBookingEventAvailability;
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

export interface IOrderTourReviewAmounts {
	tourAmount: string;
	paidAmount: string;
}

import { type ENUM_EVENT_TYPE } from "./event.types";

export interface ITourReviewItem {
	id: string;
	item: string;
	supplier?: string;
	plannedCost?: string;
	estimatedRevenue?: string;
	type?: ENUM_EVENT_TYPE;
	day: number;
	position: number;
	optionIndex: number;
	subRows?: ITourReviewItem[];
}

export interface ITourSummaryRange {
	from: number;
	to: number;
}

export interface ITourSummary {
	revenue: ITourSummaryRange;
	cost?: ITourSummaryRange;
	profit: ITourSummaryRange;
}

export interface IPricingReviewOption {
	id: number;
	name: string;
	summary: ITourSummary;
	items: ITourReviewItem[];
}

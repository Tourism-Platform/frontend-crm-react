import { type ENUM_EVENT_TYPE } from "./event.types";

export interface ITourReviewItem {
	id: string;
	item: string;
	supplier?: string;
	plannedCost?: string;
	estimatedRevenue?: string;
	type?: ENUM_EVENT_TYPE;
	isApplied?: boolean;
	subRows?: ITourReviewItem[];
}

export interface ITourSummaryRange {
	from: number;
	to: number;
}

export interface ITourSummary {
	revenue: ITourSummaryRange;
	profit: ITourSummaryRange;
}

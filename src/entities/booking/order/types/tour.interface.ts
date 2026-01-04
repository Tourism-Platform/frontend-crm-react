import type { ENUM_EVENT_TYPE } from "@/entities/tour";

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
	revenue: ITourSummaryRange | number;
	profit: ITourSummaryRange | number;
	paid?: number;
	unpaid?: number;
}

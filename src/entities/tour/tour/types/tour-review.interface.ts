import type { ENUM_EVENT_BACKEND_TYPE } from "../../itinerary/types/event-backend-enum.types";
import type { IEventPoolMemberSummary } from "../../itinerary/types/event-pool.types";

import type { ENUM_EVENT_TYPE } from "./event.types";
import type {
	ENUM_BREAKDOWN_LEG_TYPE,
	ENUM_PRICING_REVIEW_ROW_TYPE,
	ENUM_PRICING_WARNING_TYPE,
	IPricingBreakdownSpread
} from "./pricing-breakdown.types";

export interface ITourReviewItem {
	id: string;
	item: string;
	supplier?: string;
	plannedCost?: string;
	estimatedRevenue?: string;
	type?: ENUM_EVENT_TYPE;
	backendTyp?: ENUM_EVENT_BACKEND_TYPE;
	day: number;
	position: number;
	optionIndex: number;
	subRows?: ITourReviewItem[];
	breakdown?: IPricingBreakdownSpread;
	warnings?: ENUM_PRICING_WARNING_TYPE[];
	rowKind?: ENUM_PRICING_REVIEW_ROW_TYPE;
	breakdownLeg?: ENUM_BREAKDOWN_LEG_TYPE;
	pool?: IEventPoolMemberSummary[];
}

export interface ITourSummaryRange {
	from: number;
	to: number;
}

export interface ITourPaxRange {
	from: number;
	to: number;
}

export interface ITourSummary {
	pax: ITourPaxRange;
	revenue: ITourSummaryRange;
	revenuePerPerson: ITourSummaryRange;
	cost?: ITourSummaryRange;
	profit: ITourSummaryRange;
}

export interface IPricingReviewOption {
	id: number;
	name: string;
	summary: ITourSummary;
	items: ITourReviewItem[];
}

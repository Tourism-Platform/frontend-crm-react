import type { Currency } from "@/shared/api";

import type {
	ITourReviewItem,
	ITourSummary
} from "@/entities/tour/tour/types/tour-review.interface";

export interface ITourPricingReview {
	summary: ITourSummary;
	items: ITourReviewItem[];
}

export const ENUM_PRICING_BREAKDOWN_PARAM = {
	DATE: "date",
	PAX: "pax",
	AS_OF: "asOf"
} as const;

export type ENUM_PRICING_BREAKDOWN_PARAM_TYPE =
	(typeof ENUM_PRICING_BREAKDOWN_PARAM)[keyof typeof ENUM_PRICING_BREAKDOWN_PARAM];

export interface IPricingBreakdownParams {
	date?: string | null;
	pax?: number | null;
	/** Дата, на которую считается шаблон цен (`as_of`) */
	asOf?: string | null;
}

export interface IPricingBreakdownArgs extends IPricingBreakdownParams {
	tourId: string;
	optionId: string;
	currency?: Currency;
}

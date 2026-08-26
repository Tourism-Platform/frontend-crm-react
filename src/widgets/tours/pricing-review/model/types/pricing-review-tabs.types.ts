import type { ITourReviewItem } from "@/entities/tour";

export const ENUM_PRICING_REVIEW_TABLE_TAB = {
	EVENTS: "events",
	PACKAGES: "packages"
} as const;

export type ENUM_PRICING_REVIEW_TABLE_TAB_TYPE =
	(typeof ENUM_PRICING_REVIEW_TABLE_TAB)[keyof typeof ENUM_PRICING_REVIEW_TABLE_TAB];

export interface IPricingReviewSlotContext {
	tourId: string;
	optionId: string;
	items: ITourReviewItem[];
}

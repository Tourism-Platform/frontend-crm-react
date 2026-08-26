import { type IQueryTab } from "@/shared/ui";

import { PricingReviewPackagesTable } from "../../ui/pricing-review-packages-table";
import { PricingReviewTable } from "../../ui/pricing-review-table";
import {
	ENUM_PRICING_REVIEW_TABLE_TAB,
	type IPricingReviewSlotContext
} from "../types";

type TPricingReviewEventsTabExtra = Pick<
	IPricingReviewSlotContext,
	"tourId" | "optionId" | "items"
>;

type TPricingReviewPackagesTabExtra = Pick<
	IPricingReviewSlotContext,
	"tourId" | "optionId"
>;

type TPricingReviewEventsTab = IQueryTab<
	typeof ENUM_PRICING_REVIEW_TABLE_TAB.EVENTS,
	"tour_pricing_review_page",
	string,
	never,
	IPricingReviewSlotContext,
	TPricingReviewEventsTabExtra
>;

type TPricingReviewPackagesTab = IQueryTab<
	typeof ENUM_PRICING_REVIEW_TABLE_TAB.PACKAGES,
	"tour_pricing_review_page",
	string,
	never,
	IPricingReviewSlotContext,
	TPricingReviewPackagesTabExtra
>;

export const PRICING_REVIEW_TABLE_TABS: (
	| TPricingReviewEventsTab
	| TPricingReviewPackagesTab
)[] = [
	{
		type: ENUM_PRICING_REVIEW_TABLE_TAB.EVENTS,
		label: "tabs.events",
		slot: PricingReviewTable,
		getSlotProps: ({ tourId, optionId, items }) => ({
			tourId,
			optionId,
			items
		})
	},
	{
		type: ENUM_PRICING_REVIEW_TABLE_TAB.PACKAGES,
		label: "tabs.packages",
		slot: PricingReviewPackagesTable,
		getSlotProps: ({ tourId, optionId }) => ({
			tourId,
			optionId
		})
	}
];

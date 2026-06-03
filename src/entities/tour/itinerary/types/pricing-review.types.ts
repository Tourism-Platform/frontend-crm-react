import type {
	ITourReviewItem,
	ITourSummary
} from "@/entities/tour/tour/types/tour-review.interface";

export interface ITourPricingReview {
	summary: ITourSummary;
	items: ITourReviewItem[];
}

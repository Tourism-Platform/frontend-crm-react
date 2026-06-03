import type { PRICING_REVIEW_PATHS } from "@/shared/api";

export type TGetTourSummaryBackendResponce = ReturnType<
	typeof PRICING_REVIEW_PATHS.getTourSummary
>["_types"]["response"];

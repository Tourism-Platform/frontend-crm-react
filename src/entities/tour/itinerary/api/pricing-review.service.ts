import type { Currency } from "@/shared/api";
import { ENUM_API_TAGS, PRICING_REVIEW_PATHS } from "@/shared/api";

import { authApi } from "@/entities/auth/api/auth.api";

import { mapTourSummaryToFrontend } from "../converters";
import type {
	ITourPricingReview,
	TGetTourSummaryBackendResponce
} from "../types";

export const tourPricingReviewApi = authApi.injectEndpoints({
	endpoints: (builder) => ({
		getTourSummary: builder.query<
			ITourPricingReview,
			{ tourId: string; optionId: string; currency?: Currency }
		>({
			query: ({ tourId, optionId, currency }) => ({
				...PRICING_REVIEW_PATHS.getTourSummary(tourId, optionId),
				params: currency ? { currency } : undefined
			}),
			transformResponse: (response: TGetTourSummaryBackendResponce) =>
				mapTourSummaryToFrontend(response),
			providesTags: (_result, _error, { tourId, optionId }) => [
				{
					type: ENUM_API_TAGS.TOURS_PRICING_SUMMARY,
					id: `${tourId}:${optionId}`
				}
			]
		})
	})
});

export const { useGetTourSummaryQuery } = tourPricingReviewApi;

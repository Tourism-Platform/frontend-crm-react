import type { Currency } from "@/shared/api";
import { ENUM_API_TAGS, TOUR_OPTION_PATHS } from "@/shared/api";

import { authApi } from "@/entities/auth/api/auth.api";

import { mapPricingBreakdownToFrontend } from "../converters";
import type {
	ITourPricingReview,
	TGetPricingBreakdownBackendResponse
} from "../types";

export const tourPricingReviewApi = authApi.injectEndpoints({
	endpoints: (builder) => ({
		getPricingBreakdown: builder.query<
			ITourPricingReview,
			{ tourId: string; optionId: string; currency?: Currency }
		>({
			query: ({ tourId, optionId, currency }) => ({
				...TOUR_OPTION_PATHS.getPricingBreakdown(tourId, optionId),
				params: currency ? { currency } : undefined
			}),
			transformResponse: (
				response: TGetPricingBreakdownBackendResponse
			) => mapPricingBreakdownToFrontend(response),
			providesTags: (_result, _error, { tourId, optionId }) => [
				{
					type: ENUM_API_TAGS.TOURS_PRICING_SUMMARY,
					id: `${tourId}:${optionId}`
				}
			]
		})
	})
});

export const { useGetPricingBreakdownQuery } = tourPricingReviewApi;

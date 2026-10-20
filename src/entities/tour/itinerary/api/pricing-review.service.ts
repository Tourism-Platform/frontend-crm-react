import { ENUM_API_TAGS, TOUR_OPTION_PATHS } from "@/shared/api";

import { authApi } from "@/entities/auth/api/auth.api";

import {
	mapPricingBreakdownQueryToBackend,
	mapPricingBreakdownToFrontend
} from "../converters";
import type {
	IPricingBreakdownArgs,
	ITourPricingReview,
	TGetPricingBreakdownBackendResponse
} from "../types";

export const tourPricingReviewApi = authApi.injectEndpoints({
	endpoints: (builder) => ({
		getPricingBreakdown: builder.query<
			ITourPricingReview,
			IPricingBreakdownArgs
		>({
			query: (args) => ({
				...TOUR_OPTION_PATHS.getPricingBreakdown(
					args.tourId,
					args.optionId
				),
				params: mapPricingBreakdownQueryToBackend(args)
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

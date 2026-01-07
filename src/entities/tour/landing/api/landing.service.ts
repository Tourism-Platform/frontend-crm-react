import { ENUM_API_TAGS } from "@/shared/api";

import { authApi } from "@/entities/auth/api/auth.api";

import { mapLandingToBackend, mapLandingToFrontend } from "../converters";
import type { ILandingBackend, TLandingSchema } from "../types";

export const tourLandingApi = authApi.injectEndpoints({
	endpoints: (builder) => ({
		getLanding: builder.query<TLandingSchema, string>({
			query: (tourId) => ({
				url: `/tours/${tourId}/landing`,
				method: "GET"
			}),
			transformResponse: (response: ILandingBackend) =>
				mapLandingToFrontend(response),
			providesTags: (_result, _error, tourId) => [
				{ type: ENUM_API_TAGS.TOURS, id: `LANDING_${tourId}` }
			]
		}),
		updateLanding: builder.mutation<
			void,
			{ tourId: string; data: TLandingSchema }
		>({
			query: ({ tourId, data }) => ({
				url: `/tours/${tourId}/landing`,
				method: "PATCH",
				body: mapLandingToBackend(data)
			}),
			invalidatesTags: (_result, _error, { tourId }) => [
				{ type: ENUM_API_TAGS.TOURS, id: `LANDING_${tourId}` }
			]
		})
	})
});

export const { useGetLandingQuery, useUpdateLandingMutation } = tourLandingApi;

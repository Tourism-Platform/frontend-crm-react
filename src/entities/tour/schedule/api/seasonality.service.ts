import { SEASONAL_COMMISSION_PATHS } from "@/shared/api";
import { INTERSECTION_ELEMENTS } from "@/shared/config";
import type { IPaginationResponse } from "@/shared/types";

import { authApi } from "@/entities/auth/api/auth.api";

import {
	mapSeasonalityPaginatedToFrontend,
	mapSeasonalityQueryToBackend,
	mapSeasonalityToBackend,
	mapSeasonalityToFrontend
} from "../converters";
import type {
	IListSeasonalityArgs,
	ISeasonality,
	TListSeasonalityBackendResponse,
	TSeasonalityCommissionBackend
} from "../types";

export const tourSeasonalityApi = authApi.injectEndpoints({
	endpoints: (builder) => ({
		getSeasonality: builder.query<
			IPaginationResponse<ISeasonality>,
			IListSeasonalityArgs
		>({
			query: (args) => ({
				...SEASONAL_COMMISSION_PATHS.getTourCommissions(args.tourId),
				params: mapSeasonalityQueryToBackend(args)
			}),
			transformResponse: (response: TListSeasonalityBackendResponse) =>
				mapSeasonalityPaginatedToFrontend(response)
		}),
		createSeasonality: builder.mutation<
			ISeasonality,
			{ tourId: string; data: ISeasonality }
		>({
			query: ({ tourId, data }) => ({
				...SEASONAL_COMMISSION_PATHS.createTourSeasonCommission(tourId),
				body: mapSeasonalityToBackend(data)
			}),
			transformResponse: (response: TSeasonalityCommissionBackend) =>
				mapSeasonalityToFrontend(response),
			async onQueryStarted({ tourId }, { dispatch, queryFulfilled }) {
				try {
					const { data: newSeasonality } = await queryFulfilled;
					dispatch(
						tourSeasonalityApi.util.updateQueryData(
							"getSeasonality",
							{
								page: 1,
								limit: INTERSECTION_ELEMENTS.TOUR_SEASONALITY,
								tourId
							},
							(draft) => {
								draft.data.push(newSeasonality);
							}
						)
					);
				} catch (error) {
					console.error(error);
				}
			}
		}),
		updateSeasonality: builder.mutation<
			ISeasonality,
			{ tourId: string; commissionId: string; data: ISeasonality }
		>({
			query: ({ tourId, commissionId, data }) => ({
				...SEASONAL_COMMISSION_PATHS.updateTourCommissions(
					tourId,
					commissionId
				),
				body: mapSeasonalityToBackend(data)
			}),
			transformResponse: (response: TSeasonalityCommissionBackend) =>
				mapSeasonalityToFrontend(response),
			async onQueryStarted(
				{ tourId, commissionId },
				{ dispatch, queryFulfilled }
			) {
				try {
					const { data: updatedSeasonality } = await queryFulfilled;
					dispatch(
						tourSeasonalityApi.util.updateQueryData(
							"getSeasonality",
							{
								page: 1,
								limit: INTERSECTION_ELEMENTS.TOUR_SEASONALITY,
								tourId
							},
							(draft) => {
								const index = draft.data.findIndex(
									(s) => s.id === commissionId
								);
								if (index !== -1) {
									draft.data[index] = updatedSeasonality;
								}
							}
						)
					);
				} catch (error) {
					console.error(error);
				}
			}
		}),
		removeSeasonality: builder.mutation<
			void,
			{ tourId: string; commissionId: string }
		>({
			query: ({ tourId, commissionId }) => ({
				...SEASONAL_COMMISSION_PATHS.removeCommission(
					tourId,
					commissionId
				)
			}),
			async onQueryStarted(
				{ tourId, commissionId },
				{ dispatch, queryFulfilled }
			) {
				try {
					await queryFulfilled;
					dispatch(
						tourSeasonalityApi.util.updateQueryData(
							"getSeasonality",
							{
								page: 1,
								limit: INTERSECTION_ELEMENTS.TOUR_SEASONALITY,
								tourId
							},
							(draft) => {
								draft.data = draft.data.filter(
									(s) => s.id !== commissionId
								);
							}
						)
					);
				} catch (error) {
					console.error(error);
				}
			}
		})
	})
});

export const {
	useGetSeasonalityQuery,
	useCreateSeasonalityMutation,
	useUpdateSeasonalityMutation,
	useRemoveSeasonalityMutation
} = tourSeasonalityApi;

import { SEASONAL_COMMISSION_PATHS } from "@/shared/api";

import { authApi } from "@/entities/auth/api/auth.api";

import {
	mapSeasonalityToBackend,
	mapSeasonalityToFrontend
} from "../converters";
import type { ISeasonality, TSeasonalityCommissionBackend } from "../types";

export const tourSeasonalityApi = authApi.injectEndpoints({
	endpoints: (builder) => ({
		getSeasonality: builder.query<ISeasonality[], string>({
			query: (tourId) => ({
				...SEASONAL_COMMISSION_PATHS.getTourComissions(tourId)
			}),
			transformResponse: (response: TSeasonalityCommissionBackend[]) =>
				response.map(mapSeasonalityToFrontend)
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
							tourId,
							(draft) => {
								draft.push(newSeasonality);
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
				...SEASONAL_COMMISSION_PATHS.updateTourComissions(
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
							tourId,
							(draft) => {
								const index = draft.findIndex(
									(s) => s.id === commissionId
								);
								if (index !== -1) {
									draft[index] = updatedSeasonality;
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
							tourId,
							(draft) => {
								return draft.filter(
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

import { TOUR_PUBLIC_PATHS } from "@/shared/api";

import { authApi } from "@/entities/auth/api/auth.api";

import {
	mapPreviewOperatorToFrontend,
	mapPreviewOptionToFrontend,
	mapPreviewOptionsListToFrontend,
	mapPreviewTourGeneralToFrontend,
	mapPreviewTourScheduleToFrontend,
	mapPreviewTourToFrontend
} from "../converters";
import type {
	IOptionDetail,
	IPreviewOperator,
	IPreviewOptionCard,
	IPreviewTourData,
	IPreviewTourGeneral,
	IPreviewTourSchedule,
	TGetPreviewTourBackendResponse,
	TOptionDetailBackend,
	TPreviewOperatorBackend,
	TPreviewOptionListItemBackend,
	TPreviewTourBackend,
	TPreviewTourScheduleBackend
} from "../types";

export const tourPreviewTourApi = authApi.injectEndpoints({
	endpoints: (builder) => ({
		getPreviewTourGeneral: builder.query<IPreviewTourGeneral, string>({
			query: (tourId) => ({
				...TOUR_PUBLIC_PATHS.getTour(tourId)
			}),
			transformResponse: (response: TGetPreviewTourBackendResponse) =>
				mapPreviewTourGeneralToFrontend(response)
		}),
		getPreviewTour: builder.query<IPreviewTourData, string>({
			query: (tourId) => ({
				...TOUR_PUBLIC_PATHS.getPublicLandingPage(tourId)
			}),
			transformResponse: (response: TPreviewTourBackend) =>
				mapPreviewTourToFrontend(response)
		}),
		getPreviewOperator: builder.query<IPreviewOperator, string>({
			query: (tourId) => ({
				...TOUR_PUBLIC_PATHS.getPublicOperatorPreview(tourId)
			}),
			transformResponse: (response: TPreviewOperatorBackend) =>
				mapPreviewOperatorToFrontend(response)
		}),
		getPreviewOption: builder.query<
			IOptionDetail,
			{ tourId: string; optionId: string }
		>({
			query: ({ tourId, optionId }) => ({
				...TOUR_PUBLIC_PATHS.getPublicTourOption(tourId, optionId)
			}),
			transformResponse: (response: TOptionDetailBackend) =>
				mapPreviewOptionToFrontend(response)
		}),
		getPreviewTourOptions: builder.query<IPreviewOptionCard[], string>({
			query: (tourId) => ({
				...TOUR_PUBLIC_PATHS.listPublicTourOptions(tourId)
			}),
			transformResponse: (response: TPreviewOptionListItemBackend[]) =>
				mapPreviewOptionsListToFrontend(response)
		}),
		getPreviewTourSchedule: builder.query<
			IPreviewTourSchedule,
			{ tourId: string; from?: string; to?: string }
		>({
			query: ({ tourId, from, to }) => ({
				...TOUR_PUBLIC_PATHS.getPublicTourSchedule(tourId),
				params:
					from || to
						? { from: from ?? null, to: to ?? null }
						: undefined
			}),
			transformResponse: (response: TPreviewTourScheduleBackend) =>
				mapPreviewTourScheduleToFrontend(response)
		})
	})
});

export const {
	useGetPreviewTourGeneralQuery,
	useGetPreviewTourQuery,
	useGetPreviewOperatorQuery,
	useGetPreviewOptionQuery,
	useGetPreviewTourOptionsQuery,
	useGetPreviewTourScheduleQuery
} = tourPreviewTourApi;

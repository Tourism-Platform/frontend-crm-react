import { TOUR_PUBLIC_PATHS } from "@/shared/api";

import { authApi } from "@/entities/auth/api/auth.api";

import {
	mapPreviewOperatorToFrontend,
	mapPreviewOptionToFrontend,
	mapPreviewTourToFrontend
} from "../converters";
import type {
	IOptionDetail,
	IPreviewOperator,
	IPreviewTourData,
	TOptionDetailBackend,
	TPreviewOperatorBackend,
	TPreviewTourBackend
} from "../types";

export const tourPreviewTourApi = authApi.injectEndpoints({
	endpoints: (builder) => ({
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
		})
	})
});

export const {
	useGetPreviewTourQuery,
	useGetPreviewOperatorQuery,
	useGetPreviewOptionQuery
} = tourPreviewTourApi;

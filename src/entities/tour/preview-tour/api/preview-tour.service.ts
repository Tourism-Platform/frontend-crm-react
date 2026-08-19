import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";

import type {
	LandingPageImageModel,
	LandingPageResponse,
	OperatorInfoModel,
	TourMetaResponse
} from "@/shared/api";
import {
	OPERATOR_PATHS,
	TOUR_LANDING_PAGE_PATHS,
	TOUR_OPTION_PATHS,
	TOUR_PATHS,
	TOUR_PUBLIC_PATHS
} from "@/shared/api";

import { authApi } from "@/entities/auth/api/auth.api";
import type {
	TGetTourSummaryBackendResponce,
	TTourOptionBackend
} from "@/entities/tour/itinerary";

import {
	composeDraftLandingToPreview,
	mapDraftOperatorToFrontend,
	mapDraftOptionCardToFrontend,
	mapDraftPreviewOptionToFrontend,
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

type TBaseQuery = (
	arg: string | { url: string; method?: string; params?: unknown }
) => Promise<{ data?: unknown; error?: FetchBaseQueryError }>;

const toQueryArgs = (path: {
	url: string;
	method: string;
	params?: unknown;
}) => ({
	url: path.url,
	method: path.method,
	...(path.params !== undefined ? { params: path.params } : {})
});

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
		}),

		getDraftPreviewTourGeneral: builder.query<IPreviewTourGeneral, string>({
			query: (tourId) => ({
				...TOUR_PATHS.getTour(tourId)
			}),
			transformResponse: (response: TourMetaResponse) =>
				mapPreviewTourGeneralToFrontend(response)
		}),
		getDraftPreviewLanding: builder.query<IPreviewTourData, string>({
			async queryFn(tourId, _api, _extraOptions, baseQuery) {
				const query = baseQuery as TBaseQuery;

				const landingResult = await query(
					toQueryArgs(TOUR_LANDING_PAGE_PATHS.getLandingPage(tourId))
				);
				if (landingResult.error) {
					return { error: landingResult.error };
				}

				const imagesResult = await query(
					toQueryArgs(
						TOUR_LANDING_PAGE_PATHS.listLandingImages(tourId)
					)
				);
				if (imagesResult.error) {
					return { error: imagesResult.error };
				}

				return {
					data: composeDraftLandingToPreview(
						landingResult.data as LandingPageResponse,
						(imagesResult.data as LandingPageImageModel[]) ?? []
					)
				};
			}
		}),
		getDraftPreviewOptions: builder.query<IPreviewOptionCard[], string>({
			async queryFn(tourId, _api, _extraOptions, baseQuery) {
				const query = baseQuery as TBaseQuery;

				const listResult = await query(
					toQueryArgs(TOUR_OPTION_PATHS.listAllTourOptions(tourId))
				);
				if (listResult.error) {
					return { error: listResult.error };
				}

				const options = (listResult.data as TTourOptionBackend[]) ?? [];

				const cards = await Promise.all(
					options.map(async (option) => {
						const summaryResult = await query(
							toQueryArgs(
								TOUR_OPTION_PATHS.getTourSummary(
									tourId,
									option.id
								)
							)
						);

						if (summaryResult.error || !summaryResult.data) {
							return mapDraftOptionCardToFrontend(option);
						}

						const summary =
							summaryResult.data as TGetTourSummaryBackendResponce;
						return mapDraftOptionCardToFrontend(
							option,
							summary.total
						);
					})
				);

				return { data: cards };
			}
		}),
		getDraftPreviewOption: builder.query<
			IOptionDetail,
			{ tourId: string; optionId: string }
		>({
			async queryFn(
				{ tourId, optionId },
				_api,
				_extraOptions,
				baseQuery
			) {
				const query = baseQuery as TBaseQuery;

				const summaryResult = await query(
					toQueryArgs(
						TOUR_OPTION_PATHS.getTourSummary(tourId, optionId)
					)
				);
				if (summaryResult.error) {
					return { error: summaryResult.error };
				}

				return {
					data: mapDraftPreviewOptionToFrontend(
						summaryResult.data as TGetTourSummaryBackendResponce
					)
				};
			}
		}),
		getDraftPreviewOperator: builder.query<IPreviewOperator, void>({
			query: () => ({
				...OPERATOR_PATHS.getOperatorInfo
			}),
			transformResponse: (response: OperatorInfoModel) =>
				mapDraftOperatorToFrontend(response)
		})
	})
});

export const {
	useGetPreviewTourGeneralQuery,
	useGetPreviewTourQuery,
	useGetPreviewOperatorQuery,
	useGetPreviewOptionQuery,
	useGetPreviewTourOptionsQuery,
	useGetPreviewTourScheduleQuery,
	useGetDraftPreviewTourGeneralQuery,
	useGetDraftPreviewLandingQuery,
	useGetDraftPreviewOptionsQuery,
	useGetDraftPreviewOptionQuery,
	useGetDraftPreviewOperatorQuery
} = tourPreviewTourApi;

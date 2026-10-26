import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";

import {
	OPERATOR_PATHS,
	TOUR_LANDING_PAGE_PATHS,
	TOUR_OPTION_PATHS,
	TOUR_PATHS,
	TOUR_PUBLIC_PATHS
} from "@/shared/api";
import { INTERSECTION_ELEMENTS, TEMP_LIST_TOTAL } from "@/shared/config";
import { mapReadLangQueryToBackend } from "@/shared/converters";
import type { IPaginationResponse } from "@/shared/types";

import { authApi } from "@/entities/auth/api/auth.api";
import type {
	TGetPricingBreakdownBackendResponse,
	TTourOptionBackend
} from "@/entities/tour/itinerary";
import type { TLandingImageBackend } from "@/entities/tour/landing/types/landing-image.types";
import type { TTourBackend } from "@/entities/tour/tour/types/tour-backend.interface";
import type { TOperatorBusinessInfoBackend } from "@/entities/user/operator/types/operator-business-backend.interface";

import {
	composeDraftLandingToPreview,
	mapDraftOperatorToFrontend,
	mapDraftOptionCardToFrontend,
	mapDraftPreviewOptionToFrontend,
	mapPreviewCurrencyQueryToBackend,
	mapPreviewOperatorToFrontend,
	mapPreviewOptionToFrontend,
	mapPreviewOptionsPaginatedToFrontend,
	mapPreviewOptionsQueryToBackend,
	mapPreviewTourGeneralToFrontend,
	mapPreviewTourScheduleToFrontend,
	mapPreviewTourToFrontend
} from "../converters";
import type {
	IOptionDetail,
	IPreviewDraftOptionsQueryArgs,
	IPreviewOperator,
	IPreviewOptionCard,
	IPreviewOptionQueryArgs,
	IPreviewOptionsListArgs,
	IPreviewTourData,
	IPreviewTourGeneral,
	IPreviewTourQueryArgs,
	IPreviewTourSchedule,
	TGetPreviewTourBackendResponse,
	TLandingPageResponseBackend,
	TOptionDetailBackend,
	TPreviewOperatorBackend,
	TPreviewOptionsListBackendResponse,
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
		getPreviewTourGeneral: builder.query<
			IPreviewTourGeneral,
			IPreviewTourQueryArgs
		>({
			query: ({ tourId, language }) => ({
				...TOUR_PUBLIC_PATHS.getTour(tourId),
				params: mapReadLangQueryToBackend(language)
			}),
			transformResponse: (response: TGetPreviewTourBackendResponse) =>
				mapPreviewTourGeneralToFrontend(response)
		}),
		getPreviewTour: builder.query<IPreviewTourData, IPreviewTourQueryArgs>({
			query: ({ tourId, language }) => ({
				...TOUR_PUBLIC_PATHS.getPublicLandingPage(tourId),
				params: mapReadLangQueryToBackend(language)
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
		getPreviewOption: builder.query<IOptionDetail, IPreviewOptionQueryArgs>(
			{
				query: ({ tourId, optionId, language, currency }) => ({
					...TOUR_PUBLIC_PATHS.getPublicTourOption(tourId, optionId),
					params: {
						...mapReadLangQueryToBackend(language),
						...mapPreviewCurrencyQueryToBackend(currency)
					}
				}),
				transformResponse: (response: TOptionDetailBackend) =>
					mapPreviewOptionToFrontend(response)
			}
		),
		getPreviewTourOptions: builder.query<
			IPaginationResponse<IPreviewOptionCard>,
			IPreviewOptionsListArgs
		>({
			query: (args) => ({
				...TOUR_PUBLIC_PATHS.listPublicTourOptions(args.tourId),
				params: mapPreviewOptionsQueryToBackend(args)
			}),
			transformResponse: (response: TPreviewOptionsListBackendResponse) =>
				mapPreviewOptionsPaginatedToFrontend(response)
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
			transformResponse: (response: TTourBackend) =>
				mapPreviewTourGeneralToFrontend(response)
		}),
		getDraftPreviewLanding: builder.query<
			IPreviewTourData,
			IPreviewTourQueryArgs
		>({
			async queryFn(
				{ tourId, language },
				_api,
				_extraOptions,
				baseQuery
			) {
				const query = baseQuery as TBaseQuery;

				const landingResult = await query(
					toQueryArgs({
						...TOUR_LANDING_PAGE_PATHS.getLandingPage(tourId),
						params: mapReadLangQueryToBackend(language)
					})
				);
				if (landingResult.error) {
					return { error: landingResult.error };
				}

				const imagesResult = await query(
					toQueryArgs({
						...TOUR_LANDING_PAGE_PATHS.listLandingImages(tourId),
						params: { limit: INTERSECTION_ELEMENTS.LANDING_IMAGES }
					})
				);
				if (imagesResult.error) {
					return { error: imagesResult.error };
				}

				return {
					data: composeDraftLandingToPreview(
						landingResult.data as TLandingPageResponseBackend,
						(imagesResult.data as TLandingImageBackend[]) ?? []
					)
				};
			}
		}),
		getDraftPreviewOptions: builder.query<
			IPaginationResponse<IPreviewOptionCard>,
			IPreviewDraftOptionsQueryArgs
		>({
			async queryFn(
				{ tourId, language, currency },
				_api,
				_extraOptions,
				baseQuery
			) {
				const query = baseQuery as TBaseQuery;

				const listResult = await query(
					toQueryArgs({
						...TOUR_OPTION_PATHS.listAllTourOptions(tourId),
						params: { limit: INTERSECTION_ELEMENTS.TOUR_OPTIONS }
					})
				);
				if (listResult.error) {
					return { error: listResult.error };
				}

				const options = (listResult.data as TTourOptionBackend[]) ?? [];

				const cards = await Promise.all(
					options.map(async (option) => {
						const summaryResult = await query(
							toQueryArgs({
								...TOUR_OPTION_PATHS.getPricingBreakdown(
									tourId,
									option.id
								),
								params: {
									...mapReadLangQueryToBackend(language),
									...mapPreviewCurrencyQueryToBackend(
										currency
									)
								}
							})
						);

						if (summaryResult.error || !summaryResult.data) {
							return mapDraftOptionCardToFrontend(option);
						}

						const summary =
							summaryResult.data as TGetPricingBreakdownBackendResponse;
						return mapDraftOptionCardToFrontend(
							option,
							summary?.estimated_revenue_per_person,
							summary?.estimated_revenue
						);
					})
				);

				// Та же форма, что у публичных опций (getPreviewTourOptions)
				return { data: { data: cards, total: TEMP_LIST_TOTAL } };
			}
		}),
		getDraftPreviewOption: builder.query<
			IOptionDetail,
			IPreviewOptionQueryArgs
		>({
			async queryFn(
				{ tourId, optionId, language, currency },
				_api,
				_extraOptions,
				baseQuery
			) {
				const query = baseQuery as TBaseQuery;

				const summaryResult = await query(
					toQueryArgs({
						...TOUR_OPTION_PATHS.getPricingBreakdown(
							tourId,
							optionId
						),
						params: {
							...mapReadLangQueryToBackend(language),
							...mapPreviewCurrencyQueryToBackend(currency)
						}
					})
				);
				if (summaryResult.error) {
					return { error: summaryResult.error };
				}

				return {
					data: mapDraftPreviewOptionToFrontend(
						summaryResult.data as TGetPricingBreakdownBackendResponse
					)
				};
			}
		}),
		getDraftPreviewOperator: builder.query<IPreviewOperator, void>({
			query: () => ({
				...OPERATOR_PATHS.getOperatorInfo
			}),
			transformResponse: (response: TOperatorBusinessInfoBackend) =>
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

import { ENUM_API_TAGS, TRANSLATIONS_PATHS } from "@/shared/api";

import { authApi } from "@/entities/auth/api/auth.api";

import {
	mapRegenerateTranslationsQueryToBackend,
	mapRegenerateTranslationsToFrontend
} from "../converters";
import type {
	IRegenerateTranslationsArgs,
	IRegenerateTranslationsResult,
	TRegenerateTranslationsBackendResponse
} from "../types";

export const tourTranslationsApi = authApi.injectEndpoints({
	endpoints: (builder) => ({
		regenerateTourTranslations: builder.mutation<
			IRegenerateTranslationsResult,
			IRegenerateTranslationsArgs
		>({
			query: ({ tourId, force }) => ({
				...TRANSLATIONS_PATHS.regenerateTourTranslations(tourId),
				params: mapRegenerateTranslationsQueryToBackend(force)
			}),
			transformResponse: (
				response: TRegenerateTranslationsBackendResponse
			) => mapRegenerateTranslationsToFrontend(response),
			// Event slots flip to `pending` — refetch so the board shows it.
			invalidatesTags: [ENUM_API_TAGS.TOURS_EVENTS]
		})
	})
});

export const { useRegenerateTourTranslationsMutation } = tourTranslationsApi;

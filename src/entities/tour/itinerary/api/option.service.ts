import { ENUM_API_TAGS, TOUR_OPTION_PATHS } from "@/shared/api";

import { authApi } from "@/entities/auth/api/auth.api";

import { mapOptionToFrontend } from "../converters";
import type {
	IOption,
	TCreateTourOptionBackendResponce,
	TListAllTourOptionsBackendResponce
} from "../types";

export const tourOptionApi = authApi.injectEndpoints({
	endpoints: (builder) => ({
		listAllTourOptions: builder.query<IOption[], string>({
			query: (tourId) => ({
				...TOUR_OPTION_PATHS.listAllTourOptions(tourId)
			}),
			transformResponse: (response: TListAllTourOptionsBackendResponce) =>
				response.map(mapOptionToFrontend),
			providesTags: (_result, _error, tourId) => [
				{ type: ENUM_API_TAGS.TOURS_OPTIONS, id: tourId }
			]
		}),
		createTourOption: builder.mutation<IOption, { tourId: string }>({
			query: ({ tourId }) => ({
				...TOUR_OPTION_PATHS.createTourOption(tourId)
			}),
			transformResponse: (response: TCreateTourOptionBackendResponce) =>
				mapOptionToFrontend(response),
			invalidatesTags: (_result, _error, { tourId }) => [
				{ type: ENUM_API_TAGS.TOURS_OPTIONS, id: tourId }
			]
		}),
		deleteOption: builder.mutation<
			void,
			{ tourId: string; optionId: string }
		>({
			query: ({ tourId, optionId }) => ({
				...TOUR_OPTION_PATHS.deleteOption(tourId, optionId)
			}),
			invalidatesTags: (_result, _error, { tourId }) => [
				{ type: ENUM_API_TAGS.TOURS_OPTIONS, id: tourId }
			]
		})
	})
});

export const {
	useListAllTourOptionsQuery,
	useCreateTourOptionMutation,
	useDeleteOptionMutation
} = tourOptionApi;

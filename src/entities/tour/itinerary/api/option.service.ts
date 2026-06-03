import { ENUM_API_TAGS, TOUR_OPTION_PATHS } from "@/shared/api";

import { authApi } from "@/entities/auth/api/auth.api";

import {
	mapOptionCreateToBackend,
	mapOptionToFrontend,
	mapOptionUpdateToBackend
} from "../converters";
import type {
	IOption,
	IOptionFormPayload,
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
		createTourOption: builder.mutation<
			IOption,
			{ tourId: string; data: IOptionFormPayload }
		>({
			query: ({ tourId, data }) => ({
				...TOUR_OPTION_PATHS.createTourOption(tourId),
				body: mapOptionCreateToBackend(data)
			}),
			transformResponse: (response: TCreateTourOptionBackendResponce) =>
				mapOptionToFrontend(response),
			invalidatesTags: (_result, _error, { tourId }) => [
				{ type: ENUM_API_TAGS.TOURS_OPTIONS, id: tourId }
			]
		}),
		updateTourOption: builder.mutation<
			IOption,
			{ tourId: string; optionId: string; data: IOptionFormPayload }
		>({
			query: ({ tourId, optionId, data }) => ({
				...TOUR_OPTION_PATHS.updateTourOption(tourId, optionId),
				body: mapOptionUpdateToBackend(data)
			}),
			transformResponse: (response: TCreateTourOptionBackendResponce) =>
				mapOptionToFrontend(response),
			invalidatesTags: (_result, _error, { tourId }) => [
				{ type: ENUM_API_TAGS.TOURS_OPTIONS, id: tourId }
			]
		}),
		uploadOptionCover: builder.mutation<
			IOption,
			{ tourId: string; optionId: string; file: File }
		>({
			query: ({ tourId, optionId, file }) => {
				const formData = new FormData();
				formData.append("image", file);
				return {
					...TOUR_OPTION_PATHS.uploadOptionCover(tourId, optionId),
					body: formData
				};
			},
			transformResponse: (response: TCreateTourOptionBackendResponce) =>
				mapOptionToFrontend(response),
			invalidatesTags: (_result, _error, { tourId }) => [
				{ type: ENUM_API_TAGS.TOURS_OPTIONS, id: tourId }
			]
		}),
		deleteOptionCover: builder.mutation<
			void,
			{ tourId: string; optionId: string }
		>({
			query: ({ tourId, optionId }) => ({
				...TOUR_OPTION_PATHS.deleteOptionCover(tourId, optionId)
			}),
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
	useUpdateTourOptionMutation,
	useUploadOptionCoverMutation,
	useDeleteOptionCoverMutation,
	useDeleteOptionMutation
} = tourOptionApi;

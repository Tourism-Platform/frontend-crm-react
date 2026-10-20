import { ENUM_API_TAGS, TOUR_EVENT_LIBRARY_PATHS } from "@/shared/api";
import type { IPaginationResponse } from "@/shared/types";

import { authApi } from "@/entities/auth/api/auth.api";
import type { IEventImage } from "@/entities/tour/itinerary";

import {
	mapLibraryImageToFrontend,
	mapLibraryImagesPaginatedToFrontend,
	mapLibraryImagesQueryToBackend
} from "../converters/event-library-media.converters";
import type {
	IListLibraryImagesArgs,
	TEventLibraryImageBackend,
	TListLibraryImagesBackendResponse
} from "../types";

const LIBRARY_IMAGE_TAGS = [
	ENUM_API_TAGS.EVENT_LIBRARY_IMAGES,
	ENUM_API_TAGS.EVENT_LIBRARY
];

export const eventLibraryMediaApi = authApi.injectEndpoints({
	endpoints: (builder) => ({
		listLibraryImages: builder.query<
			IPaginationResponse<IEventImage>,
			IListLibraryImagesArgs
		>({
			query: (args) => ({
				...TOUR_EVENT_LIBRARY_PATHS.listLibraryImages(args.libraryId),
				params: mapLibraryImagesQueryToBackend(args)
			}),
			transformResponse: (response: TListLibraryImagesBackendResponse) =>
				mapLibraryImagesPaginatedToFrontend(response),
			providesTags: [ENUM_API_TAGS.EVENT_LIBRARY_IMAGES]
		}),
		uploadLibraryImages: builder.mutation<
			IEventImage[],
			{ libraryId: string; files: File[] }
		>({
			query: ({ libraryId, files }) => {
				const formData = new FormData();
				files.forEach((file) => formData.append("images", file));
				return {
					...TOUR_EVENT_LIBRARY_PATHS.uploadLibraryImages(libraryId),
					body: formData
				};
			},
			transformResponse: (response: TEventLibraryImageBackend[]) =>
				response.map(mapLibraryImageToFrontend),
			invalidatesTags: LIBRARY_IMAGE_TAGS
		}),
		deleteLibraryImage: builder.mutation<
			void,
			{ libraryId: string; imageId: string }
		>({
			query: ({ libraryId, imageId }) => ({
				...TOUR_EVENT_LIBRARY_PATHS.deleteLibraryImage(
					libraryId,
					imageId
				)
			}),
			invalidatesTags: LIBRARY_IMAGE_TAGS
		}),
		updateLibraryImage: builder.mutation<
			void,
			{ libraryId: string; imageId: string }
		>({
			query: ({ libraryId, imageId }) => ({
				...TOUR_EVENT_LIBRARY_PATHS.setPrimaryLibraryImage(
					libraryId,
					imageId
				)
			}),
			invalidatesTags: LIBRARY_IMAGE_TAGS
		})
	})
});

export const {
	useListLibraryImagesQuery,
	useUploadLibraryImagesMutation,
	useDeleteLibraryImageMutation,
	useUpdateLibraryImageMutation
} = eventLibraryMediaApi;

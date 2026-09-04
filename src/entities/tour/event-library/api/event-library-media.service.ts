import { ENUM_API_TAGS, TOUR_EVENT_LIBRARY_PATHS } from "@/shared/api";

import { authApi } from "@/entities/auth/api/auth.api";
import type { IEventImage } from "@/entities/tour/itinerary";

import { mapLibraryImageToFrontend } from "../converters/event-library-media.converters";
import type { TEventLibraryImageBackend } from "../types";

const LIBRARY_IMAGE_TAGS = [
	ENUM_API_TAGS.EVENT_LIBRARY_IMAGES,
	ENUM_API_TAGS.EVENT_LIBRARY
];

export const eventLibraryMediaApi = authApi.injectEndpoints({
	endpoints: (builder) => ({
		listLibraryImages: builder.query<IEventImage[], string>({
			query: (libraryId) => ({
				...TOUR_EVENT_LIBRARY_PATHS.listLibraryImages(libraryId)
			}),
			transformResponse: (response: TEventLibraryImageBackend[]) =>
				response.map(mapLibraryImageToFrontend),
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

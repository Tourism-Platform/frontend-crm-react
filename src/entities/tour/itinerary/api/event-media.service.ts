import { ENUM_API_TAGS, TOUR_EVENT_MEDIA_PATHS } from "@/shared/api";
import type { IPaginationResponse } from "@/shared/types";

import { authApi } from "@/entities/auth/api/auth.api";

import {
	mapEventImageToFrontend,
	mapEventImagesPaginatedToFrontend,
	mapEventImagesQueryToBackend
} from "../converters";
import type {
	IEventImage,
	IListEventImagesArgs,
	TEventImageBackend,
	TListEventImagesBackendResponse
} from "../types";

export const tourEventMediaApi = authApi.injectEndpoints({
	endpoints: (builder) => ({
		listEventImages: builder.query<
			IPaginationResponse<IEventImage>,
			IListEventImagesArgs
		>({
			query: (args) => ({
				...TOUR_EVENT_MEDIA_PATHS.listEventImages(
					args.tourId,
					args.eventId
				),
				params: mapEventImagesQueryToBackend(args)
			}),
			transformResponse: (response: TListEventImagesBackendResponse) =>
				mapEventImagesPaginatedToFrontend(response),
			providesTags: [ENUM_API_TAGS.EVENT_IMAGES]
		}),
		uploadEventImages: builder.mutation<
			IEventImage[],
			{
				tourId: string;
				eventId: string;
				files: File[];
			}
		>({
			query: ({ tourId, eventId, files }) => {
				const formData = new FormData();
				files.forEach((file) => formData.append("images", file));
				return {
					...TOUR_EVENT_MEDIA_PATHS.uploadEventImages(
						tourId,
						eventId
					),
					body: formData
				};
			},
			transformResponse: (response: TEventImageBackend[]) =>
				response.map(mapEventImageToFrontend),
			invalidatesTags: [ENUM_API_TAGS.EVENT_IMAGES]
		}),
		deleteEventImage: builder.mutation<
			void,
			{ tourId: string; eventId: string; imageId: string }
		>({
			query: ({ tourId, eventId, imageId }) => ({
				...TOUR_EVENT_MEDIA_PATHS.deleteEventImage(
					tourId,
					eventId,
					imageId
				)
			}),
			invalidatesTags: [ENUM_API_TAGS.EVENT_IMAGES]
		}),
		updateEventImage: builder.mutation<
			void,
			{ tourId: string; eventId: string; imageId: string }
		>({
			query: ({ tourId, eventId, imageId }) => ({
				...TOUR_EVENT_MEDIA_PATHS.updateEventImage(
					tourId,
					eventId,
					imageId
				)
			}),
			invalidatesTags: [ENUM_API_TAGS.EVENT_IMAGES]
		})
	})
});

export const {
	useListEventImagesQuery,
	useUploadEventImagesMutation,
	useDeleteEventImageMutation,
	useUpdateEventImageMutation
} = tourEventMediaApi;

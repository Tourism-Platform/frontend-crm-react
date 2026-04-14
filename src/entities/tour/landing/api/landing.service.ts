import { ENUM_API_TAGS } from "@/shared/api";
import { TOUR_LANDING_PAGE_PATHS } from "@/shared/api";

import { authApi } from "@/entities/auth/api/auth.api";

import {
	mapLandingImagesToFrontend,
	mapLandingToBackend,
	mapLandingToFrontend
} from "../converters";
import type {
	ILandingImageSchema,
	TLandingBackend,
	TLandingCreateBackend,
	TLandingImageBackend,
	TLandingSchema
} from "../types";

export const tourLandingApi = authApi.injectEndpoints({
	endpoints: (builder) => ({
		createLanding: builder.mutation<
			TLandingSchema,
			{ tourId: string; data: TLandingSchema }
		>({
			query: ({ tourId, data }) => ({
				...TOUR_LANDING_PAGE_PATHS.createLandingPage(tourId),
				body: mapLandingToBackend(data)
			}),
			transformResponse: (response: TLandingCreateBackend) =>
				mapLandingToFrontend(response)
		}),
		getLanding: builder.query<TLandingSchema, string>({
			query: (tourId) => ({
				...TOUR_LANDING_PAGE_PATHS.getLandingPage(tourId)
			}),
			transformResponse: (response: TLandingBackend) =>
				mapLandingToFrontend(response)
		}),
		updateLanding: builder.mutation<
			TLandingSchema,
			{ tourId: string; data: TLandingSchema }
		>({
			query: ({ tourId, data }) => ({
				...TOUR_LANDING_PAGE_PATHS.updateLandingPage(tourId),
				body: mapLandingToBackend(data)
			}),
			transformResponse: (response: TLandingBackend) =>
				mapLandingToFrontend(response)
		}),
		listLandingImages: builder.query<ILandingImageSchema[], string>({
			query: (tourId) => ({
				...TOUR_LANDING_PAGE_PATHS.listLandingImages(tourId)
			}),
			transformResponse: (response: TLandingImageBackend[]) =>
				mapLandingImagesToFrontend(response),
			providesTags: [ENUM_API_TAGS.LANDING_IMAGES]
		}),
		uploadLandingImages: builder.mutation<
			ILandingImageSchema[],
			{ tourId: string; files: File[] }
		>({
			query: ({ tourId, files }) => {
				const formData = new FormData();
				files.forEach((file) => formData.append("images", file));
				return {
					...TOUR_LANDING_PAGE_PATHS.uploadLandingImages(tourId),
					body: formData
				};
			},
			transformResponse: (response: TLandingImageBackend[]) =>
				mapLandingImagesToFrontend(response),
			invalidatesTags: [ENUM_API_TAGS.LANDING_IMAGES]
		}),
		deleteLandingImage: builder.mutation<
			void,
			{ tourId: string; imageId: string }
		>({
			query: ({ tourId, imageId }) => ({
				...TOUR_LANDING_PAGE_PATHS.deleteLandingImage(tourId, imageId)
			}),
			invalidatesTags: [ENUM_API_TAGS.LANDING_IMAGES]
		})
	})
});

export const {
	useCreateLandingMutation,
	useGetLandingQuery,
	useUpdateLandingMutation,
	useListLandingImagesQuery,
	useUploadLandingImagesMutation,
	useDeleteLandingImageMutation
} = tourLandingApi;

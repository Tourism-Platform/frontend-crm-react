import { AGENCY_PATHS, ENUM_API_TAGS } from "@/shared/api";

import { authApi } from "@/entities/auth/api/auth.api";

import {
	mapAgencyBusinessInfoToBackend,
	mapAgencyBusinessInfoToFrontend
} from "../converters";
import type {
	TAgencyBusinessInfoBackend,
	TAgencyBusinessSchema
} from "../types";

export const agencyBusinessApi = authApi.injectEndpoints({
	endpoints: (builder) => ({
		createAgencyBusinessInfo: builder.mutation<
			TAgencyBusinessSchema,
			TAgencyBusinessSchema
		>({
			query: (body) => ({
				...AGENCY_PATHS.createAgency,
				body: mapAgencyBusinessInfoToBackend(body)
			}),
			transformResponse: (response: TAgencyBusinessInfoBackend) =>
				mapAgencyBusinessInfoToFrontend(response)!,
			invalidatesTags: [ENUM_API_TAGS.BUSINESS]
		}),
		getAgencyBusinessInfo: builder.query<
			TAgencyBusinessSchema | null,
			void
		>({
			query: () => ({
				...AGENCY_PATHS.getAgencyInfo
			}),
			transformResponse: (response: TAgencyBusinessInfoBackend | null) =>
				mapAgencyBusinessInfoToFrontend(response)!,
			providesTags: [ENUM_API_TAGS.BUSINESS]
		}),
		updateAgencyBusinessInfo: builder.mutation<
			TAgencyBusinessSchema,
			TAgencyBusinessSchema
		>({
			query: (body) => ({
				...AGENCY_PATHS.updateAgencyInfo,
				body: mapAgencyBusinessInfoToBackend(body)
			}),
			transformResponse: (response: TAgencyBusinessInfoBackend) =>
				mapAgencyBusinessInfoToFrontend(response)!,
			invalidatesTags: [ENUM_API_TAGS.BUSINESS]
		}),
		getAgencyLogo: builder.query<Blob, void>({
			query: () => ({
				...AGENCY_PATHS.getAgencyLogo,
				responseHandler: (response) => response.blob()
			})
		}),
		uploadAgencyLogo: builder.mutation<TAgencyBusinessSchema, File>({
			query: (file) => {
				const formData = new FormData();
				formData.append("file", file);
				return {
					...AGENCY_PATHS.addAgencyLogo,
					body: formData
				};
			},
			transformResponse: (response: TAgencyBusinessInfoBackend) =>
				mapAgencyBusinessInfoToFrontend(response)!,
			invalidatesTags: [ENUM_API_TAGS.BUSINESS]
		}),
		deleteAgencyLogo: builder.mutation<void, void>({
			query: () => ({
				...AGENCY_PATHS.deleteAgencyLogo
			}),
			invalidatesTags: [ENUM_API_TAGS.BUSINESS]
		})
	})
});

export const {
	useGetAgencyBusinessInfoQuery,
	useUpdateAgencyBusinessInfoMutation,
	useUploadAgencyLogoMutation,
	useDeleteAgencyLogoMutation
} = agencyBusinessApi;

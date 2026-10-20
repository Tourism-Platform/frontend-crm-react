import { AGENCY_PATHS, ENUM_API_TAGS } from "@/shared/api";
import type { TFileMetadata } from "@/shared/hooks";
import type { IPaginationRequest, IPaginationResponse } from "@/shared/types";

import { authApi } from "@/entities/auth/api/auth.api";

import {
	mapAgencyDocumentsPaginatedToFrontend,
	mapAgencyDocumentsQueryToBackend,
	mapAgencyDocumentsToFrontend
} from "../converters";
import type {
	TAgencyDocumentBackend,
	TAgencyDocumentsBackendResponse
} from "../types";

export const agencyBusinessDocumentsApi = authApi.injectEndpoints({
	endpoints: (builder) => ({
		getAgencyBusinessDocuments: builder.query<
			IPaginationResponse<TFileMetadata>,
			IPaginationRequest
		>({
			query: (filters) => ({
				...AGENCY_PATHS.listAgencyDocuments,
				params: mapAgencyDocumentsQueryToBackend(filters)
			}),
			transformResponse: (response: TAgencyDocumentsBackendResponse) =>
				mapAgencyDocumentsPaginatedToFrontend(response),
			providesTags: [ENUM_API_TAGS.BUSINESS]
		}),
		uploadAgencyBusinessDocument: builder.mutation<
			TFileMetadata[],
			{ file: File }
		>({
			query: ({ file }) => {
				const formData = new FormData();
				formData.append("files", file);
				return {
					...AGENCY_PATHS.addAgencyDocuments,
					body: formData
				};
			},
			transformResponse: (response: TAgencyDocumentBackend[]) =>
				mapAgencyDocumentsToFrontend(response),
			invalidatesTags: [ENUM_API_TAGS.BUSINESS]
		}),
		deleteAgencyBusinessDocument: builder.mutation<void, string>({
			query: (fileId) => ({
				...AGENCY_PATHS.removeAgencyDocument(fileId)
			}),
			invalidatesTags: [ENUM_API_TAGS.BUSINESS]
		}),
		getAgencyDocumentUrl: builder.query<Blob, string>({
			query: (fileId) => ({
				...AGENCY_PATHS.getAgencyDocumentUrl(fileId),
				responseHandler: (response) => response.blob()
			})
		})
	})
});

export const {
	useGetAgencyBusinessDocumentsQuery,
	useUploadAgencyBusinessDocumentMutation,
	useDeleteAgencyBusinessDocumentMutation
} = agencyBusinessDocumentsApi;

import { ENUM_API_TAGS, OPERATOR_DOCUMENTS_PATHS } from "@/shared/api";
import type { TFileMetadata } from "@/shared/hooks";

import { authApi } from "@/entities/auth/api/auth.api";

import { mapOperatorDocumentsToFrontend } from "../converters";
import type { TOperatorDocumentBackend } from "../types";

export const operatorBusinessDocumentsApi = authApi.injectEndpoints({
	endpoints: (builder) => ({
		getOperatorBusinessDocuments: builder.query<TFileMetadata[], void>({
			query: () => ({
				...OPERATOR_DOCUMENTS_PATHS.listFiles
			}),
			transformResponse: (response: TOperatorDocumentBackend[]) =>
				mapOperatorDocumentsToFrontend(response),
			providesTags: [ENUM_API_TAGS.BUSINESS]
		}),
		uploadOperatorBusinessDocument: builder.mutation<
			TFileMetadata[],
			{ file: File }
		>({
			query: ({ file }) => {
				const formData = new FormData();
				formData.append("files", file);
				return {
					...OPERATOR_DOCUMENTS_PATHS.addFiles,
					body: formData
				};
			},
			transformResponse: (response: TOperatorDocumentBackend[]) =>
				mapOperatorDocumentsToFrontend(response),
			invalidatesTags: [ENUM_API_TAGS.BUSINESS]
		}),
		deleteOperatorBusinessDocument: builder.mutation<void, string>({
			query: (fileId) => ({
				...OPERATOR_DOCUMENTS_PATHS.removeFile(fileId)
			}),
			invalidatesTags: [ENUM_API_TAGS.BUSINESS]
		}),
		getOperatorDocumentUrl: builder.query<Blob, string>({
			query: (fileId) => ({
				...OPERATOR_DOCUMENTS_PATHS.getFileUrl(fileId),
				responseHandler: (response) => response.blob()
			})
		})
	})
});

export const {
	useGetOperatorBusinessDocumentsQuery,
	useUploadOperatorBusinessDocumentMutation,
	useDeleteOperatorBusinessDocumentMutation
} = operatorBusinessDocumentsApi;

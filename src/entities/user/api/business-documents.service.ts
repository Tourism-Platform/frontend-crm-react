import { ENUM_API_TAGS } from "@/shared/api";
import type { TFileMetadata } from "@/shared/hooks";

import { authApi } from "@/entities/auth/api/auth.api";

export const businessDocumentsApi = authApi.injectEndpoints({
	endpoints: (builder) => ({
		getBusinessDocuments: builder.query<TFileMetadata[], void>({
			query: () => "/user/business-documents",
			providesTags: [ENUM_API_TAGS.BUSINESS]
		}),
		uploadBusinessDocument: builder.mutation<TFileMetadata, { file: File }>(
			{
				query: ({ file }) => {
					const formData = new FormData();
					formData.append("file", file);
					return {
						url: "/user/business-documents",
						method: "POST",
						body: formData
					};
				},
				invalidatesTags: [ENUM_API_TAGS.BUSINESS]
			}
		),
		deleteBusinessDocument: builder.mutation<void, string>({
			query: (documentId) => ({
				url: `/user/business-documents/${documentId}`,
				method: "DELETE"
			}),
			invalidatesTags: [ENUM_API_TAGS.BUSINESS]
		})
	})
});

export const {
	useGetBusinessDocumentsQuery,
	useUploadBusinessDocumentMutation,
	useDeleteBusinessDocumentMutation
} = businessDocumentsApi;

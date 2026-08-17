import { ENUM_API_TAGS, documentGeneratorApi } from "@/shared/api";

import { mapGenerateInvoiceDocumentToFrontend } from "../converters";
import type {
	IGenerateInvoiceDocument,
	IGenerateInvoiceDocumentBackend
} from "../types";

export const invoiceDocumentApi = documentGeneratorApi.injectEndpoints({
	endpoints: (builder) => ({
		generateInvoiceDocument: builder.mutation<
			IGenerateInvoiceDocument,
			string
		>({
			query: (invoiceId) => ({
				url: "/api/documents/invoice",
				method: "POST",
				body: { invoiceId }
			}),
			transformResponse: (response: IGenerateInvoiceDocumentBackend) =>
				mapGenerateInvoiceDocumentToFrontend(response),
			invalidatesTags: [ENUM_API_TAGS.FINANCE_INVOICES]
		})
	})
});

export const { useGenerateInvoiceDocumentMutation } = invoiceDocumentApi;

import { ENUM_API_TAGS, INVOICE_PATHS } from "@/shared/api";

import { authApi } from "@/entities/auth/api/auth.api";

import {
	mapGenerateInvoiceToBackend,
	mapInvoiceDetailToFrontend,
	mapInvoiceFiltersToBackend,
	mapInvoicePaginatedToFrontend,
	mapInvoicePaymentToBackend
} from "../converters";
import type {
	IGenerateInvoiceRequest,
	IInvoiceDetail,
	IInvoiceFilters,
	IInvoicePaginatedResponse,
	IRecordInvoicePaymentRequest,
	IUploadInvoicePdfRequest,
	TInvoiceDetailResponseBackend,
	TInvoiceListResponseBackend,
	TInvoicePdfResponseBackend
} from "../types";

export const invoiceApi = authApi.injectEndpoints({
	endpoints: (builder) => ({
		getInvoices: builder.query<
			IInvoicePaginatedResponse,
			IInvoiceFilters | void
		>({
			query: (filters) => ({
				...INVOICE_PATHS.listMyInvoices,
				params: filters
					? mapInvoiceFiltersToBackend(filters)
					: undefined
			}),
			transformResponse: (response: TInvoiceListResponseBackend) =>
				mapInvoicePaginatedToFrontend(response),
			providesTags: [ENUM_API_TAGS.FINANCE_INVOICES]
		}),
		getInvoiceById: builder.query<IInvoiceDetail, string>({
			query: (id) => ({
				...INVOICE_PATHS.getInvoice(id)
			}),
			transformResponse: (response: TInvoiceDetailResponseBackend) =>
				mapInvoiceDetailToFrontend(response),
			providesTags: (_, __, id) => [
				{ type: ENUM_API_TAGS.FINANCE_INVOICES, id }
			]
		}),
		getInvoicePdf: builder.query<TInvoicePdfResponseBackend, string>({
			query: (id) => ({
				...INVOICE_PATHS.getInvoicePdf(id)
			})
		}),
		generateInvoice: builder.mutation<
			IInvoiceDetail,
			IGenerateInvoiceRequest
		>({
			query: (data) => ({
				...INVOICE_PATHS.generateInvoice,
				body: mapGenerateInvoiceToBackend(data)
			}),
			transformResponse: (response: TInvoiceDetailResponseBackend) =>
				mapInvoiceDetailToFrontend(response),
			invalidatesTags: [
				ENUM_API_TAGS.FINANCE_INVOICES,
				ENUM_API_TAGS.FINANCE_LEDGER
			]
		}),
		uploadInvoicePdf: builder.mutation<
			IInvoiceDetail,
			IUploadInvoicePdfRequest
		>({
			query: ({ invoiceId, file }) => {
				const formData = new FormData();
				formData.append("file", file);

				return {
					...INVOICE_PATHS.uploadInvoicePdf(invoiceId),
					body: formData
				};
			},
			transformResponse: (response: TInvoiceDetailResponseBackend) =>
				mapInvoiceDetailToFrontend(response),
			invalidatesTags: (_result, _error, { invoiceId }) => [
				{ type: ENUM_API_TAGS.FINANCE_INVOICES, id: invoiceId }
			]
		}),
		recordInvoicePayment: builder.mutation<
			IInvoiceDetail,
			IRecordInvoicePaymentRequest
		>({
			query: (data) => ({
				...INVOICE_PATHS.recordInvoicePayment(data.invoiceId),
				body: mapInvoicePaymentToBackend(data)
			}),
			transformResponse: (response: TInvoiceDetailResponseBackend) =>
				mapInvoiceDetailToFrontend(response),
			invalidatesTags: [
				ENUM_API_TAGS.FINANCE_INVOICES,
				ENUM_API_TAGS.FINANCE_LEDGER
			]
		})
	})
});

export const {
	useGetInvoicesQuery,
	useGetInvoiceByIdQuery,
	useLazyGetInvoicePdfQuery,
	useGenerateInvoiceMutation,
	useUploadInvoicePdfMutation,
	useRecordInvoicePaymentMutation
} = invoiceApi;

import { ENUM_API_TAGS, INVOICE_PATHS } from "@/shared/api";
import type {
	InvoiceDetailResponse,
	InvoiceListResponse,
	InvoicePdfResponse
} from "@/shared/api";

import { authApi } from "@/entities/auth/api/auth.api";

import {
	mapInvoiceDetailToFrontend,
	mapInvoiceFiltersToBackend,
	mapInvoicePaginatedToFrontend
} from "../converters";
import type {
	IInvoiceDetail,
	IInvoiceFilters,
	IInvoicePaginatedResponse
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
			transformResponse: (response: InvoiceListResponse) =>
				mapInvoicePaginatedToFrontend(response),
			providesTags: [ENUM_API_TAGS.FINANCE_INVOICES]
		}),
		getInvoiceById: builder.query<IInvoiceDetail, string>({
			query: (id) => ({
				...INVOICE_PATHS.getInvoice(id)
			}),
			transformResponse: (response: InvoiceDetailResponse) =>
				mapInvoiceDetailToFrontend(response),
			providesTags: (_, __, id) => [
				{ type: ENUM_API_TAGS.FINANCE_INVOICES, id }
			]
		}),
		getInvoicePdf: builder.query<InvoicePdfResponse, string>({
			query: (id) => ({
				...INVOICE_PATHS.getInvoicePdf(id)
			})
		})
	})
});

export const {
	useGetInvoicesQuery,
	useGetInvoiceByIdQuery,
	useLazyGetInvoicePdfQuery
} = invoiceApi;

import { ENUM_API_TAGS } from "@/shared/api";

import { authApi } from "@/entities/auth/api/auth.api";

import {
	mapInvoiceDetailToFrontend,
	mapInvoiceFiltersToBackend,
	mapInvoicePaginatedToFrontend
} from "../converters";
import type {
	IInvoiceDetail,
	IInvoiceDetailBackend,
	IInvoiceFilters,
	IInvoicePaginatedResponse,
	IInvoicePaginatedResponseBackend
} from "../types";

export const invoiceApi = authApi.injectEndpoints({
	endpoints: (builder) => ({
		getInvoices: builder.query<
			IInvoicePaginatedResponse,
			IInvoiceFilters | void
		>({
			query: (filters) => ({
				url: "/finance/invoices",
				params: filters
					? mapInvoiceFiltersToBackend(filters)
					: undefined
			}),
			transformResponse: (response: IInvoicePaginatedResponseBackend) =>
				mapInvoicePaginatedToFrontend(response),
			providesTags: [ENUM_API_TAGS.FINANCE_INVOICES]
		}),
		getInvoiceById: builder.query<IInvoiceDetail, string>({
			query: (id) => ({
				url: `/finance/invoices/${id}`
			}),
			transformResponse: (response: IInvoiceDetailBackend) =>
				mapInvoiceDetailToFrontend(response),
			providesTags: (_, __, id) => [
				{ type: ENUM_API_TAGS.FINANCE_INVOICES, id }
			]
		})
	})
});

export const { useGetInvoicesQuery, useGetInvoiceByIdQuery } = invoiceApi;

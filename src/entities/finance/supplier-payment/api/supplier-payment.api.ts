import { ENUM_API_TAGS } from "@/shared/api";

import { authApi } from "@/entities/auth/api/auth.api";

import {
	mapSupplierPaymentFiltersToBackend,
	mapSupplierPaymentPaginatedToFrontend,
	mapSupplierPaymentToBackend,
	mapSupplierPaymentToFrontend
} from "../converters";
import type {
	ISupplierPayment,
	ISupplierPaymentBackend,
	ISupplierPaymentFilters,
	ISupplierPaymentPaginatedResponse,
	ISupplierPaymentPaginatedResponseBackend
} from "../types";

export const supplierPaymentApi = authApi.injectEndpoints({
	endpoints: (builder) => ({
		getSupplierPayments: builder.query<
			ISupplierPaymentPaginatedResponse,
			ISupplierPaymentFilters
		>({
			query: (filters) => ({
				url: "/finance/supplier-payments",
				params: mapSupplierPaymentFiltersToBackend(filters)
			}),
			transformResponse: (
				response: ISupplierPaymentPaginatedResponseBackend
			) => mapSupplierPaymentPaginatedToFrontend(response),
			providesTags: [ENUM_API_TAGS.FINANCE_SUPPLIER_PAYMENTS]
		}),
		updateSupplierPayment: builder.mutation<
			ISupplierPayment,
			{ id: string; data: Partial<ISupplierPayment> }
		>({
			query: ({ id, data }) => ({
				url: `/finance/supplier-payments/${id}`,
				method: "PATCH",
				body: mapSupplierPaymentToBackend(data)
			}),
			transformResponse: (response: ISupplierPaymentBackend) =>
				mapSupplierPaymentToFrontend(response),
			invalidatesTags: [ENUM_API_TAGS.FINANCE_SUPPLIER_PAYMENTS]
		})
	})
});

export const { useGetSupplierPaymentsQuery, useUpdateSupplierPaymentMutation } =
	supplierPaymentApi;

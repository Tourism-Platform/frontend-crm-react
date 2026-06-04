import { ENUM_API_TAGS, OPERATOR_SUPPLIER_PAYMENT_PATHS } from "@/shared/api";
import type { SupplierPaymentResponse } from "@/shared/api";

import { authApi } from "@/entities/auth/api/auth.api";

import {
	mapSupplierPaymentFiltersToBackend,
	mapSupplierPaymentListToPaginated,
	mapSupplierPaymentToFrontend,
	mapUpdateSupplierPaymentToBackend
} from "../converters";
import type {
	ISupplierPayment,
	ISupplierPaymentFilters,
	ISupplierPaymentPaginatedResponse,
	TSupplierPaymentBackend
} from "../types";

export const supplierPaymentApi = authApi.injectEndpoints({
	endpoints: (builder) => ({
		getSupplierPayments: builder.query<
			ISupplierPaymentPaginatedResponse,
			ISupplierPaymentFilters
		>({
			query: (filters) => ({
				...OPERATOR_SUPPLIER_PAYMENT_PATHS.listSupplierPayments,
				params: mapSupplierPaymentFiltersToBackend(filters)
			}),
			transformResponse: (
				response: SupplierPaymentResponse[],
				_meta,
				filters
			) => mapSupplierPaymentListToPaginated(response, filters),
			providesTags: [ENUM_API_TAGS.FINANCE_SUPPLIER_PAYMENTS]
		}),
		updateSupplierPayment: builder.mutation<
			ISupplierPayment,
			{ id: string; data: Partial<ISupplierPayment> }
		>({
			query: ({ id, data }) => ({
				...OPERATOR_SUPPLIER_PAYMENT_PATHS.updateSupplierPayment(id),
				body: mapUpdateSupplierPaymentToBackend(data)
			}),
			transformResponse: (response: TSupplierPaymentBackend) =>
				mapSupplierPaymentToFrontend(response),
			invalidatesTags: [ENUM_API_TAGS.FINANCE_SUPPLIER_PAYMENTS]
		}),
		uploadSupplierPaymentReceipt: builder.mutation<
			ISupplierPayment,
			{ id: string; file: File }
		>({
			query: ({ id, file }) => {
				const formData = new FormData();
				formData.append("file", file);

				return {
					...OPERATOR_SUPPLIER_PAYMENT_PATHS.uploadReceipt(id),
					body: formData
				};
			},
			transformResponse: (response: TSupplierPaymentBackend) =>
				mapSupplierPaymentToFrontend(response),
			invalidatesTags: [ENUM_API_TAGS.FINANCE_SUPPLIER_PAYMENTS]
		})
	})
});

export const {
	useGetSupplierPaymentsQuery,
	useUpdateSupplierPaymentMutation,
	useUploadSupplierPaymentReceiptMutation
} = supplierPaymentApi;

import { ENUM_API_TAGS } from "@/shared/api/backend/tags.config";
import { OPERATOR_SUPPLIER_PAYMENT_PATHS } from "@/shared/api/generated/paths/operator-supplier-payment.paths";

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
	TSupplierPaymentBackend,
	TSupplierPaymentListResponseInput
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
			transformResponse: (response: TSupplierPaymentListResponseInput) =>
				mapSupplierPaymentListToPaginated(response),
			providesTags: [ENUM_API_TAGS.FINANCE_SUPPLIER_PAYMENTS]
		}),
		getSupplierPaymentById: builder.query<ISupplierPayment, string>({
			query: (paymentId) => ({
				...OPERATOR_SUPPLIER_PAYMENT_PATHS.getSupplierPayment(paymentId)
			}),
			transformResponse: (response: TSupplierPaymentBackend) =>
				mapSupplierPaymentToFrontend(response),
			providesTags: (_result, _error, paymentId) => [
				{ type: ENUM_API_TAGS.FINANCE_SUPPLIER_PAYMENTS, id: paymentId }
			]
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
	useGetSupplierPaymentByIdQuery,
	useUpdateSupplierPaymentMutation,
	useUploadSupplierPaymentReceiptMutation
} = supplierPaymentApi;

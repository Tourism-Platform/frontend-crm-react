import { CLIENT_PAYMENT_PATHS, ENUM_API_TAGS } from "@/shared/api";

import { authApi } from "@/entities/auth/api/auth.api";

import {
	mapCreatePaymentToBackend,
	mapPaymentFiltersToBackend,
	mapPaymentToFrontend,
	mapPaymentsPaginatedToFrontend
} from "../converters";
import {
	type IPayment,
	type IPaymentFilters,
	type IPaymentPaginatedResponse,
	type TNewPaymentSchema,
	type TPaymentBackend,
	type TPaymentBackendResponse
} from "../types";

export const clientPaymentApi = authApi.injectEndpoints({
	endpoints: (builder) => ({
		getAvailableOrderIds: builder.query<string[], void>({
			query: () => "/finance/client-payments/available-orders",
			providesTags: [ENUM_API_TAGS.FINANCE_CLIENT_PAYMENTS]
		}),
		getPayments: builder.query<IPaymentPaginatedResponse, IPaymentFilters>({
			query: (filters) => ({
				...CLIENT_PAYMENT_PATHS.listPayments,
				params: mapPaymentFiltersToBackend(filters)
			}),
			transformResponse: (response: TPaymentBackendResponse) =>
				mapPaymentsPaginatedToFrontend(response),
			providesTags: [ENUM_API_TAGS.FINANCE_CLIENT_PAYMENTS]
		}),
		createPayment: builder.mutation<IPayment, TNewPaymentSchema>({
			query: (payment) => {
				console.log("payment", payment);
				const backendData = mapCreatePaymentToBackend(payment);
				const formData = new FormData();
				// Наполняем FormData
				Object.entries(backendData).forEach(([key, value]) => {
					if (value !== undefined && value !== null) {
						// Файлы добавляются как есть, остальное приводим к строке
						formData.append(
							key,
							value instanceof Blob ? value : String(value)
						);
					}
				});

				return {
					...CLIENT_PAYMENT_PATHS.createPayment,
					body: formData
				};
			}
		}),
		updatePayment: builder.mutation<
			IPayment,
			{ id: string; data: Partial<IPayment> }
		>({
			query: ({ id }) => ({
				...CLIENT_PAYMENT_PATHS.updatePayment(id)
				// body: mapPaymentToBackend(data)
			}),
			transformResponse: (response: TPaymentBackend) =>
				mapPaymentToFrontend(response),
			invalidatesTags: [ENUM_API_TAGS.FINANCE_CLIENT_PAYMENTS]
		}),
		getPaymentById: builder.query<IPayment, string>({
			query: (id) => ({
				...CLIENT_PAYMENT_PATHS.getPayment(id)
			}),
			transformResponse: (response: TPaymentBackend) =>
				mapPaymentToFrontend(response),
			providesTags: [ENUM_API_TAGS.FINANCE_CLIENT_PAYMENTS]
		}),
		confirmPayment: builder.mutation<IPayment, string>({
			query: (id) => ({
				...CLIENT_PAYMENT_PATHS.confirmPayment(id)
			}),
			transformResponse: (response: TPaymentBackend) =>
				mapPaymentToFrontend(response),
			invalidatesTags: [ENUM_API_TAGS.FINANCE_CLIENT_PAYMENTS]
		}),
		downloadAttachment: builder.query<string, string>({
			query: (id) => ({
				...CLIENT_PAYMENT_PATHS.downloadAttachment(id)
			})
		}),
		deletePayment: builder.mutation<void, string>({
			query: (id) => ({
				...CLIENT_PAYMENT_PATHS.deletePayment(id)
			}),
			invalidatesTags: [ENUM_API_TAGS.FINANCE_CLIENT_PAYMENTS]
		})
	})
});

export const {
	useGetAvailableOrderIdsQuery,
	useGetPaymentsQuery,
	useCreatePaymentMutation,
	useUpdatePaymentMutation,
	useDeletePaymentMutation,
	useGetPaymentByIdQuery,
	useConfirmPaymentMutation,
	useDownloadAttachmentQuery,
	useLazyDownloadAttachmentQuery
} = clientPaymentApi;

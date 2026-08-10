import { CLIENT_PAYMENT_PATHS, ENUM_API_TAGS } from "@/shared/api";
import type { ClientPaymentFile, ClientPaymentResponse } from "@/shared/api";

import { authApi } from "@/entities/auth/api/auth.api";

import {
	mapCreatePaymentToBackend,
	mapPaymentFiltersToBackend,
	mapPaymentToFrontend,
	mapPaymentsPaginatedToFrontend,
	mapUpdatePaymentToBackend
} from "../converters";
import type {
	IPayment,
	IPaymentFilters,
	IPaymentPaginatedResponse,
	TNewPaymentSchema,
	TPaymentBackend,
	TPaymentListResponseInput
} from "../types";

const attachmentTag = (paymentId: string) =>
	({
		type: ENUM_API_TAGS.FINANCE_CLIENT_PAYMENTS,
		id: `ATTACH_${paymentId}`
	}) as const;

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
			transformResponse: (response: TPaymentListResponseInput) =>
				mapPaymentsPaginatedToFrontend(response),
			providesTags: [ENUM_API_TAGS.FINANCE_CLIENT_PAYMENTS]
		}),
		createPayment: builder.mutation<IPayment, TNewPaymentSchema>({
			query: (payment) => {
				const backendData = mapCreatePaymentToBackend(payment);
				const formData = new FormData();

				formData.append("booking_id", backendData.booking_id);
				formData.append("amount_uzs", String(backendData.amount_uzs));
				formData.append(
					"exchange_rate",
					String(backendData.exchange_rate)
				);

				if (backendData.note) {
					formData.append("note", backendData.note);
				}

				formData.append("file", backendData.file);

				return {
					...CLIENT_PAYMENT_PATHS.createPayment,
					body: formData
				};
			},
			transformResponse: (response: ClientPaymentResponse) =>
				mapPaymentToFrontend(response),
			invalidatesTags: [ENUM_API_TAGS.FINANCE_CLIENT_PAYMENTS]
		}),
		updatePayment: builder.mutation<
			IPayment,
			{ id: string; data: Partial<IPayment> }
		>({
			query: ({ id, data }) => ({
				...CLIENT_PAYMENT_PATHS.updatePayment(id),
				body: mapUpdatePaymentToBackend(data)
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
		listAttachments: builder.query<ClientPaymentFile[], string>({
			query: (paymentId) => ({
				...CLIENT_PAYMENT_PATHS.listAttachments(paymentId)
			}),
			providesTags: (_result, _error, paymentId) => [
				attachmentTag(paymentId)
			]
		}),
		addAttachment: builder.mutation<
			ClientPaymentFile,
			{ paymentId: string; file: File }
		>({
			query: ({ paymentId, file }) => {
				const formData = new FormData();
				formData.append("file", file);

				return {
					...CLIENT_PAYMENT_PATHS.addAttachment(paymentId),
					body: formData
				};
			},
			invalidatesTags: (_result, _error, { paymentId }) => [
				attachmentTag(paymentId),
				ENUM_API_TAGS.FINANCE_CLIENT_PAYMENTS
			]
		}),
		downloadAttachment: builder.query<
			Blob,
			{ paymentId: string; fileId: string }
		>({
			query: ({ paymentId, fileId }) => ({
				...CLIENT_PAYMENT_PATHS.downloadAttachment(paymentId, fileId),
				responseHandler: (response) => response.blob()
			})
		}),
		removeAttachment: builder.mutation<
			void,
			{ paymentId: string; fileId: string }
		>({
			query: ({ paymentId, fileId }) => ({
				...CLIENT_PAYMENT_PATHS.removeAttachment(paymentId, fileId)
			}),
			invalidatesTags: (_result, _error, { paymentId }) => [
				attachmentTag(paymentId),
				ENUM_API_TAGS.FINANCE_CLIENT_PAYMENTS
			]
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
	useListAttachmentsQuery,
	useAddAttachmentMutation,
	useDownloadAttachmentQuery,
	useLazyDownloadAttachmentQuery,
	useRemoveAttachmentMutation
} = clientPaymentApi;

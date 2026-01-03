import { ENUM_API_TAGS } from "@/shared/api";

import { authApi } from "@/entities/auth/api/auth.api";

import {
	mapPaymentFiltersToBackend,
	mapPaymentToBackend,
	mapPaymentToFrontend,
	mapPaymentsPaginatedToFrontend
} from "../converters";
import {
	type IPayment,
	type IPaymentBackend,
	type IPaymentFilters,
	type IPaymentPaginatedResponse,
	type IPaymentPaginatedResponseBackend
} from "../types";

export const clientPaymentApi = authApi.injectEndpoints({
	endpoints: (builder) => ({
		getPayments: builder.query<
			IPaymentPaginatedResponse,
			IPaymentFilters | void
		>({
			query: (filters) => ({
				url: "/finance/client-payments",
				params: filters
					? mapPaymentFiltersToBackend(filters)
					: undefined
			}),
			transformResponse: (response: IPaymentPaginatedResponseBackend) =>
				mapPaymentsPaginatedToFrontend(response),
			providesTags: [ENUM_API_TAGS.FINANCE_PAYMENTS]
		}),
		createPayment: builder.mutation<IPayment, Partial<IPayment>>({
			query: (payment) => ({
				url: "/finance/client-payments",
				method: "POST",
				body: mapPaymentToBackend(payment)
			}),
			transformResponse: (response: IPaymentBackend) =>
				mapPaymentToFrontend(response),
			invalidatesTags: [ENUM_API_TAGS.FINANCE_PAYMENTS]
		}),
		updatePayment: builder.mutation<
			IPayment,
			{ id: string; data: Partial<IPayment> }
		>({
			query: ({ id, data }) => ({
				url: `/finance/client-payments/${id}`,
				method: "PATCH",
				body: mapPaymentToBackend(data)
			}),
			transformResponse: (response: IPaymentBackend) =>
				mapPaymentToFrontend(response),
			invalidatesTags: [ENUM_API_TAGS.FINANCE_PAYMENTS]
		}),
		deletePayment: builder.mutation<void, string>({
			query: (id) => ({
				url: `/finance/client-payments/${id}`,
				method: "DELETE"
			}),
			invalidatesTags: [ENUM_API_TAGS.FINANCE_PAYMENTS]
		})
	})
});

export const {
	useGetPaymentsQuery,
	useCreatePaymentMutation,
	useUpdatePaymentMutation,
	useDeletePaymentMutation
} = clientPaymentApi;

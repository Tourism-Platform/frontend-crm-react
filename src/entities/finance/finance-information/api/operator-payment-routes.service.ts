import { ENUM_API_TAGS, OPERATOR_PAYMENT_ROUTES_PATHS } from "@/shared/api";
import type { IPaginationRequest, IPaginationResponse } from "@/shared/types";

import { authApi } from "@/entities/auth/api/auth.api";

import {
	mapFormToPaymentRouteCreateBackend,
	mapFormToPaymentRouteUpdateBackend,
	mapOperatorPaymentRouteToFrontend,
	mapPaymentRoutesPaginatedToFrontend,
	mapPaymentRoutesQueryToBackend
} from "../converters";
import type {
	TOperatorPaymentRoute,
	TOperatorPaymentRouteBackend,
	TOperatorPaymentRoutesBackendResponse,
	TOperatorPayoutDetailsSchema
} from "../types";

export const operatorPaymentRoutesApi = authApi.injectEndpoints({
	endpoints: (builder) => ({
		getPaymentRoutes: builder.query<
			IPaginationResponse<TOperatorPaymentRoute>,
			IPaginationRequest
		>({
			query: (filters) => ({
				...OPERATOR_PAYMENT_ROUTES_PATHS.listPaymentRoutes,
				params: mapPaymentRoutesQueryToBackend(filters)
			}),
			transformResponse: (
				response: TOperatorPaymentRoutesBackendResponse
			) => mapPaymentRoutesPaginatedToFrontend(response),
			providesTags: [ENUM_API_TAGS.OPERATOR.PAYMENT_ROUTES]
		}),
		createPaymentRoute: builder.mutation<
			TOperatorPaymentRoute,
			TOperatorPayoutDetailsSchema
		>({
			query: (data) => ({
				...OPERATOR_PAYMENT_ROUTES_PATHS.createPaymentRoute,
				body: mapFormToPaymentRouteCreateBackend(data)
			}),
			transformResponse: (response: TOperatorPaymentRouteBackend) =>
				mapOperatorPaymentRouteToFrontend(response),
			invalidatesTags: [ENUM_API_TAGS.OPERATOR.PAYMENT_ROUTES]
		}),
		updatePaymentRoute: builder.mutation<
			TOperatorPaymentRoute,
			{ id: string; data: TOperatorPayoutDetailsSchema }
		>({
			query: ({ id, data }) => ({
				...OPERATOR_PAYMENT_ROUTES_PATHS.updatePaymentRoute(id),
				body: mapFormToPaymentRouteUpdateBackend(data)
			}),
			transformResponse: (response: TOperatorPaymentRouteBackend) =>
				mapOperatorPaymentRouteToFrontend(response),
			invalidatesTags: [ENUM_API_TAGS.OPERATOR.PAYMENT_ROUTES]
		}),
		deletePaymentRoute: builder.mutation<void, string>({
			query: (id) => ({
				...OPERATOR_PAYMENT_ROUTES_PATHS.deletePaymentRoute(id)
			}),
			invalidatesTags: [ENUM_API_TAGS.OPERATOR.PAYMENT_ROUTES]
		})
	})
});

export const {
	useGetPaymentRoutesQuery,
	useCreatePaymentRouteMutation,
	useUpdatePaymentRouteMutation,
	useDeletePaymentRouteMutation
} = operatorPaymentRoutesApi;

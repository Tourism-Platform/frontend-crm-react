import { ENUM_API_TAGS, OPERATOR_PAYMENT_ROUTES_PATHS } from "@/shared/api";

import { authApi } from "@/entities/auth/api/auth.api";

import {
	mapFormToPaymentRouteCreateBackend,
	mapFormToPaymentRouteUpdateBackend,
	mapOperatorPaymentRouteToFrontend,
	mapPaymentRoutesListToFrontend
} from "../converters";
import type { TOperatorPayoutDetailsSchema } from "../schema";
import type {
	TOperatorPaymentRoute,
	TOperatorPaymentRouteBackend
} from "../types";

export const operatorPaymentRoutesApi = authApi.injectEndpoints({
	endpoints: (builder) => ({
		getPaymentRoutes: builder.query<TOperatorPaymentRoute[], void>({
			query: () => ({
				...OPERATOR_PAYMENT_ROUTES_PATHS.listPaymentRoutes
			}),
			transformResponse: (response: TOperatorPaymentRouteBackend[]) =>
				mapPaymentRoutesListToFrontend(response),
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

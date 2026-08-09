import { ENUM_API_TAGS } from "@/shared/api/backend/tags.config";
import { BOOKING_ORDER_OPERATOR_PATHS } from "@/shared/api/generated/paths/booking-order-operator.paths";
import { BOOKING_RECONCILIATION_PATHS } from "@/shared/api/generated/paths/booking-reconciliation.paths";

import { authApi } from "@/entities/auth/api/auth.api";

import {
	mapBookingFinancialsToFrontend,
	mapBookingVarianceToFrontend,
	mapReconciliationFiltersToBackend,
	mapReconciliationPaginatedToFrontend
} from "../converters";
import type {
	IBookingFinancials,
	IBookingVariance,
	IReconciliationFilters,
	IReconciliationPaginatedResponse,
	TBookingFinancialsBackend,
	TBookingVarianceBackend,
	TReconciliationListBackend
} from "../types";

export const reconciliationApi = authApi.injectEndpoints({
	endpoints: (builder) => ({
		getReconciliations: builder.query<
			IReconciliationPaginatedResponse,
			IReconciliationFilters
		>({
			query: (filters) => ({
				...BOOKING_RECONCILIATION_PATHS.listBookingReconciliation,
				params: mapReconciliationFiltersToBackend(filters)
			}),
			transformResponse: (response: TReconciliationListBackend) =>
				mapReconciliationPaginatedToFrontend(response),
			providesTags: [ENUM_API_TAGS.FINANCE_RECONCILIATIONS]
		}),
		getOperatorOrderFinancials: builder.query<IBookingFinancials, string>({
			query: (bookingId) => ({
				...BOOKING_ORDER_OPERATOR_PATHS.getOperatorOrderFinancials(
					bookingId
				)
			}),
			transformResponse: (response: TBookingFinancialsBackend) =>
				mapBookingFinancialsToFrontend(response),
			providesTags: (_result, _error, bookingId) => [
				{ type: ENUM_API_TAGS.FINANCE_RECONCILIATIONS, id: bookingId }
			]
		}),
		getOperatorOrderVariance: builder.query<IBookingVariance, string>({
			query: (bookingId) => ({
				...BOOKING_ORDER_OPERATOR_PATHS.getOperatorOrderVariance(
					bookingId
				)
			}),
			transformResponse: (response: TBookingVarianceBackend) =>
				mapBookingVarianceToFrontend(response),
			providesTags: (_result, _error, bookingId) => [
				{ type: ENUM_API_TAGS.FINANCE_RECONCILIATIONS, id: bookingId }
			]
		})
	})
});

export const {
	useGetReconciliationsQuery,
	useGetOperatorOrderFinancialsQuery,
	useGetOperatorOrderVarianceQuery
} = reconciliationApi;

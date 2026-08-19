import { ENUM_API_TAGS, OPERATOR_AGENCIES_PATHS } from "@/shared/api";
import type { IPaginationRequest, IPaginationResponse } from "@/shared/types";

import { authApi } from "@/entities/auth/api/auth.api";

import {
	mapOperatorAgencyFiltersToBackend,
	mapOperatorAgencyInfoToFrontend,
	mapOperatorAgencyListToFrontend,
	mapPartneredAgencyFiltersToBackend,
	mapPartneredAgencyListToFrontend,
	mapPartneredAgencyToFrontend
} from "../converters";
import type {
	IOperatorAgencyInfo,
	IOperatorAgencyListItem,
	IPartneredAgency,
	TGetOperatorAgencyInfoBackendResponse,
	TInviteAgencyBackendBody,
	TListOperatorAgenciesBackendResponse,
	TListPartneredAgenciesBackendResponse,
	TPartneredAgencyItemBackend,
	TSetAgencyDiscountBackendBody
} from "../types";

export const operatorAgenciesApi = authApi.injectEndpoints({
	endpoints: (builder) => ({
		listOperatorAgencies: builder.query<
			IPaginationResponse<IOperatorAgencyListItem>,
			Partial<IPaginationRequest>
		>({
			query: (filters) => ({
				...OPERATOR_AGENCIES_PATHS.listAgencies,
				params: mapOperatorAgencyFiltersToBackend(filters)
			}),
			transformResponse: (
				response: TListOperatorAgenciesBackendResponse
			) => mapOperatorAgencyListToFrontend(response),
			providesTags: [ENUM_API_TAGS.OPERATOR.AGENCIES]
		}),
		listPartneredAgencies: builder.query<
			IPaginationResponse<IPartneredAgency>,
			Partial<IPaginationRequest>
		>({
			query: (filters) => ({
				...OPERATOR_AGENCIES_PATHS.listPartneredAgencies,
				params: mapPartneredAgencyFiltersToBackend(filters)
			}),
			transformResponse: (
				response: TListPartneredAgenciesBackendResponse
			) => mapPartneredAgencyListToFrontend(response),
			providesTags: [ENUM_API_TAGS.OPERATOR.AGENCIES]
		}),
		getOperatorAgencyInfoById: builder.query<IOperatorAgencyInfo, string>({
			query: (agencyId) => ({
				...OPERATOR_AGENCIES_PATHS.getAgencyInfoById(agencyId)
			}),
			transformResponse: (
				response: TGetOperatorAgencyInfoBackendResponse
			) => mapOperatorAgencyInfoToFrontend(response),
			providesTags: (_result, _error, agencyId) => [
				{ type: ENUM_API_TAGS.OPERATOR.AGENCIES, id: agencyId }
			]
		}),
		inviteAgency: builder.mutation<
			IPartneredAgency,
			TInviteAgencyBackendBody
		>({
			query: (body) => ({
				...OPERATOR_AGENCIES_PATHS.inviteAgency,
				body
			}),
			transformResponse: (response: TPartneredAgencyItemBackend) =>
				mapPartneredAgencyToFrontend(response),
			invalidatesTags: [ENUM_API_TAGS.OPERATOR.AGENCIES]
		}),
		setAgencyDiscount: builder.mutation<
			IPartneredAgency,
			{ agencyId: string; body: TSetAgencyDiscountBackendBody }
		>({
			query: ({ agencyId, body }) => ({
				...OPERATOR_AGENCIES_PATHS.setAgencyDiscount(agencyId),
				body
			}),
			transformResponse: (response: TPartneredAgencyItemBackend) =>
				mapPartneredAgencyToFrontend(response),
			invalidatesTags: (_result, _error, { agencyId }) => [
				{ type: ENUM_API_TAGS.OPERATOR.AGENCIES, id: agencyId },
				ENUM_API_TAGS.OPERATOR.AGENCIES
			]
		}),
		deleteAgencyDiscount: builder.mutation<void, string>({
			query: (agencyId) => ({
				...OPERATOR_AGENCIES_PATHS.deleteAgencyDiscount(agencyId)
			}),
			invalidatesTags: (_result, _error, agencyId) => [
				{ type: ENUM_API_TAGS.OPERATOR.AGENCIES, id: agencyId },
				ENUM_API_TAGS.OPERATOR.AGENCIES
			]
		})
	})
});

export const {
	useListOperatorAgenciesQuery,
	useListPartneredAgenciesQuery,
	useGetOperatorAgencyInfoByIdQuery,
	useInviteAgencyMutation,
	useSetAgencyDiscountMutation,
	useDeleteAgencyDiscountMutation
} = operatorAgenciesApi;

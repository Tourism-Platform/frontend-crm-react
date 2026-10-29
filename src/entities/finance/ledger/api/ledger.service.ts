import { ENUM_API_TAGS, LEDGER_PATHS } from "@/shared/api";
import type { IPaginationRequest, IPaginationResponse } from "@/shared/types";

import { authApi } from "@/entities/auth/api/auth.api";

import {
	mapCounterpartyBalanceQueryToBackend,
	mapCounterpartyBalancesPaginatedToFrontend,
	mapLedgerEntriesPaginatedToFrontend,
	mapLedgerFiltersToBackend
} from "../converters";
import type {
	ICounterpartyBalancePaginatedResponse,
	ILedgerEntry,
	ILedgerFilters,
	TCounterpartyBalanceListBackendResponse,
	TLedgerEntryListBackendResponse
} from "../types";

export const ledgerApi = authApi.injectEndpoints({
	endpoints: (builder) => ({
		getLedgerEntries: builder.query<
			IPaginationResponse<ILedgerEntry>,
			ILedgerFilters
		>({
			query: (filters) => ({
				...LEDGER_PATHS.listLedgerEntries,
				params: mapLedgerFiltersToBackend(filters)
			}),
			transformResponse: (response: TLedgerEntryListBackendResponse) =>
				mapLedgerEntriesPaginatedToFrontend(response),
			providesTags: [ENUM_API_TAGS.FINANCE_LEDGER]
		}),
		getDebtors: builder.query<
			ICounterpartyBalancePaginatedResponse,
			IPaginationRequest
		>({
			query: (filters) => ({
				...LEDGER_PATHS.listDebtors,
				params: mapCounterpartyBalanceQueryToBackend(filters)
			}),
			transformResponse: (
				response: TCounterpartyBalanceListBackendResponse
			) => mapCounterpartyBalancesPaginatedToFrontend(response),
			providesTags: [ENUM_API_TAGS.FINANCE_LEDGER]
		}),
		getCreditors: builder.query<
			ICounterpartyBalancePaginatedResponse,
			IPaginationRequest
		>({
			query: (filters) => ({
				...LEDGER_PATHS.listCreditors,
				params: mapCounterpartyBalanceQueryToBackend(filters)
			}),
			transformResponse: (
				response: TCounterpartyBalanceListBackendResponse
			) => mapCounterpartyBalancesPaginatedToFrontend(response),
			providesTags: [ENUM_API_TAGS.FINANCE_LEDGER]
		})
	})
});

export const {
	useGetLedgerEntriesQuery,
	useGetDebtorsQuery,
	useGetCreditorsQuery
} = ledgerApi;

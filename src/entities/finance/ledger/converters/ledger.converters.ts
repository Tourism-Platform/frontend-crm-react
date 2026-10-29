import type { IPaginationRequest, IPaginationResponse } from "@/shared/types";

import type {
	ICounterpartyBalance,
	ICounterpartyBalancePaginatedResponse,
	ILedgerEntry,
	ILedgerFilters,
	TCounterpartyBalanceBackend,
	TCounterpartyBalanceListBackendQuery,
	TCounterpartyBalanceListBackendResponse,
	TLedgerEntryBackend,
	TLedgerEntryListBackendQuery,
	TLedgerEntryListBackendResponse
} from "../types";

export const mapLedgerEntryToFrontend = (
	entry: TLedgerEntryBackend
): ILedgerEntry => ({
	id: entry.id,
	bookingId: entry.booking_id,
	orderNumber: entry.order_number,
	type: entry.typ,
	payer: { type: entry.payer_typ, id: entry.payer_id },
	payee: { type: entry.payee_typ, id: entry.payee_id },
	flow: entry.flow,
	amount: Number(entry.amount),
	currency: entry.currency,
	rate: Number(entry.rate),
	baseAmount: Number(entry.base_amount),
	source: entry.source,
	sourceId: entry.source_id,
	occurredAt: entry.occurred_at,
	note: entry.note
});

export const mapLedgerEntriesPaginatedToFrontend = (
	response: TLedgerEntryListBackendResponse
): IPaginationResponse<ILedgerEntry> => ({
	data: response.data.map(mapLedgerEntryToFrontend),
	total: response.total_count
});

export const mapLedgerFiltersToBackend = (
	filters: ILedgerFilters
): TLedgerEntryListBackendQuery => ({
	skip: (filters.page - 1) * filters.limit,
	limit: filters.limit,
	q: filters.search?.trim() || undefined,
	booking_id: filters.bookingId,
	party_typ: filters.partyType,
	party_id: filters.partyId,
	flow: filters.flow,
	typ: filters.type,
	source: filters.source,
	occurred_from: filters.occurredFrom,
	occurred_to: filters.occurredTo
});

export const mapCounterpartyBalanceToFrontend = (
	balance: TCounterpartyBalanceBackend
): ICounterpartyBalance => ({
	party: { type: balance.party_typ, id: balance.party_id },
	partyName: balance.party_name,
	billed: Number(balance.billed),
	paid: Number(balance.paid),
	outstanding: Number(balance.outstanding),
	currency: balance.currency
});

export const mapCounterpartyBalancesPaginatedToFrontend = (
	response: TCounterpartyBalanceListBackendResponse
): ICounterpartyBalancePaginatedResponse => ({
	data: response.data.map(mapCounterpartyBalanceToFrontend),
	total: response.total_count,
	currency: response.currency,
	totalOutstanding: Number(response.total_outstanding)
});

export const mapCounterpartyBalanceQueryToBackend = (
	filters: IPaginationRequest
): TCounterpartyBalanceListBackendQuery => ({
	skip: (filters.page - 1) * filters.limit,
	limit: filters.limit
});

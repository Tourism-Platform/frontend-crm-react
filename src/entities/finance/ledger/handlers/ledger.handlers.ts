import { HttpResponse } from "msw";

import {
	LEDGER_PATHS,
	createMockHandler,
	matchesQuery,
	toListResponse
} from "@/shared/api";

import { ENUM_CURRENCY_BACKEND } from "@/entities/commission/types/currency.types";

import { LEDGER_ENTRIES_MOCK, buildCounterpartyBalances } from "../mock";
import {
	ENUM_LEDGER_PARTY_BACKEND,
	type TCounterpartyBalanceBackend,
	type TLedgerEntryBackend
} from "../types";

/** Фильтр query → поле записи: пустой параметр пропускает всё */
const matchesParam = (query: URLSearchParams, key: string, value: unknown) =>
	!query.get(key) || query.get(key) === value;

const matchesEntry = (entry: TLedgerEntryBackend, query: URLSearchParams) => {
	const from = query.get("occurred_from");
	const to = query.get("occurred_to");

	return (
		matchesQuery(query.get("q"), entry.order_number, entry.note) &&
		matchesParam(query, "booking_id", entry.booking_id) &&
		(matchesParam(query, "party_typ", entry.payer_typ) ||
			matchesParam(query, "party_typ", entry.payee_typ)) &&
		(matchesParam(query, "party_id", entry.payer_id) ||
			matchesParam(query, "party_id", entry.payee_id)) &&
		matchesParam(query, "flow", entry.flow) &&
		matchesParam(query, "typ", entry.typ) &&
		matchesParam(query, "source", entry.source) &&
		(!from || entry.occurred_at >= from) &&
		(!to || entry.occurred_at <= to)
	);
};

const toBalanceListResponse = (
	balances: TCounterpartyBalanceBackend[],
	query: URLSearchParams
) => ({
	...toListResponse(balances, query),
	currency: ENUM_CURRENCY_BACKEND.USD,
	total_outstanding: String(
		balances.reduce((sum, item) => sum + Number(item.outstanding), 0)
	)
});

export const ledgerHandlers = [
	createMockHandler(LEDGER_PATHS.listLedgerEntries, ({ query }) =>
		HttpResponse.json(
			toListResponse(
				LEDGER_ENTRIES_MOCK.filter((entry) =>
					matchesEntry(entry, query)
				),
				query
			)
		)
	),
	createMockHandler(LEDGER_PATHS.listDebtors, ({ query }) =>
		HttpResponse.json(
			toBalanceListResponse(
				buildCounterpartyBalances(ENUM_LEDGER_PARTY_BACKEND.AGENCY),
				query
			)
		)
	),
	createMockHandler(LEDGER_PATHS.listCreditors, ({ query }) =>
		HttpResponse.json(
			toBalanceListResponse(
				buildCounterpartyBalances(ENUM_LEDGER_PARTY_BACKEND.SUPPLIER),
				query
			)
		)
	)
];

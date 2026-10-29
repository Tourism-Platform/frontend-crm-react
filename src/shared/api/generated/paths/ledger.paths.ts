import type {
	CounterpartyBalanceListResponse,
	LedgerEntryListResponse,
	LedgerEntryType,
	LedgerFlow,
	LedgerParty,
	LedgerSource
} from "../Api";

// AUTO-GENERATED — не редактировать вручную
// Сгенерировано скриптом scripts/generate-api-paths.ts

export const LEDGER_PATHS = {
	listLedgerEntries: {
		url: "/ledger/operator",
		method: "GET",
		_types: {} as {
			body: void;
			query: {
				booking_id?: string | null;
				party_typ?: LedgerParty | null;
				party_id?: string | null;
				flow?: LedgerFlow | null;
				typ?: LedgerEntryType | null;
				source?: LedgerSource | null;
				occurred_from?: string | null;
				occurred_to?: string | null;
				q?: string | null;
				skip?: number;
				limit?: number;
			};
			response: LedgerEntryListResponse;
		}
	} as const,
	listDebtors: {
		url: "/ledger/operator/debtors",
		method: "GET",
		_types: {} as {
			body: void;
			query: { skip?: number; limit?: number };
			response: CounterpartyBalanceListResponse;
		}
	} as const,
	listCreditors: {
		url: "/ledger/operator/creditors",
		method: "GET",
		_types: {} as {
			body: void;
			query: { skip?: number; limit?: number };
			response: CounterpartyBalanceListResponse;
		}
	} as const
} as const;

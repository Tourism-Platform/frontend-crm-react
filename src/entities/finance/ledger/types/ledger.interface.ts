import type { Currency } from "@/shared/api";
import type { IPaginationResponse } from "@/shared/types";

import type {
	ENUM_LEDGER_ENTRY_TYPE_BACKEND_TYPE,
	ENUM_LEDGER_FLOW_BACKEND_TYPE,
	ENUM_LEDGER_PARTY_BACKEND_TYPE,
	ENUM_LEDGER_SOURCE_BACKEND_TYPE
} from "./ledger-backend.types";

export interface ILedgerParty {
	type: ENUM_LEDGER_PARTY_BACKEND_TYPE;
	id: string | null;
}

export interface ILedgerEntry {
	id: string;
	bookingId: string | null;
	orderNumber: string | null;
	/** accrual — начислено (долг), settlement — фактическое движение денег */
	type: ENUM_LEDGER_ENTRY_TYPE_BACKEND_TYPE;
	payer: ILedgerParty;
	payee: ILedgerParty;
	flow: ENUM_LEDGER_FLOW_BACKEND_TYPE | null;
	amount: number;
	currency: Currency;
	rate: number;
	/** Сумма в базовой валюте оператора */
	baseAmount: number;
	source: ENUM_LEDGER_SOURCE_BACKEND_TYPE;
	sourceId: string | null;
	occurredAt: string;
	note: string | null;
}

export interface ICounterpartyBalance {
	party: ILedgerParty;
	partyName: string | null;
	billed: number;
	paid: number;
	outstanding: number;
	currency: Currency;
}

export interface ICounterpartyBalancePaginatedResponse
	extends IPaginationResponse<ICounterpartyBalance> {
	currency: Currency;
	totalOutstanding: number;
}

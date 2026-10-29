import type {
	ENUM_LEDGER_ENTRY_TYPE_BACKEND_TYPE,
	ENUM_LEDGER_FLOW_BACKEND_TYPE,
	ENUM_LEDGER_PARTY_BACKEND_TYPE,
	ENUM_LEDGER_SOURCE_BACKEND_TYPE
} from "./ledger-backend.types";

export const ENUM_LEDGER_FILTER = {
	TYPE: "type",
	FLOW: "flow",
	SOURCE: "source"
} as const;

export type ENUM_LEDGER_FILTER_TYPE =
	(typeof ENUM_LEDGER_FILTER)[keyof typeof ENUM_LEDGER_FILTER];

export interface ILedgerFilters {
	page: number;
	limit: number;
	search?: string;
	bookingId?: string;
	partyType?: ENUM_LEDGER_PARTY_BACKEND_TYPE;
	partyId?: string;
	flow?: ENUM_LEDGER_FLOW_BACKEND_TYPE;
	type?: ENUM_LEDGER_ENTRY_TYPE_BACKEND_TYPE;
	source?: ENUM_LEDGER_SOURCE_BACKEND_TYPE;
	occurredFrom?: string;
	occurredTo?: string;
}

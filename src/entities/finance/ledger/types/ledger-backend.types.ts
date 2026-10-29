import {
	type CounterpartyBalanceListResponse,
	type CounterpartyBalanceResponseOutput,
	type LEDGER_PATHS,
	type LedgerEntryListResponse,
	type LedgerEntryResponseOutput,
	LedgerEntryType,
	LedgerFlow,
	LedgerParty,
	LedgerSource
} from "@/shared/api";

export const ENUM_LEDGER_PARTY_BACKEND = {
	USER: LedgerParty.User,
	AGENCY: LedgerParty.Agency,
	SUPPLIER: LedgerParty.Supplier,
	OPERATOR: LedgerParty.Operator
} as const;

export type ENUM_LEDGER_PARTY_BACKEND_TYPE = LedgerParty;

export const ENUM_LEDGER_FLOW_BACKEND = {
	INBOUND: LedgerFlow.Inbound,
	OUTBOUND: LedgerFlow.Outbound
} as const;

export type ENUM_LEDGER_FLOW_BACKEND_TYPE = LedgerFlow;

export const ENUM_LEDGER_ENTRY_TYPE_BACKEND = {
	ACCRUAL: LedgerEntryType.Accrual,
	SETTLEMENT: LedgerEntryType.Settlement
} as const;

export type ENUM_LEDGER_ENTRY_TYPE_BACKEND_TYPE = LedgerEntryType;

export const ENUM_LEDGER_SOURCE_BACKEND = {
	INVOICE: LedgerSource.Invoice,
	CLIENT_PAYMENT: LedgerSource.ClientPayment,
	INVOICE_PAYMENT: LedgerSource.InvoicePayment,
	SUPPLIER_PAYMENT: LedgerSource.SupplierPayment,
	MANUAL: LedgerSource.Manual
} as const;

export type ENUM_LEDGER_SOURCE_BACKEND_TYPE = LedgerSource;

export type TLedgerEntryBackend = LedgerEntryResponseOutput;
export type TLedgerEntryListBackendResponse = LedgerEntryListResponse;
export type TLedgerEntryListBackendQuery =
	typeof LEDGER_PATHS.listLedgerEntries._types.query;

export type TCounterpartyBalanceBackend = CounterpartyBalanceResponseOutput;
export type TCounterpartyBalanceListBackendResponse =
	CounterpartyBalanceListResponse;
export type TCounterpartyBalanceListBackendQuery =
	typeof LEDGER_PATHS.listDebtors._types.query;

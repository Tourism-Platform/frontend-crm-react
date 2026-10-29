import { type TOptionsKeys } from "@/shared/config";
import type { BadgeVariant } from "@/shared/ui";

import {
	ENUM_LEDGER_ENTRY_TYPE_BACKEND,
	type ENUM_LEDGER_ENTRY_TYPE_BACKEND_TYPE,
	ENUM_LEDGER_FLOW_BACKEND,
	type ENUM_LEDGER_FLOW_BACKEND_TYPE,
	ENUM_LEDGER_PARTY_BACKEND,
	type ENUM_LEDGER_PARTY_BACKEND_TYPE,
	ENUM_LEDGER_SOURCE_BACKEND,
	type ENUM_LEDGER_SOURCE_BACKEND_TYPE
} from "../types";

export const LEDGER_ENTRY_TYPE_LABELS: Record<
	ENUM_LEDGER_ENTRY_TYPE_BACKEND_TYPE,
	TOptionsKeys
> = {
	[ENUM_LEDGER_ENTRY_TYPE_BACKEND.ACCRUAL]: "finance.ledger.types.accrual",
	[ENUM_LEDGER_ENTRY_TYPE_BACKEND.SETTLEMENT]:
		"finance.ledger.types.settlement"
};

export const LEDGER_ENTRY_TYPE_VARIANTS: Record<
	ENUM_LEDGER_ENTRY_TYPE_BACKEND_TYPE,
	BadgeVariant
> = {
	[ENUM_LEDGER_ENTRY_TYPE_BACKEND.ACCRUAL]: "yellow",
	[ENUM_LEDGER_ENTRY_TYPE_BACKEND.SETTLEMENT]: "green"
};

export const LEDGER_FLOW_LABELS: Record<
	ENUM_LEDGER_FLOW_BACKEND_TYPE,
	TOptionsKeys
> = {
	[ENUM_LEDGER_FLOW_BACKEND.INBOUND]: "finance.ledger.flows.inbound",
	[ENUM_LEDGER_FLOW_BACKEND.OUTBOUND]: "finance.ledger.flows.outbound"
};

export const LEDGER_SOURCE_LABELS: Record<
	ENUM_LEDGER_SOURCE_BACKEND_TYPE,
	TOptionsKeys
> = {
	[ENUM_LEDGER_SOURCE_BACKEND.INVOICE]: "finance.ledger.sources.invoice",
	[ENUM_LEDGER_SOURCE_BACKEND.CLIENT_PAYMENT]:
		"finance.ledger.sources.client_payment",
	[ENUM_LEDGER_SOURCE_BACKEND.INVOICE_PAYMENT]:
		"finance.ledger.sources.invoice_payment",
	[ENUM_LEDGER_SOURCE_BACKEND.SUPPLIER_PAYMENT]:
		"finance.ledger.sources.supplier_payment",
	[ENUM_LEDGER_SOURCE_BACKEND.MANUAL]: "finance.ledger.sources.manual"
};

export const LEDGER_PARTY_LABELS: Record<
	ENUM_LEDGER_PARTY_BACKEND_TYPE,
	TOptionsKeys
> = {
	[ENUM_LEDGER_PARTY_BACKEND.USER]: "finance.ledger.parties.user",
	[ENUM_LEDGER_PARTY_BACKEND.AGENCY]: "finance.ledger.parties.agency",
	[ENUM_LEDGER_PARTY_BACKEND.SUPPLIER]: "finance.ledger.parties.supplier",
	[ENUM_LEDGER_PARTY_BACKEND.OPERATOR]: "finance.ledger.parties.operator"
};

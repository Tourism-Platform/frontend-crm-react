import type { Icon } from "@solar-icons/react/lib/types";
import {
	ArrowLeftDownIcon,
	ArrowRightUpIcon,
	BillListIcon,
	CardTransferIcon,
	CheckCircleIcon,
	DocumentAddIcon,
	HandMoneyIcon,
	PenIcon,
	WalletMoneyIcon
} from "@solar-icons/react/outline";

import {
	ENUM_LEDGER_ENTRY_TYPE_BACKEND,
	type ENUM_LEDGER_ENTRY_TYPE_BACKEND_TYPE,
	ENUM_LEDGER_FLOW_BACKEND,
	type ENUM_LEDGER_FLOW_BACKEND_TYPE,
	ENUM_LEDGER_SOURCE_BACKEND,
	type ENUM_LEDGER_SOURCE_BACKEND_TYPE
} from "../types";

/** Иконки опций фильтров проводок — ключи как у `LEDGER_*_LABELS` */
export const LEDGER_ENTRY_TYPE_ICONS: Record<
	ENUM_LEDGER_ENTRY_TYPE_BACKEND_TYPE,
	Icon
> = {
	[ENUM_LEDGER_ENTRY_TYPE_BACKEND.ACCRUAL]: DocumentAddIcon,
	[ENUM_LEDGER_ENTRY_TYPE_BACKEND.SETTLEMENT]: CheckCircleIcon
};

export const LEDGER_FLOW_ICONS: Record<ENUM_LEDGER_FLOW_BACKEND_TYPE, Icon> = {
	[ENUM_LEDGER_FLOW_BACKEND.INBOUND]: ArrowLeftDownIcon,
	[ENUM_LEDGER_FLOW_BACKEND.OUTBOUND]: ArrowRightUpIcon
};

export const LEDGER_SOURCE_ICONS: Record<
	ENUM_LEDGER_SOURCE_BACKEND_TYPE,
	Icon
> = {
	[ENUM_LEDGER_SOURCE_BACKEND.INVOICE]: BillListIcon,
	[ENUM_LEDGER_SOURCE_BACKEND.CLIENT_PAYMENT]: HandMoneyIcon,
	[ENUM_LEDGER_SOURCE_BACKEND.INVOICE_PAYMENT]: WalletMoneyIcon,
	[ENUM_LEDGER_SOURCE_BACKEND.SUPPLIER_PAYMENT]: CardTransferIcon,
	[ENUM_LEDGER_SOURCE_BACKEND.MANUAL]: PenIcon
};

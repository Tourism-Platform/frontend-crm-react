import { type IQueryTab } from "@/shared/ui";

import { LedgerCreditors, LedgerDebtors } from "../ui/ledger-balances";
import { LedgerEntries } from "../ui/ledger-entries";

import { ENUM_LEDGER_TAB, type ENUM_LEDGER_TAB_TYPE } from "./types";

export const LEDGER_TABS: IQueryTab<ENUM_LEDGER_TAB_TYPE, "ledger_page">[] = [
	{
		type: ENUM_LEDGER_TAB.ENTRIES,
		label: "tabs.entries",
		slot: LedgerEntries
	},
	{
		type: ENUM_LEDGER_TAB.DEBTORS,
		label: "tabs.debtors",
		slot: LedgerDebtors
	},
	{
		type: ENUM_LEDGER_TAB.CREDITORS,
		label: "tabs.creditors",
		slot: LedgerCreditors
	}
];

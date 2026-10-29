export const ENUM_LEDGER_TAB = {
	ENTRIES: "entries",
	DEBTORS: "debtors",
	CREDITORS: "creditors"
} as const;

export type ENUM_LEDGER_TAB_TYPE =
	(typeof ENUM_LEDGER_TAB)[keyof typeof ENUM_LEDGER_TAB];

export type ENUM_LEDGER_BALANCE_KIND_TYPE = Exclude<
	ENUM_LEDGER_TAB_TYPE,
	typeof ENUM_LEDGER_TAB.ENTRIES
>;

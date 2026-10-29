import type { TLedgerPageKeys } from "@/shared/config";
import type { TFormField } from "@/shared/types";

import {
	ENUM_LEDGER_FILTER,
	type ENUM_LEDGER_FILTER_TYPE
} from "@/entities/finance";

export const LEDGER_FILTERS_LIST: TFormField<
	TLedgerPageKeys,
	ENUM_LEDGER_FILTER_TYPE
>[] = [
	{
		key: ENUM_LEDGER_FILTER.TYPE,
		label: "entries.filters.type.label",
		placeholder: "entries.filters.type.placeholder",
		fieldType: "select",
		options: []
	},
	{
		key: ENUM_LEDGER_FILTER.FLOW,
		label: "entries.filters.flow.label",
		placeholder: "entries.filters.flow.placeholder",
		fieldType: "select",
		options: []
	},
	{
		key: ENUM_LEDGER_FILTER.SOURCE,
		label: "entries.filters.source.label",
		placeholder: "entries.filters.source.placeholder",
		fieldType: "select",
		options: []
	}
];

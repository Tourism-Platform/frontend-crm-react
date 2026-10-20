import type { TReconciliationPageKeys } from "@/shared/config";
import type { TFormField } from "@/shared/types";

import {
	ENUM_RECONCILIATION_FILTER,
	type ENUM_RECONCILIATION_FILTER_TYPE
} from "@/entities/finance";

export const RECONCILIATION_FILTERS_LIST: TFormField<
	TReconciliationPageKeys,
	ENUM_RECONCILIATION_FILTER_TYPE
>[] = [
	{
		key: ENUM_RECONCILIATION_FILTER.DATE_RANGE,
		label: "filters.period.label",
		placeholder: "filters.period.placeholder",
		fieldType: "dateRange"
	},
	{
		key: ENUM_RECONCILIATION_FILTER.OUTSTANDING_ONLY,
		label: "filters.outstanding_only.label",
		fieldType: "switch"
	},
	{
		key: ENUM_RECONCILIATION_FILTER.PAYABLE_ONLY,
		label: "filters.payable_only.label",
		fieldType: "switch"
	}
];

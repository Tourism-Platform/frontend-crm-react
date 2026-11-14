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
	}
];

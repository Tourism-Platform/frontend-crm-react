import type { TClientPaymentsPageKeys } from "@/shared/config";
import type { TFormField } from "@/shared/types";

import {
	ENUM_PAYMENT_FILTER,
	type ENUM_PAYMENT_FILTER_TYPE
} from "@/entities/finance";

export const CLIENT_PAYMENTS_FILTERS_LIST: TFormField<
	TClientPaymentsPageKeys,
	ENUM_PAYMENT_FILTER_TYPE
>[] = [
	{
		key: ENUM_PAYMENT_FILTER.CREATED_RANGE,
		label: "filters.created.label",
		placeholder: "filters.created.placeholder",
		fieldType: "dateRange"
	}
];

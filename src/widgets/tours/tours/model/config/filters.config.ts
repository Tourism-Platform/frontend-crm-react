import type { TToursPageKeys } from "@/shared/config";
import type { TFormField } from "@/shared/types";
import { useValueToTranslateLabel } from "@/shared/utils";

import {
	ENUM_TOUR_FILTER,
	type ENUM_TOUR_FILTER_TYPE,
	TOUR_LIST_SORT_LABELS,
	TOUR_TYPE_LABELS
} from "@/entities/tour";

export const TOURS_FILTERS_LIST = (): TFormField<
	TToursPageKeys,
	ENUM_TOUR_FILTER_TYPE
>[] => [
	{
		key: ENUM_TOUR_FILTER.SORT,
		label: "filters.sort.label",
		placeholder: "filters.sort.placeholder",
		fieldType: "select",
		options: useValueToTranslateLabel(TOUR_LIST_SORT_LABELS)
	},
	{
		key: ENUM_TOUR_FILTER.TYPE,
		label: "filters.type.label",
		placeholder: "filters.type.placeholder",
		fieldType: "select",
		options: useValueToTranslateLabel(TOUR_TYPE_LABELS)
	}
];

import type { Icon } from "@solar-icons/react/lib/types";
import {
	SortFromBottomToTopIcon,
	SortFromTopToBottomIcon
} from "@solar-icons/react/outline";

import {
	ENUM_CATALOG_SORT,
	type ENUM_CATALOG_SORT_TYPE
} from "@/entities/tour";

/** Иконка каждой сортировки; направление — стрелкой, как в фильтрах каталога blogix */
export const CATALOG_SORT_ICONS: Record<ENUM_CATALOG_SORT_TYPE, Icon> = {
	[ENUM_CATALOG_SORT.PRICE_ASC]: SortFromBottomToTopIcon,
	[ENUM_CATALOG_SORT.PRICE_DESC]: SortFromTopToBottomIcon,
	[ENUM_CATALOG_SORT.DURATION_ASC]: SortFromBottomToTopIcon,
	[ENUM_CATALOG_SORT.DURATION_DESC]: SortFromTopToBottomIcon
};

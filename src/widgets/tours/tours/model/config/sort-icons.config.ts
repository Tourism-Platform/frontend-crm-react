import type { Icon } from "@solar-icons/react/lib/types";
import {
	ChecklistMinimalisticIcon,
	SortAlphabeticallyIcon,
	SortFromBottomToTopIcon,
	SortFromTopToBottomIcon
} from "@solar-icons/react/outline";

import {
	ENUM_TOUR_LIST_SORT,
	type ENUM_TOUR_LIST_SORT_TYPE
} from "@/entities/tour";

/** Иконка каждой сортировки; направление — стрелкой, как в фильтрах каталога blogix */
export const TOUR_LIST_SORT_ICONS: Record<ENUM_TOUR_LIST_SORT_TYPE, Icon> = {
	[ENUM_TOUR_LIST_SORT.CREATED_DESC]: SortFromTopToBottomIcon,
	[ENUM_TOUR_LIST_SORT.CREATED_ASC]: SortFromBottomToTopIcon,
	[ENUM_TOUR_LIST_SORT.TITLE_ASC]: SortAlphabeticallyIcon,
	[ENUM_TOUR_LIST_SORT.TITLE_DESC]: SortAlphabeticallyIcon,
	[ENUM_TOUR_LIST_SORT.STATUS_ASC]: ChecklistMinimalisticIcon,
	[ENUM_TOUR_LIST_SORT.GROUP_SIZE_ASC]: SortFromBottomToTopIcon,
	[ENUM_TOUR_LIST_SORT.GROUP_SIZE_DESC]: SortFromTopToBottomIcon
};

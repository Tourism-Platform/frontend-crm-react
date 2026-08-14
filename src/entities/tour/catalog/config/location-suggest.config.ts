import type { Icon } from "@solar-icons/react/lib/types";
import { CityIcon, GlobeIcon, MapPointIcon } from "@solar-icons/react/outline";

import type { TCommonToursKeys } from "@/shared/config";

import {
	ENUM_LOCATION_SUGGEST_KIND,
	type ENUM_LOCATION_SUGGEST_KIND_TYPE
} from "../types/location-suggest.types";

export const LOCATION_SUGGEST_KIND_ICONS: Record<
	ENUM_LOCATION_SUGGEST_KIND_TYPE,
	Icon
> = {
	[ENUM_LOCATION_SUGGEST_KIND.CITY]: CityIcon,
	[ENUM_LOCATION_SUGGEST_KIND.COUNTRY]: GlobeIcon,
	[ENUM_LOCATION_SUGGEST_KIND.PLACE]: MapPointIcon
};

export const LOCATION_SUGGEST_KIND_BADGE_CLASS: Record<
	ENUM_LOCATION_SUGGEST_KIND_TYPE,
	string
> = {
	[ENUM_LOCATION_SUGGEST_KIND.CITY]: "bg-emerald-500/10 text-emerald-600",
	[ENUM_LOCATION_SUGGEST_KIND.COUNTRY]: "bg-sky-500/10 text-sky-600",
	[ENUM_LOCATION_SUGGEST_KIND.PLACE]: "bg-primary/10 text-primary"
};

export const LOCATION_SUGGEST_KIND_LABEL_KEYS: Record<
	ENUM_LOCATION_SUGGEST_KIND_TYPE,
	TCommonToursKeys
> = {
	[ENUM_LOCATION_SUGGEST_KIND.CITY]: "search.form.fields.where.kinds.city",
	[ENUM_LOCATION_SUGGEST_KIND.COUNTRY]:
		"search.form.fields.where.kinds.country",
	[ENUM_LOCATION_SUGGEST_KIND.PLACE]: "search.form.fields.where.kinds.place"
};

export const getLocationSuggestKindIcon = (
	kind: ENUM_LOCATION_SUGGEST_KIND_TYPE
): Icon => LOCATION_SUGGEST_KIND_ICONS[kind];

export const getLocationSuggestKindBadgeClass = (
	kind: ENUM_LOCATION_SUGGEST_KIND_TYPE
): string => LOCATION_SUGGEST_KIND_BADGE_CLASS[kind];

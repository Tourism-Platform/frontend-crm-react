import type { Option } from "@/shared/ui";

import {
	ENUM_CATALOG_FILTER,
	type ENUM_CATALOG_FILTER_TYPE,
	type TCatalogFilterForm
} from "../types";

import { CATALOG_LANGUAGE_FLAGS } from "./catalog-language-flags.config";

/** Фильтры каталога бейджами в поле, как параметры каталога blogix; страны и города — с бэка */
export const FORM_CATALOG_FILTERS_LIST = (
	options: Record<ENUM_CATALOG_FILTER_TYPE, Option[]>
): TCatalogFilterForm[] => [
	{
		key: ENUM_CATALOG_FILTER.COUNTRY,
		label: "filters.fields.country",
		placeholder: "filters.placeholders.country",
		fieldType: "multiselect",
		options: options[ENUM_CATALOG_FILTER.COUNTRY]
	},
	{
		key: ENUM_CATALOG_FILTER.CITY,
		label: "filters.fields.city",
		placeholder: "filters.placeholders.city",
		fieldType: "multiselect",
		options: options[ENUM_CATALOG_FILTER.CITY]
	},
	{
		key: ENUM_CATALOG_FILTER.DURATION,
		label: "filters.fields.duration",
		placeholder: "filters.placeholders.duration",
		fieldType: "multiselect",
		options: options[ENUM_CATALOG_FILTER.DURATION]
	},
	{
		key: ENUM_CATALOG_FILTER.LANGUAGE,
		label: "filters.fields.language",
		placeholder: "filters.placeholders.language",
		fieldType: "multiselect",
		options: options[ENUM_CATALOG_FILTER.LANGUAGE],
		optionIcons: CATALOG_LANGUAGE_FLAGS
	},
	{
		key: ENUM_CATALOG_FILTER.CATEGORY,
		label: "filters.fields.category",
		placeholder: "filters.placeholders.category",
		fieldType: "multiselect",
		options: options[ENUM_CATALOG_FILTER.CATEGORY]
	}
];

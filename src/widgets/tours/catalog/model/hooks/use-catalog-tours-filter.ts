import { useMemo } from "react";
import { useTranslation } from "react-i18next";

import type { Option } from "@/shared/ui";
import { useValueToTranslateLabel } from "@/shared/utils";

import {
	CATALOG_DURATION_KEYS,
	CATALOG_DURATION_PRESETS,
	LANGUAGES_LABELS,
	TOUR_CATEGORY_LABELS,
	useGetCatalogFiltersQuery
} from "@/entities/tour";

import { ENUM_CATALOG_FILTER, type ENUM_CATALOG_FILTER_TYPE } from "../types";

/** Опции фильтров каталога: страны и города — с бэка на языке интерфейса, остальное — переводы enum'ов */
export const useCatalogToursFilter = (): Record<
	ENUM_CATALOG_FILTER_TYPE,
	Option[]
> => {
	const { t, i18n } = useTranslation("options");
	const { data: catalogFilters } = useGetCatalogFiltersQuery(i18n.language);
	const languageOptions = useValueToTranslateLabel(LANGUAGES_LABELS);
	const categoryOptions = useValueToTranslateLabel(TOUR_CATEGORY_LABELS);

	return useMemo(
		() => ({
			[ENUM_CATALOG_FILTER.COUNTRY]: (
				catalogFilters?.countries ?? []
			).map((name) => ({ label: name, value: name })),
			[ENUM_CATALOG_FILTER.CITY]: (catalogFilters?.cities ?? []).map(
				(name) => ({ label: name, value: name })
			),
			[ENUM_CATALOG_FILTER.DURATION]: CATALOG_DURATION_KEYS.map(
				(value) => ({
					label: t(CATALOG_DURATION_PRESETS[value].labelKey),
					value
				})
			),
			[ENUM_CATALOG_FILTER.LANGUAGE]: languageOptions,
			[ENUM_CATALOG_FILTER.CATEGORY]: categoryOptions
		}),
		[
			catalogFilters?.countries,
			catalogFilters?.cities,
			languageOptions,
			categoryOptions,
			t
		]
	);
};

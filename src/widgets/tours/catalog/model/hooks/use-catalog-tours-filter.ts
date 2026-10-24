import { useCallback, useMemo } from "react";
import { type UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { type TOptionsKeys } from "@/shared/config";
import type { IAccordionItem } from "@/shared/ui/custom/custom-accordion/model/types";

import {
	CATALOG_CATEGORY_KEYS,
	CATALOG_DURATION_KEYS,
	CATALOG_DURATION_PRESETS,
	CATALOG_LANGUAGE_KEYS,
	type ICatalogTourFilters,
	buildCatalogFilterItems,
	buildStringFilterItems,
	useGetCatalogFiltersQuery
} from "@/entities/tour";
import { LANGUAGES_LABELS } from "@/entities/tour/landing";
import { TOUR_CATEGORY_LABELS } from "@/entities/tour/tour";

import { CATALOG_FILTER_SECTIONS } from "../config";
import type { ICatalogFilterSection, TCatalogFilterField } from "../types";

export const useCatalogToursFilter = (
	form: UseFormReturn<ICatalogTourFilters>
): ICatalogFilterSection[] => {
	const { t } = useTranslation("tours_catalog_page");
	const { t: tOptions, i18n } = useTranslation("options");
	const { watch, setValue } = form;

	const selectedFilters = watch("filters") || {};

	const { data: catalogFilters, isLoading } = useGetCatalogFiltersQuery(
		i18n.language
	);

	const translateOption = useCallback(
		(key: TOptionsKeys): string => tOptions(key) as string,
		[tOptions]
	);

	const itemsByField: Record<TCatalogFilterField, IAccordionItem[]> = useMemo(
		() => ({
			country: buildStringFilterItems(
				catalogFilters?.countries ?? [],
				selectedFilters.country
			),
			city: buildStringFilterItems(
				catalogFilters?.cities ?? [],
				selectedFilters.city
			),
			duration: CATALOG_DURATION_KEYS.map((id) => ({
				id,
				label: translateOption(CATALOG_DURATION_PRESETS[id].labelKey),
				checked: (selectedFilters.duration ?? []).includes(id)
			})),
			language: buildCatalogFilterItems(
				CATALOG_LANGUAGE_KEYS,
				LANGUAGES_LABELS,
				selectedFilters.language,
				translateOption
			),
			category: buildCatalogFilterItems(
				CATALOG_CATEGORY_KEYS,
				TOUR_CATEGORY_LABELS,
				selectedFilters.category,
				translateOption
			)
		}),
		[
			catalogFilters?.countries,
			catalogFilters?.cities,
			selectedFilters.country,
			selectedFilters.city,
			selectedFilters.duration,
			selectedFilters.language,
			selectedFilters.category,
			translateOption
		]
	);

	/** Отметка пункта фильтра: добавить/убрать id и вернуться на первую страницу */
	const toggleFilterValue = useCallback(
		(field: TCatalogFilterField, id: string, checked: boolean) => {
			const filters = form.getValues("filters") ?? {};
			const current: string[] = filters[field] ?? [];
			const next = checked
				? [...current, id]
				: current.filter((value) => value !== id);

			setValue("filters", {
				...filters,
				[field]: next
			} as ICatalogTourFilters["filters"]);
			setValue("page", 1);
		},
		[form, setValue]
	);

	return useMemo(
		() =>
			CATALOG_FILTER_SECTIONS.map(
				({ field, titleKey, icon, isRemote }) => ({
					id: field,
					title: t(titleKey),
					icon,
					items: itemsByField[field],
					isLoading: isRemote ? isLoading : undefined,
					onChange: (id: string, checked: boolean) =>
						toggleFilterValue(field, id, checked)
				})
			),
		[itemsByField, isLoading, t, toggleFilterValue]
	);
};

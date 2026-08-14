"use client";

import { Clock, Globe, MapPin, Tag } from "lucide-react";
import { type FC, useCallback, useMemo } from "react";
import { type UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { LanguageCode } from "@/shared/api";
import {
	ENUM_LANGUAGES,
	type TOptionsKeys,
	i18nLanguageMapper
} from "@/shared/config";
import { languageCodeMapper } from "@/shared/converters";
import { CustomAccordion, withErrorBoundary } from "@/shared/ui";

import {
	CATALOG_DURATION_KEYS,
	CATALOG_DURATION_PRESETS,
	type ENUM_CATALOG_DURATION_TYPE,
	type ENUM_LANGUAGES_TYPE,
	type ENUM_TOUR_CATEGORY_TYPE,
	type ICatalogTourFilters,
	buildCatalogFilterItems,
	buildStringFilterItems,
	useGetCatalogFiltersQuery
} from "@/entities/tour";
import {
	LANGUAGES_LABELS,
	ENUM_LANGUAGES as TOUR_LANGUAGES
} from "@/entities/tour/landing";
import { ENUM_TOUR_CATEGORY, TOUR_CATEGORY_LABELS } from "@/entities/tour/tour";

interface ICatalogToursFilterProps {
	form: UseFormReturn<ICatalogTourFilters>;
}

const LANGUAGE_KEYS = Object.values(TOUR_LANGUAGES) as ENUM_LANGUAGES_TYPE[];
const CATEGORY_KEYS = Object.values(
	ENUM_TOUR_CATEGORY
) as ENUM_TOUR_CATEGORY_TYPE[];

const CatalogToursFilterBase: FC<ICatalogToursFilterProps> = ({ form }) => {
	const { t } = useTranslation("tours_catalog_page");
	const { t: tOptions, i18n } = useTranslation("options");
	const { watch, setValue } = form;

	const selectedFilters = watch("filters") || {};

	const readLang = useMemo(
		() =>
			languageCodeMapper.to(
				i18nLanguageMapper.to(i18n.language) ?? ENUM_LANGUAGES.EN
			) ?? LanguageCode.En,
		[i18n.language]
	);

	const { data: catalogFilters, isLoading: isCatalogFiltersLoading } =
		useGetCatalogFiltersQuery({ lang: readLang });

	const countryItems = useMemo(
		() =>
			buildStringFilterItems(
				catalogFilters?.countries ?? [],
				selectedFilters.country
			),
		[catalogFilters?.countries, selectedFilters.country]
	);

	const cityItems = useMemo(
		() =>
			buildStringFilterItems(
				catalogFilters?.cities ?? [],
				selectedFilters.city
			),
		[catalogFilters?.cities, selectedFilters.city]
	);

	const durationItems = useMemo(
		() =>
			CATALOG_DURATION_KEYS.map((id) => ({
				id,
				label: tOptions(CATALOG_DURATION_PRESETS[id].labelKey),
				checked: (selectedFilters.duration ?? []).includes(id)
			})),
		[selectedFilters.duration, tOptions]
	);

	const translateOption = useCallback(
		(key: TOptionsKeys): string => tOptions(key) as string,
		[tOptions]
	);

	const languageItems = useMemo(
		() =>
			buildCatalogFilterItems(
				LANGUAGE_KEYS,
				LANGUAGES_LABELS,
				selectedFilters.language,
				translateOption
			),
		[selectedFilters.language, translateOption]
	);

	const categoryItems = useMemo(
		() =>
			buildCatalogFilterItems(
				CATEGORY_KEYS,
				TOUR_CATEGORY_LABELS,
				selectedFilters.category,
				translateOption
			),
		[selectedFilters.category, translateOption]
	);

	const handleCountryChange = useCallback(
		(id: string, checked: boolean) => {
			const currentValues = form.getValues("filters.country") || [];
			const nextValues = checked
				? [...currentValues, id]
				: currentValues.filter((val) => val !== id);

			setValue("filters.country", nextValues);
			setValue("page", 1);
		},
		[form, setValue]
	);

	const handleCityChange = useCallback(
		(id: string, checked: boolean) => {
			const currentValues = form.getValues("filters.city") || [];
			const nextValues = checked
				? [...currentValues, id]
				: currentValues.filter((val) => val !== id);

			setValue("filters.city", nextValues);
			setValue("page", 1);
		},
		[form, setValue]
	);

	const handleDurationChange = useCallback(
		(id: string, checked: boolean) => {
			const current =
				form.getValues("filters.duration") ??
				([] as ENUM_CATALOG_DURATION_TYPE[]);
			const durationId = id as ENUM_CATALOG_DURATION_TYPE;
			const next = checked
				? [...current, durationId]
				: current.filter((val) => val !== durationId);

			setValue("filters.duration", next);
			setValue("page", 1);
		},
		[form, setValue]
	);

	const handleLanguageChange = useCallback(
		(id: string, checked: boolean) => {
			const current =
				form.getValues("filters.language") ??
				([] as ENUM_LANGUAGES_TYPE[]);
			const languageId = id as ENUM_LANGUAGES_TYPE;
			const next = checked
				? [...current, languageId]
				: current.filter((val) => val !== languageId);

			setValue("filters.language", next);
			setValue("page", 1);
		},
		[form, setValue]
	);

	const handleCategoryChange = useCallback(
		(id: string, checked: boolean) => {
			const current =
				form.getValues("filters.category") ??
				([] as ENUM_TOUR_CATEGORY_TYPE[]);
			const categoryId = id as ENUM_TOUR_CATEGORY_TYPE;
			const next = checked
				? [...current, categoryId]
				: current.filter((val) => val !== categoryId);

			setValue("filters.category", next);
			setValue("page", 1);
		},
		[form, setValue]
	);

	return (
		<div className="flex flex-col gap-4">
			{/* <CustomAccordionRange
				id="price"
				title={t("filters.fields.price")}
				icon={MoneysIcon}
				...
			/> */}

			<CustomAccordion
				id="country"
				title={t("filters.fields.country")}
				icon={MapPin}
				items={countryItems}
				isLoading={isCatalogFiltersLoading}
				onChange={handleCountryChange}
			/>

			<CustomAccordion
				id="city"
				title={t("filters.fields.city")}
				icon={MapPin}
				items={cityItems}
				isLoading={isCatalogFiltersLoading}
				onChange={handleCityChange}
			/>

			<CustomAccordion
				id="duration"
				title={t("filters.fields.duration")}
				icon={Clock}
				items={durationItems}
				onChange={handleDurationChange}
			/>

			<CustomAccordion
				id="language"
				title={t("filters.fields.language")}
				icon={Globe}
				items={languageItems}
				onChange={handleLanguageChange}
			/>

			<CustomAccordion
				id="category"
				title={t("filters.fields.category")}
				icon={Tag}
				items={categoryItems}
				onChange={handleCategoryChange}
			/>
		</div>
	);
};

export const CatalogToursFilter = withErrorBoundary(CatalogToursFilterBase);

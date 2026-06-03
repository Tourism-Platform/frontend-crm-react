"use client";

import { Clock, Globe, MapPin, Tag } from "lucide-react";
import { type FC, useCallback, useMemo } from "react";
import { type UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { MoneysIcon } from "@/shared/assets";
import type { TOptionsKeys } from "@/shared/config";
import { CustomAccordion, withErrorBoundary } from "@/shared/ui";
import { CustomAccordionRange } from "@/shared/ui/custom/custom-accordion-range";

import {
	CATALOG_DURATION_KEYS,
	CATALOG_DURATION_PRESETS,
	type ENUM_CATALOG_DURATION_TYPE,
	type ENUM_LANGUAGES_TYPE,
	type ENUM_TOUR_CATEGORY_TYPE,
	type ICatalogTourFilters,
	buildCatalogFilterItems,
	useGetCatalogPriceHistogramQuery,
	useGetCatalogRegionsQuery
} from "@/entities/tour";
import { ENUM_LANGUAGES, LANGUAGES_LABELS } from "@/entities/tour/landing";
import { ENUM_TOUR_CATEGORY, TOUR_CATEGORY_LABELS } from "@/entities/tour/tour";

import { useCatalogFilter } from "../model";

interface ICatalogToursFilterProps {
	form: UseFormReturn<ICatalogTourFilters>;
}

const PRICE_STEP = 150;
const PRICE_MIN = 0;
const PRICE_MAX = 3600;

const LANGUAGE_KEYS = Object.values(ENUM_LANGUAGES) as ENUM_LANGUAGES_TYPE[];
const CATEGORY_KEYS = Object.values(
	ENUM_TOUR_CATEGORY
) as ENUM_TOUR_CATEGORY_TYPE[];

const CatalogToursFilterBase: FC<ICatalogToursFilterProps> = ({ form }) => {
	const { t } = useTranslation("tours_catalog_page");
	const { t: tOptions } = useTranslation("options");
	const { watch, setValue } = form;

	const selectedFilters = watch("filters") || {};

	const {
		data: priceHistogramData = [],
		isLoading: isPriceHistogramLoading
	} = useGetCatalogPriceHistogramQuery({
		min: PRICE_MIN,
		max: PRICE_MAX,
		step: PRICE_STEP
	});

	const {
		items: regionItems,
		isLoading: isRegionsFetching,
		hasMore: hasMoreRegions,
		loadMore: loadMoreRegions
	} = useCatalogFilter({
		useQuery: useGetCatalogRegionsQuery,
		selectedValues: selectedFilters.region
	});

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

	const handleRegionChange = useCallback(
		(id: string, checked: boolean) => {
			const currentValues = form.getValues("filters.region") || [];
			const nextValues = checked
				? [...currentValues, id]
				: currentValues.filter((val) => val !== id);

			setValue("filters.region", nextValues);
			setValue("page", 1);
		},
		[form, setValue]
	);

	const handlePriceChange = useCallback(
		(value: { from: number; to: number }) => {
			setValue("filters.price", value);
			setValue("page", 1);
		},
		[setValue]
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
			<CustomAccordionRange
				id="price"
				title={t("filters.fields.price")}
				icon={MoneysIcon}
				min={PRICE_MIN}
				max={PRICE_MAX}
				step={PRICE_STEP}
				from={selectedFilters.price?.from}
				to={selectedFilters.price?.to}
				useHistogram
				histogramData={priceHistogramData}
				isLoading={isPriceHistogramLoading}
				onChange={handlePriceChange}
			/>

			<CustomAccordion
				id="region"
				title={t("filters.fields.region")}
				icon={MapPin}
				items={regionItems}
				isLoading={isRegionsFetching}
				hasMore={hasMoreRegions}
				itemsLimit={5}
				onChange={handleRegionChange}
				onLoadMore={loadMoreRegions}
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

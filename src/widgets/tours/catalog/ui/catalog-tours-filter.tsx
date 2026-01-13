"use client";

import { Clock, Globe, MapPin, Tag } from "lucide-react";
import { type FC } from "react";
import { type UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { MoneysIcon } from "@/shared/assets";
import { CustomAccordion, CustomAccordionRange } from "@/shared/ui";

import {
	type ICatalogTourFilters,
	useGetCatalogCategoriesQuery,
	useGetCatalogDurationsQuery,
	useGetCatalogLanguagesQuery,
	useGetCatalogPriceHistogramQuery,
	useGetCatalogRegionsQuery
} from "@/entities/tour";

import { useCatalogFilter } from "../model";

interface ICatalogToursFilterProps {
	form: UseFormReturn<ICatalogTourFilters>;
}

const PRICE_STEP = 200;

export const CatalogToursFilter: FC<ICatalogToursFilterProps> = ({ form }) => {
	const { t } = useTranslation("tours_catalog_page");
	const { watch, setValue } = form;

	const selectedFilters = watch("filters") || {};

	const {
		data: priceHistogramData = [],
		isLoading: isPriceHistogramLoading
	} = useGetCatalogPriceHistogramQuery({
		min: 0,
		max: 3000,
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

	const {
		items: durationItems,
		isLoading: isDurationsFetching,
		hasMore: hasMoreDurations,
		loadMore: loadMoreDurations
	} = useCatalogFilter({
		useQuery: useGetCatalogDurationsQuery,
		selectedValues: selectedFilters.duration
	});

	const {
		items: languageItems,
		isLoading: isLanguagesFetching,
		hasMore: hasMoreLanguages,
		loadMore: loadMoreLanguages
	} = useCatalogFilter({
		useQuery: useGetCatalogLanguagesQuery,
		selectedValues: selectedFilters.language
	});

	const {
		items: categoryItems,
		isLoading: isCategoriesFetching,
		hasMore: hasMoreCategories,
		loadMore: loadMoreCategories
	} = useCatalogFilter({
		useQuery: useGetCatalogCategoriesQuery,
		selectedValues: selectedFilters.category
	});

	const handleFilterChange = (
		category: keyof NonNullable<ICatalogTourFilters["filters"]>,
		id: string,
		checked: boolean
	) => {
		const currentValues = (selectedFilters[category] as string[]) || [];
		const nextValues = checked
			? [...currentValues, id]
			: currentValues.filter((val) => val !== id);

		setValue(`filters.${category}`, nextValues);
		setValue("page", 1);
	};

	const handlePriceChange = (value: { from: number; to: number }) => {
		setValue("filters.price", value);
		setValue("page", 1);
	};

	return (
		<div className="flex flex-col gap-4">
			<CustomAccordionRange
				id="price"
				title={t("filters.fields.price")}
				icon={MoneysIcon}
				min={0}
				max={3000}
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
				onChange={(id, checked) =>
					handleFilterChange("region", id, checked)
				}
				onLoadMore={loadMoreRegions}
			/>

			<CustomAccordion
				id="duration"
				title={t("filters.fields.duration")}
				icon={Clock}
				items={durationItems}
				isLoading={isDurationsFetching}
				hasMore={hasMoreDurations}
				onChange={(id, checked) =>
					handleFilterChange("duration", id, checked)
				}
				onLoadMore={loadMoreDurations}
			/>

			<CustomAccordion
				id="language"
				title={t("filters.fields.language")}
				icon={Globe}
				items={languageItems}
				isLoading={isLanguagesFetching}
				hasMore={hasMoreLanguages}
				onChange={(id, checked) =>
					handleFilterChange("language", id, checked)
				}
				onLoadMore={loadMoreLanguages}
			/>

			<CustomAccordion
				id="category"
				title={t("filters.fields.category")}
				icon={Tag}
				items={categoryItems}
				isLoading={isCategoriesFetching}
				hasMore={hasMoreCategories}
				onChange={(id, checked) =>
					handleFilterChange("category", id, checked)
				}
				onLoadMore={loadMoreCategories}
			/>
		</div>
	);
};

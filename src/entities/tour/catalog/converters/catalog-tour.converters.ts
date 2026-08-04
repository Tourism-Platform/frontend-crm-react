import type { LanguageCode } from "@/shared/api";
import { languageCodeMapper } from "@/shared/converters";
import type { IPaginationResponse } from "@/shared/types";

import { languageMapper } from "../../landing";
import { tourCategoriesMapper, tourTypeMapper } from "../../tour";
import { CATALOG_DURATION_PRESETS } from "../config";
import {
	type ENUM_CATALOG_DURATION_TYPE,
	ENUM_CATALOG_TOUR_TYPES,
	type ENUM_CATALOG_TOUR_TYPES_TYPE,
	type ICatalogTourCard,
	type ICatalogTourFilters,
	type ICatalogTourInfo,
	type ICatalogTourInfoBackend,
	type TCatalogTourBackend,
	type TCatalogTourQueryBackend,
	type TListCatalogToursBackendResponse
} from "../types";

const mapDurationFiltersToQuery = (
	selected: ENUM_CATALOG_DURATION_TYPE[] | undefined
): Pick<
	TCatalogTourQueryBackend,
	"duration_days_min" | "duration_days_max"
> => {
	if (!selected?.length) return {};

	const presets = selected.map((key) => CATALOG_DURATION_PRESETS[key]);

	return {
		duration_days_min: Math.min(...presets.map((p) => p.from)),
		duration_days_max: Math.max(...presets.map((p) => p.to))
	};
};

const mapTourLanguageBadge = (code: LanguageCode): string =>
	(languageCodeMapper.from(code) ?? code).toUpperCase();

export const mapCatalogTourStatsToFrontend = (
	data: ICatalogTourInfoBackend
): ICatalogTourInfo => ({
	total: data.total,
	completed: data.completed,
	inProgress: data.in_progress,
	tourists: data.tourists,
	confirmedRevenue: data.confirmed_revenue,
	potentialRevenue: data.potential_revenue
});

export const mapCatalogTourToFrontend = (
	data: TCatalogTourBackend
): ICatalogTourCard => {
	const priceSource = data.price_per_person ?? data.price_range;
	const mappedType = tourTypeMapper.from(data.tour_type);

	return {
		id: data.tour_id,
		title: data.name,
		description: data.description ?? "",
		days: data.days,
		nights: data.nights,
		priceFrom: priceSource?.min ?? 0,
		priceTo: priceSource?.max ?? 0,
		currency: priceSource?.currency ?? "USD",
		imageUrl: data.cover_image_url ?? "",
		route: data.cities ?? [],
		type: (mappedType ??
			ENUM_CATALOG_TOUR_TYPES.GROUP) as ENUM_CATALOG_TOUR_TYPES_TYPE,
		categories: tourCategoriesMapper.fromMany(data.categories ?? []),
		languages: (data.languages ?? []).map(mapTourLanguageBadge),
		groupSizeMin: data.group_size_min,
		groupSizeMax: data.group_size,
		ageFrom: data.age_from,
		ageTo: data.age_to,
		optionCount: data.option_count ?? null
	};
};

export const mapCatalogTourPaginatedToFrontend = (
	response: TListCatalogToursBackendResponse
): IPaginationResponse<ICatalogTourCard> => ({
	data: response.map(mapCatalogTourToFrontend),
	total: response.length || 10
});

export const mapCatalogTourFiltersToPublicCatalogQuery = (
	filters: ICatalogTourFilters
): TCatalogTourQueryBackend => ({
	...(filters?.page > 1 && { skip: (filters.page - 1) * filters?.limit }),
	...(filters?.limit && { limit: filters.limit }),
	...(!!filters?.filters?.category?.length && {
		categories: tourCategoriesMapper.toMany(filters.filters.category)
	}),
	...(!!filters?.filters?.region?.length && {
		city: filters.filters.region[0]
	}),
	...(!!filters?.filters?.language?.length && {
		language: languageMapper.to(filters.filters.language[0])
	}),
	...mapDurationFiltersToQuery(filters?.filters?.duration),
	...(!!filters?.search?.trim().length && { q: filters.search })
});

import { type LanguageCode, type TOUR_PATHS } from "@/shared/api";
import { languageCodeMapper } from "@/shared/converters";
import type { IPaginationResponse } from "@/shared/types";

import type {
	ITourCard,
	ITourFilters,
	ITourGeneral,
	TCreateTourCategoriesBackend,
	TCreateTourSchema,
	TGetTourBackendResponse,
	TListToursBackendResponse,
	TTourBackend
} from "../types";

import { tourCategoriesMapper } from "./tour-categories.converters";
import { tourStatusMapper } from "./tour-status.converters";
import { tourTypeMapper } from "./tour-type.converters";

const mapTourLanguageBadge = (code: LanguageCode): string =>
	(languageCodeMapper.from(code) ?? code).toUpperCase();

export const mapTourToFrontend = (backend: TTourBackend): ITourCard => ({
	id: backend.id,
	status: tourStatusMapper.from(backend.status)!,
	title: backend.name,
	route: [],
	type: tourTypeMapper.from(backend.typ)!,
	priceFrom: 0,
	priceTo: 0,
	imageUrl: backend.cover_image_path ?? "",
	categories: tourCategoriesMapper.fromMany(backend.categories ?? []),
	languages: (backend.languages ?? []).map(mapTourLanguageBadge),
	days: backend.days,
	nights: backend.nights,
	groupSizeMin: backend.group_size_min,
	groupSizeMax: backend.group_size,
	ageFrom: backend.age_from,
	ageTo: backend.age_to
});

export const mapTourGeneralToFrontend = (
	backend: TGetTourBackendResponse
): ITourGeneral => ({
	id: backend.id,
	status: tourStatusMapper.from(backend.status)!,
	tourTitle: backend.name,
	tourType: tourTypeMapper.from(backend.typ)!,
	groupSize: backend.group_size,
	duration: {
		from: backend.days,
		to: backend.nights
	},
	ageRequires: {
		from: backend.age_from!,
		to: backend.age_to!
	},
	tourCategories: tourCategoriesMapper.fromMany(backend.categories ?? [])
});

export const mapTourCreateToBackend = (
	frontend: TCreateTourSchema
): TCreateTourCategoriesBackend => ({
	// !!! need to add all fields
	name: frontend.tourTitle,
	days: frontend.duration?.from,
	nights: frontend.duration?.to,
	age_from: frontend.ageRequires?.from || null,
	age_to: frontend.ageRequires?.to || null,
	group_size: frontend.groupSize,
	categories: tourCategoriesMapper.toMany(frontend.tourCategories ?? [])
});

// !!! Полностью переделать
export const mapTourPaginatedToFrontend = (
	response: TListToursBackendResponse
): IPaginationResponse<ITourCard> => ({
	data: response.data.map(mapTourToFrontend),
	total: response.total_count
});

export const mapTourFiltersToBackend = (
	filters: ITourFilters
): typeof TOUR_PATHS.listTours._types.query => ({
	...(filters?.page > 1 && { skip: (filters.page - 1) * filters?.limit }),
	...(filters?.limit && { limit: filters.limit }),
	...(!!filters?.status?.length && {
		status: tourStatusMapper.to(filters.status?.[0])
	}),
	...(!!filters?.search?.trim().length && { q: filters.search })
});

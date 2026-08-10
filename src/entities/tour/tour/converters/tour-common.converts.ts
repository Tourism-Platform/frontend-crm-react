import { type LanguageCode, type TOUR_PATHS } from "@/shared/api";
import { languageCodeMapper } from "@/shared/converters";
import type { IPaginationResponse } from "@/shared/types";

import { languageMapper } from "../../landing/converters/languages.converters";
import type {
	ITourCard,
	ITourFilters,
	ITourGeneral,
	TCreateTourSchema,
	TGetTourBackendResponse,
	TListToursBackendResponse,
	TTourBackend,
	TTourSettingsGeneralFormSchema,
	TTourUpdateBackendBody
} from "../types";

import { tourCategoriesMapper } from "./tour-categories.converters";
import { tourStatusMapper } from "./tour-status.converters";
import { tourTypeMapper } from "./tour-type.converters";

const mapTourLanguageBadge = (code: LanguageCode): string =>
	(languageCodeMapper.from(code) ?? code).toUpperCase();

export const mapTourToFrontend = (backend: TTourBackend): ITourCard => ({
	id: backend.id,
	status: tourStatusMapper.from(backend.status)!,
	title: backend.title ?? "",
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
	tourTitle: backend.title ?? "",
	tourType: tourTypeMapper.from(backend.typ)!,
	groupSize: backend.group_size,
	duration: {
		from: backend.days,
		to: backend.nights
	},
	ageRequires: {
		from: backend.age_from ?? "",
		to: backend.age_to ?? ""
	},
	tourCategories: tourCategoriesMapper.fromMany(backend.categories ?? []),
	languages: languageMapper.fromMany(backend.languages ?? [])
});

export const mapTourCreateToBackend = (frontend: TCreateTourSchema) => ({
	title: frontend.tourTitle,
	days: frontend.duration.from,
	nights: frontend.duration.to,
	age_from: frontend.ageRequires?.from || null,
	age_to: frontend.ageRequires?.to || null,
	group_size: frontend.groupSize,
	typ: tourTypeMapper.to(frontend.tourType)!,
	agency_id: frontend.agencyId || null,
	categories: tourCategoriesMapper.toMany(frontend.tourCategories ?? []),
	languages: languageMapper.toMany(frontend.languages)
});

export const mapTourUpdateToBackend = (
	frontend: TTourSettingsGeneralFormSchema
): TTourUpdateBackendBody => ({
	typ: tourTypeMapper.to(frontend.tourType),
	days: frontend.duration.from,
	nights: frontend.duration.to,
	age_from: frontend.ageRequires?.from || null,
	age_to: frontend.ageRequires?.to || null,
	group_size: frontend.groupSize,
	categories: tourCategoriesMapper.toMany(frontend.tourCategories ?? []),
	languages: languageMapper.toMany(frontend.languages)
});

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

import type { TOUR_PATHS } from "@/shared/api";
import type { IPaginationResponse } from "@/shared/types";

import type {
	ITourCard,
	ITourFilters,
	ITourGeneral,
	TCreateTourSchema,
	TGetTourBackendResponse,
	TListToursBackendResponse,
	TTourBackend,
	TTourSettingsGeneralFormSchema
} from "../types";

import { tourStatusMapper } from "./tour-status.converters";
import { tourTypeMapper } from "./tour-type.converters";

export const mapTourToFrontend = (backend: TTourBackend): ITourCard => ({
	id: backend.id,
	status: tourStatusMapper.from(backend.status)!,
	title: backend.name,
	route: [],
	type: tourTypeMapper.from(backend.typ)!,
	priceFrom: 0,
	priceTo: 0,
	imageUrl: ""
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
	tourCategories: []
});

export const mapTourCreateToBackend = (
	frontend: TCreateTourSchema
): typeof TOUR_PATHS.createTour._types.body => ({
	// !!! need to add all fields
	name: frontend.tourTitle,
	days: frontend.duration?.from,
	nights: frontend.duration?.to,
	age_from: frontend.ageRequires?.from,
	group_size: frontend.groupSize
});

export const mapTourCreateToFrontend = (
	backend: Partial<TTourBackend>
): Partial<TTourSettingsGeneralFormSchema> => ({
	tourTitle: backend.name
	// status: data.status as ENUM_TOUR_STATUS_TYPE,
	// title: data.title,
	// route: data.route,
	// type: data.type,
	// priceFrom: data.price_from,
	// priceTo: data.price_to,
	// imageUrl: data.image_url
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

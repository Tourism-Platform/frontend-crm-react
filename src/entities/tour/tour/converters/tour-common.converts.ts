import type { TOUR_PATHS } from "@/shared/api";
import type { IPaginationResponse } from "@/shared/types";

import type {
	ENUM_TOUR_STATUS_TYPE,
	ENUM_TOUR_TYPES_TYPE,
	ITourCard,
	ITourFilters,
	ITourGeneral,
	TCreateTourSchema,
	TGetTourBackendResponse,
	TListToursBackendResponse,
	TTourBackend,
	TTourSettingsGeneralFormSchema
} from "../types";

export const mapTourToFrontend = (backend: TTourBackend): ITourCard => ({
	id: backend.id,
	status: backend.status as ENUM_TOUR_STATUS_TYPE,
	title: backend.name,
	route: [],
	type: backend.typ,
	priceFrom: 0,
	priceTo: 0,
	imageUrl: ""
});

export const mapTourGeneralToFrontend = (
	backend: TGetTourBackendResponse
): ITourGeneral => ({
	//!!! оправить типы
	id: backend.id,
	status: backend.status as ENUM_TOUR_STATUS_TYPE,
	tourTitle: backend.name,
	tourType: backend.typ as ENUM_TOUR_TYPES_TYPE,
	groupSize: backend.group_size,
	duration: {
		from: backend.days,
		to: backend.nights
	},
	ageRequires: {
		from: backend.age_from,
		to: backend.age_from
	},
	tourCategories: []
});

export const mapTourCreateToBackend = (
	frontend: TCreateTourSchema
): typeof TOUR_PATHS.createTour._types.body => ({
	// !!! need to add all fields
	name: frontend.tourTitle || "NAME",
	description: "no description",
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

// !!! Полностью переделать
export const mapTourFiltersToBackend = (
	filters: ITourFilters
): typeof TOUR_PATHS.listTours._types.query => ({
	...(filters?.page > 1 && { skip: (filters.page - 1) * filters?.limit }),
	...(filters?.limit && { limit: filters.limit })
});

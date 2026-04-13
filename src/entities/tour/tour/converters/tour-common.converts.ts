import type { TOUR_PATHS } from "@/shared/api";
import type { IPaginationResponse } from "@/shared/types";

import type {
	ENUM_TOUR_STATUS_TYPE,
	ITourCard,
	ITourFilters,
	TCreateTourSchema,
	TTourBackend,
	TTourCreateBackend,
	TTourSettingsGeneralFormSchema
} from "../types";

export const mapTourToFrontend = (data: TTourBackend): ITourCard => ({
	id: data.id,
	status: data.status as ENUM_TOUR_STATUS_TYPE,
	title: data.name,
	route: [],
	type: data.typ,
	priceFrom: 0,
	priceTo: 0,
	imageUrl: ""
});

export const mapTourCreateToBackend = (
	data: Partial<TCreateTourSchema>
): Partial<TTourCreateBackend> => ({
	// !!! need to add all fields
	name: data.tourTitle,
	description: "no description",
	days: data.duration?.from,
	nights: data.duration?.to,
	age_from: data.ageRequires?.from,
	group_size: data.groupSize
});
export const mapTourCreateToFrontend = (
	data: Partial<TTourBackend>
): Partial<TTourSettingsGeneralFormSchema> => ({
	tourTitle: data.name
	// status: data.status as ENUM_TOUR_STATUS_TYPE,
	// title: data.title,
	// route: data.route,
	// type: data.type,
	// priceFrom: data.price_from,
	// priceTo: data.price_to,
	// imageUrl: data.image_url
});

export const mapTourListToFrontend = (data: TTourBackend[]): ITourCard[] =>
	data.map(mapTourToFrontend);

// !!! Полностью переделать
export const mapTourPaginatedToFrontend = (
	// response: IPaginationResponse<ITourBackend>
	response: TTourBackend[]
): IPaginationResponse<ITourCard> => ({
	data: mapTourListToFrontend(response),
	total: response.length
});

// !!! Полностью переделать
export const mapTourFiltersToBackend = (
	filters: ITourFilters
): typeof TOUR_PATHS.listTours._types.query => ({
	...(filters?.page > 1 && { skip: (filters.page - 1) * filters?.limit }),
	...(filters?.limit && { limit: filters.limit })
});

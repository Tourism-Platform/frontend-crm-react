import { type IPaginationResponse } from "@/shared/types";

import type { ENUM_CURRENCY_OPTIONS_TYPE } from "@/entities/commission";

import type { ENUM_TOUR_STATUS_TYPE } from "../constants";
import type {
	ENUM_PRICING_VISIBILITY_TYPE,
	ENUM_TOUR_TYPES_TYPE,
	ITourBackend,
	ITourCard,
	ITourFilters,
	ITourFinanceBackend,
	ITourGeneralBackend,
	ITourInfo,
	ITourInfoBackend,
	TSettingsFinanceFormSchema,
	TSettingsGeneralFormSchema
} from "../types";

export const mapTourStatsToFrontend = (data: ITourInfoBackend): ITourInfo => ({
	total: data.total,
	completed: data.completed,
	inProgress: data.in_progress,
	tourists: data.tourists,
	confirmedRevenue: data.confirmed_revenue,
	potentialRevenue: data.potential_revenue
});

export const mapTourToFrontend = (data: ITourBackend): ITourCard => ({
	id: data.id,
	status: data.status as ENUM_TOUR_STATUS_TYPE,
	title: data.title,
	route: data.route,
	type: data.type,
	priceFrom: data.price_from,
	priceTo: data.price_to,
	imageUrl: data.image_url
});

export const mapTourToBackend = (
	data: Partial<ITourCard>
): Partial<ITourBackend> => ({
	id: data.id,
	status: data.status,
	title: data.title,
	route: data.route,
	type: data.type,
	price_from: data.priceFrom,
	price_to: data.priceTo,
	image_url: data.imageUrl
});

export const mapTourGeneralToFrontend = (
	data: ITourGeneralBackend
): TSettingsGeneralFormSchema => ({
	tourTitle: data.title,
	tourType: data.type as ENUM_TOUR_TYPES_TYPE,
	groupSize: data.group_size,
	duration: {
		from: data.duration_from,
		to: data.duration_to
	},
	ageRequires: {
		from: data.age_requires_from,
		to: data.age_requires_to
	},
	tourCategories: data.categories
});

export const mapTourGeneralToBackend = (
	data: TSettingsGeneralFormSchema
): Partial<ITourGeneralBackend> => ({
	title: data.tourTitle,
	type: data.tourType,
	group_size: data.groupSize,
	duration_from: data.duration.from,
	duration_to: data.duration.to,
	age_requires_from: data.ageRequires.from,
	age_requires_to: data.ageRequires.to,
	categories: data.tourCategories
});

export const mapTourFinanceToFrontend = (
	data: ITourFinanceBackend
): TSettingsFinanceFormSchema => ({
	currencyType: data.currency_type as ENUM_CURRENCY_OPTIONS_TYPE,
	pricingVisibility: data.pricing_visibility as ENUM_PRICING_VISIBILITY_TYPE
});

export const mapTourFinanceToBackend = (
	data: TSettingsFinanceFormSchema
): Partial<ITourFinanceBackend> => ({
	currency_type: data.currencyType,
	pricing_visibility: data.pricingVisibility
});

export const mapTourListToFrontend = (data: ITourBackend[]): ITourCard[] =>
	data.map(mapTourToFrontend);

export const mapTourPaginatedToFrontend = (
	response: IPaginationResponse<ITourBackend>
): IPaginationResponse<ITourCard> => ({
	data: mapTourListToFrontend(response.data),
	total: response.total
});

export const mapTourFiltersToBackend = (filters: ITourFilters) => ({
	page: filters.page,
	limit: filters.limit,
	search: filters.search || undefined,
	status: filters.status.length > 0 ? filters.status.join(",") : undefined
});

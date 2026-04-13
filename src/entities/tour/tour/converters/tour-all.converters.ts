import type { ENUM_CURRENCY_OPTIONS_TYPE } from "@/entities/commission";

import type {
	ENUM_PRICING_VISIBILITY_TYPE,
	ENUM_TOUR_STATUS_TYPE,
	ENUM_TOUR_TYPES_TYPE,
	ITourBackend,
	ITourCard,
	ITourFinanceBackend,
	ITourGeneral,
	ITourGeneralBackend,
	ITourInfo,
	ITourInfoBackend,
	TSettingsFinanceFormSchema,
	TTourSettingsGeneralFormSchema
} from "../types";

export const mapTourStatsToFrontend = (data: ITourInfoBackend): ITourInfo => ({
	total: data.total,
	completed: data.completed,
	inProgress: data.in_progress,
	tourists: data.tourists,
	confirmedRevenue: data.confirmed_revenue,
	potentialRevenue: data.potential_revenue
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
): ITourGeneral => ({
	id: data.id,
	status: data.status as ENUM_TOUR_STATUS_TYPE,
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
	data: TTourSettingsGeneralFormSchema
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

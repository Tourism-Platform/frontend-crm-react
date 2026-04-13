import type { ENUM_CURRENCY_OPTIONS_TYPE } from "@/entities/commission";

import type {
	ENUM_PRICING_VISIBILITY_TYPE,
	ITourBackend,
	ITourCard,
	ITourFinanceBackend,
	ITourInfo,
	ITourInfoBackend,
	TSettingsFinanceFormSchema
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

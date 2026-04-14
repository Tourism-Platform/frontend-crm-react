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

export const mapTourStatsToFrontend = (
	backend: ITourInfoBackend
): ITourInfo => ({
	total: backend.total,
	completed: backend.completed,
	inProgress: backend.in_progress,
	tourists: backend.tourists,
	confirmedRevenue: backend.confirmed_revenue,
	potentialRevenue: backend.potential_revenue
});

export const mapTourToBackend = (
	frontend: Partial<ITourCard>
): Partial<ITourBackend> => ({
	id: frontend.id,
	status: frontend.status,
	title: frontend.title,
	route: frontend.route,
	type: frontend.type,
	price_from: frontend.priceFrom,
	price_to: frontend.priceTo,
	image_url: frontend.imageUrl
});

export const mapTourFinanceToFrontend = (
	backend: ITourFinanceBackend
): TSettingsFinanceFormSchema => ({
	currencyType: backend.currency_type as ENUM_CURRENCY_OPTIONS_TYPE,
	pricingVisibility:
		backend.pricing_visibility as ENUM_PRICING_VISIBILITY_TYPE
});

export const mapTourFinanceToBackend = (
	frontend: TSettingsFinanceFormSchema
): Partial<ITourFinanceBackend> => ({
	currency_type: frontend.currencyType,
	pricing_visibility: frontend.pricingVisibility
});

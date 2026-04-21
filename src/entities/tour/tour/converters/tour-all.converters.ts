import type { CurrencyType, TourPricingVisibility } from "@/shared/api";

import type { ENUM_CURRENCY_OPTIONS_TYPE } from "@/entities/commission";

import type {
	ENUM_PRICING_VISIBILITY_TYPE,
	ITourInfo,
	ITourInfoBackend,
	TSettingsFinanceFormSchema,
	TTourFinanceBackend
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

export const mapTourFinanceToFrontend = (
	backend: TTourFinanceBackend
): TSettingsFinanceFormSchema => ({
	currencyType: backend.currency as ENUM_CURRENCY_OPTIONS_TYPE,
	pricingVisibility:
		backend.pricing_visibility as unknown as ENUM_PRICING_VISIBILITY_TYPE
});

export const mapTourFinanceToBackend = (
	frontend: TSettingsFinanceFormSchema
): Partial<TTourFinanceBackend> => ({
	currency: frontend.currencyType as unknown as CurrencyType,
	pricing_visibility:
		frontend.pricingVisibility as unknown as TourPricingVisibility
});

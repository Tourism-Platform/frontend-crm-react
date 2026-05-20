import { currencyConverter } from "@/entities/commission";

import type {
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
	currencyType: currencyConverter.from(backend.currency_type)!,
	pricingVisibility: "" as TSettingsFinanceFormSchema["pricingVisibility"]
});

export const mapTourFinanceToBackend = (
	frontend: TSettingsFinanceFormSchema
): Partial<TTourFinanceBackend> => ({
	currency_type: currencyConverter.to(frontend.currencyType)
});

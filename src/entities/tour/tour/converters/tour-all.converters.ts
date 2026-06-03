import { currencyConverter } from "@/entities/commission";

import type { TSettingsFinanceFormSchema, TTourFinanceBackend } from "../types";

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

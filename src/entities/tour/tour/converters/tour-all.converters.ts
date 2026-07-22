import { currencyConverter } from "@/entities/commission";

import { ENUM_FOC_TIER_FIELD } from "../types";
import type { TSettingsFinanceFormSchema, TTourFinanceBackend } from "../types";

export const mapTourFinanceToFrontend = (
	backend: TTourFinanceBackend
): TSettingsFinanceFormSchema => ({
	currencyType: currencyConverter.from(backend.currency_type)!,
	focTiers:
		backend.foc?.tiers.map((tier) => ({
			[ENUM_FOC_TIER_FIELD.MIN_PAX]: tier.min_pax,
			[ENUM_FOC_TIER_FIELD.FREE]: tier.free
		})) ?? []
});

export const mapTourFinanceToBackend = (
	frontend: TSettingsFinanceFormSchema
): Partial<TTourFinanceBackend> => {
	const completeTiers = frontend.focTiers.filter(
		(tier): tier is { minPax: number; free: number } =>
			tier.minPax != null && tier.free != null
	);

	return {
		currency_type: currencyConverter.to(frontend.currencyType),
		foc:
			completeTiers.length > 0
				? {
						tiers: completeTiers.map((tier) => ({
							min_pax: tier.minPax,
							free: tier.free
						}))
					}
				: null
	};
};

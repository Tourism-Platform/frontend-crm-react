import { currencyConverter } from "@/entities/commission";

import {
	ENUM_PACKAGE_MARKUP_TYP,
	type IPackageFormMarkup
} from "../../itinerary/types/package.types";
import { ENUM_FOC_TIER_FIELD } from "../types";
import type {
	TSettingsFinanceFormSchema,
	TTourFinanceBackend,
	TTourFinanceCreateBackend
} from "../types";

const mapTourMarkupFromBackend = (
	markup: TTourFinanceBackend["markup"]
): IPackageFormMarkup | null => {
	if (!markup) return null;
	if (markup.typ === "percentage") {
		return {
			typ: ENUM_PACKAGE_MARKUP_TYP.PERCENTAGE,
			value: String((markup.percentage ?? 0) * 100)
		};
	}
	return {
		typ: ENUM_PACKAGE_MARKUP_TYP.FIXED,
		value: String(markup.cost?.val ?? "")
	};
};

const mapTourMarkupToBackend = (
	markup: IPackageFormMarkup | null | undefined,
	currency: TTourFinanceCreateBackend["currency_type"]
): TTourFinanceCreateBackend["markup"] => {
	if (!markup?.value) return null;
	if (markup.typ === ENUM_PACKAGE_MARKUP_TYP.PERCENTAGE) {
		return {
			typ: "percentage",
			percentage: Number(markup.value) / 100
		};
	}
	// Фиксированная наценка — в валюте тура из этой же формы
	return {
		typ: "fixed",
		cost: { val: Number(markup.value), currency }
	};
};

export const mapTourFinanceToFrontend = (
	backend: TTourFinanceBackend
): TSettingsFinanceFormSchema => ({
	currencyType: currencyConverter.from(backend.currency_type)!,
	markup: mapTourMarkupFromBackend(backend.markup),
	focTiers:
		backend.foc?.tiers.map((tier) => ({
			[ENUM_FOC_TIER_FIELD.MIN_PAX]: tier.min_pax,
			[ENUM_FOC_TIER_FIELD.FREE]: tier.free
		})) ?? []
});

export const mapTourFinanceToBackend = (
	frontend: TSettingsFinanceFormSchema
): TTourFinanceCreateBackend => {
	const completeTiers = frontend.focTiers.filter(
		(tier): tier is { minPax: number; free: number } =>
			tier.minPax != null && tier.free != null
	);

	// currencyType обязателен в SETTINGS_FINANCE_FORM_SCHEMA
	const currency = currencyConverter.to(frontend.currencyType)!;

	return {
		currency_type: currency,
		markup: mapTourMarkupToBackend(frontend.markup, currency),
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

import {
	type ENUM_CURRENCY_OPTIONS_TYPE,
	currencyConverter
} from "@/entities/commission";

import { DEFAULT_GUIDE_UP_TO_PAX } from "../../../config";
import type {
	TPerGroupTierBackend,
	TPerGroupTierInputBackend
} from "../../../types";

export const mapGuideGroupTierFromBackend = (
	tier: TPerGroupTierBackend
): {
	cost: number | null;
	currency: ENUM_CURRENCY_OPTIONS_TYPE | undefined;
} => ({
	cost: tier.cost?.val ?? null,
	currency: currencyConverter.from(tier.cost?.currency)
});

export const mapGuideGroupTiersFromBackend = (
	tiers?: TPerGroupTierBackend[] | null
): {
	cost: number | null;
	currency: ENUM_CURRENCY_OPTIONS_TYPE | undefined;
} => {
	const tier = tiers?.[0];
	if (!tier) {
		return { cost: null, currency: undefined };
	}
	return mapGuideGroupTierFromBackend(tier);
};

export const mapGuideGroupTierToBackend = (
	cost: number,
	currency: ENUM_CURRENCY_OPTIONS_TYPE | undefined
): TPerGroupTierInputBackend => ({
	up_to_pax: DEFAULT_GUIDE_UP_TO_PAX,
	cost: {
		val: cost,
		...(currency && { currency: currencyConverter.to(currency) })
	}
});

export const mapGuideGroupTiersToBackend = (
	cost: number | null,
	currency: ENUM_CURRENCY_OPTIONS_TYPE | undefined
): TPerGroupTierInputBackend[] | null => {
	if (cost == null || !Number.isFinite(cost)) return null;
	return [mapGuideGroupTierToBackend(cost, currency)];
};

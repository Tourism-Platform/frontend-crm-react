import type {
	IHousingEventOverride,
	TAccommodationPricingSchema,
	TCustomHousingDetailsBackend,
	THousingOverrideInputBackend,
	THousingOverrideOutputBackend
} from "../../types";

import {
	getDefaultAccommodationPricing,
	mapAccommodationPricingFromBackend,
	mapAccommodationPricingToBackend
} from "./accommodation-pricing.converters";
import {
	mapHotelPolicyFromBackend,
	mapHotelPolicyToBackend
} from "./hotel-policy.converters";

/** Thin wrapper: unwrap details.expenses; null/empty → null */
export const mapHousingOverrideExpensesToBackend = (
	pricing?: TAccommodationPricingSchema | null
): THousingOverrideInputBackend["expenses"] => {
	if (!pricing) {
		return null;
	}

	return mapAccommodationPricingToBackend(pricing).details?.expenses ?? null;
};

export const mapHousingOverrideExpensesFromBackend = (
	expenses?: THousingOverrideOutputBackend["expenses"] | null
): TAccommodationPricingSchema | null => {
	if (!expenses) {
		return null;
	}

	return mapAccommodationPricingFromBackend({
		expenses
	} as TCustomHousingDetailsBackend);
};

export const mapHousingEventOverrideToBackend = (
	data: IHousingEventOverride
): THousingOverrideInputBackend => ({
	typ: "housing",
	expenses: mapHousingOverrideExpensesToBackend(data.expenses),
	policy: mapHotelPolicyToBackend(data.policy)
});

export const mapHousingOverrideFromBackend = (
	override?: THousingOverrideOutputBackend | null
): IHousingEventOverride | null => {
	if (!override) {
		return null;
	}

	return {
		typ: "housing",
		expenses: mapHousingOverrideExpensesFromBackend(override.expenses),
		policy: mapHotelPolicyFromBackend(override.policy)
	};
};

export const getEmptyHotelPolicy = (): NonNullable<
	IHousingEventOverride["policy"]
> => ({
	checkInFrom: null,
	checkOutUntil: null,
	earlyCheckIn: [],
	lateCheckOut: []
});

export const getDefaultHousingOverrideForm = (): IHousingEventOverride => ({
	typ: "housing",
	expenses: getDefaultAccommodationPricing(),
	policy: getEmptyHotelPolicy()
});

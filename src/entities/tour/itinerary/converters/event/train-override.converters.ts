import type {
	ITrainEventOverride,
	TFlightPricingSchema,
	TTrainOverrideInputBackend,
	TTrainOverrideOutputBackend
} from "../../types";

import {
	mapFlightPricingFromBackend,
	mapFlightPricingToBackend
} from "./flight-pricing.converters";

/** Thin wrapper: unwrap details.expenses; null/empty → null */
export const mapTrainOverrideExpensesToBackend = (
	expenses?: TFlightPricingSchema | null
): TTrainOverrideInputBackend["expenses"] => {
	if (!expenses) {
		return null;
	}

	return mapFlightPricingToBackend(expenses).details?.expenses ?? null;
};

export const mapTrainOverrideExpensesFromBackend = (
	expenses?: TTrainOverrideOutputBackend["expenses"] | null
): TFlightPricingSchema | null => {
	if (!expenses) {
		return null;
	}

	return mapFlightPricingFromBackend({ expenses });
};

export const mapTrainEventOverrideToBackend = (
	data: ITrainEventOverride
): TTrainOverrideInputBackend => ({
	typ: "train",
	expenses: mapTrainOverrideExpensesToBackend(data.expenses)
});

export const mapTrainOverrideFromBackend = (
	override?: TTrainOverrideOutputBackend | null
): ITrainEventOverride | null => {
	if (!override) {
		return null;
	}

	return {
		typ: "train",
		expenses: mapTrainOverrideExpensesFromBackend(override.expenses)
	};
};

export const getDefaultTrainOverrideForm = (): ITrainEventOverride => ({
	typ: "train",
	expenses: mapFlightPricingFromBackend(null)
});

import type { StayRateOutput } from "@/shared/api";

import type {
	IHousingEventOverride,
	THousingOverrideInputBackend,
	THousingOverrideOutputBackend
} from "../../../types";

import {
	mapHotelPolicyFromBackend,
	mapHotelPolicyToBackend
} from "./hotel-policy.converters";

/** StayRate Output → Input: identical structure, Input fields are optional. */
const mapStayRateOutputToInput = (
	rate: StayRateOutput
): NonNullable<IHousingEventOverride["rate"]> => ({
	base: rate.base,
	seasons: rate.seasons
});

/**
 * Housing override (contract 3.1):
 * WRITE `{ typ: "housing", policy?, rates? }` where the dialog's single charge
 * is the WHOLE arm: `rates = { pricing: "whole", price: { base, seasons? } }`.
 */
export const mapHousingEventOverrideToBackend = (
	data: IHousingEventOverride
): THousingOverrideInputBackend => ({
	typ: "housing",
	policy: mapHotelPolicyToBackend(data.policy),
	rates: data.rate ? { pricing: "whole", price: data.rate } : null
});

/**
 * READ: only the whole arm maps back into the dialog model — per-room rate
 * rows are a backend capability this UI does not edit (rate → null).
 */
export const mapHousingOverrideFromBackend = (
	override?: THousingOverrideOutputBackend | null
): IHousingEventOverride | null => {
	if (!override) {
		return null;
	}

	const rates = override.rates;
	const rate =
		rates?.pricing === "whole"
			? mapStayRateOutputToInput(rates.price)
			: null;

	return {
		typ: "housing",
		rate,
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
	rate: null,
	policy: getEmptyHotelPolicy()
});

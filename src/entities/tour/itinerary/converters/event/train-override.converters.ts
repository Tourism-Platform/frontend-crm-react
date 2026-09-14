import { RouteOverrideInputTypEnum } from "@/shared/api";

import type {
	ITrainEventOverride,
	TTrainOverrideInputBackend,
	TTrainOverrideOutputBackend
} from "../../types";

/**
 * Route (train) override (contract 3.1):
 * WRITE `{ typ: "train", rates }` where the dialog's single charge is the
 * WHOLE arm: `rates = { pricing: "whole", charge }`.
 */
export const mapTrainEventOverrideToBackend = (
	data: ITrainEventOverride
): TTrainOverrideInputBackend => {
	if (!data.charge) {
		// The dialog always builds a charge on submit; never fabricate one.
		throw new Error("Train override requires a charge");
	}

	return {
		typ: RouteOverrideInputTypEnum.Train,
		rates: { pricing: "whole", charge: data.charge }
	};
};

/**
 * READ: only the whole arm maps back into the dialog model — per-fare charge
 * rows are a backend capability this UI does not edit (charge → null).
 */
export const mapTrainOverrideFromBackend = (
	override?: TTrainOverrideOutputBackend | null
): ITrainEventOverride | null => {
	if (!override) {
		return null;
	}

	const rates = override.rates;

	return {
		typ: "train",
		charge: rates.pricing === "whole" ? rates.charge : null
	};
};

export const getDefaultTrainOverrideForm = (): ITrainEventOverride => ({
	typ: "train",
	charge: null
});

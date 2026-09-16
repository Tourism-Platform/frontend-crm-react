import type {
	TEventDetailsBackend,
	TEventOverride,
	TEventOverrideInputBackend,
	THousingOverrideOutputBackend,
	TTrainOverrideOutputBackend
} from "../../types";

import {
	mapHousingEventOverrideToBackend,
	mapHousingOverrideFromBackend
} from "./accommodation/housing-override.converters";
import { getPoolMember, isProductPoolMember } from "./event-pool.helpers";
import {
	mapTrainEventOverrideToBackend,
	mapTrainOverrideFromBackend
} from "./train-override.converters";

export const mapEventOverrideToBackend = (
	data: TEventOverride
): TEventOverrideInputBackend => {
	switch (data.typ) {
		case "housing":
			return mapHousingEventOverrideToBackend(data);
		case "train":
			return mapTrainEventOverrideToBackend(data);
	}
};

/**
 * Reads the override from a pool member's product supply (contract 6).
 * Dispatch is by the backend `override.typ` — no caller-supplied kind.
 */
export const mapEventOverrideFromDetails = (
	details: TEventDetailsBackend | undefined,
	supplyId?: string | null
): TEventOverride | null => {
	const member = getPoolMember(details, supplyId);
	if (!isProductPoolMember(member)) {
		return null;
	}

	const override = member.supply.override;
	if (!override) {
		return null;
	}

	switch (override.typ) {
		case "housing":
			return mapHousingOverrideFromBackend(
				override as THousingOverrideOutputBackend
			);
		case "train":
		case "flight":
			return mapTrainOverrideFromBackend(
				override as TTrainOverrideOutputBackend
			);
		default:
			return null;
	}
};

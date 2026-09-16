import type {
	TEventDetailsBackend,
	TEventOverride,
	TEventOverrideInputBackend,
	THousingOverrideOutputBackend,
	TTrainOverrideOutputBackend
} from "../../types";

import { getPoolMember, isProductPoolMember } from "./event-pool.helpers";
import {
	mapHousingEventOverrideToBackend,
	mapHousingOverrideFromBackend
} from "./housing-override.converters";
import {
	mapTrainEventOverrideToBackend,
	mapTrainOverrideFromBackend
} from "./train-override.converters";

export type TEventOverrideKind = "housing" | "train";

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
 */
export const mapEventOverrideFromDetails = (
	details: TEventDetailsBackend | undefined,
	kind: TEventOverrideKind,
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

	if (kind === "housing") {
		return mapHousingOverrideFromBackend(
			override as THousingOverrideOutputBackend
		);
	}

	return mapTrainOverrideFromBackend(override as TTrainOverrideOutputBackend);
};

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
 * Reads the override from typed READ details.
 * Contract 3.1: the override lives at `details.supply.override` and exists
 * only on product supply (`details.override` is gone).
 */
export const mapEventOverrideFromDetails = (
	details: TEventDetailsBackend | undefined,
	kind: TEventOverrideKind
): TEventOverride | null => {
	const supply = details?.supply;
	if (!supply || supply.source !== "product") {
		return null;
	}

	const override = supply.override;
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

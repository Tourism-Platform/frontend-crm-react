import type {
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

export const mapEventOverrideFromDetails = (
	details: Record<string, unknown> | undefined,
	kind: TEventOverrideKind
): TEventOverride | null => {
	const raw = details?.override;
	if (!raw || typeof raw !== "object") {
		return null;
	}

	if (kind === "housing") {
		return mapHousingOverrideFromBackend(
			raw as THousingOverrideOutputBackend
		);
	}

	return mapTrainOverrideFromBackend(raw as TTrainOverrideOutputBackend);
};

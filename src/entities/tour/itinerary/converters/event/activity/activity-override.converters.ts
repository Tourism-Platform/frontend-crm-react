import type {
	TActivityOverrideInputBackend,
	TActivityOverrideOutputBackend
} from "../../../types";

export const mapActivityOverrideFromBackend = (
	override?: TActivityOverrideOutputBackend | null
): TActivityOverrideInputBackend | null => {
	if (!override) {
		return null;
	}

	return {
		typ: "activity",
		rates: override.rates
	};
};

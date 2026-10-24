import type {
	TBusOverrideInputBackend,
	TBusOverrideOutputBackend
} from "../../../types";

export const mapBusOverrideFromBackend = (
	override?: TBusOverrideOutputBackend | null
): TBusOverrideInputBackend | null => {
	if (!override) {
		return null;
	}

	return {
		typ: "bus",
		rates: override.rates
	};
};

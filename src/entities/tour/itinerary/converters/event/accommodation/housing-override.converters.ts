import type {
	THotelOverrideInputBackend,
	THotelOverrideOutputBackend
} from "../../../types";

export const mapHousingOverrideFromBackend = (
	override?: THotelOverrideOutputBackend | null
): THotelOverrideInputBackend | null => {
	if (!override) {
		return null;
	}

	return {
		typ: "housing",
		policy: override.policy,
		rates: override.rates
	};
};

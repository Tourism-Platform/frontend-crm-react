import type { HotelOverrideInput, HotelOverrideOutput } from "@/shared/api";

/**
 * Housing override READ (contract 6): Output → Input. Structures are
 * identical modulo field optionality; the pick is explicit so server-owned
 * fields never leak into a PATCH body. Both arms map through: `whole` stay
 * rate and `per_room` room rates; policy passes through in snake_case.
 */
export const mapHousingOverrideFromBackend = (
	override?: HotelOverrideOutput | null
): HotelOverrideInput | null => {
	if (!override) {
		return null;
	}

	return {
		typ: "housing",
		policy: override.policy,
		rates: override.rates
	};
};

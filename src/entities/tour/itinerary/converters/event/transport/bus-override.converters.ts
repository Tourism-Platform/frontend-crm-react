import type { BusOverrideInput, BusOverrideOutput } from "@/shared/api";

/**
 * Bus override READ (contract 6): Output → Input. Both arms map through:
 * `whole` charge and `per_vehicle` vehicle rows.
 */
export const mapBusOverrideFromBackend = (
	override?: BusOverrideOutput | null
): BusOverrideInput | null => {
	if (!override) {
		return null;
	}

	return {
		typ: "bus",
		rates: override.rates
	};
};

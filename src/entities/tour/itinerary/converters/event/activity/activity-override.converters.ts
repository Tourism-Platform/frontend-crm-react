import type {
	ActivityOverrideInput,
	ActivityOverrideOutput
} from "@/shared/api";

/**
 * Activity override READ (contract 6): Output → Input. Activity prices only
 * per offering — there is no whole arm.
 */
export const mapActivityOverrideFromBackend = (
	override?: ActivityOverrideOutput | null
): ActivityOverrideInput | null => {
	if (!override) {
		return null;
	}

	return {
		typ: "activity",
		rates: override.rates
	};
};

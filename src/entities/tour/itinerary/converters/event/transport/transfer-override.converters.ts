import type {
	TransferOverrideInput,
	TransferOverrideOutput
} from "@/shared/api";

/**
 * Transfer override READ (contract 6): Output → Input. All three arms map
 * through: `whole` charge, `per_car` and `per_car_category` rows.
 */
export const mapTransferOverrideFromBackend = (
	override?: TransferOverrideOutput | null
): TransferOverrideInput | null => {
	if (!override) {
		return null;
	}

	return {
		typ: "transfer",
		rates: override.rates
	};
};

import type {
	TTransferOverrideInputBackend,
	TTransferOverrideOutputBackend
} from "../../../types";

export const mapTransferOverrideFromBackend = (
	override?: TTransferOverrideOutputBackend | null
): TTransferOverrideInputBackend | null => {
	if (!override) {
		return null;
	}

	return {
		typ: "transfer",
		rates: override.rates
	};
};

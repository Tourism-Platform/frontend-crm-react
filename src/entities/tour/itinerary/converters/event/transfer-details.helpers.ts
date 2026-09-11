import type {
	TInheritedTransferDetailsBackend,
	TTransferDetailsBackend,
	TTransferEventDetailsBackend
} from "../../types";

export const isInheritedTransferDetails = (
	details: TTransferEventDetailsBackend | null | undefined
): details is TInheritedTransferDetailsBackend =>
	details?.source === "inherited";

export const isCustomTransferDetails = (
	details: TTransferEventDetailsBackend | null | undefined
): details is TTransferDetailsBackend =>
	details != null && details.source !== "inherited";

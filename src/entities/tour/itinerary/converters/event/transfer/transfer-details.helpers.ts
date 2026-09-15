import type {
	TInheritedTransferDetailsBackend,
	TTransferDetailsBackend,
	TTransferEventDetailsBackend
} from "../../../types";

/**
 * Contract 3.1: an event is product-linked when `details.supply.source`
 * is `"product"` (the old flat `details.source === "inherited"` is gone).
 */
export const isInheritedTransferDetails = (
	details: TTransferEventDetailsBackend | null | undefined
): details is TInheritedTransferDetailsBackend =>
	details?.supply?.source === "product";

export const isCustomTransferDetails = (
	details: TTransferEventDetailsBackend | null | undefined
): details is TTransferDetailsBackend =>
	details != null && details.supply?.source !== "product";

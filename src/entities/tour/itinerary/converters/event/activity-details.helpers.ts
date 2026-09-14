import type {
	TActivityDetailsBackend,
	TActivityEventDetailsBackend,
	TInheritedActivityDetailsBackend
} from "../../types";

/**
 * Contract 3.1: an event is product-linked when `details.supply.source`
 * is `"product"` (the old flat `details.source === "inherited"` is gone).
 */
export const isInheritedActivityDetails = (
	details: TActivityEventDetailsBackend | null | undefined
): details is TInheritedActivityDetailsBackend =>
	details?.supply?.source === "product";

export const isCustomActivityDetails = (
	details: TActivityEventDetailsBackend | null | undefined
): details is TActivityDetailsBackend =>
	details != null && !isInheritedActivityDetails(details);

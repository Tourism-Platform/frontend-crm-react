import type {
	TActivityDetailsBackend,
	TActivityEventDetailsBackend,
	TInheritedActivityDetailsBackend
} from "../../types";

export const isInheritedActivityDetails = (
	details: TActivityEventDetailsBackend | null | undefined
): details is TInheritedActivityDetailsBackend =>
	details?.source === "inherited";

export const isCustomActivityDetails = (
	details: TActivityEventDetailsBackend | null | undefined
): details is TActivityDetailsBackend =>
	details != null && !isInheritedActivityDetails(details);

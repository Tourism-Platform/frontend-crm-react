import type {
	TBusDetailsBackend,
	TBusEventDetailsBackend,
	TInheritedBusDetailsBackend
} from "../../types";

export const isInheritedBusDetails = (
	details: TBusEventDetailsBackend | null | undefined
): details is TInheritedBusDetailsBackend => details?.source === "inherited";

export const isCustomBusDetails = (
	details: TBusEventDetailsBackend | null | undefined
): details is TBusDetailsBackend =>
	details != null && details.source !== "inherited";

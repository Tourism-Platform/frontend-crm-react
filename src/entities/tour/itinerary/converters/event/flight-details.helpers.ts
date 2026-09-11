import type {
	TFlightDetailsBackend,
	TFlightEventDetailsBackend,
	TInheritedFlightDetailsBackend
} from "../../types";

export const isInheritedFlightDetails = (
	details: TFlightEventDetailsBackend | null | undefined
): details is TInheritedFlightDetailsBackend => details?.source === "inherited";

export const isCustomFlightDetails = (
	details: TFlightEventDetailsBackend | null | undefined
): details is TFlightDetailsBackend =>
	details != null && details.source !== "inherited";

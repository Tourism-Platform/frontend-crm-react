import type {
	FlightDetailsOutput,
	RouteProductSupplyOutput
} from "@/shared/api";

/** Read-side flight details narrowed to a product-linked supply (3.1). */
export type TInheritedFlightDetailsBackend = FlightDetailsOutput & {
	supply: { source: "product" } & RouteProductSupplyOutput;
};

/**
 * Contract 3.1: an event is product-linked when `details.supply.source`
 * is `"product"` (the old flat `details.source === "inherited"` is gone).
 */
export const isInheritedFlightDetails = (
	details: FlightDetailsOutput | null | undefined
): details is TInheritedFlightDetailsBackend =>
	details?.supply?.source === "product";

export const isCustomFlightDetails = (
	details: FlightDetailsOutput | null | undefined
): details is FlightDetailsOutput =>
	details != null && details.supply?.source !== "product";

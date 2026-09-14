import type { BusDetailsOutput, BusProductSupplyOutput } from "@/shared/api";

/** Read-side bus details narrowed to a product-linked supply (3.1). */
export type TInheritedBusDetailsBackend = BusDetailsOutput & {
	supply: { source: "product" } & BusProductSupplyOutput;
};

/**
 * Contract 3.1: an event is product-linked when `details.supply.source`
 * is `"product"` (the old flat `details.source === "inherited"` is gone).
 */
export const isInheritedBusDetails = (
	details: BusDetailsOutput | null | undefined
): details is TInheritedBusDetailsBackend =>
	details?.supply?.source === "product";

export const isCustomBusDetails = (
	details: BusDetailsOutput | null | undefined
): details is BusDetailsOutput =>
	details != null && details.supply?.source !== "product";

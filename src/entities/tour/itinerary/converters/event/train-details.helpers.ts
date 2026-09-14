import type {
	RouteProductSupplyOutput,
	TrainDetailsOutput
} from "@/shared/api";

/** Read-side train details narrowed to a product-linked supply (3.1). */
export type TInheritedTrainDetailsBackend = TrainDetailsOutput & {
	supply: { source: "product" } & RouteProductSupplyOutput;
};

/**
 * Contract 3.1: an event is product-linked when `details.supply.source`
 * is `"product"` (the old flat `details.source === "inherited"` is gone).
 */
export const isInheritedTrainDetails = (
	details: TrainDetailsOutput | null | undefined
): details is TInheritedTrainDetailsBackend =>
	details?.supply?.source === "product";

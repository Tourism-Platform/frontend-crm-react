import type {
	HotelProductSupplyOutput,
	HousingDetailsOutput
} from "@/shared/api";

/** Read-side housing details narrowed to a product-linked supply (3.1). */
export type TInheritedHousingDetailsBackend = HousingDetailsOutput & {
	supply: { source: "product" } & HotelProductSupplyOutput;
};

/**
 * Contract 3.1: an event is product-linked when `details.supply.source`
 * is `"product"` (the old flat `details.source === "inherited"` is gone).
 */
export const isInheritedHousingDetails = (
	details: HousingDetailsOutput | null | undefined
): details is TInheritedHousingDetailsBackend =>
	details?.supply?.source === "product";

import type {
	CarCategoryOutput,
	CategorisedCarOutput,
	PerCarCategoryTransferOutput,
	PerCarTransferOutput,
	PricedCarOutput,
	TransferDetailsOutput,
	TransferInlineSupplyNew,
	TransferProductSupplyOutput
} from "@/shared/api";

/**
 * Backend shapes for a transfer event (contract 3.1).
 *
 * Read: `details` = `TransferDetailsOutput` — `{ plan, supply, spec }` where
 * `supply.source` discriminates inline vs product-linked events.
 * Write: `TransferDetailsWrite` = `{ plan?, supply? }` (spec lives inside
 * `supply.inline.spec`).
 */

/** Read-side transfer details (`{ plan, supply, spec }`). */
export type TTransferDetailsBackend = TransferDetailsOutput;

/** Read-side transfer details narrowed to a product-linked supply. */
export type TInheritedTransferDetailsBackend = TransferDetailsOutput & {
	supply: { source: "product" } & TransferProductSupplyOutput;
};

/** Read-side transfer details (single 3.1 shape; supply discriminates). */
export type TTransferEventDetailsBackend = TransferDetailsOutput;

/** Read-side per-car priced car (`spec.cars[]` of a per-car spec). */
export type TTransferCarVariantBackend = PricedCarOutput;

/** Read-side price category of a categorised car. */
export type TTransferCarPackageCategoryBackend = CarCategoryOutput;

/** Read-side categorised car (`spec.cars[]` of a per-car-category spec). */
export type TTransferCarCategoriesVariantBackend = CategorisedCarOutput;

/** Read-side per-car transfer spec member. */
export type TPerCarExpenseBackend = PerCarTransferOutput;

/** Read-side per-car-category transfer spec member. */
export type TPerCarCategoryExpenseBackend = PerCarCategoryTransferOutput;

/** Write-side transfer spec — goes into `supply.inline.spec`. */
export type TTransferSpecInputBackend = TransferInlineSupplyNew["spec"];

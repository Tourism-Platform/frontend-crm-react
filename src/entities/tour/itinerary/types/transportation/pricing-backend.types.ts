import type {
	CarCategoryOutput,
	CategorisedCarOutput,
	PerCarCategoryTransferOutput,
	PerCarTransferOutput,
	PricedCarOutput,
	TransferDetailsOutput,
	TransferInlineSupplyNew
} from "@/shared/api";

/**
 * Backend shapes for a transfer event (contract 6).
 *
 * Read: `details` = `TransferDetailsOutput` — `{ plan, pool: [{ id, is_main, supply, spec }] }`.
 * Write: `TransferDetailsWrite` = `{ plan?, pool? }` (spec lives inside
 * inline pool member `supply.spec`).
 */

/** Read-side transfer details. */
export type TTransferDetailsBackend = TransferDetailsOutput;

/** @deprecated Product-linked supply is on `pool[].supply`, not `details.supply`. */
export type TInheritedTransferDetailsBackend = never;

/** Read-side transfer details (operator read). */
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

/** Write-side transfer spec — goes into `pool[].supply.spec`. */
export type TTransferSpecInputBackend = TransferInlineSupplyNew["spec"];

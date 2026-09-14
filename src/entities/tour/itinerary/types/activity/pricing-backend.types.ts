import type {
	ActivityDetailsOutput,
	ActivityDetailsWrite,
	ActivityInlineSupplyNew,
	ActivityProductSupplyOutput,
	FoodOfferingInput
} from "@/shared/api";

/**
 * Backend shapes for an activity event (contract 3.1).
 *
 * Read: `details` = `ActivityDetailsOutput` — `{ plan, supply, spec }` where
 * `supply.source` discriminates inline vs product-linked events and `spec`
 * is the venue spec (food vs general venue by `sub_typ`).
 * Write: `ActivityDetailsWrite` = `{ plan?, supply? }` (spec lives inside
 * `supply.inline.spec`).
 */

/** Read-side activity details (`{ plan, supply, spec }`). */
export type TActivityDetailsBackend = ActivityDetailsOutput;

/** Read-side activity details narrowed to a product-linked supply. */
export type TInheritedActivityDetailsBackend = ActivityDetailsOutput & {
	supply: { source: "product" } & ActivityProductSupplyOutput;
};

/** Read-side activity details (single 3.1 shape; supply discriminates). */
export type TActivityEventDetailsBackend = ActivityDetailsOutput;

/** Write-side activity details (`{ plan?, supply? }`). */
export type TActivityDetailsInputBackend = ActivityDetailsWrite;

/** Read-side activity spec (`details.spec`). */
export type TActivitySpecBackend = ActivityDetailsOutput["spec"];

/** Write-side activity spec — goes into `supply.inline.spec`. */
export type TActivitySpecInputBackend = ActivityInlineSupplyNew["spec"];

/** Write-side food offering inside `supply.inline.spec.offerings`. */
export type TActivityFoodOfferingInputBackend = FoodOfferingInput;

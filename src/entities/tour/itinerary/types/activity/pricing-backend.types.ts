import type {
	ActivityDetailsOutput,
	ActivityDetailsWrite,
	ActivityInlineSupplyNew,
	FoodOfferingInput
} from "@/shared/api";

/**
 * Backend shapes for an activity event (contract 6).
 *
 * Read: `details` = `ActivityDetailsOutput` — `{ plan, pool: [{ id, is_main, supply, spec }] }`.
 * Write: `ActivityDetailsWrite` = `{ plan?, pool? }` (spec lives inside
 * inline pool member `supply.spec`).
 */

/** Read-side activity details. */
export type TActivityDetailsBackend = ActivityDetailsOutput;

/** @deprecated Product-linked supply is on `pool[].supply`, not `details.supply`. */
export type TInheritedActivityDetailsBackend = never;

/** Read-side activity details (operator read). */
export type TActivityEventDetailsBackend = ActivityDetailsOutput;

/** Write-side activity details (`{ plan?, pool? }`). */
export type TActivityDetailsInputBackend = ActivityDetailsWrite;

/** Read-side activity spec (`pool[].spec`). */
export type TActivitySpecBackend =
	ActivityDetailsOutput["pool"][number]["spec"];

/** Write-side activity spec — goes into `pool[].supply.spec`. */
export type TActivitySpecInputBackend = ActivityInlineSupplyNew["spec"];

/** Write-side food offering inside `pool[].supply.spec.offerings`. */
export type TActivityFoodOfferingInputBackend = FoodOfferingInput;

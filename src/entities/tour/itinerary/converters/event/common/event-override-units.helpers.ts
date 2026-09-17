import type { TEventDetailsBackend } from "../../../types";

import { getPoolMember } from "./event-pool.helpers";

export interface IOverrideUnitOption {
	id: string;
	label: string;
}

/** Backend pricing key of the per-unit arm, derived from the spec shape. */
export type TOverridePerUnitPricing =
	| "per_room"
	| "per_fare"
	| "per_vehicle"
	| "per_car"
	| "per_car_category"
	| "offerings";

const toUnitOption = (unit: {
	id?: string;
	name?: string | null;
}): IOverrideUnitOption | null =>
	unit.id ? { id: unit.id, label: unit.name ?? unit.id } : null;

const toUnitOptions = (
	units: readonly { id?: string; name?: string | null }[]
): IOverrideUnitOption[] =>
	units
		.map(toUnitOption)
		.filter((unit): unit is IOverrideUnitOption => unit !== null);

/**
 * Units a per-unit override arm can reprice (contract 6): fares, vehicles,
 * cars, car categories, rooms or offerings of the linked product, read off
 * the pool member's spec. The spec is already SCOPED by the backend — never
 * re-filter by scope here. Whole-priced specs carry the same unit lists
 * (unpriced), so the arm of the spec is irrelevant for the options.
 */
export const getOverrideUnitOptions = (
	details: TEventDetailsBackend | undefined,
	supplyId?: string | null
): IOverrideUnitOption[] => {
	const spec = getPoolMember(details, supplyId)?.spec;
	if (!spec || typeof spec !== "object") {
		return [];
	}

	// train / flight route — fare classes
	if ("fares" in spec) {
		return toUnitOptions(spec.fares);
	}
	// bus fleet — vehicles
	if ("vehicles" in spec) {
		return toUnitOptions(spec.vehicles);
	}
	// activity venue — offerings
	if ("offerings" in spec) {
		return toUnitOptions(spec.offerings);
	}
	// transfer fleet — cars, or car categories when the fleet prices by class
	if ("cars" in spec) {
		if (spec.pricing === "per_car_category") {
			const fleetCategories =
				"categories" in spec ? (spec.categories ?? []) : [];
			return spec.cars.flatMap((car) =>
				(car.prices ?? []).flatMap((price) => {
					const category = fleetCategories.find(
						(row) => row.id === price.category_id
					);
					const carLabel = car.name ?? car.id;
					const categoryLabel = category?.name ?? price.category_id;
					const option = toUnitOption({
						id: price.id,
						name: `${carLabel} — ${categoryLabel}`
					});
					return option ? [option] : [];
				})
			);
		}
		return toUnitOptions(spec.cars);
	}
	// hotel — rooms across categories
	if ("categories" in spec) {
		return spec.categories.flatMap((category) =>
			"rooms" in category ? toUnitOptions(category.rooms ?? []) : []
		);
	}
	return [];
};

/**
 * The per-unit pricing key a type's override arm uses (contract 6). Fixed
 * per type except transfer, which follows the fleet's own pricing mode.
 * Returns null when the member has no spec to derive from.
 */
export const getOverridePerUnitPricing = (
	details: TEventDetailsBackend | undefined,
	supplyId?: string | null
): TOverridePerUnitPricing | null => {
	const spec = getPoolMember(details, supplyId)?.spec;
	if (!spec || typeof spec !== "object") {
		return null;
	}

	if ("fares" in spec) {
		return "per_fare";
	}
	if ("vehicles" in spec) {
		return "per_vehicle";
	}
	if ("offerings" in spec) {
		return "offerings";
	}
	if ("cars" in spec) {
		return spec.pricing === "per_car_category"
			? "per_car_category"
			: "per_car";
	}
	if ("categories" in spec) {
		return "per_room";
	}
	return null;
};

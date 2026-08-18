import type { TourPackageModel } from "@/shared/api";
import { Currency } from "@/shared/api";

export const createPackageMock = (
	overrides: Partial<TourPackageModel> = {}
): TourPackageModel => ({
	id: overrides.id ?? "package-mock-id",
	tour_option_id: overrides.tour_option_id ?? "option-mock-id",
	supplier_id: overrides.supplier_id ?? null,
	name: overrides.name ?? "Meals",
	expenses: overrides.expenses ?? {
		typ: "fixed",
		cost: { val: 100, currency: Currency.USD }
	},
	fees: overrides.fees ?? {
		typ: "fixed",
		cost: { val: 10, currency: Currency.USD }
	},
	markup: overrides.markup ?? null
});

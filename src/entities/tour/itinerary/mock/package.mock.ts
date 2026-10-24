import { ENUM_CURRENCY_BACKEND } from "@/entities/commission/types/currency.types";

import type { TTourPackageBackend } from "../types";

export const createPackageMock = (
	overrides: Partial<TTourPackageBackend> = {}
): TTourPackageBackend => ({
	id: overrides.id ?? "package-mock-id",
	tour_option_id: overrides.tour_option_id ?? "option-mock-id",
	supplier_id: overrides.supplier_id ?? null,
	name: overrides.name ?? "Meals",
	expenses: overrides.expenses ?? {
		typ: "fixed",
		cost: { val: 100, currency: ENUM_CURRENCY_BACKEND.USD }
	},
	fees: overrides.fees ?? [
		{
			name: null,
			cost: { val: 10, currency: ENUM_CURRENCY_BACKEND.USD },
			description: null
		}
	],
	markup: overrides.markup ?? null
});

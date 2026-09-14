import type {
	FixedChargeInput,
	FixedChargeOutput,
	PerPersonChargeInput
} from "@/shared/api/generated/Api";

import { ENUM_SUPPLIER_SURCHARGE } from "../types/supplier-money.types";
import type {
	TChargeMarkupInputBackend,
	TChargeMarkupReadBackend,
	TSupplierVariantChargeReadBackend
} from "../types/supplier-variant-charge-backend.types";
import type {
	ISupplierFixedCharge,
	TSupplierVariantCharge
} from "../types/supplier-variant-charge.types";

import {
	mapSupplierFeesFromBackend,
	mapSupplierFeesToBackend
} from "./supplier-fee.converters";
import {
	mapMonetaryFromBackend,
	mapMonetaryToBackend
} from "./supplier-money.converters";

export const mapSupplierChargeMarkupFromBackend = (
	markup?: TChargeMarkupReadBackend | null
): TSupplierVariantCharge["markup"] => {
	if (!markup) {
		return null;
	}
	if (markup.typ === ENUM_SUPPLIER_SURCHARGE.PERCENTAGE) {
		return {
			typ: ENUM_SUPPLIER_SURCHARGE.PERCENTAGE,
			percentage: markup.percentage
		};
	}
	return {
		typ: ENUM_SUPPLIER_SURCHARGE.FIXED,
		cost: mapMonetaryFromBackend(markup.cost)
	};
};

export const mapSupplierChargeMarkupToBackend = (
	markup: TSupplierVariantCharge["markup"]
): TChargeMarkupInputBackend | null => {
	if (!markup) {
		return null;
	}
	if (markup.typ === ENUM_SUPPLIER_SURCHARGE.PERCENTAGE) {
		return {
			typ: ENUM_SUPPLIER_SURCHARGE.PERCENTAGE,
			percentage: markup.percentage
		};
	}
	return {
		typ: ENUM_SUPPLIER_SURCHARGE.FIXED,
		cost: mapMonetaryToBackend(markup.cost)
	};
};

export const mapSupplierFixedChargeFromBackend = (
	expenses?: FixedChargeOutput | null
): ISupplierFixedCharge | null => {
	if (!expenses) {
		return null;
	}
	return {
		typ: expenses.typ,
		cost: mapMonetaryFromBackend(expenses.cost),
		fees: mapSupplierFeesFromBackend(expenses.fees),
		markup: mapSupplierChargeMarkupFromBackend(expenses.markup)
	};
};

export const mapSupplierVariantChargeFromBackend = (
	expenses?: TSupplierVariantChargeReadBackend | null
): TSupplierVariantCharge | null => {
	if (!expenses) {
		return null;
	}
	if (expenses.typ === "per_person") {
		return {
			typ: expenses.typ,
			costPerPerson: mapMonetaryFromBackend(expenses.cost_per_person),
			fees: mapSupplierFeesFromBackend(expenses.fees),
			markup: mapSupplierChargeMarkupFromBackend(expenses.markup)
		};
	}
	return {
		typ: expenses.typ,
		cost: mapMonetaryFromBackend(expenses.cost),
		fees: mapSupplierFeesFromBackend(expenses.fees),
		markup: mapSupplierChargeMarkupFromBackend(expenses.markup)
	};
};

export const mapSupplierFixedChargeToBackend = (
	expenses: ISupplierFixedCharge
): FixedChargeInput => ({
	typ: expenses.typ,
	cost: mapMonetaryToBackend(expenses.cost),
	fees: mapSupplierFeesToBackend(expenses.fees),
	markup: mapSupplierChargeMarkupToBackend(expenses.markup)
});

export const mapSupplierVariantChargeToBackend = (
	expenses: TSupplierVariantCharge
): FixedChargeInput | PerPersonChargeInput => {
	if (expenses.typ === "per_person") {
		return {
			typ: expenses.typ,
			cost_per_person: mapMonetaryToBackend(expenses.costPerPerson),
			fees: mapSupplierFeesToBackend(expenses.fees),
			markup: mapSupplierChargeMarkupToBackend(expenses.markup)
		};
	}
	return {
		typ: expenses.typ,
		cost: mapMonetaryToBackend(expenses.cost),
		fees: mapSupplierFeesToBackend(expenses.fees),
		markup: mapSupplierChargeMarkupToBackend(expenses.markup)
	};
};

import type {
	FixedChargeInput,
	PerPersonChargeInput
} from "@/shared/api/generated/Api";

import {
	ENUM_SUPPLIER_SURCHARGE,
	ENUM_SUPPLIER_VARIANT_CHARGE,
	type ISupplierFixedCharge,
	type ISupplierPerPersonCharge,
	type TFixedChargeInputBackend,
	type TSupplierSurcharge,
	type TSupplierVariantCharge
} from "../types";

import {
	mapSupplierFeesFromBackend,
	mapSupplierFeesToBackend
} from "./supplier-fee.converters";
import {
	mapMonetaryFromBackend,
	mapMonetaryToBackend
} from "./supplier-money.converters";

type TChargeMarkupBackend = NonNullable<TFixedChargeInputBackend["markup"]>;

type TChargeExpensesBackend = {
	typ?: "fixed" | "per_person";
	cost?: TFixedChargeInputBackend["cost"];
	cost_per_person?: TFixedChargeInputBackend["cost"];
	fees?: TFixedChargeInputBackend["fees"];
	markup?: TChargeMarkupBackend | null;
} | null;

export const mapSupplierChargeMarkupFromBackend = (
	markup?: TChargeMarkupBackend | null
): TSupplierSurcharge | null => {
	if (!markup) return null;
	if (markup.typ === "percentage" && "percentage" in markup) {
		return {
			typ: ENUM_SUPPLIER_SURCHARGE.PERCENTAGE,
			percentage: markup.percentage ?? 0
		};
	}
	if ("cost" in markup && markup.cost) {
		return {
			typ: ENUM_SUPPLIER_SURCHARGE.FIXED,
			cost: mapMonetaryFromBackend(markup.cost)
		};
	}
	return null;
};

export const mapSupplierChargeMarkupToBackend = (
	markup: TSupplierSurcharge | null
): TChargeMarkupBackend | null => {
	if (!markup) return null;
	if (markup.typ === ENUM_SUPPLIER_SURCHARGE.PERCENTAGE) {
		return {
			typ: "percentage",
			percentage: markup.percentage
		};
	}
	return {
		typ: "fixed",
		cost: mapMonetaryToBackend(markup.cost)
	};
};

export const mapSupplierFixedChargeToBackend = (
	data: ISupplierFixedCharge
): TFixedChargeInputBackend => ({
	typ: "fixed",
	cost: mapMonetaryToBackend(data.cost),
	fees: mapSupplierFeesToBackend(data.fees),
	markup: mapSupplierChargeMarkupToBackend(data.markup)
});

export const mapSupplierFixedChargeFromBackend = (
	expenses?: TFixedChargeInputBackend | null
): ISupplierFixedCharge | null => {
	if (!expenses) return null;

	return {
		typ: ENUM_SUPPLIER_VARIANT_CHARGE.FIXED,
		cost: mapMonetaryFromBackend(expenses.cost),
		fees: mapSupplierFeesFromBackend(expenses.fees),
		markup: mapSupplierChargeMarkupFromBackend(expenses.markup)
	};
};

export const mapSupplierVariantChargeToBackend = (
	data: TSupplierVariantCharge
):
	| ({ typ: "fixed" } & FixedChargeInput)
	| ({ typ: "per_person" } & PerPersonChargeInput) => {
	const fees = mapSupplierFeesToBackend(data.fees);
	const markup = mapSupplierChargeMarkupToBackend(data.markup);

	if (data.typ === ENUM_SUPPLIER_VARIANT_CHARGE.PER_PERSON) {
		const perPerson: ISupplierPerPersonCharge = data;
		return {
			typ: "per_person",
			cost_per_person: mapMonetaryToBackend(perPerson.costPerPerson),
			fees,
			markup
		};
	}

	return {
		typ: "fixed",
		cost: mapMonetaryToBackend(data.cost),
		fees,
		markup
	};
};

export const mapSupplierVariantChargeFromBackend = (
	expenses?: TChargeExpensesBackend
): TSupplierVariantCharge | null => {
	if (!expenses) return null;

	const fees = mapSupplierFeesFromBackend(expenses.fees);
	const markup = mapSupplierChargeMarkupFromBackend(expenses.markup);

	if (expenses.typ === "per_person") {
		return {
			typ: ENUM_SUPPLIER_VARIANT_CHARGE.PER_PERSON,
			costPerPerson: mapMonetaryFromBackend(expenses.cost_per_person),
			fees,
			markup
		};
	}

	return {
		typ: ENUM_SUPPLIER_VARIANT_CHARGE.FIXED,
		cost: mapMonetaryFromBackend(expenses.cost),
		fees,
		markup
	};
};

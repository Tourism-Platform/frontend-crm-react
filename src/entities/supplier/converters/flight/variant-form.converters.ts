import { DEFAULT_EVENT_CURRENCY } from "@/entities/commission";

import {
	ENUM_FORM_FLIGHT_VARIANT,
	ENUM_SUPPLIER_VARIANT_CHARGE,
	type IFlightVariant,
	type IFlightVariantWrite,
	type TFlightChargeFormFields,
	type TFlightVariantFormSchema,
	type TSupplierVariantCharge
} from "../../types";

export const emptyFlightChargeForm = (): TFlightChargeFormFields => ({
	[ENUM_FORM_FLIGHT_VARIANT.CHARGE_TYP]: ENUM_SUPPLIER_VARIANT_CHARGE.FIXED,
	[ENUM_FORM_FLIGHT_VARIANT.COST]: null,
	[ENUM_FORM_FLIGHT_VARIANT.CURRENCY]: DEFAULT_EVENT_CURRENCY,
	[ENUM_FORM_FLIGHT_VARIANT.FEES]: []
});

export const emptyFlightVariantForm = (): TFlightVariantFormSchema => ({
	[ENUM_FORM_FLIGHT_VARIANT.NAME]: "",
	...emptyFlightChargeForm()
});

export const mapFlightExpensesToChargeForm = (
	expenses?: TSupplierVariantCharge | null
): TFlightChargeFormFields => {
	if (!expenses) return emptyFlightChargeForm();

	const money =
		expenses.typ === ENUM_SUPPLIER_VARIANT_CHARGE.PER_PERSON
			? expenses.costPerPerson
			: expenses.cost;

	return {
		[ENUM_FORM_FLIGHT_VARIANT.CHARGE_TYP]: expenses.typ,
		[ENUM_FORM_FLIGHT_VARIANT.COST]: money?.val ?? null,
		[ENUM_FORM_FLIGHT_VARIANT.CURRENCY]:
			money?.currency ?? DEFAULT_EVENT_CURRENCY,
		[ENUM_FORM_FLIGHT_VARIANT.FEES]: expenses.fees ?? []
	};
};

export const mapFlightChargeFormToExpenses = (
	values: TFlightChargeFormFields
): TSupplierVariantCharge => {
	const money = {
		val: values[ENUM_FORM_FLIGHT_VARIANT.COST] ?? 0,
		currency:
			values[ENUM_FORM_FLIGHT_VARIANT.CURRENCY] || DEFAULT_EVENT_CURRENCY
	};
	const fees = values[ENUM_FORM_FLIGHT_VARIANT.FEES].length
		? values[ENUM_FORM_FLIGHT_VARIANT.FEES]
		: null;

	if (
		values[ENUM_FORM_FLIGHT_VARIANT.CHARGE_TYP] ===
		ENUM_SUPPLIER_VARIANT_CHARGE.PER_PERSON
	) {
		return {
			typ: ENUM_SUPPLIER_VARIANT_CHARGE.PER_PERSON,
			costPerPerson: money,
			fees,
			markup: null
		};
	}

	return {
		typ: ENUM_SUPPLIER_VARIANT_CHARGE.FIXED,
		cost: money,
		fees,
		markup: null
	};
};

export const mapFlightVariantToForm = (
	variant?: IFlightVariant | null
): TFlightVariantFormSchema => {
	if (!variant) return emptyFlightVariantForm();

	return {
		[ENUM_FORM_FLIGHT_VARIANT.NAME]: variant.name,
		...mapFlightExpensesToChargeForm(variant.expenses)
	};
};

export const mapFlightVariantFormToWrite = (
	values: TFlightVariantFormSchema
): IFlightVariantWrite => ({
	name: values[ENUM_FORM_FLIGHT_VARIANT.NAME].trim(),
	expenses: mapFlightChargeFormToExpenses(values)
});

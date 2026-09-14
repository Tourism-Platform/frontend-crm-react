import { DEFAULT_EVENT_CURRENCY } from "@/entities/commission";

import {
	ENUM_FORM_FLIGHT_VARIANT,
	ENUM_SUPPLIER_VARIANT_CHARGE,
	type IFlightVariant,
	type IFlightVariantWrite,
	type TFlightVariantFormSchema
} from "../../types";

export const emptyFlightVariantForm = (): TFlightVariantFormSchema => ({
	[ENUM_FORM_FLIGHT_VARIANT.NAME]: "",
	[ENUM_FORM_FLIGHT_VARIANT.CHARGE_TYP]: ENUM_SUPPLIER_VARIANT_CHARGE.FIXED,
	[ENUM_FORM_FLIGHT_VARIANT.COST]: null,
	[ENUM_FORM_FLIGHT_VARIANT.CURRENCY]: DEFAULT_EVENT_CURRENCY,
	[ENUM_FORM_FLIGHT_VARIANT.FEES]: []
});

export const mapFlightVariantToForm = (
	variant?: IFlightVariant | null
): TFlightVariantFormSchema => {
	if (!variant) return emptyFlightVariantForm();

	const expenses = variant.expenses;
	if (!expenses) {
		return {
			[ENUM_FORM_FLIGHT_VARIANT.NAME]: variant.name,
			[ENUM_FORM_FLIGHT_VARIANT.CHARGE_TYP]:
				ENUM_SUPPLIER_VARIANT_CHARGE.FIXED,
			[ENUM_FORM_FLIGHT_VARIANT.COST]: null,
			[ENUM_FORM_FLIGHT_VARIANT.CURRENCY]: DEFAULT_EVENT_CURRENCY,
			[ENUM_FORM_FLIGHT_VARIANT.FEES]: []
		};
	}

	const money =
		expenses.typ === ENUM_SUPPLIER_VARIANT_CHARGE.PER_PERSON
			? expenses.costPerPerson
			: expenses.cost;

	return {
		[ENUM_FORM_FLIGHT_VARIANT.NAME]: variant.name,
		[ENUM_FORM_FLIGHT_VARIANT.CHARGE_TYP]: expenses.typ,
		[ENUM_FORM_FLIGHT_VARIANT.COST]: money?.val ?? null,
		[ENUM_FORM_FLIGHT_VARIANT.CURRENCY]:
			money?.currency ?? DEFAULT_EVENT_CURRENCY,
		[ENUM_FORM_FLIGHT_VARIANT.FEES]: expenses.fees ?? []
	};
};

export const mapFlightVariantFormToWrite = (
	values: TFlightVariantFormSchema
): IFlightVariantWrite => {
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
			name: values[ENUM_FORM_FLIGHT_VARIANT.NAME].trim(),
			expenses: {
				typ: ENUM_SUPPLIER_VARIANT_CHARGE.PER_PERSON,
				costPerPerson: money,
				fees,
				markup: null
			}
		};
	}

	return {
		name: values[ENUM_FORM_FLIGHT_VARIANT.NAME].trim(),
		expenses: {
			typ: ENUM_SUPPLIER_VARIANT_CHARGE.FIXED,
			cost: money,
			fees,
			markup: null
		}
	};
};

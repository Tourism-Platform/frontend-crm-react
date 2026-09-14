import { DEFAULT_EVENT_CURRENCY } from "@/entities/commission";

import {
	ENUM_FORM_BUS_PRICING,
	ENUM_FORM_BUS_VARIANT,
	ENUM_SUPPLIER_VARIANT_CHARGE,
	ENUM_VEHICLE_BODY_TYPE,
	type IBusVariant,
	type IBusVariantWrite,
	type TBusChargeFormFields,
	type TBusVariantFormSchema,
	type TSupplierVariantCharge
} from "../../types";

export const emptyBusChargeForm = (): TBusChargeFormFields => ({
	[ENUM_FORM_BUS_PRICING.CHARGE_TYP]: ENUM_SUPPLIER_VARIANT_CHARGE.FIXED,
	[ENUM_FORM_BUS_PRICING.COST]: null,
	[ENUM_FORM_BUS_PRICING.CURRENCY]: DEFAULT_EVENT_CURRENCY,
	[ENUM_FORM_BUS_PRICING.FEES]: []
});

export const emptyBusVariantForm = (): TBusVariantFormSchema => ({
	[ENUM_FORM_BUS_VARIANT.NAME]: "",
	[ENUM_FORM_BUS_VARIANT.BODY_TYPE]: ENUM_VEHICLE_BODY_TYPE.BUS,
	[ENUM_FORM_BUS_VARIANT.PAX]: 1,
	[ENUM_FORM_BUS_VARIANT.DESCRIPTION]: "",
	[ENUM_FORM_BUS_VARIANT.COST]: null,
	[ENUM_FORM_BUS_VARIANT.CURRENCY]: DEFAULT_EVENT_CURRENCY,
	[ENUM_FORM_BUS_VARIANT.FEES]: []
});

export const mapBusExpensesToChargeForm = (
	expenses?: TSupplierVariantCharge | null
): TBusChargeFormFields => {
	if (!expenses) return emptyBusChargeForm();

	const money =
		expenses.typ === ENUM_SUPPLIER_VARIANT_CHARGE.PER_PERSON
			? expenses.costPerPerson
			: expenses.cost;

	return {
		[ENUM_FORM_BUS_PRICING.CHARGE_TYP]: expenses.typ,
		[ENUM_FORM_BUS_PRICING.COST]: money?.val ?? null,
		[ENUM_FORM_BUS_PRICING.CURRENCY]:
			money?.currency ?? DEFAULT_EVENT_CURRENCY,
		[ENUM_FORM_BUS_PRICING.FEES]: expenses.fees ?? []
	};
};

export const mapBusChargeFormToExpenses = (
	values: TBusChargeFormFields
): TSupplierVariantCharge => {
	const money = {
		val: values[ENUM_FORM_BUS_PRICING.COST] ?? 0,
		currency:
			values[ENUM_FORM_BUS_PRICING.CURRENCY] || DEFAULT_EVENT_CURRENCY
	};
	const fees = values[ENUM_FORM_BUS_PRICING.FEES].length
		? values[ENUM_FORM_BUS_PRICING.FEES]
		: null;

	if (
		values[ENUM_FORM_BUS_PRICING.CHARGE_TYP] ===
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

export const mapBusVariantToForm = (
	variant?: IBusVariant | null
): TBusVariantFormSchema => {
	if (!variant) return emptyBusVariantForm();

	const expenses = variant.expenses;

	return {
		[ENUM_FORM_BUS_VARIANT.NAME]: variant.name,
		[ENUM_FORM_BUS_VARIANT.BODY_TYPE]:
			variant.bodyType ?? ENUM_VEHICLE_BODY_TYPE.BUS,
		[ENUM_FORM_BUS_VARIANT.PAX]: variant.pax ?? 1,
		[ENUM_FORM_BUS_VARIANT.DESCRIPTION]: variant.description ?? "",
		[ENUM_FORM_BUS_VARIANT.COST]: expenses?.cost?.val ?? null,
		[ENUM_FORM_BUS_VARIANT.CURRENCY]:
			expenses?.cost?.currency ?? DEFAULT_EVENT_CURRENCY,
		[ENUM_FORM_BUS_VARIANT.FEES]: expenses?.fees ?? []
	};
};

export const mapBusVariantFormToWrite = (
	values: TBusVariantFormSchema
): IBusVariantWrite => {
	const money = {
		val: values[ENUM_FORM_BUS_VARIANT.COST] ?? 0,
		currency:
			values[ENUM_FORM_BUS_VARIANT.CURRENCY] || DEFAULT_EVENT_CURRENCY
	};
	const fees = values[ENUM_FORM_BUS_VARIANT.FEES].length
		? values[ENUM_FORM_BUS_VARIANT.FEES]
		: null;

	return {
		name: values[ENUM_FORM_BUS_VARIANT.NAME].trim(),
		bodyType: values[ENUM_FORM_BUS_VARIANT.BODY_TYPE],
		pax: values[ENUM_FORM_BUS_VARIANT.PAX],
		description: values[ENUM_FORM_BUS_VARIANT.DESCRIPTION].trim() || null,
		expenses: {
			typ: ENUM_SUPPLIER_VARIANT_CHARGE.FIXED,
			cost: money,
			fees,
			markup: null
		}
	};
};

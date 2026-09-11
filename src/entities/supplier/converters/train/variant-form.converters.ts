import { DEFAULT_EVENT_CURRENCY } from "@/entities/commission";

import {
	ENUM_FORM_TRAIN_VARIANT,
	ENUM_TRAIN_VARIANT_CHARGE,
	type ITrainVariant,
	type ITrainVariantWrite,
	type TTrainVariantFormSchema
} from "../../types";

export const emptyTrainVariantForm = (): TTrainVariantFormSchema => ({
	[ENUM_FORM_TRAIN_VARIANT.NAME]: "",
	[ENUM_FORM_TRAIN_VARIANT.CHARGE_TYP]: ENUM_TRAIN_VARIANT_CHARGE.FIXED,
	[ENUM_FORM_TRAIN_VARIANT.COST]: "",
	[ENUM_FORM_TRAIN_VARIANT.CURRENCY]: DEFAULT_EVENT_CURRENCY,
	[ENUM_FORM_TRAIN_VARIANT.FEES]: []
});

export const mapTrainVariantToForm = (
	variant?: ITrainVariant | null
): TTrainVariantFormSchema => {
	if (!variant) return emptyTrainVariantForm();

	const expenses = variant.expenses;
	if (!expenses) {
		return {
			[ENUM_FORM_TRAIN_VARIANT.NAME]: variant.name,
			[ENUM_FORM_TRAIN_VARIANT.CHARGE_TYP]:
				ENUM_TRAIN_VARIANT_CHARGE.FIXED,
			[ENUM_FORM_TRAIN_VARIANT.COST]: "",
			[ENUM_FORM_TRAIN_VARIANT.CURRENCY]: DEFAULT_EVENT_CURRENCY,
			[ENUM_FORM_TRAIN_VARIANT.FEES]: []
		};
	}

	const money =
		expenses.typ === ENUM_TRAIN_VARIANT_CHARGE.PER_PERSON
			? expenses.costPerPerson
			: expenses.cost;

	return {
		[ENUM_FORM_TRAIN_VARIANT.NAME]: variant.name,
		[ENUM_FORM_TRAIN_VARIANT.CHARGE_TYP]: expenses.typ,
		[ENUM_FORM_TRAIN_VARIANT.COST]: money != null ? String(money.val) : "",
		[ENUM_FORM_TRAIN_VARIANT.CURRENCY]:
			money?.currency ?? DEFAULT_EVENT_CURRENCY,
		[ENUM_FORM_TRAIN_VARIANT.FEES]: expenses.fees ?? []
	};
};

export const mapTrainVariantFormToWrite = (
	values: TTrainVariantFormSchema
): ITrainVariantWrite => {
	const money = {
		val: Number(values[ENUM_FORM_TRAIN_VARIANT.COST]) || 0,
		currency:
			values[ENUM_FORM_TRAIN_VARIANT.CURRENCY] || DEFAULT_EVENT_CURRENCY
	};
	const fees = values[ENUM_FORM_TRAIN_VARIANT.FEES].length
		? values[ENUM_FORM_TRAIN_VARIANT.FEES]
		: null;

	if (
		values[ENUM_FORM_TRAIN_VARIANT.CHARGE_TYP] ===
		ENUM_TRAIN_VARIANT_CHARGE.PER_PERSON
	) {
		return {
			name: values[ENUM_FORM_TRAIN_VARIANT.NAME].trim(),
			expenses: {
				typ: ENUM_TRAIN_VARIANT_CHARGE.PER_PERSON,
				costPerPerson: money,
				fees,
				markup: null
			}
		};
	}

	return {
		name: values[ENUM_FORM_TRAIN_VARIANT.NAME].trim(),
		expenses: {
			typ: ENUM_TRAIN_VARIANT_CHARGE.FIXED,
			cost: money,
			fees,
			markup: null
		}
	};
};

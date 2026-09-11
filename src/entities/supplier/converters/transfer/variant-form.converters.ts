import { DEFAULT_EVENT_CURRENCY } from "@/entities/commission";

import {
	ENUM_FORM_TRANSFER_VARIANT,
	ENUM_SUPPLIER_VARIANT_CHARGE,
	type ITransferVariant,
	type ITransferVariantWrite,
	type TTransferVariantFormSchema
} from "../../types";

export const emptyTransferVariantForm = (): TTransferVariantFormSchema => ({
	[ENUM_FORM_TRANSFER_VARIANT.NAME]: "",
	[ENUM_FORM_TRANSFER_VARIANT.BODY_TYPE]: null,
	[ENUM_FORM_TRANSFER_VARIANT.PAX]: null,
	[ENUM_FORM_TRANSFER_VARIANT.DESCRIPTION]: "",
	[ENUM_FORM_TRANSFER_VARIANT.COST]: "",
	[ENUM_FORM_TRANSFER_VARIANT.CURRENCY]: DEFAULT_EVENT_CURRENCY,
	[ENUM_FORM_TRANSFER_VARIANT.FEES]: []
});

export const mapTransferVariantToForm = (
	variant?: ITransferVariant | null
): TTransferVariantFormSchema => {
	if (!variant) return emptyTransferVariantForm();

	const expenses = variant.expenses;

	return {
		[ENUM_FORM_TRANSFER_VARIANT.NAME]: variant.name,
		[ENUM_FORM_TRANSFER_VARIANT.BODY_TYPE]: variant.bodyType,
		[ENUM_FORM_TRANSFER_VARIANT.PAX]: variant.pax,
		[ENUM_FORM_TRANSFER_VARIANT.DESCRIPTION]: variant.description ?? "",
		[ENUM_FORM_TRANSFER_VARIANT.COST]:
			expenses?.cost != null ? String(expenses.cost.val) : "",
		[ENUM_FORM_TRANSFER_VARIANT.CURRENCY]:
			expenses?.cost?.currency ?? DEFAULT_EVENT_CURRENCY,
		[ENUM_FORM_TRANSFER_VARIANT.FEES]: expenses?.fees ?? []
	};
};

export const mapTransferVariantFormToWrite = (
	values: TTransferVariantFormSchema
): ITransferVariantWrite => {
	const money = {
		val: Number(values[ENUM_FORM_TRANSFER_VARIANT.COST]) || 0,
		currency:
			values[ENUM_FORM_TRANSFER_VARIANT.CURRENCY] ||
			DEFAULT_EVENT_CURRENCY
	};
	const fees = values[ENUM_FORM_TRANSFER_VARIANT.FEES].length
		? values[ENUM_FORM_TRANSFER_VARIANT.FEES]
		: null;

	return {
		name: values[ENUM_FORM_TRANSFER_VARIANT.NAME].trim(),
		bodyType: values[ENUM_FORM_TRANSFER_VARIANT.BODY_TYPE] ?? null,
		pax: values[ENUM_FORM_TRANSFER_VARIANT.PAX] ?? null,
		description:
			values[ENUM_FORM_TRANSFER_VARIANT.DESCRIPTION].trim() || null,
		expenses: {
			typ: ENUM_SUPPLIER_VARIANT_CHARGE.FIXED,
			cost: money,
			fees,
			markup: null
		}
	};
};

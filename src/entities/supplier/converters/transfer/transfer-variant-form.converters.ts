import {
	DEFAULT_EVENT_CURRENCY,
	type ENUM_CURRENCY_OPTIONS_TYPE
} from "@/entities/commission";

import { fleetCategoryNameById } from "../../lib/transfer-fleet-category.helpers";
import {
	ENUM_FORM_TRANSFER_CATEGORY,
	ENUM_FORM_TRANSFER_MARKUP,
	ENUM_FORM_TRANSFER_VARIANT,
	ENUM_SUPPLIER_SURCHARGE,
	ENUM_SUPPLIER_VARIANT_CHARGE,
	ENUM_VEHICLE_BODY_TYPE,
	type ISupplierFixedCharge,
	type ITransferCarPrice,
	type ITransferCarPriceWrite,
	type ITransferFleetCategory,
	type ITransferVariant,
	type ITransferVariantWrite,
	type TSupplierSurcharge,
	type TTransferMarkupForm,
	type TTransferVariantCategoryFormSchema,
	type TTransferVariantFormSchema
} from "../../types";

export const emptyTransferMarkupForm =
	(): NonNullable<TTransferMarkupForm> => ({
		[ENUM_FORM_TRANSFER_MARKUP.TYP]: ENUM_SUPPLIER_SURCHARGE.FIXED,
		[ENUM_FORM_TRANSFER_MARKUP.VALUE]: ""
	});

export const mapTransferMarkupToForm = (
	markup?: TSupplierSurcharge | null
): TTransferMarkupForm => {
	if (!markup) return null;
	if (markup.typ === ENUM_SUPPLIER_SURCHARGE.PERCENTAGE) {
		return {
			[ENUM_FORM_TRANSFER_MARKUP.TYP]: ENUM_SUPPLIER_SURCHARGE.PERCENTAGE,
			[ENUM_FORM_TRANSFER_MARKUP.VALUE]: String(
				(markup.percentage ?? 0) * 100
			)
		};
	}
	return {
		[ENUM_FORM_TRANSFER_MARKUP.TYP]: ENUM_SUPPLIER_SURCHARGE.FIXED,
		[ENUM_FORM_TRANSFER_MARKUP.VALUE]: String(markup.cost?.val ?? "")
	};
};

export const mapTransferMarkupFormToDomain = (
	markup: TTransferMarkupForm,
	currency: ENUM_CURRENCY_OPTIONS_TYPE,
	addMarginSeparately: boolean
): TSupplierSurcharge | null => {
	if (!addMarginSeparately || !markup?.value) return null;
	if (markup.typ === ENUM_SUPPLIER_SURCHARGE.PERCENTAGE) {
		return {
			typ: ENUM_SUPPLIER_SURCHARGE.PERCENTAGE,
			percentage: Number(markup.value) / 100
		};
	}
	return {
		typ: ENUM_SUPPLIER_SURCHARGE.FIXED,
		cost: { val: Number(markup.value), currency }
	};
};

export const emptyTransferVariantCategory =
	(): TTransferVariantCategoryFormSchema => ({
		[ENUM_FORM_TRANSFER_CATEGORY.ID]: undefined,
		[ENUM_FORM_TRANSFER_CATEGORY.CATEGORY_ID]: "",
		[ENUM_FORM_TRANSFER_CATEGORY.NAME]: "",
		[ENUM_FORM_TRANSFER_CATEGORY.COST]: null,
		[ENUM_FORM_TRANSFER_CATEGORY.CURRENCY]: DEFAULT_EVENT_CURRENCY,
		[ENUM_FORM_TRANSFER_CATEGORY.FEES]: [],
		[ENUM_FORM_TRANSFER_CATEGORY.MARKUP]: null
	});

const mapCategoryFormToFixedCharge = (
	values: TTransferVariantCategoryFormSchema,
	addMarginSeparately: boolean
): ISupplierFixedCharge => {
	const fees = values[ENUM_FORM_TRANSFER_CATEGORY.FEES].length
		? values[ENUM_FORM_TRANSFER_CATEGORY.FEES]
		: null;
	const currency =
		values[ENUM_FORM_TRANSFER_CATEGORY.CURRENCY] || DEFAULT_EVENT_CURRENCY;

	return {
		typ: ENUM_SUPPLIER_VARIANT_CHARGE.FIXED,
		cost: {
			val: values[ENUM_FORM_TRANSFER_CATEGORY.COST] ?? 0,
			currency
		},
		fees,
		markup: mapTransferMarkupFormToDomain(
			values[ENUM_FORM_TRANSFER_CATEGORY.MARKUP],
			currency,
			addMarginSeparately
		)
	};
};

const mapPriceToForm = (
	price: ITransferCarPrice,
	fleetCategories: readonly ITransferFleetCategory[] = []
): TTransferVariantCategoryFormSchema => ({
	[ENUM_FORM_TRANSFER_CATEGORY.ID]: price.id,
	[ENUM_FORM_TRANSFER_CATEGORY.CATEGORY_ID]: price.categoryId,
	[ENUM_FORM_TRANSFER_CATEGORY.NAME]:
		fleetCategoryNameById(fleetCategories, price.categoryId) ?? "",
	[ENUM_FORM_TRANSFER_CATEGORY.COST]: price.expenses.cost.val ?? null,
	[ENUM_FORM_TRANSFER_CATEGORY.CURRENCY]:
		price.expenses.cost.currency ?? DEFAULT_EVENT_CURRENCY,
	[ENUM_FORM_TRANSFER_CATEGORY.FEES]: price.expenses.fees ?? [],
	[ENUM_FORM_TRANSFER_CATEGORY.MARKUP]: mapTransferMarkupToForm(
		price.expenses.markup
	)
});

const mapCategoryFormToPriceWrite = (
	values: TTransferVariantCategoryFormSchema,
	addMarginSeparately: boolean
): ITransferCarPriceWrite => {
	const priceId = values[ENUM_FORM_TRANSFER_CATEGORY.ID];

	return {
		...(priceId ? { id: priceId } : {}),
		categoryId: values[ENUM_FORM_TRANSFER_CATEGORY.CATEGORY_ID],
		expenses: mapCategoryFormToFixedCharge(values, addMarginSeparately)
	};
};

export const emptyTransferVariantForm = (): TTransferVariantFormSchema => ({
	[ENUM_FORM_TRANSFER_VARIANT.NAME]: "",
	[ENUM_FORM_TRANSFER_VARIANT.BODY_TYPE]: ENUM_VEHICLE_BODY_TYPE.SEDAN,
	[ENUM_FORM_TRANSFER_VARIANT.PAX]: 1,
	[ENUM_FORM_TRANSFER_VARIANT.DESCRIPTION]: "",
	[ENUM_FORM_TRANSFER_VARIANT.COST]: null,
	[ENUM_FORM_TRANSFER_VARIANT.CURRENCY]: DEFAULT_EVENT_CURRENCY,
	[ENUM_FORM_TRANSFER_VARIANT.FEES]: [],
	[ENUM_FORM_TRANSFER_VARIANT.CATEGORIES]: [emptyTransferVariantCategory()],
	[ENUM_FORM_TRANSFER_VARIANT.ADD_MARGIN_SEPARATELY]: false,
	[ENUM_FORM_TRANSFER_VARIANT.MARKUP]: null
});

export const mapTransferVariantToForm = (
	variant?: ITransferVariant | null,
	fleetCategories: readonly ITransferFleetCategory[] = []
): TTransferVariantFormSchema => {
	if (!variant) return emptyTransferVariantForm();

	const expenses = variant.expenses;

	return {
		[ENUM_FORM_TRANSFER_VARIANT.NAME]: variant.name,
		[ENUM_FORM_TRANSFER_VARIANT.BODY_TYPE]:
			variant.bodyType ?? ENUM_VEHICLE_BODY_TYPE.SEDAN,
		[ENUM_FORM_TRANSFER_VARIANT.PAX]: variant.pax ?? 1,
		[ENUM_FORM_TRANSFER_VARIANT.DESCRIPTION]: variant.description ?? "",
		[ENUM_FORM_TRANSFER_VARIANT.COST]: expenses?.cost?.val ?? null,
		[ENUM_FORM_TRANSFER_VARIANT.CURRENCY]:
			expenses?.cost?.currency ?? DEFAULT_EVENT_CURRENCY,
		[ENUM_FORM_TRANSFER_VARIANT.FEES]: expenses?.fees ?? [],
		[ENUM_FORM_TRANSFER_VARIANT.CATEGORIES]: variant.prices.length
			? variant.prices.map((price) =>
					mapPriceToForm(price, fleetCategories)
				)
			: [emptyTransferVariantCategory()],
		[ENUM_FORM_TRANSFER_VARIANT.ADD_MARGIN_SEPARATELY]:
			Boolean(variant.expenses?.markup) ||
			variant.prices.some((price) => price.expenses.markup),
		[ENUM_FORM_TRANSFER_VARIANT.MARKUP]: mapTransferMarkupToForm(
			variant.expenses?.markup
		)
	};
};

export const mapTransferVariantFormToWrite = (
	values: TTransferVariantFormSchema
): ITransferVariantWrite => {
	const money = {
		val: values[ENUM_FORM_TRANSFER_VARIANT.COST] ?? 0,
		currency:
			values[ENUM_FORM_TRANSFER_VARIANT.CURRENCY] ||
			DEFAULT_EVENT_CURRENCY
	};
	const fees = values[ENUM_FORM_TRANSFER_VARIANT.FEES].length
		? values[ENUM_FORM_TRANSFER_VARIANT.FEES]
		: null;
	const addMarginSeparately =
		values[ENUM_FORM_TRANSFER_VARIANT.ADD_MARGIN_SEPARATELY];

	return {
		name: values[ENUM_FORM_TRANSFER_VARIANT.NAME].trim(),
		bodyType: values[ENUM_FORM_TRANSFER_VARIANT.BODY_TYPE],
		pax: values[ENUM_FORM_TRANSFER_VARIANT.PAX],
		description:
			values[ENUM_FORM_TRANSFER_VARIANT.DESCRIPTION].trim() || null,
		expenses: {
			typ: ENUM_SUPPLIER_VARIANT_CHARGE.FIXED,
			cost: money,
			fees,
			markup: mapTransferMarkupFormToDomain(
				values[ENUM_FORM_TRANSFER_VARIANT.MARKUP],
				money.currency,
				addMarginSeparately
			)
		},
		prices: values[ENUM_FORM_TRANSFER_VARIANT.CATEGORIES]
			.filter((category) =>
				category[ENUM_FORM_TRANSFER_CATEGORY.CATEGORY_ID].trim()
			)
			.map((category) =>
				mapCategoryFormToPriceWrite(category, addMarginSeparately)
			)
	};
};

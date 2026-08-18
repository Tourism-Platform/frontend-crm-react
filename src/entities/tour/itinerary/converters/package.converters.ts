import {
	DEFAULT_EVENT_CURRENCY,
	type ENUM_CURRENCY_OPTIONS_TYPE,
	currencyConverter
} from "@/entities/commission";

import type { TPackageEditSchema } from "../schema/package.schema";
import {
	ENUM_PACKAGE_FIELD,
	ENUM_PACKAGE_MARKUP_TYP,
	ENUM_PACKAGE_PRICING_TYPE,
	type IPackageFormMarkup,
	type ITourPackage,
	type ITourPackageListItem,
	type TPackageCreateBackend,
	type TPackageUpdateBackend,
	type TTourPackageBackend
} from "../types";

const mapMarkupFromBackend = (
	markup?: TTourPackageBackend["markup"]
): IPackageFormMarkup | null => {
	if (!markup) return null;
	if (markup.typ === "percentage") {
		return {
			typ: ENUM_PACKAGE_MARKUP_TYP.PERCENTAGE,
			value: String((markup.percentage ?? 0) * 100)
		};
	}
	return {
		typ: ENUM_PACKAGE_MARKUP_TYP.FIXED,
		value: String(markup.cost?.val ?? "")
	};
};

const mapMarkupToBackend = (
	markup: IPackageFormMarkup | null | undefined,
	rowCurrency: ENUM_CURRENCY_OPTIONS_TYPE,
	addMarginSeparately: boolean
): TPackageCreateBackend["markup"] => {
	if (!addMarginSeparately || !markup?.value) return null;
	if (markup.typ === ENUM_PACKAGE_MARKUP_TYP.PERCENTAGE) {
		return {
			typ: "percentage",
			percentage: Number(markup.value) / 100
		};
	}
	return {
		typ: "fixed",
		cost: {
			val: Number(markup.value),
			currency: currencyConverter.to(rowCurrency)!
		}
	};
};

export const getEmptyPackageForm = (): TPackageEditSchema => ({
	[ENUM_PACKAGE_FIELD.NAME]: "",
	[ENUM_PACKAGE_FIELD.PRICING_TYPE]: ENUM_PACKAGE_PRICING_TYPE.FLAT_RATE,
	[ENUM_PACKAGE_FIELD.ADD_MARGIN_SEPARATELY]: false,
	[ENUM_PACKAGE_FIELD.TOTAL_PRICE]: null,
	[ENUM_PACKAGE_FIELD.TAXES]: null,
	[ENUM_PACKAGE_FIELD.CURRENCY]: DEFAULT_EVENT_CURRENCY,
	[ENUM_PACKAGE_FIELD.MARKUP]: null,
	[ENUM_PACKAGE_FIELD.SUPPLIER_ID]: ""
});

export const mapPackageToListItem = (
	backend: TTourPackageBackend
): ITourPackageListItem => ({
	id: backend.id,
	name: backend.name
});

export const mapPackageToFrontend = (
	backend: TTourPackageBackend
): ITourPackage => ({
	id: backend.id,
	tourOptionId: backend.tour_option_id,
	name: backend.name,
	supplierId: backend.supplier_id
});

export const mapPackageToForm = (
	backend: TTourPackageBackend
): TPackageEditSchema => {
	const expenses = backend.expenses;
	const feesVal = backend.fees?.cost?.val;
	const markup = mapMarkupFromBackend(backend.markup);
	const isPerPerson = expenses.typ === "per_person";
	const cost = isPerPerson ? expenses.cost_per_person : expenses.cost;

	return {
		[ENUM_PACKAGE_FIELD.NAME]: backend.name ?? "",
		[ENUM_PACKAGE_FIELD.PRICING_TYPE]: isPerPerson
			? ENUM_PACKAGE_PRICING_TYPE.PER_PERSON
			: ENUM_PACKAGE_PRICING_TYPE.FLAT_RATE,
		[ENUM_PACKAGE_FIELD.ADD_MARGIN_SEPARATELY]: Boolean(markup?.value),
		[ENUM_PACKAGE_FIELD.MARKUP]: markup,
		[ENUM_PACKAGE_FIELD.TOTAL_PRICE]: cost?.val ?? null,
		[ENUM_PACKAGE_FIELD.TAXES]: feesVal ?? null,
		[ENUM_PACKAGE_FIELD.CURRENCY]: cost?.currency
			? currencyConverter.from(cost.currency)
			: DEFAULT_EVENT_CURRENCY,
		[ENUM_PACKAGE_FIELD.SUPPLIER_ID]: backend.supplier_id ?? ""
	};
};

const mapPackageFormToPayload = (
	form: TPackageEditSchema
): TPackageUpdateBackend => {
	const totalPrice = form[ENUM_PACKAGE_FIELD.TOTAL_PRICE];
	const currency = form[ENUM_PACKAGE_FIELD.CURRENCY];
	const taxes = form[ENUM_PACKAGE_FIELD.TAXES];
	const supplierId = form[ENUM_PACKAGE_FIELD.SUPPLIER_ID]?.trim();

	if (totalPrice == null || !currency) {
		return {
			name: form.name,
			expenses: null,
			fees: null,
			markup: null,
			supplier_id: supplierId || null
		};
	}

	const cost = {
		val: totalPrice,
		currency: currencyConverter.to(currency)!
	};
	const fees =
		taxes != null
			? {
					typ: "fixed" as const,
					cost: {
						val: taxes,
						currency: currencyConverter.to(currency)!
					}
				}
			: null;
	const markup = mapMarkupToBackend(
		form[ENUM_PACKAGE_FIELD.MARKUP] ?? null,
		currency,
		form.add_margin_separately
	);

	const expenses =
		form.pricing_type === ENUM_PACKAGE_PRICING_TYPE.PER_PERSON
			? {
					typ: "per_person" as const,
					cost_per_person: cost
				}
			: {
					typ: "fixed" as const,
					cost
				};

	return {
		name: form.name,
		expenses,
		fees,
		markup,
		supplier_id: supplierId || null
	};
};

export const mapPackageCreateToBackend = (
	form: TPackageEditSchema
): TPackageCreateBackend =>
	mapPackageFormToPayload(form) as TPackageCreateBackend;

export const mapPackageUpdateToBackend = (
	form: TPackageEditSchema
): TPackageUpdateBackend => mapPackageFormToPayload(form);

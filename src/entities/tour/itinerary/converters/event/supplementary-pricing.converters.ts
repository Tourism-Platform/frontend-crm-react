import {
	DEFAULT_EVENT_CURRENCY,
	type ENUM_CURRENCY_OPTIONS_TYPE,
	currencyConverter
} from "@/entities/commission";

import {
	ENUM_FORM_SUPPLEMENT_ITEMS,
	ENUM_SUPPLEMENT_MARKUP_TYP,
	ENUM_SUPPLEMENT_PER_ITEM_EXPENSES_FIELD,
	ENUM_SUPPLEMENT_PRICE_ROW_FIELD,
	ENUM_SUPPLEMENT_PRICING_FIELD,
	ENUM_SUPPLEMENT_PRICING_INVOICING,
	ENUM_SUPPLEMENT_PRICING_TYPE,
	type ISupplementPerItemExpenses,
	type ISupplementPerItemPriceRow,
	type ISupplementPriceRowMarkup,
	type TCommissionMarkupBackend,
	type TCommissionMarkupInputBackend,
	type TSupplementEditSchema,
	type TSupplementItemsSchema,
	type TSupplementPricingSchema,
	type TSupplementaryItemBackend,
	type TSupplementaryItemInputBackend
} from "../../types";

type TItemsList =
	TSupplementItemsSchema[typeof ENUM_FORM_SUPPLEMENT_ITEMS.ITEMS_LIST];

const createEmptyPerItemRow = (): ISupplementPerItemPriceRow => ({
	[ENUM_SUPPLEMENT_PRICE_ROW_FIELD.COST]: null,
	[ENUM_SUPPLEMENT_PRICE_ROW_FIELD.FEES]: null,
	[ENUM_SUPPLEMENT_PRICE_ROW_FIELD.CURRENCY]: undefined,
	[ENUM_SUPPLEMENT_PRICE_ROW_FIELD.MARKUP]: null
});

const alignPerItemPriceRows = (
	itemsListLength: number,
	existing: ISupplementPerItemPriceRow[] = []
): ISupplementPerItemPriceRow[] =>
	Array.from({ length: itemsListLength }, (_, index) => {
		if (existing[index]) {
			return existing[index];
		}
		return createEmptyPerItemRow();
	});

const applyMarkupToPerItemExpenses = (
	expenses: ISupplementPerItemExpenses,
	addMarginSeparately: boolean
): ISupplementPerItemExpenses => {
	if (addMarginSeparately) {
		return expenses;
	}

	return {
		...expenses,
		[ENUM_SUPPLEMENT_PER_ITEM_EXPENSES_FIELD.ITEMS]: expenses[
			ENUM_SUPPLEMENT_PER_ITEM_EXPENSES_FIELD.ITEMS
		].map((item) => ({
			...item,
			[ENUM_SUPPLEMENT_PRICE_ROW_FIELD.MARKUP]: null
		}))
	};
};

export const alignSupplementPerItemExpenses = (params: {
	itemsListLength: number;
	current?: TSupplementPricingSchema["expenses"];
	addMarginSeparately?: boolean;
}): ISupplementPerItemExpenses => {
	const existing =
		params.current?.typ === ENUM_SUPPLEMENT_PRICING_TYPE.PER_ITEM
			? params.current[ENUM_SUPPLEMENT_PER_ITEM_EXPENSES_FIELD.ITEMS]
			: [];

	const aligned: ISupplementPerItemExpenses = {
		typ: ENUM_SUPPLEMENT_PRICING_TYPE.PER_ITEM,
		[ENUM_SUPPLEMENT_PER_ITEM_EXPENSES_FIELD.ITEMS]: alignPerItemPriceRows(
			params.itemsListLength,
			existing
		)
	};

	if (params.addMarginSeparately === undefined) {
		return aligned;
	}

	return applyMarkupToPerItemExpenses(aligned, params.addMarginSeparately);
};

export const getDefaultSupplementPricing = (
	itemsList: TItemsList = []
): TSupplementPricingSchema => ({
	[ENUM_SUPPLEMENT_PRICING_FIELD.INVOICING]:
		ENUM_SUPPLEMENT_PRICING_INVOICING.INDIVIDUAL,
	[ENUM_SUPPLEMENT_PRICING_FIELD.PRICING_TYPE]:
		ENUM_SUPPLEMENT_PRICING_TYPE.FLAT_RATE,
	[ENUM_SUPPLEMENT_PRICING_FIELD.ADD_MARGIN_SEPARATELY]: false,
	[ENUM_SUPPLEMENT_PRICING_FIELD.EXPENSES]: alignSupplementPerItemExpenses({
		itemsListLength: itemsList.length
	}),
	[ENUM_SUPPLEMENT_PRICING_FIELD.MARKUP]: null,
	[ENUM_SUPPLEMENT_PRICING_FIELD.PACKAGE_TYPE]: ""
});

const mapMarkupFromBackend = (
	markup?: TCommissionMarkupBackend | null
): ISupplementPriceRowMarkup | null => {
	if (!markup) return null;
	if (markup.typ === "percentage") {
		return {
			typ: ENUM_SUPPLEMENT_MARKUP_TYP.PERCENTAGE,
			value: String((markup.percentage ?? 0) * 100)
		};
	}
	return {
		typ: ENUM_SUPPLEMENT_MARKUP_TYP.FIXED,
		value: String(markup.cost?.val ?? "")
	};
};

const mapMarkupToBackend = (
	markup: ISupplementPriceRowMarkup | null | undefined,
	currency: ENUM_CURRENCY_OPTIONS_TYPE | undefined
): TCommissionMarkupInputBackend | null => {
	if (!markup?.value?.trim()) return null;
	const num = Number(markup.value);
	if (!Number.isFinite(num)) return null;

	if (markup.typ === ENUM_SUPPLEMENT_MARKUP_TYP.PERCENTAGE) {
		return { typ: "percentage", percentage: num / 100 };
	}

	return {
		typ: "fixed",
		cost: {
			val: num,
			currency: currencyConverter.to(currency ?? DEFAULT_EVENT_CURRENCY)!
		}
	};
};

export const mapItemsFromBackend = (
	backendItems: TSupplementaryItemBackend[] | null | undefined
): TSupplementEditSchema["items"] => ({
	[ENUM_FORM_SUPPLEMENT_ITEMS.ITEMS_LIST]: (backendItems ?? []).map(
		(item) => ({
			[ENUM_FORM_SUPPLEMENT_ITEMS.NAME]: item.name ?? "",
			[ENUM_FORM_SUPPLEMENT_ITEMS.DESCRIPTION]: ""
		})
	)
});

export const mapPricingFromBackend = (
	backendItems: TSupplementaryItemBackend[] | null | undefined
): TSupplementPricingSchema => {
	const list = backendItems ?? [];
	const defaults = getDefaultSupplementPricing(
		list.map((item) => ({
			[ENUM_FORM_SUPPLEMENT_ITEMS.NAME]: item.name ?? "",
			[ENUM_FORM_SUPPLEMENT_ITEMS.DESCRIPTION]: ""
		}))
	);

	if (list.length === 0) {
		return defaults;
	}

	const first = list[0];
	const allSameExpenseTyp = list.every(
		(item) =>
			(item.expenses?.typ ?? "fixed") === (first.expenses?.typ ?? "fixed")
	);
	const allSameCost = list.every((item) => {
		const a = item.expenses;
		const b = first.expenses;
		if (!a || !b) return !a && !b;
		if (a.typ === "fixed" && b.typ === "fixed") {
			return (
				a.cost?.val === b.cost?.val &&
				a.cost?.currency === b.cost?.currency &&
				a.fees?.cost?.val === b.fees?.cost?.val
			);
		}
		if (a.typ === "per_person" && b.typ === "per_person") {
			return (
				a.cost_per_person?.val === b.cost_per_person?.val &&
				a.cost_per_person?.currency === b.cost_per_person?.currency &&
				a.fees?.cost?.val === b.fees?.cost?.val
			);
		}
		return false;
	});

	if (allSameExpenseTyp && allSameCost && first.expenses) {
		if (first.expenses.typ === "per_person") {
			const markup = mapMarkupFromBackend(first.expenses.markup);
			return {
				...defaults,
				[ENUM_SUPPLEMENT_PRICING_FIELD.PRICING_TYPE]:
					ENUM_SUPPLEMENT_PRICING_TYPE.PER_PERSON,
				[ENUM_SUPPLEMENT_PRICING_FIELD.TOTAL_PRICE]:
					first.expenses.cost_per_person?.val ?? null,
				[ENUM_SUPPLEMENT_PRICING_FIELD.TAXES]:
					first.expenses.fees?.cost?.val ?? null,
				[ENUM_SUPPLEMENT_PRICING_FIELD.CURRENCY]:
					currencyConverter.from(
						first.expenses.cost_per_person?.currency
					),
				[ENUM_SUPPLEMENT_PRICING_FIELD.ADD_MARGIN_SEPARATELY]: Boolean(
					markup?.value
				),
				[ENUM_SUPPLEMENT_PRICING_FIELD.MARKUP]: markup
			};
		}

		const markup = mapMarkupFromBackend(first.expenses.markup);
		return {
			...defaults,
			[ENUM_SUPPLEMENT_PRICING_FIELD.PRICING_TYPE]:
				ENUM_SUPPLEMENT_PRICING_TYPE.FLAT_RATE,
			[ENUM_SUPPLEMENT_PRICING_FIELD.TOTAL_PRICE]:
				first.expenses.cost?.val ?? null,
			[ENUM_SUPPLEMENT_PRICING_FIELD.TAXES]:
				first.expenses.fees?.cost?.val ?? null,
			[ENUM_SUPPLEMENT_PRICING_FIELD.CURRENCY]: currencyConverter.from(
				first.expenses.cost?.currency
			),
			[ENUM_SUPPLEMENT_PRICING_FIELD.ADD_MARGIN_SEPARATELY]: Boolean(
				markup?.value
			),
			[ENUM_SUPPLEMENT_PRICING_FIELD.MARKUP]: markup
		};
	}

	const rows: ISupplementPerItemPriceRow[] = list.map((item) => {
		const expenses = item.expenses;
		const cost =
			expenses?.typ === "per_person"
				? (expenses.cost_per_person?.val ?? null)
				: (expenses?.cost?.val ?? null);
		const currency =
			expenses?.typ === "per_person"
				? currencyConverter.from(expenses.cost_per_person?.currency)
				: currencyConverter.from(expenses?.cost?.currency);

		return {
			[ENUM_SUPPLEMENT_PRICE_ROW_FIELD.COST]: cost,
			[ENUM_SUPPLEMENT_PRICE_ROW_FIELD.FEES]:
				expenses?.fees?.cost?.val ?? null,
			[ENUM_SUPPLEMENT_PRICE_ROW_FIELD.CURRENCY]: currency,
			[ENUM_SUPPLEMENT_PRICE_ROW_FIELD.MARKUP]: mapMarkupFromBackend(
				expenses?.markup
			)
		};
	});

	return {
		...defaults,
		[ENUM_SUPPLEMENT_PRICING_FIELD.PRICING_TYPE]:
			ENUM_SUPPLEMENT_PRICING_TYPE.PER_ITEM,
		[ENUM_SUPPLEMENT_PRICING_FIELD.ADD_MARGIN_SEPARATELY]: rows.some(
			(row) => row.markup != null
		),
		[ENUM_SUPPLEMENT_PRICING_FIELD.EXPENSES]: {
			typ: ENUM_SUPPLEMENT_PRICING_TYPE.PER_ITEM,
			[ENUM_SUPPLEMENT_PER_ITEM_EXPENSES_FIELD.ITEMS]: rows
		}
	};
};

export const mapItemsAndPricingToBackend = (
	items: TItemsList | undefined,
	pricing: TSupplementPricingSchema | undefined
): TSupplementaryItemInputBackend[] => {
	const list = items ?? [];
	if (!pricing) {
		return list.map((item) => ({
			name: item[ENUM_FORM_SUPPLEMENT_ITEMS.NAME] || null,
			expenses: null
		}));
	}

	const pricingType = pricing[ENUM_SUPPLEMENT_PRICING_FIELD.PRICING_TYPE];
	const currency =
		pricing[ENUM_SUPPLEMENT_PRICING_FIELD.CURRENCY] ??
		DEFAULT_EVENT_CURRENCY;
	const total = pricing[ENUM_SUPPLEMENT_PRICING_FIELD.TOTAL_PRICE];
	const taxes = pricing[ENUM_SUPPLEMENT_PRICING_FIELD.TAXES];
	const rootFees =
		taxes != null
			? {
					typ: "fixed" as const,
					cost: {
						val: taxes,
						currency: currencyConverter.to(currency)!
					}
				}
			: null;
	const rootMarkup = pricing[
		ENUM_SUPPLEMENT_PRICING_FIELD.ADD_MARGIN_SEPARATELY
	]
		? mapMarkupToBackend(
				pricing[ENUM_SUPPLEMENT_PRICING_FIELD.MARKUP],
				currency
			)
		: null;

	if (pricingType === ENUM_SUPPLEMENT_PRICING_TYPE.FLAT_RATE) {
		return list.map((item) => ({
			name: item[ENUM_FORM_SUPPLEMENT_ITEMS.NAME] || null,
			expenses:
				total != null
					? {
							typ: "fixed" as const,
							cost: {
								val: total,
								currency: currencyConverter.to(currency)!
							},
							fees: rootFees,
							markup: rootMarkup
						}
					: null
		}));
	}

	if (pricingType === ENUM_SUPPLEMENT_PRICING_TYPE.PER_PERSON) {
		return list.map((item) => ({
			name: item[ENUM_FORM_SUPPLEMENT_ITEMS.NAME] || null,
			expenses:
				total != null
					? {
							typ: "per_person" as const,
							cost_per_person: {
								val: total,
								currency: currencyConverter.to(currency)!
							},
							fees: rootFees,
							markup: rootMarkup
						}
					: null
		}));
	}

	const rows =
		alignSupplementPerItemExpenses({
			itemsListLength: list.length,
			current: pricing[ENUM_SUPPLEMENT_PRICING_FIELD.EXPENSES],
			addMarginSeparately:
				pricing[ENUM_SUPPLEMENT_PRICING_FIELD.ADD_MARGIN_SEPARATELY]
		})[ENUM_SUPPLEMENT_PER_ITEM_EXPENSES_FIELD.ITEMS] ?? [];

	return list.map((item, index) => {
		const row = rows[index] ?? createEmptyPerItemRow();
		const rowCurrency =
			row[ENUM_SUPPLEMENT_PRICE_ROW_FIELD.CURRENCY] ??
			DEFAULT_EVENT_CURRENCY;
		const cost = row[ENUM_SUPPLEMENT_PRICE_ROW_FIELD.COST];
		const fees = row[ENUM_SUPPLEMENT_PRICE_ROW_FIELD.FEES];
		const markup = mapMarkupToBackend(
			row[ENUM_SUPPLEMENT_PRICE_ROW_FIELD.MARKUP],
			rowCurrency
		);

		return {
			name: item[ENUM_FORM_SUPPLEMENT_ITEMS.NAME] || null,
			expenses:
				cost != null
					? {
							typ: "fixed" as const,
							cost: {
								val: cost,
								currency: currencyConverter.to(rowCurrency)!
							},
							fees:
								fees != null
									? {
											typ: "fixed" as const,
											cost: {
												val: fees,
												currency:
													currencyConverter.to(
														rowCurrency
													)!
											}
										}
									: null,
							markup
						}
					: null
		};
	});
};

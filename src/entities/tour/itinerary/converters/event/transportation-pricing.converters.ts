import type {
	FixedExpenseInput,
	FixedExpenseOutput,
	PerCarCategoryExpenseOutput,
	PerCarExpenseOutput,
	TransferCarCategoriesVariantOutput,
	TransferCarPackageCategorySchemaOutput,
	TransferCarVariantOutput,
	TransferDetailsSchemaOutput
} from "@/shared/api";
import { Currency } from "@/shared/api";

import {
	ENUM_TRANSPORTATION_CATEGORY_ROW_FIELD,
	ENUM_TRANSPORTATION_EXPENSE_TYP,
	ENUM_TRANSPORTATION_MARKUP_TYP,
	ENUM_TRANSPORTATION_PER_CAR_EXPENSES_FIELD,
	ENUM_TRANSPORTATION_PRICE_ROW_FIELD,
	ENUM_TRANSPORTATION_PRICING_FIELD,
	ENUM_TRANSPORTATION_PRICING_INVOICING,
	ENUM_TRANSPORTATION_PRICING_TYPE,
	type ITransportationCategoryPriceRow,
	type ITransportationPerCarByClassPriceRow,
	type ITransportationPerCarCategoryExpenses,
	type ITransportationPerCarExpenses,
	type ITransportationPerCarPriceRow,
	type ITransportationPriceRowMarkup,
	type TTransportationPricingSchema
} from "../../types";
import { ENUM_FORM_CARS, type TCarsSchema } from "../../types";

import { vehicleBodyTypeConverter } from "./vehicle-body-type.converters";

type TCarsList = TCarsSchema[typeof ENUM_FORM_CARS.CARS_LIST];

type TTransferDetailsWithFees = TransferDetailsSchemaOutput & {
	fees?: FixedExpenseOutput | null;
};

const createEmptyPerCarPriceRow = (): ITransportationPerCarPriceRow => ({
	[ENUM_TRANSPORTATION_PRICE_ROW_FIELD.COST]: null,
	[ENUM_TRANSPORTATION_PRICE_ROW_FIELD.FEES]: null,
	[ENUM_TRANSPORTATION_PRICE_ROW_FIELD.CURRENCY]: "",
	[ENUM_TRANSPORTATION_PRICE_ROW_FIELD.MARKUP]: null
});

const createEmptyCategoryRow = (): ITransportationCategoryPriceRow => ({
	[ENUM_TRANSPORTATION_CATEGORY_ROW_FIELD.NAME]: "",
	[ENUM_TRANSPORTATION_CATEGORY_ROW_FIELD.COST]: null,
	[ENUM_TRANSPORTATION_CATEGORY_ROW_FIELD.FEES]: null,
	[ENUM_TRANSPORTATION_CATEGORY_ROW_FIELD.CURRENCY]: "",
	[ENUM_TRANSPORTATION_CATEGORY_ROW_FIELD.MARKUP]: null
});

const createEmptyPerCarByClassPriceRow =
	(): ITransportationPerCarByClassPriceRow => ({
		[ENUM_TRANSPORTATION_PER_CAR_EXPENSES_FIELD.CATEGORIES]: [
			createEmptyCategoryRow()
		]
	});

const mapPriceRowFromFixedExpenses = (
	expenses?: FixedExpenseOutput | null,
	fees?: FixedExpenseOutput | null
): Pick<
	ITransportationPerCarPriceRow,
	| typeof ENUM_TRANSPORTATION_PRICE_ROW_FIELD.COST
	| typeof ENUM_TRANSPORTATION_PRICE_ROW_FIELD.FEES
	| typeof ENUM_TRANSPORTATION_PRICE_ROW_FIELD.CURRENCY
> => ({
	[ENUM_TRANSPORTATION_PRICE_ROW_FIELD.COST]: expenses?.cost?.val ?? null,
	[ENUM_TRANSPORTATION_PRICE_ROW_FIELD.FEES]: fees?.cost?.val ?? null,
	[ENUM_TRANSPORTATION_PRICE_ROW_FIELD.CURRENCY]:
		expenses?.cost?.currency ?? fees?.cost?.currency ?? ""
});

const mapMarkupFromBackend = (
	markup?: TransferCarVariantOutput["markup"]
): ITransportationPriceRowMarkup | null => {
	if (!markup) return null;
	if (markup.typ === "percentage") {
		return {
			typ: ENUM_TRANSPORTATION_MARKUP_TYP.PERCENTAGE,
			value: String((markup.percentage ?? 0) * 100)
		};
	}
	return {
		typ: ENUM_TRANSPORTATION_MARKUP_TYP.FIXED,
		value: String(markup.cost?.val ?? "")
	};
};

const mapPerCarPriceFromBackend = (
	car: TransferCarVariantOutput
): ITransportationPerCarPriceRow => ({
	...mapPriceRowFromFixedExpenses(car.expenses, car.fees),
	[ENUM_TRANSPORTATION_PRICE_ROW_FIELD.MARKUP]: mapMarkupFromBackend(
		car.markup
	)
});

const mapCategoryRowFromBackend = (
	category: TransferCarPackageCategorySchemaOutput
): ITransportationCategoryPriceRow => ({
	[ENUM_TRANSPORTATION_CATEGORY_ROW_FIELD.NAME]: category.name ?? "",
	...mapPriceRowFromFixedExpenses(category.expenses, category.fees),
	[ENUM_TRANSPORTATION_CATEGORY_ROW_FIELD.MARKUP]: mapMarkupFromBackend(
		category.markup
	)
});

const mapPerCarByClassPriceFromBackend = (
	car: TransferCarCategoriesVariantOutput
): ITransportationPerCarByClassPriceRow => ({
	[ENUM_TRANSPORTATION_PER_CAR_EXPENSES_FIELD.CATEGORIES]: car?.categories
		?.length
		? car.categories.map(mapCategoryRowFromBackend)
		: [createEmptyCategoryRow()]
});

const alignPerCarPriceRows = (
	carsListLength: number,
	existing: ITransportationPerCarPriceRow[] = [],
	apiRows?: TransferCarVariantOutput[] | null
): ITransportationPerCarPriceRow[] =>
	Array.from({ length: carsListLength }, (_, index) => {
		if (existing[index]) {
			return existing[index];
		}
		if (apiRows?.[index]) {
			return mapPerCarPriceFromBackend(apiRows[index]);
		}
		return createEmptyPerCarPriceRow();
	});

const alignPerCarByClassPriceRows = (
	carsListLength: number,
	existing: ITransportationPerCarByClassPriceRow[] = [],
	apiRows?: TransferCarCategoriesVariantOutput[] | null
): ITransportationPerCarByClassPriceRow[] =>
	Array.from({ length: carsListLength }, (_, index) => {
		const row = existing[index];
		if (row) {
			return row;
		}
		if (apiRows?.[index]) {
			return mapPerCarByClassPriceFromBackend(apiRows[index]);
		}
		return createEmptyPerCarByClassPriceRow();
	});

const mapAmountToFixed = (
	amount: number | null,
	currency: string
): FixedExpenseInput | undefined => {
	if (amount == null || !Number.isFinite(amount) || !amount || !currency) {
		return undefined;
	}
	return {
		typ: "fixed",
		cost: {
			val: amount,
			currency: currency as Currency
		}
	};
};

const mapMarkupToBackend = (
	markup: ITransportationPriceRowMarkup | null,
	rowCurrency: string,
	addMarginSeparately: boolean
): TransferCarVariantOutput["markup"] => {
	if (!addMarginSeparately || !markup?.value) return null;
	if (markup.typ === ENUM_TRANSPORTATION_MARKUP_TYP.PERCENTAGE) {
		return {
			typ: "percentage",
			percentage: Number(markup.value) / 100
		};
	}
	if (!rowCurrency) return null;
	return {
		typ: "fixed",
		cost: {
			val: Number(markup.value),
			currency: rowCurrency as Currency
		}
	};
};

const applyMarkupToPerCarExpenses = (
	expenses:
		| ITransportationPerCarExpenses
		| ITransportationPerCarCategoryExpenses,
	addMarginSeparately: boolean
): ITransportationPerCarExpenses | ITransportationPerCarCategoryExpenses => {
	if (!addMarginSeparately) {
		if (expenses.typ === ENUM_TRANSPORTATION_EXPENSE_TYP.PER_CAR) {
			return {
				...expenses,
				[ENUM_TRANSPORTATION_PER_CAR_EXPENSES_FIELD.CARS]: expenses[
					ENUM_TRANSPORTATION_PER_CAR_EXPENSES_FIELD.CARS
				].map((car) => ({
					...car,
					[ENUM_TRANSPORTATION_PRICE_ROW_FIELD.MARKUP]: null
				}))
			};
		}

		return {
			...expenses,
			[ENUM_TRANSPORTATION_PER_CAR_EXPENSES_FIELD.CARS]: expenses[
				ENUM_TRANSPORTATION_PER_CAR_EXPENSES_FIELD.CARS
			].map((car) => ({
				...car,
				[ENUM_TRANSPORTATION_PER_CAR_EXPENSES_FIELD.CATEGORIES]: car[
					ENUM_TRANSPORTATION_PER_CAR_EXPENSES_FIELD.CATEGORIES
				].map((category) => ({
					...category,
					[ENUM_TRANSPORTATION_CATEGORY_ROW_FIELD.MARKUP]: null
				}))
			}))
		};
	}

	return expenses;
};

const hasAnyMarkup = (
	rows: {
		[ENUM_TRANSPORTATION_PRICE_ROW_FIELD.MARKUP]: ITransportationPriceRowMarkup | null;
	}[]
) => rows.some((row) => row[ENUM_TRANSPORTATION_PRICE_ROW_FIELD.MARKUP]?.value);

export const alignTransportationPerCarExpenses = (options: {
	priceBasedOnClass: boolean;
	carsListLength: number;
	current?: TTransportationPricingSchema["expenses"] | null;
	addMarginSeparately?: boolean;
}): ITransportationPerCarExpenses | ITransportationPerCarCategoryExpenses => {
	const { priceBasedOnClass, carsListLength, current, addMarginSeparately } =
		options;

	let aligned:
		| ITransportationPerCarExpenses
		| ITransportationPerCarCategoryExpenses;

	if (priceBasedOnClass) {
		const existing =
			current?.typ === ENUM_TRANSPORTATION_EXPENSE_TYP.PER_CAR_CATEGORY
				? current[ENUM_TRANSPORTATION_PER_CAR_EXPENSES_FIELD.CARS]
				: [];

		aligned = {
			typ: ENUM_TRANSPORTATION_EXPENSE_TYP.PER_CAR_CATEGORY,
			[ENUM_TRANSPORTATION_PER_CAR_EXPENSES_FIELD.CARS]:
				alignPerCarByClassPriceRows(carsListLength, existing)
		};
	} else {
		const existing =
			current?.typ === ENUM_TRANSPORTATION_EXPENSE_TYP.PER_CAR
				? current[ENUM_TRANSPORTATION_PER_CAR_EXPENSES_FIELD.CARS]
				: [];

		aligned = {
			typ: ENUM_TRANSPORTATION_EXPENSE_TYP.PER_CAR,
			[ENUM_TRANSPORTATION_PER_CAR_EXPENSES_FIELD.CARS]:
				alignPerCarPriceRows(carsListLength, existing)
		};
	}

	if (addMarginSeparately === undefined) {
		return aligned;
	}

	return applyMarkupToPerCarExpenses(aligned, addMarginSeparately);
};

export const getDefaultTransportationPricing = (
	carsList: TCarsList = []
): TTransportationPricingSchema => ({
	invoicing: ENUM_TRANSPORTATION_PRICING_INVOICING.INDIVIDUAL,
	pricing_type: ENUM_TRANSPORTATION_PRICING_TYPE.FLAT_RATE,
	price_based_on_class: false,
	add_margin_separately: false,
	expenses: alignTransportationPerCarExpenses({
		priceBasedOnClass: false,
		carsListLength: carsList.length
	}),
	package_type: ""
});

export const mapTransportationPricingFromBackend = (
	details?: TransferDetailsSchemaOutput | null,
	carsList: TCarsList = []
): TTransportationPricingSchema => {
	const detailsWithFees = details as
		| TTransferDetailsWithFees
		| null
		| undefined;
	const expenses = detailsWithFees?.expenses;
	const feesVal = detailsWithFees?.fees?.cost?.val ?? null;
	const defaults = getDefaultTransportationPricing(carsList);

	if (!expenses) {
		return defaults;
	}

	if (expenses.typ === "per_car") {
		const perCar = expenses as PerCarExpenseOutput;
		const cars = alignPerCarPriceRows(carsList.length, [], perCar.cars);
		return {
			...defaults,
			pricing_type: ENUM_TRANSPORTATION_PRICING_TYPE.PER_CAR,
			price_based_on_class: false,
			add_margin_separately: hasAnyMarkup(cars),
			expenses: {
				typ: ENUM_TRANSPORTATION_EXPENSE_TYP.PER_CAR,
				[ENUM_TRANSPORTATION_PER_CAR_EXPENSES_FIELD.CARS]: cars
			}
		};
	}

	if (expenses.typ === "per_car_category") {
		const perCarCategory = expenses as PerCarCategoryExpenseOutput;
		const cars = alignPerCarByClassPriceRows(
			carsList.length,
			[],
			perCarCategory.cars
		);
		const categories = cars.flatMap(
			(car) => car[ENUM_TRANSPORTATION_PER_CAR_EXPENSES_FIELD.CATEGORIES]
		);
		return {
			...defaults,
			pricing_type: ENUM_TRANSPORTATION_PRICING_TYPE.PER_CAR,
			price_based_on_class: true,
			add_margin_separately: hasAnyMarkup(categories),
			expenses: {
				typ: ENUM_TRANSPORTATION_EXPENSE_TYP.PER_CAR_CATEGORY,
				[ENUM_TRANSPORTATION_PER_CAR_EXPENSES_FIELD.CARS]: cars
			}
		};
	}

	if (expenses.typ === "fixed") {
		return {
			...defaults,
			pricing_type: ENUM_TRANSPORTATION_PRICING_TYPE.FLAT_RATE,
			...(expenses.cost?.val != null && {
				total_price: expenses.cost.val
			}),
			...(feesVal != null && { taxes: feesVal }),
			...(expenses.cost?.currency && {
				currency: expenses.cost.currency
			})
		};
	}

	return {
		...defaults,
		pricing_type: ENUM_TRANSPORTATION_PRICING_TYPE.PER_PERSON,
		...(expenses.cost_per_person?.val != null && {
			total_price: expenses.cost_per_person.val
		}),
		...(feesVal != null && { taxes: feesVal }),
		...(expenses.cost_per_person?.currency && {
			currency: expenses.cost_per_person.currency
		})
	};
};

export const mapTransportationPricingToBackend = (
	pricing?: TTransportationPricingSchema,
	carsList: TCarsList = []
): { details?: TTransferDetailsWithFees } => {
	if (
		!pricing ||
		pricing.invoicing !== ENUM_TRANSPORTATION_PRICING_INVOICING.INDIVIDUAL
	) {
		return {};
	}

	if (pricing.pricing_type === ENUM_TRANSPORTATION_PRICING_TYPE.PER_CAR) {
		const addMargin = pricing.add_margin_separately;
		const aligned = alignTransportationPerCarExpenses({
			priceBasedOnClass: pricing.price_based_on_class,
			carsListLength: carsList.length,
			current: pricing.expenses
		});

		if (pricing.price_based_on_class) {
			const cars =
				aligned.typ === ENUM_TRANSPORTATION_EXPENSE_TYP.PER_CAR_CATEGORY
					? aligned[ENUM_TRANSPORTATION_PER_CAR_EXPENSES_FIELD.CARS]
					: [];

			return {
				details: {
					expenses: {
						typ: "per_car_category",
						cars: carsList.map((car, index) => ({
							typ:
								vehicleBodyTypeConverter.to(car.car_name) ??
								null,
							pax: car.pax,
							description: car.description || null,
							categories: (
								cars[index]?.[
									ENUM_TRANSPORTATION_PER_CAR_EXPENSES_FIELD
										.CATEGORIES
								] ?? []
							).map((category) => {
								const rowCurrency =
									category[
										ENUM_TRANSPORTATION_CATEGORY_ROW_FIELD
											.CURRENCY
									];
								return {
									name: category[
										ENUM_TRANSPORTATION_CATEGORY_ROW_FIELD
											.NAME
									],
									expenses: mapAmountToFixed(
										category[
											ENUM_TRANSPORTATION_CATEGORY_ROW_FIELD
												.COST
										],
										rowCurrency
									),
									fees: mapAmountToFixed(
										category[
											ENUM_TRANSPORTATION_CATEGORY_ROW_FIELD
												.FEES
										],
										rowCurrency
									),
									markup: mapMarkupToBackend(
										category[
											ENUM_TRANSPORTATION_CATEGORY_ROW_FIELD
												.MARKUP
										],
										rowCurrency,
										addMargin
									)
								};
							})
						}))
					}
				}
			};
		}

		const cars =
			aligned.typ === ENUM_TRANSPORTATION_EXPENSE_TYP.PER_CAR
				? aligned[ENUM_TRANSPORTATION_PER_CAR_EXPENSES_FIELD.CARS]
				: [];

		return {
			details: {
				expenses: {
					typ: "per_car",
					cars: carsList.map((car, index) => {
						const priceRow =
							cars[index] ?? createEmptyPerCarPriceRow();
						const rowCurrency =
							priceRow[
								ENUM_TRANSPORTATION_PRICE_ROW_FIELD.CURRENCY
							];
						return {
							typ:
								vehicleBodyTypeConverter.to(car.car_name) ??
								null,
							pax: car.pax,
							description: car.description || null,
							expenses: mapAmountToFixed(
								priceRow[
									ENUM_TRANSPORTATION_PRICE_ROW_FIELD.COST
								],
								rowCurrency
							),
							fees: mapAmountToFixed(
								priceRow[
									ENUM_TRANSPORTATION_PRICE_ROW_FIELD.FEES
								],
								rowCurrency
							),
							markup: mapMarkupToBackend(
								priceRow[
									ENUM_TRANSPORTATION_PRICE_ROW_FIELD.MARKUP
								],
								rowCurrency,
								addMargin
							)
						};
					})
				}
			}
		};
	}

	const totalPrice = pricing[ENUM_TRANSPORTATION_PRICING_FIELD.TOTAL_PRICE];
	const currency = pricing[ENUM_TRANSPORTATION_PRICING_FIELD.CURRENCY];
	const taxes = pricing[ENUM_TRANSPORTATION_PRICING_FIELD.TAXES];

	if (totalPrice == null || !currency) {
		return {};
	}

	const cost = {
		val: totalPrice,
		currency: currency as Currency
	};
	const fees =
		taxes != null && currency
			? {
					typ: "fixed" as const,
					cost: { val: taxes, currency: currency as Currency }
				}
			: undefined;

	if (pricing.pricing_type === ENUM_TRANSPORTATION_PRICING_TYPE.FLAT_RATE) {
		return {
			details: {
				expenses: { typ: "fixed", cost },
				...(fees && { fees })
			}
		};
	}

	return {
		details: {
			expenses: { typ: "per_person", cost_per_person: cost },
			...(fees && { fees })
		}
	};
};

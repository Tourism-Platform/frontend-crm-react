import { Currency } from "@/shared/api";

import {
	ENUM_FORM_CARS,
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
	type TCarsSchema,
	type TCommissionMarkupBackend,
	type TCommissionMarkupInputBackend,
	type TFixedChargeBackend,
	type TFixedChargeInputBackend,
	type TFixedExpenseInputBackend,
	type TPerCarCategoryExpenseBackend,
	type TPerCarExpenseBackend,
	type TTransferCarCategoriesVariantBackend,
	type TTransferCarPackageCategoryBackend,
	type TTransferCarVariantBackend,
	type TTransferDetailsBackend,
	type TTransportationPricingSchema
} from "../../types";

import { vehicleBodyTypeConverter } from "./vehicle-body-type.converters";

type TCarsList = TCarsSchema[typeof ENUM_FORM_CARS.CARS_LIST];

const createEmptyPerCarPriceRow = (): ITransportationPerCarPriceRow => ({
	[ENUM_TRANSPORTATION_PRICE_ROW_FIELD.COST]: null,
	[ENUM_TRANSPORTATION_PRICE_ROW_FIELD.FEES]: null,
	[ENUM_TRANSPORTATION_PRICE_ROW_FIELD.CURRENCY]: Currency.USD,
	[ENUM_TRANSPORTATION_PRICE_ROW_FIELD.MARKUP]: null
});

const createEmptyCategoryRow = (): ITransportationCategoryPriceRow => ({
	[ENUM_TRANSPORTATION_CATEGORY_ROW_FIELD.NAME]: "",
	[ENUM_TRANSPORTATION_CATEGORY_ROW_FIELD.COST]: null,
	[ENUM_TRANSPORTATION_CATEGORY_ROW_FIELD.FEES]: null,
	[ENUM_TRANSPORTATION_CATEGORY_ROW_FIELD.CURRENCY]: Currency.USD,
	[ENUM_TRANSPORTATION_CATEGORY_ROW_FIELD.MARKUP]: null
});

const createEmptyPerCarByClassPriceRow =
	(): ITransportationPerCarByClassPriceRow => ({
		[ENUM_TRANSPORTATION_PER_CAR_EXPENSES_FIELD.CATEGORIES]: [
			createEmptyCategoryRow()
		]
	});

const mapPriceRowFromFixedCharge = (
	charge?: TFixedChargeBackend | null
): Pick<
	ITransportationPerCarPriceRow,
	| typeof ENUM_TRANSPORTATION_PRICE_ROW_FIELD.COST
	| typeof ENUM_TRANSPORTATION_PRICE_ROW_FIELD.FEES
	| typeof ENUM_TRANSPORTATION_PRICE_ROW_FIELD.CURRENCY
> => ({
	[ENUM_TRANSPORTATION_PRICE_ROW_FIELD.COST]: charge?.cost?.val ?? null,
	[ENUM_TRANSPORTATION_PRICE_ROW_FIELD.FEES]: charge?.fees?.cost?.val ?? null,
	[ENUM_TRANSPORTATION_PRICE_ROW_FIELD.CURRENCY]:
		charge?.cost?.currency ?? charge?.fees?.cost?.currency ?? ""
});

const mapMarkupFromBackend = (
	markup?: TCommissionMarkupBackend | null
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
	car: TTransferCarVariantBackend
): ITransportationPerCarPriceRow => ({
	...mapPriceRowFromFixedCharge(car.expenses),
	[ENUM_TRANSPORTATION_PRICE_ROW_FIELD.MARKUP]: mapMarkupFromBackend(
		car.expenses?.markup
	)
});

const mapCategoryRowFromBackend = (
	category: TTransferCarPackageCategoryBackend
): ITransportationCategoryPriceRow => ({
	[ENUM_TRANSPORTATION_CATEGORY_ROW_FIELD.NAME]: category.name ?? "",
	...mapPriceRowFromFixedCharge(category.expenses),
	[ENUM_TRANSPORTATION_CATEGORY_ROW_FIELD.MARKUP]: mapMarkupFromBackend(
		category.expenses?.markup
	)
});

const mapPerCarByClassPriceFromBackend = (
	car: TTransferCarCategoriesVariantBackend
): ITransportationPerCarByClassPriceRow => ({
	[ENUM_TRANSPORTATION_PER_CAR_EXPENSES_FIELD.CATEGORIES]: car?.categories
		?.length
		? car.categories.map(mapCategoryRowFromBackend)
		: [createEmptyCategoryRow()]
});

const alignPerCarPriceRows = (
	carsListLength: number,
	existing: ITransportationPerCarPriceRow[] = [],
	apiRows?: TTransferCarVariantBackend[] | null
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
	apiRows?: TTransferCarCategoriesVariantBackend[] | null
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

const mapAmountToFixedExpense = (
	amount: number | null,
	currency: string
): TFixedExpenseInputBackend | undefined => {
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
): TCommissionMarkupInputBackend | null => {
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

const mapToFixedCharge = (
	cost: number | null,
	fees: number | null,
	currency: string,
	markup: TCommissionMarkupInputBackend | null
): TFixedChargeInputBackend | undefined => {
	const costExpense = mapAmountToFixedExpense(cost, currency);
	if (!costExpense) return undefined;

	return {
		typ: "fixed",
		cost: costExpense.cost,
		fees: mapAmountToFixedExpense(fees, currency) ?? null,
		markup
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
	markup: null,
	package_type: ""
});

export const mapTransportationPricingFromBackend = (
	details?: TTransferDetailsBackend | null,
	carsList: TCarsList = []
): TTransportationPricingSchema => {
	const expenses = details?.expenses;
	const feesVal =
		expenses && (expenses.typ === "fixed" || expenses.typ === "per_person")
			? (expenses.fees?.cost?.val ?? null)
			: null;
	const defaults = getDefaultTransportationPricing(carsList);

	if (!expenses) {
		return defaults;
	}

	if (expenses.typ === "per_car") {
		const perCar = expenses as TPerCarExpenseBackend;
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
		const perCarCategory = expenses as TPerCarCategoryExpenseBackend;
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
		const markup = mapMarkupFromBackend(expenses.markup);
		return {
			...defaults,
			pricing_type: ENUM_TRANSPORTATION_PRICING_TYPE.FLAT_RATE,
			add_margin_separately: Boolean(markup?.value),
			[ENUM_TRANSPORTATION_PRICING_FIELD.MARKUP]: markup,
			...(expenses.cost?.val != null && {
				total_price: expenses.cost.val
			}),
			...(feesVal != null && { taxes: feesVal }),
			...(expenses.cost?.currency && {
				currency: expenses.cost.currency
			})
		};
	}

	const perPersonMarkup = mapMarkupFromBackend(expenses.markup);
	return {
		...defaults,
		pricing_type: ENUM_TRANSPORTATION_PRICING_TYPE.PER_PERSON,
		add_margin_separately: Boolean(perPersonMarkup?.value),
		[ENUM_TRANSPORTATION_PRICING_FIELD.MARKUP]: perPersonMarkup,
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
): { details?: Pick<TTransferDetailsBackend, "expenses"> } => {
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
									expenses: mapToFixedCharge(
										category[
											ENUM_TRANSPORTATION_CATEGORY_ROW_FIELD
												.COST
										],
										category[
											ENUM_TRANSPORTATION_CATEGORY_ROW_FIELD
												.FEES
										],
										rowCurrency,
										mapMarkupToBackend(
											category[
												ENUM_TRANSPORTATION_CATEGORY_ROW_FIELD
													.MARKUP
											],
											rowCurrency,
											addMargin
										)
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
							expenses: mapToFixedCharge(
								priceRow[
									ENUM_TRANSPORTATION_PRICE_ROW_FIELD.COST
								],
								priceRow[
									ENUM_TRANSPORTATION_PRICE_ROW_FIELD.FEES
								],
								rowCurrency,
								mapMarkupToBackend(
									priceRow[
										ENUM_TRANSPORTATION_PRICE_ROW_FIELD
											.MARKUP
									],
									rowCurrency,
									addMargin
								)
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
		taxes != null
			? {
					typ: "fixed" as const,
					cost: { val: taxes, currency: currency as Currency }
				}
			: null;
	const markup = mapMarkupToBackend(
		pricing[ENUM_TRANSPORTATION_PRICING_FIELD.MARKUP] ?? null,
		currency,
		pricing.add_margin_separately
	);

	if (pricing.pricing_type === ENUM_TRANSPORTATION_PRICING_TYPE.FLAT_RATE) {
		return {
			details: {
				expenses: { typ: "fixed", cost, fees, markup }
			}
		};
	}

	return {
		details: {
			expenses: { typ: "per_person", cost_per_person: cost, fees, markup }
		}
	};
};

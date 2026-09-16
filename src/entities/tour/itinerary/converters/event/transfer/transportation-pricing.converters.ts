import { Currency, VehicleBodyType } from "@/shared/api";

import {
	type ENUM_CURRENCY_OPTIONS_TYPE,
	currencyConverter
} from "@/entities/commission";

import {
	ENUM_TRANSPORTATION_CATEGORY_ROW_FIELD,
	ENUM_TRANSPORTATION_EXPENSE_TYP,
	ENUM_TRANSPORTATION_MARKUP_TYP,
	ENUM_TRANSPORTATION_PER_CAR_EXPENSES_FIELD,
	ENUM_TRANSPORTATION_PRICE_ROW_FIELD,
	ENUM_TRANSPORTATION_PRICING_FIELD,
	ENUM_TRANSPORTATION_PRICING_INVOICING,
	ENUM_TRANSPORTATION_PRICING_TYPE,
	type IFeeFormRow,
	type ITransportationCategoryPriceRow,
	type ITransportationPerCarByClassPriceRow,
	type ITransportationPerCarCategoryExpenses,
	type ITransportationPerCarExpenses,
	type ITransportationPerCarPriceRow,
	type ITransportationPriceRowMarkup,
	type TCarsList,
	type TCommissionMarkupBackend,
	type TCommissionMarkupInputBackend,
	type TFixedChargeBackend,
	type TFixedChargeInputBackend,
	type TTransferCarCategoriesVariantBackend,
	type TTransferCarPackageCategoryBackend,
	type TTransferCarVariantBackend,
	type TTransferDetailsBackend,
	type TTransferSpecInputBackend,
	type TTransportationPricingSchema
} from "../../../types";
import { getPoolMember } from "../event-pool.helpers";
import { mapFeesFromBackend, mapFeesToBackend } from "../fees.converters";
import { vehicleBodyTypeConverter } from "../vehicle-body-type.converters";
import { zeroFixedCharge } from "../zero-fixed-charge.helpers";

/**
 * The form lets a car row leave `pax` empty and its body type always maps
 * (the enum map is total), but `PricedCarInput` / `CategorisedCarInput` /
 * `Car` require both — contract gap bridged with documented defaults.
 */
const DEFAULT_CAR_BODY_TYPE = VehicleBodyType.Sedan;
const DEFAULT_CAR_PAX = 1;

const createEmptyPerCarPriceRow = (): ITransportationPerCarPriceRow => ({
	[ENUM_TRANSPORTATION_PRICE_ROW_FIELD.COST]: null,
	[ENUM_TRANSPORTATION_PRICE_ROW_FIELD.FEES]: [],
	[ENUM_TRANSPORTATION_PRICE_ROW_FIELD.CURRENCY]: undefined,
	[ENUM_TRANSPORTATION_PRICE_ROW_FIELD.MARKUP]: null
});

const createEmptyCategoryRow = (): ITransportationCategoryPriceRow => ({
	[ENUM_TRANSPORTATION_CATEGORY_ROW_FIELD.NAME]: "",
	[ENUM_TRANSPORTATION_CATEGORY_ROW_FIELD.COST]: null,
	[ENUM_TRANSPORTATION_CATEGORY_ROW_FIELD.FEES]: [],
	[ENUM_TRANSPORTATION_CATEGORY_ROW_FIELD.CURRENCY]: undefined,
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
	[ENUM_TRANSPORTATION_PRICE_ROW_FIELD.FEES]: mapFeesFromBackend(
		charge?.fees
	),
	[ENUM_TRANSPORTATION_PRICE_ROW_FIELD.CURRENCY]: currencyConverter.from(
		charge?.cost?.currency
	)
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
	...mapPriceRowFromFixedCharge(car.charge),
	[ENUM_TRANSPORTATION_PRICE_ROW_FIELD.MARKUP]: mapMarkupFromBackend(
		car.charge?.markup
	)
});

const mapCategoryRowFromBackend = (
	category: TTransferCarPackageCategoryBackend
): ITransportationCategoryPriceRow => ({
	[ENUM_TRANSPORTATION_CATEGORY_ROW_FIELD.NAME]: category.name ?? "",
	...mapPriceRowFromFixedCharge(category.charge),
	[ENUM_TRANSPORTATION_CATEGORY_ROW_FIELD.MARKUP]: mapMarkupFromBackend(
		category.charge?.markup
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
	currency: ENUM_CURRENCY_OPTIONS_TYPE | undefined
): { val: number; currency: Currency } | undefined => {
	if (amount == null || !Number.isFinite(amount) || !amount || !currency) {
		return undefined;
	}
	return {
		val: amount,
		currency: currencyConverter.to(currency) ?? Currency.USD
	};
};

const mapMarkupToBackend = (
	markup: ITransportationPriceRowMarkup | null,
	rowCurrency: ENUM_CURRENCY_OPTIONS_TYPE | undefined,
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
			currency: currencyConverter.to(rowCurrency) ?? Currency.USD
		}
	};
};

const mapToFixedCharge = (
	cost: number | null,
	fees: IFeeFormRow[],
	currency: ENUM_CURRENCY_OPTIONS_TYPE | undefined,
	markup: TCommissionMarkupInputBackend | null
): TFixedChargeInputBackend | undefined => {
	const costExpense = mapAmountToFixedExpense(cost, currency);
	if (!costExpense) return undefined;

	return {
		typ: "fixed",
		cost: costExpense,
		fees: mapFeesToBackend(fees),
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
	package_id: ""
});

/**
 * Pricing section of the form, read from the selected pool member spec:
 * - `{ pricing: "per_car" }` — one price row per car (`spec.cars[].charge`);
 * - `{ pricing: "per_car_category" }` — class rows per car
 *   (`spec.cars[].categories[].charge`);
 * - `{ pricing: "whole" }` — `spec.charge` maps to the flat-rate /
 *   per-person form rows.
 */
export const mapTransportationPricingFromBackend = (
	details?: TTransferDetailsBackend | null,
	carsList: TCarsList = [],
	supplyId?: string | null
): TTransportationPricingSchema => {
	const defaults = getDefaultTransportationPricing(carsList);
	const spec = getPoolMember(details, supplyId)?.spec;

	if (!spec) {
		return defaults;
	}

	if (spec.pricing === "per_car") {
		const cars = alignPerCarPriceRows(carsList.length, [], spec.cars);
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

	if (spec.pricing === "per_car_category") {
		const cars = alignPerCarByClassPriceRows(
			carsList.length,
			[],
			spec.cars
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

	const charge = spec.charge;

	if (charge.typ === "fixed") {
		const markup = mapMarkupFromBackend(charge.markup);
		return {
			...defaults,
			pricing_type: ENUM_TRANSPORTATION_PRICING_TYPE.FLAT_RATE,
			add_margin_separately: Boolean(markup?.value),
			[ENUM_TRANSPORTATION_PRICING_FIELD.MARKUP]: markup,
			...(charge.cost?.val != null && {
				total_price: charge.cost.val
			}),
			[ENUM_TRANSPORTATION_PRICING_FIELD.FEES]: mapFeesFromBackend(
				charge.fees
			),
			...(charge.cost?.currency && {
				currency: charge.cost.currency
			})
		};
	}

	const perPersonMarkup = mapMarkupFromBackend(charge.markup);
	return {
		...defaults,
		pricing_type: ENUM_TRANSPORTATION_PRICING_TYPE.PER_PERSON,
		add_margin_separately: Boolean(perPersonMarkup?.value),
		[ENUM_TRANSPORTATION_PRICING_FIELD.MARKUP]: perPersonMarkup,
		...(charge.cost_per_person?.val != null && {
			total_price: charge.cost_per_person.val
		}),
		[ENUM_TRANSPORTATION_PRICING_FIELD.FEES]: mapFeesFromBackend(
			charge.fees
		),
		...(charge.cost_per_person?.currency && {
			currency: charge.cost_per_person.currency
		})
	};
};

/**
 * Cars without a price of their own (part-of-package rides, or pricing
 * left untouched): a per-car-category spec whose cars state no categories
 * — the only 3.1 arm that carries cars with no charge at all.
 */
const mapCarsOnlySpec = (
	carsList: TCarsList
): TTransferSpecInputBackend | undefined =>
	carsList.length
		? {
				pricing: "per_car_category",
				cars: carsList.map((car) => ({
					body_type:
						vehicleBodyTypeConverter.to(car.car_name) ??
						DEFAULT_CAR_BODY_TYPE,
					pax: car.pax ?? DEFAULT_CAR_PAX,
					description: car.description || null
				}))
			}
		: undefined;

/**
 * Write-side transfer spec for `supply.inline.spec` (contract 3.1). When
 * no charge is constructible the cars are still stated (unpriced, on a
 * per-car-category arm) rather than dropped; with no cars either, no spec
 * is returned and the caller omits `supply` so the backend keeps the
 * current one.
 */
export const mapTransportationPricingToBackend = (
	pricing?: TTransportationPricingSchema,
	carsList: TCarsList = []
): { spec?: TTransferSpecInputBackend } => {
	if (
		!pricing ||
		pricing.invoicing !== ENUM_TRANSPORTATION_PRICING_INVOICING.INDIVIDUAL
	) {
		return { spec: mapCarsOnlySpec(carsList) };
	}

	if (pricing.pricing_type === ENUM_TRANSPORTATION_PRICING_TYPE.PER_CAR) {
		const addMargin = pricing.add_margin_separately;
		const aligned = alignTransportationPerCarExpenses({
			priceBasedOnClass: pricing.price_based_on_class,
			carsListLength: carsList.length,
			current: pricing.expenses
		});

		if (pricing.price_based_on_class) {
			const rows =
				aligned.typ === ENUM_TRANSPORTATION_EXPENSE_TYP.PER_CAR_CATEGORY
					? aligned[ENUM_TRANSPORTATION_PER_CAR_EXPENSES_FIELD.CARS]
					: [];

			return {
				spec: {
					pricing: "per_car_category",
					cars: carsList.map((car, index) => ({
						body_type:
							vehicleBodyTypeConverter.to(car.car_name) ??
							DEFAULT_CAR_BODY_TYPE,
						pax: car.pax ?? DEFAULT_CAR_PAX,
						description: car.description || null,
						categories: (
							rows[index]?.[
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
								name:
									category[
										ENUM_TRANSPORTATION_CATEGORY_ROW_FIELD
											.NAME
									] || null,
								charge:
									mapToFixedCharge(
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
									) ?? zeroFixedCharge(rowCurrency)
							};
						})
					}))
				}
			};
		}

		const rows =
			aligned.typ === ENUM_TRANSPORTATION_EXPENSE_TYP.PER_CAR
				? aligned[ENUM_TRANSPORTATION_PER_CAR_EXPENSES_FIELD.CARS]
				: [];

		return {
			spec: {
				pricing: "per_car",
				cars: carsList.map((car, index) => {
					const priceRow = rows[index] ?? createEmptyPerCarPriceRow();
					const rowCurrency =
						priceRow[ENUM_TRANSPORTATION_PRICE_ROW_FIELD.CURRENCY];
					return {
						body_type:
							vehicleBodyTypeConverter.to(car.car_name) ??
							DEFAULT_CAR_BODY_TYPE,
						pax: car.pax ?? DEFAULT_CAR_PAX,
						description: car.description || null,
						charge:
							mapToFixedCharge(
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
							) ?? zeroFixedCharge(rowCurrency)
					};
				})
			}
		};
	}

	const totalPrice = pricing[ENUM_TRANSPORTATION_PRICING_FIELD.TOTAL_PRICE];
	const currency = pricing[ENUM_TRANSPORTATION_PRICING_FIELD.CURRENCY];
	const fees = mapFeesToBackend(
		pricing[ENUM_TRANSPORTATION_PRICING_FIELD.FEES]
	);

	if (totalPrice == null || !currency) {
		return { spec: mapCarsOnlySpec(carsList) };
	}

	const cost = {
		val: totalPrice,
		currency: currencyConverter.to(currency) ?? Currency.USD
	};
	const markup = mapMarkupToBackend(
		pricing[ENUM_TRANSPORTATION_PRICING_FIELD.MARKUP] ?? null,
		currency,
		pricing.add_margin_separately
	);
	const cars = carsList.length
		? carsList.map((car) => ({
				body_type:
					vehicleBodyTypeConverter.to(car.car_name) ??
					DEFAULT_CAR_BODY_TYPE,
				pax: car.pax ?? DEFAULT_CAR_PAX,
				description: car.description || null
			}))
		: undefined;

	if (pricing.pricing_type === ENUM_TRANSPORTATION_PRICING_TYPE.FLAT_RATE) {
		return {
			spec: {
				pricing: "whole",
				charge: { typ: "fixed", cost, fees, markup },
				...(cars && { cars })
			}
		};
	}

	return {
		spec: {
			pricing: "whole",
			charge: { typ: "per_person", cost_per_person: cost, fees, markup },
			...(cars && { cars })
		}
	};
};

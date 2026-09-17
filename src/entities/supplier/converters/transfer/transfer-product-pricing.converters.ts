import { DEFAULT_EVENT_CURRENCY } from "@/entities/commission";

import {
	alignPerCarMatrixToFleet,
	mapPriceToCategoryRow
} from "../../lib/transfer-fleet-category.helpers";
import {
	ENUM_FORM_TRANSFER_CARS,
	ENUM_FORM_TRANSFER_SECTION,
	ENUM_SUPPLIER_TYPE,
	ENUM_SUPPLIER_VARIANT_CHARGE,
	ENUM_TRANSFER_PRICING,
	ENUM_TRANSFER_PRODUCT_CATEGORY_ROW_FIELD,
	ENUM_TRANSFER_PRODUCT_EXPENSE_TYP,
	ENUM_TRANSFER_PRODUCT_FLEET_CATEGORY_FIELD,
	ENUM_TRANSFER_PRODUCT_PER_CAR_EXPENSES_FIELD,
	ENUM_TRANSFER_PRODUCT_PRICE_ROW_FIELD,
	ENUM_TRANSFER_PRODUCT_PRICING_FIELD,
	ENUM_TRANSFER_PRODUCT_PRICING_TYPE,
	type ISupplierFixedCharge,
	type ITransferCarPriceWrite,
	type ITransferFleetCategory,
	type ITransferProduct,
	type ITransferProductCategoryPriceRow,
	type ITransferProductFleetCategoryRow,
	type ITransferProductPerCarByClassPriceRow,
	type ITransferProductPerCarCategoryExpenses,
	type ITransferProductPerCarExpenses,
	type ITransferProductPerCarPriceRow,
	type ITransferProductPriceRowMarkup,
	type ITransferVariant,
	type TSupplierVariantCharge,
	type TTransferPricingSwitchBackend,
	type TTransferProductDetailsBackend,
	type TTransferProductEditSchema,
	type TTransferProductPricingSchema
} from "../../types";
import {
	mapSupplierFixedChargeToBackend,
	mapSupplierVariantChargeToBackend
} from "../supplier-variant-charge.converters";

import {
	mapTransferMarkupFormToDomain,
	mapTransferMarkupToForm
} from "./transfer-variant-form.converters";

const createEmptyPerCarPriceRow = (): ITransferProductPerCarPriceRow => ({
	[ENUM_TRANSFER_PRODUCT_PRICE_ROW_FIELD.COST]: null,
	[ENUM_TRANSFER_PRODUCT_PRICE_ROW_FIELD.FEES]: [],
	[ENUM_TRANSFER_PRODUCT_PRICE_ROW_FIELD.CURRENCY]: DEFAULT_EVENT_CURRENCY,
	[ENUM_TRANSFER_PRODUCT_PRICE_ROW_FIELD.MARKUP]: null
});

export const createEmptyTransferProductCategoryRow =
	(): ITransferProductCategoryPriceRow => ({
		[ENUM_TRANSFER_PRODUCT_CATEGORY_ROW_FIELD.CATEGORY_ID]: "",
		[ENUM_TRANSFER_PRODUCT_CATEGORY_ROW_FIELD.PRICE_ID]: undefined,
		[ENUM_TRANSFER_PRODUCT_CATEGORY_ROW_FIELD.NAME]: "",
		[ENUM_TRANSFER_PRODUCT_CATEGORY_ROW_FIELD.COST]: null,
		[ENUM_TRANSFER_PRODUCT_CATEGORY_ROW_FIELD.FEES]: [],
		[ENUM_TRANSFER_PRODUCT_CATEGORY_ROW_FIELD.CURRENCY]:
			DEFAULT_EVENT_CURRENCY,
		[ENUM_TRANSFER_PRODUCT_CATEGORY_ROW_FIELD.MARKUP]: null
	});

const createEmptyFleetCategoryRow = (): ITransferProductFleetCategoryRow => ({
	[ENUM_TRANSFER_PRODUCT_FLEET_CATEGORY_FIELD.ID]: undefined,
	[ENUM_TRANSFER_PRODUCT_FLEET_CATEGORY_FIELD.NAME]: ""
});

const createEmptyPerCarByClassPriceRow = (
	fleetCategories: readonly ITransferFleetCategory[]
): ITransferProductPerCarByClassPriceRow =>
	alignPerCarMatrixToFleet(1, fleetCategories)[0] ?? {
		[ENUM_TRANSFER_PRODUCT_PER_CAR_EXPENSES_FIELD.CATEGORIES]: [
			createEmptyTransferProductCategoryRow()
		]
	};

const applyMarkupToPerCarExpenses = (
	expenses:
		| ITransferProductPerCarExpenses
		| ITransferProductPerCarCategoryExpenses,
	addMarginSeparately: boolean
): ITransferProductPerCarExpenses | ITransferProductPerCarCategoryExpenses => {
	if (addMarginSeparately) {
		return expenses;
	}

	if (expenses.typ === ENUM_TRANSFER_PRODUCT_EXPENSE_TYP.PER_CAR) {
		return {
			...expenses,
			[ENUM_TRANSFER_PRODUCT_PER_CAR_EXPENSES_FIELD.CARS]: expenses[
				ENUM_TRANSFER_PRODUCT_PER_CAR_EXPENSES_FIELD.CARS
			].map((car) => ({
				...car,
				[ENUM_TRANSFER_PRODUCT_PRICE_ROW_FIELD.MARKUP]: null
			}))
		};
	}

	return {
		...expenses,
		[ENUM_TRANSFER_PRODUCT_PER_CAR_EXPENSES_FIELD.CARS]: expenses[
			ENUM_TRANSFER_PRODUCT_PER_CAR_EXPENSES_FIELD.CARS
		].map((car) => ({
			...car,
			[ENUM_TRANSFER_PRODUCT_PER_CAR_EXPENSES_FIELD.CATEGORIES]: car[
				ENUM_TRANSFER_PRODUCT_PER_CAR_EXPENSES_FIELD.CATEGORIES
			].map((category) => ({
				...category,
				[ENUM_TRANSFER_PRODUCT_CATEGORY_ROW_FIELD.MARKUP]: null
			}))
		}))
	};
};

const alignPerCarPriceRows = (
	carsListLength: number,
	existing: ITransferProductPerCarPriceRow[] = []
): ITransferProductPerCarPriceRow[] =>
	Array.from({ length: carsListLength }, (_, index) => {
		if (existing[index]) {
			return existing[index];
		}
		return createEmptyPerCarPriceRow();
	});

const mapFleetRowsFromProduct = (
	product: ITransferProduct
): ITransferProductFleetCategoryRow[] =>
	product.fleetCategories.length
		? product.fleetCategories.map((category) => ({
				[ENUM_TRANSFER_PRODUCT_FLEET_CATEGORY_FIELD.ID]:
					category.id || undefined,
				[ENUM_TRANSFER_PRODUCT_FLEET_CATEGORY_FIELD.NAME]:
					category.name ?? ""
			}))
		: [createEmptyFleetCategoryRow()];

const fleetRowsToDomain = (
	rows: ITransferProductFleetCategoryRow[]
): ITransferFleetCategory[] =>
	rows
		.filter((row) => row[ENUM_TRANSFER_PRODUCT_FLEET_CATEGORY_FIELD.NAME])
		.map((row) => ({
			id:
				row[ENUM_TRANSFER_PRODUCT_FLEET_CATEGORY_FIELD.ID] ??
				crypto.randomUUID(),
			name: row[ENUM_TRANSFER_PRODUCT_FLEET_CATEGORY_FIELD.NAME].trim()
		}));

export const alignTransferPerCarExpenses = (options: {
	priceBasedOnClass: boolean;
	carsListLength: number;
	current?: TTransferProductPricingSchema["expenses"] | null;
	fleetCategories?: readonly ITransferFleetCategory[];
	addMarginSeparately?: boolean;
}): ITransferProductPerCarExpenses | ITransferProductPerCarCategoryExpenses => {
	const {
		priceBasedOnClass,
		carsListLength,
		current,
		fleetCategories = [],
		addMarginSeparately
	} = options;

	let aligned:
		| ITransferProductPerCarExpenses
		| ITransferProductPerCarCategoryExpenses;

	if (priceBasedOnClass) {
		const existing =
			current?.typ === ENUM_TRANSFER_PRODUCT_EXPENSE_TYP.PER_CAR_CATEGORY
				? current[ENUM_TRANSFER_PRODUCT_PER_CAR_EXPENSES_FIELD.CARS]
				: [];

		aligned = {
			typ: ENUM_TRANSFER_PRODUCT_EXPENSE_TYP.PER_CAR_CATEGORY,
			[ENUM_TRANSFER_PRODUCT_PER_CAR_EXPENSES_FIELD.CARS]:
				alignPerCarMatrixToFleet(
					carsListLength,
					fleetCategories,
					existing
				)
		};
	} else {
		const existing =
			current?.typ === ENUM_TRANSFER_PRODUCT_EXPENSE_TYP.PER_CAR
				? current[ENUM_TRANSFER_PRODUCT_PER_CAR_EXPENSES_FIELD.CARS]
				: [];

		aligned = {
			typ: ENUM_TRANSFER_PRODUCT_EXPENSE_TYP.PER_CAR,
			[ENUM_TRANSFER_PRODUCT_PER_CAR_EXPENSES_FIELD.CARS]:
				alignPerCarPriceRows(carsListLength, existing)
		};
	}

	if (addMarginSeparately === undefined) {
		return aligned;
	}

	return applyMarkupToPerCarExpenses(aligned, addMarginSeparately);
};

const hasAnyMarkup = (
	rows: {
		[ENUM_TRANSFER_PRODUCT_PRICE_ROW_FIELD.MARKUP]: ITransferProductPriceRowMarkup | null;
	}[]
) =>
	rows.some(
		(row) => row[ENUM_TRANSFER_PRODUCT_PRICE_ROW_FIELD.MARKUP]?.value
	);

const mapPerCarPriceFromVariant = (
	variant: ITransferVariant
): ITransferProductPerCarPriceRow => ({
	[ENUM_TRANSFER_PRODUCT_PRICE_ROW_FIELD.COST]:
		variant.expenses?.cost.val ?? null,
	[ENUM_TRANSFER_PRODUCT_PRICE_ROW_FIELD.FEES]: variant.expenses?.fees ?? [],
	[ENUM_TRANSFER_PRODUCT_PRICE_ROW_FIELD.CURRENCY]:
		variant.expenses?.cost.currency ?? DEFAULT_EVENT_CURRENCY,
	[ENUM_TRANSFER_PRODUCT_PRICE_ROW_FIELD.MARKUP]: mapTransferMarkupToForm(
		variant.expenses?.markup
	)
});

export const mapPricingFromProduct = (
	product: ITransferProduct | null | undefined,
	carsListLength: number
): TTransferProductPricingSchema => {
	const defaults: TTransferProductPricingSchema = {
		[ENUM_TRANSFER_PRODUCT_PRICING_FIELD.PRICING_TYPE]:
			ENUM_TRANSFER_PRODUCT_PRICING_TYPE.FLAT_RATE,
		[ENUM_TRANSFER_PRODUCT_PRICING_FIELD.PRICE_BASED_ON_CLASS]: false,
		[ENUM_TRANSFER_PRODUCT_PRICING_FIELD.ADD_MARGIN_SEPARATELY]: false,
		[ENUM_TRANSFER_PRODUCT_PRICING_FIELD.FLEET_CATEGORIES]: [
			createEmptyFleetCategoryRow()
		],
		[ENUM_TRANSFER_PRODUCT_PRICING_FIELD.EXPENSES]:
			alignTransferPerCarExpenses({
				priceBasedOnClass: false,
				carsListLength
			}),
		[ENUM_TRANSFER_PRODUCT_PRICING_FIELD.FEES]: [],
		[ENUM_TRANSFER_PRODUCT_PRICING_FIELD.MARKUP]: null
	};

	if (!product) {
		return defaults;
	}

	if (product.pricing === ENUM_TRANSFER_PRICING.PER_CAR) {
		const cars = product.variants.map(mapPerCarPriceFromVariant);
		return {
			...defaults,
			[ENUM_TRANSFER_PRODUCT_PRICING_FIELD.PRICING_TYPE]:
				ENUM_TRANSFER_PRODUCT_PRICING_TYPE.PER_CAR,
			[ENUM_TRANSFER_PRODUCT_PRICING_FIELD.PRICE_BASED_ON_CLASS]: false,
			[ENUM_TRANSFER_PRODUCT_PRICING_FIELD.ADD_MARGIN_SEPARATELY]:
				hasAnyMarkup(cars),
			[ENUM_TRANSFER_PRODUCT_PRICING_FIELD.EXPENSES]: {
				typ: ENUM_TRANSFER_PRODUCT_EXPENSE_TYP.PER_CAR,
				[ENUM_TRANSFER_PRODUCT_PER_CAR_EXPENSES_FIELD.CARS]:
					alignPerCarPriceRows(carsListLength, cars)
			}
		};
	}

	if (product.pricing === ENUM_TRANSFER_PRICING.PER_CAR_CATEGORY) {
		const fleetCategories = product.fleetCategories;
		const fleetRows = mapFleetRowsFromProduct(product);
		const cars = alignPerCarMatrixToFleet(
			carsListLength,
			fleetCategories,
			product.variants.map((variant) => ({
				[ENUM_TRANSFER_PRODUCT_PER_CAR_EXPENSES_FIELD.CATEGORIES]:
					variant.prices.length
						? variant.prices.map((price) =>
								mapPriceToCategoryRow(price, fleetCategories)
							)
						: createEmptyPerCarByClassPriceRow(fleetCategories)[
								ENUM_TRANSFER_PRODUCT_PER_CAR_EXPENSES_FIELD
									.CATEGORIES
							]
			}))
		);
		const categoryRows = cars.flatMap(
			(car) =>
				car[ENUM_TRANSFER_PRODUCT_PER_CAR_EXPENSES_FIELD.CATEGORIES]
		);
		return {
			...defaults,
			[ENUM_TRANSFER_PRODUCT_PRICING_FIELD.PRICING_TYPE]:
				ENUM_TRANSFER_PRODUCT_PRICING_TYPE.PER_CAR,
			[ENUM_TRANSFER_PRODUCT_PRICING_FIELD.PRICE_BASED_ON_CLASS]: true,
			[ENUM_TRANSFER_PRODUCT_PRICING_FIELD.FLEET_CATEGORIES]: fleetRows,
			[ENUM_TRANSFER_PRODUCT_PRICING_FIELD.ADD_MARGIN_SEPARATELY]:
				hasAnyMarkup(categoryRows),
			[ENUM_TRANSFER_PRODUCT_PRICING_FIELD.EXPENSES]: {
				typ: ENUM_TRANSFER_PRODUCT_EXPENSE_TYP.PER_CAR_CATEGORY,
				[ENUM_TRANSFER_PRODUCT_PER_CAR_EXPENSES_FIELD.CARS]: cars
			}
		};
	}

	const charge = product.charge;
	if (!charge) {
		return {
			...defaults,
			[ENUM_TRANSFER_PRODUCT_PRICING_FIELD.PRICING_TYPE]:
				ENUM_TRANSFER_PRODUCT_PRICING_TYPE.FLAT_RATE
		};
	}

	const markup = mapTransferMarkupToForm(charge.markup);
	const money =
		charge.typ === ENUM_SUPPLIER_VARIANT_CHARGE.PER_PERSON
			? charge.costPerPerson
			: charge.cost;

	return {
		...defaults,
		[ENUM_TRANSFER_PRODUCT_PRICING_FIELD.PRICING_TYPE]:
			charge.typ === ENUM_SUPPLIER_VARIANT_CHARGE.PER_PERSON
				? ENUM_TRANSFER_PRODUCT_PRICING_TYPE.PER_PERSON
				: ENUM_TRANSFER_PRODUCT_PRICING_TYPE.FLAT_RATE,
		[ENUM_TRANSFER_PRODUCT_PRICING_FIELD.ADD_MARGIN_SEPARATELY]: Boolean(
			markup?.value
		),
		[ENUM_TRANSFER_PRODUCT_PRICING_FIELD.MARKUP]: markup,
		[ENUM_TRANSFER_PRODUCT_PRICING_FIELD.TOTAL_PRICE]: money?.val ?? null,
		[ENUM_TRANSFER_PRODUCT_PRICING_FIELD.FEES]: charge.fees ?? [],
		[ENUM_TRANSFER_PRODUCT_PRICING_FIELD.CURRENCY]:
			money?.currency ?? DEFAULT_EVENT_CURRENCY
	};
};

const mapRowToFixedCharge = (
	row:
		| ITransferProductPerCarPriceRow
		| ITransferProductCategoryPriceRow
		| undefined,
	addMarginSeparately: boolean
): ISupplierFixedCharge => {
	const currency =
		row?.[ENUM_TRANSFER_PRODUCT_PRICE_ROW_FIELD.CURRENCY] ||
		DEFAULT_EVENT_CURRENCY;
	const fees = row?.[ENUM_TRANSFER_PRODUCT_PRICE_ROW_FIELD.FEES] ?? [];

	return {
		typ: ENUM_SUPPLIER_VARIANT_CHARGE.FIXED,
		cost: {
			val: row?.[ENUM_TRANSFER_PRODUCT_PRICE_ROW_FIELD.COST] ?? 0,
			currency
		},
		fees: fees.length ? fees : null,
		markup: mapTransferMarkupFormToDomain(
			row?.[ENUM_TRANSFER_PRODUCT_PRICE_ROW_FIELD.MARKUP] ?? null,
			currency,
			addMarginSeparately
		)
	};
};

const mapWholeCharge = (
	pricing: TTransferProductPricingSchema
): TSupplierVariantCharge => {
	const currency =
		pricing[ENUM_TRANSFER_PRODUCT_PRICING_FIELD.CURRENCY] ||
		DEFAULT_EVENT_CURRENCY;
	const fees = pricing[ENUM_TRANSFER_PRODUCT_PRICING_FIELD.FEES] ?? [];
	const money = {
		val: pricing[ENUM_TRANSFER_PRODUCT_PRICING_FIELD.TOTAL_PRICE] ?? 0,
		currency
	};
	const markup = mapTransferMarkupFormToDomain(
		pricing[ENUM_TRANSFER_PRODUCT_PRICING_FIELD.MARKUP] ?? null,
		currency,
		pricing[ENUM_TRANSFER_PRODUCT_PRICING_FIELD.ADD_MARGIN_SEPARATELY]
	);

	if (
		pricing[ENUM_TRANSFER_PRODUCT_PRICING_FIELD.PRICING_TYPE] ===
		ENUM_TRANSFER_PRODUCT_PRICING_TYPE.PER_PERSON
	) {
		return {
			typ: ENUM_SUPPLIER_VARIANT_CHARGE.PER_PERSON,
			costPerPerson: money,
			fees: fees.length ? fees : null,
			markup
		};
	}

	return {
		typ: ENUM_SUPPLIER_VARIANT_CHARGE.FIXED,
		cost: money,
		fees: fees.length ? fees : null,
		markup
	};
};

const getFleetCategoriesFromPricing = (
	pricing: TTransferProductPricingSchema
): ITransferFleetCategory[] =>
	fleetRowsToDomain(
		pricing[ENUM_TRANSFER_PRODUCT_PRICING_FIELD.FLEET_CATEGORIES] ?? []
	);

export const mapTransferPricingToDetailsPatch = (
	pricing: TTransferProductPricingSchema,
	productName: string
): Extract<TTransferProductDetailsBackend, { pricing: "per_car_category" }> => {
	const fleetCategories = getFleetCategoriesFromPricing(pricing);
	return {
		name: productName,
		pricing: ENUM_TRANSFER_PRICING.PER_CAR_CATEGORY,
		categories: fleetCategories.map((category) => ({
			...(category.id ? { id: category.id } : {}),
			name: category.name
		}))
	};
};

export const mapTransferEditFormToPricingSwitch = (
	values: TTransferProductEditSchema
): TTransferPricingSwitchBackend => {
	const cars =
		values[ENUM_FORM_TRANSFER_SECTION.CARS][
			ENUM_FORM_TRANSFER_CARS.CARS_LIST
		];
	const pricing = values[ENUM_FORM_TRANSFER_SECTION.PRICING];
	const addMargin =
		pricing[ENUM_TRANSFER_PRODUCT_PRICING_FIELD.ADD_MARGIN_SEPARATELY];
	const pricingType =
		pricing[ENUM_TRANSFER_PRODUCT_PRICING_FIELD.PRICING_TYPE];

	if (pricingType === ENUM_TRANSFER_PRODUCT_PRICING_TYPE.PER_CAR) {
		const fleetCategories = getFleetCategoriesFromPricing(pricing);
		const aligned = alignTransferPerCarExpenses({
			priceBasedOnClass:
				pricing[
					ENUM_TRANSFER_PRODUCT_PRICING_FIELD.PRICE_BASED_ON_CLASS
				],
			carsListLength: cars.length,
			current: pricing[ENUM_TRANSFER_PRODUCT_PRICING_FIELD.EXPENSES],
			fleetCategories
		});

		if (pricing[ENUM_TRANSFER_PRODUCT_PRICING_FIELD.PRICE_BASED_ON_CLASS]) {
			const rows =
				aligned.typ ===
				ENUM_TRANSFER_PRODUCT_EXPENSE_TYP.PER_CAR_CATEGORY
					? aligned[ENUM_TRANSFER_PRODUCT_PER_CAR_EXPENSES_FIELD.CARS]
					: [];

			const categories = fleetCategories.map((category) => ({
				...(category.id ? { id: category.id } : {}),
				name: category.name
			}));

			const prices = cars.flatMap((car, carIndex) => {
				const categoryRows =
					rows[carIndex]?.[
						ENUM_TRANSFER_PRODUCT_PER_CAR_EXPENSES_FIELD.CATEGORIES
					] ?? [];
				return categoryRows
					.filter(
						(row) =>
							row[
								ENUM_TRANSFER_PRODUCT_CATEGORY_ROW_FIELD.COST
							] != null
					)
					.map((row) => ({
						variant_id: car[ENUM_FORM_TRANSFER_CARS.VARIANT_ID],
						category_id:
							row[
								ENUM_TRANSFER_PRODUCT_CATEGORY_ROW_FIELD
									.CATEGORY_ID
							],
						charge: mapSupplierFixedChargeToBackend(
							mapRowToFixedCharge(row, addMargin)
						)
					}));
			});

			return {
				typ: ENUM_SUPPLIER_TYPE.TRANSFER,
				to: ENUM_TRANSFER_PRICING.PER_CAR_CATEGORY,
				categories,
				prices
			};
		}

		const rows =
			aligned.typ === ENUM_TRANSFER_PRODUCT_EXPENSE_TYP.PER_CAR
				? aligned[ENUM_TRANSFER_PRODUCT_PER_CAR_EXPENSES_FIELD.CARS]
				: [];

		return {
			typ: ENUM_SUPPLIER_TYPE.TRANSFER,
			to: ENUM_TRANSFER_PRICING.PER_CAR,
			cars: cars.map((car, index) => ({
				variant_id: car[ENUM_FORM_TRANSFER_CARS.VARIANT_ID],
				charge: mapSupplierFixedChargeToBackend(
					mapRowToFixedCharge(rows[index], addMargin)
				)
			}))
		};
	}

	return {
		typ: ENUM_SUPPLIER_TYPE.TRANSFER,
		to: ENUM_TRANSFER_PRICING.WHOLE,
		charge: mapSupplierVariantChargeToBackend(mapWholeCharge(pricing))
	};
};

export const isTransferWholePricingType = (
	pricingType: TTransferProductPricingSchema["pricing_type"]
) =>
	pricingType === ENUM_TRANSFER_PRODUCT_PRICING_TYPE.FLAT_RATE ||
	pricingType === ENUM_TRANSFER_PRODUCT_PRICING_TYPE.PER_PERSON;

export const resolveTransferTargetPricing = (
	values: TTransferProductEditSchema
):
	| typeof ENUM_TRANSFER_PRICING.PER_CAR
	| typeof ENUM_TRANSFER_PRICING.PER_CAR_CATEGORY
	| typeof ENUM_TRANSFER_PRICING.WHOLE => {
	const pricing = values[ENUM_FORM_TRANSFER_SECTION.PRICING];
	if (
		pricing[ENUM_TRANSFER_PRODUCT_PRICING_FIELD.PRICING_TYPE] ===
		ENUM_TRANSFER_PRODUCT_PRICING_TYPE.PER_CAR
	) {
		return pricing[ENUM_TRANSFER_PRODUCT_PRICING_FIELD.PRICE_BASED_ON_CLASS]
			? ENUM_TRANSFER_PRICING.PER_CAR_CATEGORY
			: ENUM_TRANSFER_PRICING.PER_CAR;
	}
	return ENUM_TRANSFER_PRICING.WHOLE;
};

export const mapTransferCategoryRowsToPriceWrites = (
	rows: ITransferProductCategoryPriceRow[],
	addMarginSeparately: boolean
): ITransferCarPriceWrite[] =>
	rows.flatMap((row) => {
		if (row[ENUM_TRANSFER_PRODUCT_CATEGORY_ROW_FIELD.COST] == null) {
			return [];
		}
		const categoryId =
			row[ENUM_TRANSFER_PRODUCT_CATEGORY_ROW_FIELD.CATEGORY_ID];
		if (!categoryId) {
			return [];
		}
		const priceId = row[ENUM_TRANSFER_PRODUCT_CATEGORY_ROW_FIELD.PRICE_ID];
		return [
			{
				...(priceId ? { id: priceId } : {}),
				categoryId,
				expenses: mapRowToFixedCharge(row, addMarginSeparately)
			}
		];
	});

export const mapTransferProductWithPricingFleet = (
	product: ITransferProduct,
	pricing: TTransferProductPricingSchema
): ITransferProduct => ({
	...product,
	fleetCategories: getFleetCategoriesFromPricing(pricing)
});

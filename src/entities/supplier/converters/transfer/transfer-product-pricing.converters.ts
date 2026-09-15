import { DEFAULT_EVENT_CURRENCY } from "@/entities/commission";

import {
	ENUM_FORM_TRANSFER_CARS,
	ENUM_FORM_TRANSFER_SECTION,
	ENUM_SUPPLIER_TYPE,
	ENUM_SUPPLIER_VARIANT_CHARGE,
	ENUM_TRANSFER_PRICING,
	ENUM_TRANSFER_PRODUCT_CATEGORY_ROW_FIELD,
	ENUM_TRANSFER_PRODUCT_EXPENSE_TYP,
	ENUM_TRANSFER_PRODUCT_PER_CAR_EXPENSES_FIELD,
	ENUM_TRANSFER_PRODUCT_PRICE_ROW_FIELD,
	ENUM_TRANSFER_PRODUCT_PRICING_FIELD,
	ENUM_TRANSFER_PRODUCT_PRICING_TYPE,
	type ISupplierFixedCharge,
	type ITransferProduct,
	type ITransferProductCategoryPriceRow,
	type ITransferProductPerCarByClassPriceRow,
	type ITransferProductPerCarCategoryExpenses,
	type ITransferProductPerCarExpenses,
	type ITransferProductPerCarPriceRow,
	type ITransferProductPriceRowMarkup,
	type ITransferVariant,
	type TSupplierVariantCharge,
	type TTransferPricingSwitchBackend,
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
		[ENUM_TRANSFER_PRODUCT_CATEGORY_ROW_FIELD.NAME]: "",
		[ENUM_TRANSFER_PRODUCT_CATEGORY_ROW_FIELD.COST]: null,
		[ENUM_TRANSFER_PRODUCT_CATEGORY_ROW_FIELD.FEES]: [],
		[ENUM_TRANSFER_PRODUCT_CATEGORY_ROW_FIELD.CURRENCY]:
			DEFAULT_EVENT_CURRENCY,
		[ENUM_TRANSFER_PRODUCT_CATEGORY_ROW_FIELD.MARKUP]: null
	});

const createEmptyPerCarByClassPriceRow =
	(): ITransferProductPerCarByClassPriceRow => ({
		[ENUM_TRANSFER_PRODUCT_PER_CAR_EXPENSES_FIELD.CATEGORIES]: [
			createEmptyTransferProductCategoryRow()
		]
	});

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

const alignPerCarByClassPriceRows = (
	carsListLength: number,
	existing: ITransferProductPerCarByClassPriceRow[] = []
): ITransferProductPerCarByClassPriceRow[] =>
	Array.from({ length: carsListLength }, (_, index) => {
		if (existing[index]) {
			return existing[index];
		}
		return createEmptyPerCarByClassPriceRow();
	});

export const alignTransferPerCarExpenses = (options: {
	priceBasedOnClass: boolean;
	carsListLength: number;
	current?: TTransferProductPricingSchema["expenses"] | null;
	addMarginSeparately?: boolean;
}): ITransferProductPerCarExpenses | ITransferProductPerCarCategoryExpenses => {
	const { priceBasedOnClass, carsListLength, current, addMarginSeparately } =
		options;

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
				alignPerCarByClassPriceRows(carsListLength, existing)
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

const mapCategoryRowFromVariant = (
	category: ITransferVariant["categories"][number]
): ITransferProductCategoryPriceRow => ({
	[ENUM_TRANSFER_PRODUCT_CATEGORY_ROW_FIELD.NAME]: category.name ?? "",
	[ENUM_TRANSFER_PRODUCT_CATEGORY_ROW_FIELD.COST]:
		category.expenses.cost.val ?? null,
	[ENUM_TRANSFER_PRODUCT_CATEGORY_ROW_FIELD.FEES]:
		category.expenses.fees ?? [],
	[ENUM_TRANSFER_PRODUCT_CATEGORY_ROW_FIELD.CURRENCY]:
		category.expenses.cost.currency ?? DEFAULT_EVENT_CURRENCY,
	[ENUM_TRANSFER_PRODUCT_CATEGORY_ROW_FIELD.MARKUP]: mapTransferMarkupToForm(
		category.expenses.markup
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
		const cars = product.variants.map((variant) => ({
			[ENUM_TRANSFER_PRODUCT_PER_CAR_EXPENSES_FIELD.CATEGORIES]: variant
				.categories.length
				? variant.categories.map(mapCategoryRowFromVariant)
				: [createEmptyTransferProductCategoryRow()]
		}));
		const categories = cars.flatMap(
			(car) =>
				car[ENUM_TRANSFER_PRODUCT_PER_CAR_EXPENSES_FIELD.CATEGORIES]
		);
		return {
			...defaults,
			[ENUM_TRANSFER_PRODUCT_PRICING_FIELD.PRICING_TYPE]:
				ENUM_TRANSFER_PRODUCT_PRICING_TYPE.PER_CAR,
			[ENUM_TRANSFER_PRODUCT_PRICING_FIELD.PRICE_BASED_ON_CLASS]: true,
			[ENUM_TRANSFER_PRODUCT_PRICING_FIELD.ADD_MARGIN_SEPARATELY]:
				hasAnyMarkup(categories),
			[ENUM_TRANSFER_PRODUCT_PRICING_FIELD.EXPENSES]: {
				typ: ENUM_TRANSFER_PRODUCT_EXPENSE_TYP.PER_CAR_CATEGORY,
				[ENUM_TRANSFER_PRODUCT_PER_CAR_EXPENSES_FIELD.CARS]:
					alignPerCarByClassPriceRows(carsListLength, cars)
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
	row: ITransferProductPerCarPriceRow | undefined,
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
		const aligned = alignTransferPerCarExpenses({
			priceBasedOnClass:
				pricing[
					ENUM_TRANSFER_PRODUCT_PRICING_FIELD.PRICE_BASED_ON_CLASS
				],
			carsListLength: cars.length,
			current: pricing[ENUM_TRANSFER_PRODUCT_PRICING_FIELD.EXPENSES]
		});

		if (pricing[ENUM_TRANSFER_PRODUCT_PRICING_FIELD.PRICE_BASED_ON_CLASS]) {
			const rows =
				aligned.typ ===
				ENUM_TRANSFER_PRODUCT_EXPENSE_TYP.PER_CAR_CATEGORY
					? aligned[ENUM_TRANSFER_PRODUCT_PER_CAR_EXPENSES_FIELD.CARS]
					: [];

			return {
				typ: ENUM_SUPPLIER_TYPE.TRANSFER,
				to: ENUM_TRANSFER_PRICING.PER_CAR_CATEGORY,
				cars: cars.map((car, index) => ({
					variant_id: car[ENUM_FORM_TRANSFER_CARS.VARIANT_ID],
					categories: (
						rows[index]?.[
							ENUM_TRANSFER_PRODUCT_PER_CAR_EXPENSES_FIELD
								.CATEGORIES
						] ?? []
					).map((category) => ({
						name: category[
							ENUM_TRANSFER_PRODUCT_CATEGORY_ROW_FIELD.NAME
						],
						charge: mapSupplierFixedChargeToBackend(
							mapRowToFixedCharge(category, addMargin)
						)
					}))
				}))
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

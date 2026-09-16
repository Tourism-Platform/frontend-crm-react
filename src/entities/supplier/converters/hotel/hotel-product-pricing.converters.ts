import type {
	FeeInput,
	MonetaryValueSchema,
	RoomRateSwitch,
	StayRateInput
} from "@/shared/api/generated/Api";

import {
	DEFAULT_EVENT_CURRENCY,
	type ENUM_CURRENCY_OPTIONS_TYPE,
	currencyConverter
} from "@/entities/commission";

import {
	ENUM_FORM_HOTEL_PRODUCT_ROOMS,
	ENUM_FORM_HOTEL_SECTION,
	ENUM_HOTEL_PRICING,
	ENUM_HOTEL_PRODUCT_CATEGORY_ROW_FIELD,
	ENUM_HOTEL_PRODUCT_EXPENSE_TYP,
	ENUM_HOTEL_PRODUCT_PER_ROOM_EXPENSES_FIELD,
	ENUM_HOTEL_PRODUCT_PRICE_ROW_FIELD,
	ENUM_HOTEL_PRODUCT_PRICING_FIELD,
	ENUM_HOTEL_PRODUCT_PRICING_TYPE,
	ENUM_HOTEL_ROOM_CHARGE,
	ENUM_SUPPLIER_FEE_FIELD,
	ENUM_SUPPLIER_SURCHARGE,
	ENUM_SUPPLIER_TYPE,
	type IHotelProduct,
	type IHotelProductCategoryPriceRow,
	type IHotelProductPerRoomByClassPriceRow,
	type IHotelProductPerRoomCategoryExpenses,
	type IHotelProductPerRoomExpenses,
	type IHotelProductPerRoomPriceRow,
	type IHotelProductPriceRowMarkup,
	type IHotelVariant,
	type ISupplierFeeFormRow,
	type THotelPricingSwitchBackend,
	type THotelProductEditSchema,
	type THotelProductPricingSchema,
	type THotelRoomCharge,
	type TSupplierSurcharge,
	type TSupplierVariantCharge
} from "../../types";
import { mapSupplierVariantChargeToBackend } from "../supplier-variant-charge.converters";

import { mapHotelRoomChargeToBackend } from "./rooms.converters";

const createEmptyPerRoomPriceRow = (): IHotelProductPerRoomPriceRow => ({
	[ENUM_HOTEL_PRODUCT_PRICE_ROW_FIELD.COST]: null,
	[ENUM_HOTEL_PRODUCT_PRICE_ROW_FIELD.FEES]: [],
	[ENUM_HOTEL_PRODUCT_PRICE_ROW_FIELD.CURRENCY]: DEFAULT_EVENT_CURRENCY,
	[ENUM_HOTEL_PRODUCT_PRICE_ROW_FIELD.MARKUP]: null
});

export const createEmptyHotelProductCategoryRow =
	(): IHotelProductCategoryPriceRow => ({
		[ENUM_HOTEL_PRODUCT_CATEGORY_ROW_FIELD.NAME]: "",
		[ENUM_HOTEL_PRODUCT_CATEGORY_ROW_FIELD.COST]: null,
		[ENUM_HOTEL_PRODUCT_CATEGORY_ROW_FIELD.FEES]: [],
		[ENUM_HOTEL_PRODUCT_CATEGORY_ROW_FIELD.CURRENCY]:
			DEFAULT_EVENT_CURRENCY,
		[ENUM_HOTEL_PRODUCT_CATEGORY_ROW_FIELD.MARKUP]: null
	});

const createEmptyPerRoomByClassPriceRow =
	(): IHotelProductPerRoomByClassPriceRow => ({
		[ENUM_HOTEL_PRODUCT_PER_ROOM_EXPENSES_FIELD.CATEGORIES]: [
			createEmptyHotelProductCategoryRow()
		]
	});

const mapMarkupToForm = (
	markup?: TSupplierSurcharge | null
): IHotelProductPriceRowMarkup | null => {
	if (!markup) return null;
	if (markup.typ === ENUM_SUPPLIER_SURCHARGE.PERCENTAGE) {
		return {
			typ: ENUM_SUPPLIER_SURCHARGE.PERCENTAGE,
			value: String((markup.percentage ?? 0) * 100)
		};
	}
	return {
		typ: ENUM_SUPPLIER_SURCHARGE.FIXED,
		value: String(markup.cost?.val ?? "")
	};
};

const getStayChargeMoney = (
	charge: StayRateInput["base"]
): MonetaryValueSchema | undefined => {
	if (charge.typ === "per_person") {
		return charge.cost_per_person;
	}

	if (charge.typ === "per_duration") {
		const rate = charge.rate;
		if (rate.typ === "per_group") {
			return rate.tiers[0]?.cost;
		}
		if (rate.typ === "per_person") {
			return rate.cost_per_person;
		}
		return rate.cost;
	}

	return charge.cost;
};

const mapStayRateMarkupToForm = (
	markup?: StayRateInput["base"]["markup"]
): IHotelProductPriceRowMarkup | null => {
	if (!markup) return null;
	if (markup.typ === "percentage") {
		return {
			typ: ENUM_SUPPLIER_SURCHARGE.PERCENTAGE,
			value: String((markup.percentage ?? 0) * 100)
		};
	}
	return {
		typ: ENUM_SUPPLIER_SURCHARGE.FIXED,
		value: String(markup.cost?.val ?? "")
	};
};

const mapStayRateFeesToForm = (
	fees?: FeeInput[] | null
): ISupplierFeeFormRow[] =>
	(fees ?? []).map((fee) => ({
		[ENUM_SUPPLIER_FEE_FIELD.NAME]: fee.name ?? null,
		[ENUM_SUPPLIER_FEE_FIELD.COST]: fee.cost?.val ?? null,
		[ENUM_SUPPLIER_FEE_FIELD.CURRENCY]:
			currencyConverter.from(fee.cost?.currency) ?? null,
		[ENUM_SUPPLIER_FEE_FIELD.DESCRIPTION]: fee.description ?? null
	}));

const mapMarkupFormToDomain = (
	markup: IHotelProductPriceRowMarkup | null,
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

const applyMarkupToPerRoomExpenses = (
	expenses:
		| IHotelProductPerRoomExpenses
		| IHotelProductPerRoomCategoryExpenses,
	addMarginSeparately: boolean
): IHotelProductPerRoomExpenses | IHotelProductPerRoomCategoryExpenses => {
	if (addMarginSeparately) {
		return expenses;
	}

	if (expenses.typ === ENUM_HOTEL_PRODUCT_EXPENSE_TYP.PER_ROOM) {
		return {
			...expenses,
			[ENUM_HOTEL_PRODUCT_PER_ROOM_EXPENSES_FIELD.ROOMS]: expenses[
				ENUM_HOTEL_PRODUCT_PER_ROOM_EXPENSES_FIELD.ROOMS
			].map((room) => ({
				...room,
				[ENUM_HOTEL_PRODUCT_PRICE_ROW_FIELD.MARKUP]: null
			}))
		};
	}

	return {
		...expenses,
		[ENUM_HOTEL_PRODUCT_PER_ROOM_EXPENSES_FIELD.ROOMS]: expenses[
			ENUM_HOTEL_PRODUCT_PER_ROOM_EXPENSES_FIELD.ROOMS
		].map((room) => ({
			...room,
			[ENUM_HOTEL_PRODUCT_PER_ROOM_EXPENSES_FIELD.CATEGORIES]: room[
				ENUM_HOTEL_PRODUCT_PER_ROOM_EXPENSES_FIELD.CATEGORIES
			].map((category) => ({
				...category,
				[ENUM_HOTEL_PRODUCT_CATEGORY_ROW_FIELD.MARKUP]: null
			}))
		}))
	};
};

const alignPerRoomPriceRows = (
	roomsListLength: number,
	existing: IHotelProductPerRoomPriceRow[] = []
): IHotelProductPerRoomPriceRow[] =>
	Array.from({ length: roomsListLength }, (_, index) => {
		if (existing[index]) {
			return existing[index];
		}
		return createEmptyPerRoomPriceRow();
	});

const alignPerRoomByClassPriceRows = (
	roomsListLength: number,
	existing: IHotelProductPerRoomByClassPriceRow[] = []
): IHotelProductPerRoomByClassPriceRow[] =>
	Array.from({ length: roomsListLength }, (_, index) => {
		if (existing[index]) {
			return existing[index];
		}
		return createEmptyPerRoomByClassPriceRow();
	});

export const alignHotelPerRoomExpenses = (options: {
	priceBasedOnClass: boolean;
	roomsListLength: number;
	current?: THotelProductPricingSchema["expenses"] | null;
	addMarginSeparately?: boolean;
}): IHotelProductPerRoomExpenses | IHotelProductPerRoomCategoryExpenses => {
	const { priceBasedOnClass, roomsListLength, current, addMarginSeparately } =
		options;

	let aligned:
		| IHotelProductPerRoomExpenses
		| IHotelProductPerRoomCategoryExpenses;

	if (priceBasedOnClass) {
		const existing =
			current?.typ === ENUM_HOTEL_PRODUCT_EXPENSE_TYP.PER_ROOM_CATEGORY
				? current[ENUM_HOTEL_PRODUCT_PER_ROOM_EXPENSES_FIELD.ROOMS]
				: [];

		aligned = {
			typ: ENUM_HOTEL_PRODUCT_EXPENSE_TYP.PER_ROOM_CATEGORY,
			[ENUM_HOTEL_PRODUCT_PER_ROOM_EXPENSES_FIELD.ROOMS]:
				alignPerRoomByClassPriceRows(roomsListLength, existing)
		};
	} else {
		const existing =
			current?.typ === ENUM_HOTEL_PRODUCT_EXPENSE_TYP.PER_ROOM
				? current[ENUM_HOTEL_PRODUCT_PER_ROOM_EXPENSES_FIELD.ROOMS]
				: [];

		aligned = {
			typ: ENUM_HOTEL_PRODUCT_EXPENSE_TYP.PER_ROOM,
			[ENUM_HOTEL_PRODUCT_PER_ROOM_EXPENSES_FIELD.ROOMS]:
				alignPerRoomPriceRows(roomsListLength, existing)
		};
	}

	if (addMarginSeparately === undefined) {
		return aligned;
	}

	return applyMarkupToPerRoomExpenses(aligned, addMarginSeparately);
};

const hasAnyMarkup = (
	rows: {
		[ENUM_HOTEL_PRODUCT_PRICE_ROW_FIELD.MARKUP]: IHotelProductPriceRowMarkup | null;
	}[]
) => rows.some((row) => row[ENUM_HOTEL_PRODUCT_PRICE_ROW_FIELD.MARKUP]?.value);

const mapPerRoomPriceFromVariant = (
	variant: IHotelVariant
): IHotelProductPerRoomPriceRow => {
	const expenses = variant.rooms[0]?.expenses;

	if (!expenses) {
		return createEmptyPerRoomPriceRow();
	}

	if (expenses.typ === ENUM_HOTEL_ROOM_CHARGE.PER_DURATION) {
		return {
			[ENUM_HOTEL_PRODUCT_PRICE_ROW_FIELD.COST]:
				expenses.rate.cost.val ?? null,
			[ENUM_HOTEL_PRODUCT_PRICE_ROW_FIELD.FEES]: expenses.fees ?? [],
			[ENUM_HOTEL_PRODUCT_PRICE_ROW_FIELD.CURRENCY]:
				expenses.rate.cost.currency ?? DEFAULT_EVENT_CURRENCY,
			[ENUM_HOTEL_PRODUCT_PRICE_ROW_FIELD.MARKUP]: mapMarkupToForm(
				expenses.markup
			)
		};
	}

	return {
		[ENUM_HOTEL_PRODUCT_PRICE_ROW_FIELD.COST]: expenses.cost.val ?? null,
		[ENUM_HOTEL_PRODUCT_PRICE_ROW_FIELD.FEES]: expenses.fees ?? [],
		[ENUM_HOTEL_PRODUCT_PRICE_ROW_FIELD.CURRENCY]:
			expenses.cost.currency ?? DEFAULT_EVENT_CURRENCY,
		[ENUM_HOTEL_PRODUCT_PRICE_ROW_FIELD.MARKUP]: mapMarkupToForm(
			expenses.markup
		)
	};
};

export const mapHotelPricingFromProduct = (
	product: IHotelProduct | null | undefined,
	roomsListLength: number
): THotelProductPricingSchema => {
	const defaults: THotelProductPricingSchema = {
		[ENUM_HOTEL_PRODUCT_PRICING_FIELD.PRICING_TYPE]:
			ENUM_HOTEL_PRODUCT_PRICING_TYPE.FLAT_RATE,
		[ENUM_HOTEL_PRODUCT_PRICING_FIELD.PRICE_BASED_ON_CLASS]: false,
		[ENUM_HOTEL_PRODUCT_PRICING_FIELD.ADD_MARGIN_SEPARATELY]: false,
		[ENUM_HOTEL_PRODUCT_PRICING_FIELD.EXPENSES]: alignHotelPerRoomExpenses({
			priceBasedOnClass: false,
			roomsListLength
		}),
		[ENUM_HOTEL_PRODUCT_PRICING_FIELD.FEES]: [],
		[ENUM_HOTEL_PRODUCT_PRICING_FIELD.MARKUP]: null
	};

	if (!product) {
		return defaults;
	}

	if (product.pricing === ENUM_HOTEL_PRICING.PER_ROOM) {
		const rooms = product.variants.map(mapPerRoomPriceFromVariant);
		return {
			...defaults,
			[ENUM_HOTEL_PRODUCT_PRICING_FIELD.PRICING_TYPE]:
				ENUM_HOTEL_PRODUCT_PRICING_TYPE.PER_ROOM,
			[ENUM_HOTEL_PRODUCT_PRICING_FIELD.PRICE_BASED_ON_CLASS]: false,
			[ENUM_HOTEL_PRODUCT_PRICING_FIELD.ADD_MARGIN_SEPARATELY]:
				hasAnyMarkup(rooms),
			[ENUM_HOTEL_PRODUCT_PRICING_FIELD.EXPENSES]: {
				typ: ENUM_HOTEL_PRODUCT_EXPENSE_TYP.PER_ROOM,
				[ENUM_HOTEL_PRODUCT_PER_ROOM_EXPENSES_FIELD.ROOMS]:
					alignPerRoomPriceRows(roomsListLength, rooms)
			}
		};
	}

	const charge: StayRateInput["base"] | undefined = product.stayRate?.base;
	if (!charge) {
		return {
			...defaults,
			[ENUM_HOTEL_PRODUCT_PRICING_FIELD.PRICING_TYPE]:
				ENUM_HOTEL_PRODUCT_PRICING_TYPE.FLAT_RATE
		};
	}

	const markup = mapStayRateMarkupToForm(charge.markup);
	const fees = mapStayRateFeesToForm(charge.fees);

	if (charge.typ === "per_person") {
		return {
			...defaults,
			[ENUM_HOTEL_PRODUCT_PRICING_FIELD.PRICING_TYPE]:
				ENUM_HOTEL_PRODUCT_PRICING_TYPE.PER_PERSON,
			[ENUM_HOTEL_PRODUCT_PRICING_FIELD.ADD_MARGIN_SEPARATELY]: Boolean(
				markup?.value
			),
			[ENUM_HOTEL_PRODUCT_PRICING_FIELD.MARKUP]: markup,
			[ENUM_HOTEL_PRODUCT_PRICING_FIELD.TOTAL_PRICE]:
				charge.cost_per_person.val ?? null,
			[ENUM_HOTEL_PRODUCT_PRICING_FIELD.FEES]: fees,
			[ENUM_HOTEL_PRODUCT_PRICING_FIELD.CURRENCY]:
				currencyConverter.from(charge.cost_per_person.currency) ??
				DEFAULT_EVENT_CURRENCY
		};
	}

	const money = getStayChargeMoney(charge);

	return {
		...defaults,
		[ENUM_HOTEL_PRODUCT_PRICING_FIELD.PRICING_TYPE]:
			ENUM_HOTEL_PRODUCT_PRICING_TYPE.FLAT_RATE,
		[ENUM_HOTEL_PRODUCT_PRICING_FIELD.ADD_MARGIN_SEPARATELY]: Boolean(
			markup?.value
		),
		[ENUM_HOTEL_PRODUCT_PRICING_FIELD.MARKUP]: markup,
		[ENUM_HOTEL_PRODUCT_PRICING_FIELD.TOTAL_PRICE]: money?.val ?? null,
		[ENUM_HOTEL_PRODUCT_PRICING_FIELD.FEES]: fees,
		[ENUM_HOTEL_PRODUCT_PRICING_FIELD.CURRENCY]:
			currencyConverter.from(money?.currency) ?? DEFAULT_EVENT_CURRENCY
	};
};

const mapRowToRoomCharge = (
	row: IHotelProductPerRoomPriceRow | undefined,
	existing: THotelRoomCharge | null | undefined,
	addMarginSeparately: boolean
): THotelRoomCharge => {
	const currency =
		row?.[ENUM_HOTEL_PRODUCT_PRICE_ROW_FIELD.CURRENCY] ||
		DEFAULT_EVENT_CURRENCY;
	const fees = row?.[ENUM_HOTEL_PRODUCT_PRICE_ROW_FIELD.FEES] ?? [];
	const markup = mapMarkupFormToDomain(
		row?.[ENUM_HOTEL_PRODUCT_PRICE_ROW_FIELD.MARKUP] ?? null,
		currency,
		addMarginSeparately
	);
	const money = {
		val: row?.[ENUM_HOTEL_PRODUCT_PRICE_ROW_FIELD.COST] ?? 0,
		currency
	};

	if (existing?.typ === ENUM_HOTEL_ROOM_CHARGE.PER_DURATION) {
		return {
			typ: ENUM_HOTEL_ROOM_CHARGE.PER_DURATION,
			rate: {
				typ: ENUM_SUPPLIER_SURCHARGE.FIXED,
				cost: money
			},
			fees: fees.length ? fees : null,
			markup
		};
	}

	return {
		typ: ENUM_HOTEL_ROOM_CHARGE.FIXED,
		cost: money,
		fees: fees.length ? fees : null,
		markup
	};
};

const mapWholeCharge = (
	pricing: THotelProductPricingSchema
): TSupplierVariantCharge => {
	const currency =
		pricing[ENUM_HOTEL_PRODUCT_PRICING_FIELD.CURRENCY] ||
		DEFAULT_EVENT_CURRENCY;
	const fees = pricing[ENUM_HOTEL_PRODUCT_PRICING_FIELD.FEES] ?? [];
	const money = {
		val: pricing[ENUM_HOTEL_PRODUCT_PRICING_FIELD.TOTAL_PRICE] ?? 0,
		currency
	};
	const markup = mapMarkupFormToDomain(
		pricing[ENUM_HOTEL_PRODUCT_PRICING_FIELD.MARKUP] ?? null,
		currency,
		pricing[ENUM_HOTEL_PRODUCT_PRICING_FIELD.ADD_MARGIN_SEPARATELY]
	);

	if (
		pricing[ENUM_HOTEL_PRODUCT_PRICING_FIELD.PRICING_TYPE] ===
		ENUM_HOTEL_PRODUCT_PRICING_TYPE.PER_PERSON
	) {
		return {
			typ: "per_person",
			costPerPerson: money,
			fees: fees.length ? fees : null,
			markup
		};
	}

	return {
		typ: "fixed",
		cost: money,
		fees: fees.length ? fees : null,
		markup
	};
};

const mapSeasonsToSwitch = (variant: IHotelVariant | undefined) =>
	(variant?.rooms[0]?.rates ?? []).map((rate) => ({
		from_date: rate.fromDate,
		to_date: rate.toDate,
		charge: mapHotelRoomChargeToBackend(rate.expenses)
	}));

export const mapHotelEditFormToPricingSwitch = (
	values: THotelProductEditSchema,
	product: IHotelProduct
): THotelPricingSwitchBackend => {
	const rooms =
		values[ENUM_FORM_HOTEL_SECTION.ROOMS][
			ENUM_FORM_HOTEL_PRODUCT_ROOMS.ROOMS_LIST
		];
	const pricing = values[ENUM_FORM_HOTEL_SECTION.PRICING];
	const addMargin =
		pricing[ENUM_HOTEL_PRODUCT_PRICING_FIELD.ADD_MARGIN_SEPARATELY];
	const pricingType = pricing[ENUM_HOTEL_PRODUCT_PRICING_FIELD.PRICING_TYPE];

	if (pricingType === ENUM_HOTEL_PRODUCT_PRICING_TYPE.PER_ROOM) {
		const aligned = alignHotelPerRoomExpenses({
			priceBasedOnClass:
				pricing[ENUM_HOTEL_PRODUCT_PRICING_FIELD.PRICE_BASED_ON_CLASS],
			roomsListLength: rooms.length,
			current: pricing[ENUM_HOTEL_PRODUCT_PRICING_FIELD.EXPENSES]
		});

		const switchedRooms: RoomRateSwitch[] = rooms.flatMap((row, index) => {
			const variant = product.variants.find(
				(item) =>
					item.id === row[ENUM_FORM_HOTEL_PRODUCT_ROOMS.VARIANT_ID]
			);
			const roomId = variant?.rooms[0]?.id;
			if (!roomId) return [];

			const priceRow =
				aligned.typ === ENUM_HOTEL_PRODUCT_EXPENSE_TYP.PER_ROOM
					? aligned[ENUM_HOTEL_PRODUCT_PER_ROOM_EXPENSES_FIELD.ROOMS][
							index
						]
					: aligned[ENUM_HOTEL_PRODUCT_PER_ROOM_EXPENSES_FIELD.ROOMS][
							index
						]?.[
							ENUM_HOTEL_PRODUCT_PER_ROOM_EXPENSES_FIELD
								.CATEGORIES
						]?.[0];

			return [
				{
					room_id: roomId,
					rate: {
						base: mapHotelRoomChargeToBackend(
							mapRowToRoomCharge(
								priceRow,
								variant?.rooms[0]?.expenses,
								addMargin
							)
						),
						seasons: mapSeasonsToSwitch(variant)
					}
				}
			];
		});

		return {
			typ: ENUM_SUPPLIER_TYPE.HOTEL,
			to: ENUM_HOTEL_PRICING.PER_ROOM,
			rooms: switchedRooms
		};
	}

	const price: StayRateInput = {
		base: mapSupplierVariantChargeToBackend(mapWholeCharge(pricing)),
		seasons: product.stayRate?.seasons ?? []
	};

	return {
		typ: ENUM_SUPPLIER_TYPE.HOTEL,
		to: ENUM_HOTEL_PRICING.WHOLE,
		price
	};
};

export const isHotelWholePricingType = (
	pricingType: THotelProductPricingSchema["pricing_type"]
) =>
	pricingType === ENUM_HOTEL_PRODUCT_PRICING_TYPE.FLAT_RATE ||
	pricingType === ENUM_HOTEL_PRODUCT_PRICING_TYPE.PER_PERSON;

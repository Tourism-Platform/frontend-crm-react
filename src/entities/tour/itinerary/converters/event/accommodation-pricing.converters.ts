import { Currency, HousingRoomTypes } from "@/shared/api";
import type {
	DurationChargeOutput,
	FixedChargeInput,
	HousingDetailsOutput,
	PricedCategoryOutput,
	PricedRoomOutput
} from "@/shared/api";

import {
	type ENUM_CURRENCY_OPTIONS_TYPE,
	currencyConverter
} from "@/entities/commission";

import {
	ENUM_ACCOMMODATION_CATEGORY_ROW_FIELD,
	ENUM_ACCOMMODATION_CHARGE,
	ENUM_ACCOMMODATION_EXPENSE_TYP,
	ENUM_ACCOMMODATION_MARKUP_TYP,
	ENUM_ACCOMMODATION_PER_ROOM_EXPENSES_FIELD,
	ENUM_ACCOMMODATION_PRICE_ROW_FIELD,
	ENUM_ACCOMMODATION_PRICING_FIELD,
	ENUM_ACCOMMODATION_PRICING_INVOICING,
	ENUM_ACCOMMODATION_PRICING_TYPE,
	ENUM_FORM_ROOMS,
	ENUM_HOUSING_ROOM_TYPE,
	type ENUM_HOUSING_ROOM_TYPE_TYPE,
	type IAccommodationCategoryPriceRow,
	type IAccommodationPerRoomByClassPriceRow,
	type IAccommodationPerRoomCategoryExpenses,
	type IAccommodationPerRoomExpenses,
	type IAccommodationPerRoomPriceRow,
	type IAccommodationPriceRowMarkup,
	type IFeeFormRow,
	type TAccommodationPricingSchema,
	type TCommissionMarkupBackend,
	type TCommissionMarkupInputBackend,
	type THousingRoomBaseChargeBackend,
	type THousingSpecInputBackend,
	type TRoomsSchema
} from "../../types";

import { isClassPricedHousingSpec } from "./accommodation-rooms.converters";
import { mapFeesFromBackend, mapFeesToBackend } from "./fees.converters";
import { isInheritedHousingDetails } from "./housing-details.helpers";
import { housingRoomTypeConverter } from "./housing-room-type.converters";
import { zeroFixedCharge } from "./zero-fixed-charge.helpers";

type TRoomsList = TRoomsSchema[typeof ENUM_FORM_ROOMS.ROOMS_LIST];

/**
 * The form captures neither a room's `typ` nor its `pax`, but
 * `PricedRoomInput` / `Room` require both — contract gap bridged with a
 * documented default (double room for two).
 */
const DEFAULT_ROOM_TYP = HousingRoomTypes.Double;
const DEFAULT_ROOM_PAX = 2;

const isHousingRoomType = (
	value: string
): value is ENUM_HOUSING_ROOM_TYPE_TYPE =>
	Object.values(ENUM_HOUSING_ROOM_TYPE).some((v) => v === value);

const createEmptyPerRoomPriceRow = (): IAccommodationPerRoomPriceRow => ({
	[ENUM_ACCOMMODATION_PRICE_ROW_FIELD.COST]: null,
	[ENUM_ACCOMMODATION_PRICE_ROW_FIELD.FEES]: [],
	[ENUM_ACCOMMODATION_PRICE_ROW_FIELD.CURRENCY]: undefined,
	[ENUM_ACCOMMODATION_PRICE_ROW_FIELD.MARKUP]: null
});

const createEmptyCategoryRow = (): IAccommodationCategoryPriceRow => ({
	[ENUM_ACCOMMODATION_CATEGORY_ROW_FIELD.NAME]: "",
	[ENUM_ACCOMMODATION_CATEGORY_ROW_FIELD.COST]: null,
	[ENUM_ACCOMMODATION_CATEGORY_ROW_FIELD.FEES]: [],
	[ENUM_ACCOMMODATION_CATEGORY_ROW_FIELD.CURRENCY]: undefined,
	[ENUM_ACCOMMODATION_CATEGORY_ROW_FIELD.MARKUP]: null
});

const createEmptyPerRoomByClassPriceRow =
	(): IAccommodationPerRoomByClassPriceRow => ({
		[ENUM_ACCOMMODATION_PER_ROOM_EXPENSES_FIELD.CATEGORIES]: [
			createEmptyCategoryRow()
		]
	});

const mapCostFromDurationRate = (
	charge: DurationChargeOutput
): {
	cost: number | null;
	currency: ENUM_CURRENCY_OPTIONS_TYPE | undefined;
} => {
	const rate = charge.rate;
	if (rate.typ === "per_group") {
		const tier = rate.tiers?.[0];
		return {
			cost: tier?.cost?.val ?? null,
			currency: currencyConverter.from(tier?.cost?.currency)
		};
	}
	if (rate.typ === "per_person") {
		return {
			cost: rate.cost_per_person?.val ?? null,
			currency: currencyConverter.from(rate.cost_per_person?.currency)
		};
	}
	return {
		cost: rate.cost?.val ?? null,
		currency: currencyConverter.from(rate.cost?.currency)
	};
};

const mapPriceRowFromCharge = (
	charge?: THousingRoomBaseChargeBackend | null
): Pick<
	IAccommodationPerRoomPriceRow,
	| typeof ENUM_ACCOMMODATION_PRICE_ROW_FIELD.COST
	| typeof ENUM_ACCOMMODATION_PRICE_ROW_FIELD.FEES
	| typeof ENUM_ACCOMMODATION_PRICE_ROW_FIELD.CURRENCY
> => {
	if (!charge) {
		return {
			[ENUM_ACCOMMODATION_PRICE_ROW_FIELD.COST]: null,
			[ENUM_ACCOMMODATION_PRICE_ROW_FIELD.FEES]: [],
			[ENUM_ACCOMMODATION_PRICE_ROW_FIELD.CURRENCY]: undefined
		};
	}

	if (charge.typ === "per_duration") {
		return {
			[ENUM_ACCOMMODATION_PRICE_ROW_FIELD.COST]:
				charge.rate.cost?.val ?? null,
			[ENUM_ACCOMMODATION_PRICE_ROW_FIELD.FEES]: mapFeesFromBackend(
				charge.fees
			),
			[ENUM_ACCOMMODATION_PRICE_ROW_FIELD.CURRENCY]:
				currencyConverter.from(charge.rate.cost?.currency)
		};
	}

	return {
		[ENUM_ACCOMMODATION_PRICE_ROW_FIELD.COST]: charge.cost?.val ?? null,
		[ENUM_ACCOMMODATION_PRICE_ROW_FIELD.FEES]: mapFeesFromBackend(
			charge.fees
		),
		[ENUM_ACCOMMODATION_PRICE_ROW_FIELD.CURRENCY]: currencyConverter.from(
			charge.cost?.currency
		)
	};
};

const mapMarkupFromBackend = (
	markup?: TCommissionMarkupBackend | null
): IAccommodationPriceRowMarkup | null => {
	if (!markup) return null;
	if (markup.typ === "percentage") {
		return {
			typ: ENUM_ACCOMMODATION_MARKUP_TYP.PERCENTAGE,
			value: String((markup.percentage ?? 0) * 100)
		};
	}
	return {
		typ: ENUM_ACCOMMODATION_MARKUP_TYP.FIXED,
		value: String(markup.cost?.val ?? "")
	};
};

const mapPerRoomPriceFromBackend = (
	room: PricedRoomOutput
): IAccommodationPerRoomPriceRow => ({
	...mapPriceRowFromCharge(room.rate?.base),
	[ENUM_ACCOMMODATION_PRICE_ROW_FIELD.MARKUP]: mapMarkupFromBackend(
		room.rate?.base?.markup
	)
});

const mapCategoryRowFromBackend = (
	room?: PricedRoomOutput | null
): IAccommodationCategoryPriceRow => ({
	[ENUM_ACCOMMODATION_CATEGORY_ROW_FIELD.NAME]:
		room?.name ?? housingRoomTypeConverter.from(room?.typ) ?? "",
	...mapPriceRowFromCharge(room?.rate?.base),
	[ENUM_ACCOMMODATION_CATEGORY_ROW_FIELD.MARKUP]: mapMarkupFromBackend(
		room?.rate?.base?.markup
	)
});

const mapPerRoomByClassPriceFromBackend = (
	category?: PricedCategoryOutput | null
): IAccommodationPerRoomByClassPriceRow => ({
	[ENUM_ACCOMMODATION_PER_ROOM_EXPENSES_FIELD.CATEGORIES]: category?.rooms
		?.length
		? category.rooms.map((room) => mapCategoryRowFromBackend(room))
		: [createEmptyCategoryRow()]
});

const alignPerRoomPriceRows = (
	roomsListLength: number,
	existing: IAccommodationPerRoomPriceRow[] = [],
	apiRows?: PricedRoomOutput[] | null
): IAccommodationPerRoomPriceRow[] =>
	Array.from({ length: roomsListLength }, (_, index) => {
		if (existing[index]) {
			return existing[index];
		}
		if (apiRows?.[index]) {
			return mapPerRoomPriceFromBackend(apiRows[index]);
		}
		return createEmptyPerRoomPriceRow();
	});

const alignPerRoomByClassPriceRows = (
	roomsListLength: number,
	existing: IAccommodationPerRoomByClassPriceRow[] = [],
	apiRows?: PricedCategoryOutput[] | null
): IAccommodationPerRoomByClassPriceRow[] =>
	Array.from({ length: roomsListLength }, (_, index) => {
		const row = existing[index];
		if (row) {
			return row;
		}
		if (apiRows?.[index]) {
			return mapPerRoomByClassPriceFromBackend(apiRows[index]);
		}
		return createEmptyPerRoomByClassPriceRow();
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
	markup: IAccommodationPriceRowMarkup | null,
	rowCurrency: ENUM_CURRENCY_OPTIONS_TYPE | undefined,
	addMarginSeparately: boolean
): TCommissionMarkupInputBackend | null => {
	if (!addMarginSeparately || !markup?.value) return null;
	if (markup.typ === ENUM_ACCOMMODATION_MARKUP_TYP.PERCENTAGE) {
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
): FixedChargeInput | undefined => {
	const costExpense = mapAmountToFixedExpense(cost, currency);
	if (!costExpense) return undefined;

	return {
		typ: "fixed",
		cost: costExpense,
		fees: mapFeesToBackend(fees),
		markup
	};
};

const applyMarkupToPerRoomExpenses = (
	expenses:
		| IAccommodationPerRoomExpenses
		| IAccommodationPerRoomCategoryExpenses,
	addMarginSeparately: boolean
): IAccommodationPerRoomExpenses | IAccommodationPerRoomCategoryExpenses => {
	if (!addMarginSeparately) {
		if (expenses.typ === ENUM_ACCOMMODATION_EXPENSE_TYP.PER_ROOM) {
			return {
				...expenses,
				[ENUM_ACCOMMODATION_PER_ROOM_EXPENSES_FIELD.ROOMS]: expenses[
					ENUM_ACCOMMODATION_PER_ROOM_EXPENSES_FIELD.ROOMS
				].map((room) => ({
					...room,
					[ENUM_ACCOMMODATION_PRICE_ROW_FIELD.MARKUP]: null
				}))
			};
		}

		return {
			...expenses,
			[ENUM_ACCOMMODATION_PER_ROOM_EXPENSES_FIELD.ROOMS]: expenses[
				ENUM_ACCOMMODATION_PER_ROOM_EXPENSES_FIELD.ROOMS
			].map((room) => ({
				...room,
				[ENUM_ACCOMMODATION_PER_ROOM_EXPENSES_FIELD.CATEGORIES]: room[
					ENUM_ACCOMMODATION_PER_ROOM_EXPENSES_FIELD.CATEGORIES
				].map((category) => ({
					...category,
					[ENUM_ACCOMMODATION_CATEGORY_ROW_FIELD.MARKUP]: null
				}))
			}))
		};
	}

	return expenses;
};

const hasAnyMarkup = (
	rows: {
		[ENUM_ACCOMMODATION_PRICE_ROW_FIELD.MARKUP]: IAccommodationPriceRowMarkup | null;
	}[]
) => rows.some((row) => row[ENUM_ACCOMMODATION_PRICE_ROW_FIELD.MARKUP]?.value);

export const alignAccommodationPerRoomExpenses = (options: {
	priceBasedOnClass: boolean;
	roomsListLength: number;
	current?:
		| IAccommodationPerRoomExpenses
		| IAccommodationPerRoomCategoryExpenses
		| null;
	addMarginSeparately?: boolean;
}): IAccommodationPerRoomExpenses | IAccommodationPerRoomCategoryExpenses => {
	const { priceBasedOnClass, roomsListLength, current, addMarginSeparately } =
		options;

	let aligned:
		| IAccommodationPerRoomExpenses
		| IAccommodationPerRoomCategoryExpenses;

	if (priceBasedOnClass) {
		const existing =
			current?.typ === ENUM_ACCOMMODATION_EXPENSE_TYP.PER_ROOM_CATEGORY
				? current[ENUM_ACCOMMODATION_PER_ROOM_EXPENSES_FIELD.ROOMS]
				: [];

		aligned = {
			typ: ENUM_ACCOMMODATION_EXPENSE_TYP.PER_ROOM_CATEGORY,
			[ENUM_ACCOMMODATION_PER_ROOM_EXPENSES_FIELD.ROOMS]:
				alignPerRoomByClassPriceRows(roomsListLength, existing)
		};
	} else {
		const existing =
			current?.typ === ENUM_ACCOMMODATION_EXPENSE_TYP.PER_ROOM
				? current[ENUM_ACCOMMODATION_PER_ROOM_EXPENSES_FIELD.ROOMS]
				: [];

		aligned = {
			typ: ENUM_ACCOMMODATION_EXPENSE_TYP.PER_ROOM,
			[ENUM_ACCOMMODATION_PER_ROOM_EXPENSES_FIELD.ROOMS]:
				alignPerRoomPriceRows(roomsListLength, existing)
		};
	}

	if (addMarginSeparately === undefined) {
		return aligned;
	}

	return applyMarkupToPerRoomExpenses(aligned, addMarginSeparately);
};

export const getDefaultAccommodationPricing = (
	roomsList: TRoomsList = []
): TAccommodationPricingSchema => ({
	invoicing: ENUM_ACCOMMODATION_PRICING_INVOICING.INDIVIDUAL,
	pricing_type: ENUM_ACCOMMODATION_PRICING_TYPE.FLAT_RATE,
	price_based_on_class: false,
	add_margin_separately: false,
	expenses: alignAccommodationPerRoomExpenses({
		priceBasedOnClass: false,
		roomsListLength: roomsList.length
	}),
	[ENUM_ACCOMMODATION_PRICING_FIELD.MARKUP]: null,
	[ENUM_ACCOMMODATION_PRICING_FIELD.CHARGE_TYP]:
		ENUM_ACCOMMODATION_CHARGE.FIXED,
	package_id: ""
});

/**
 * Pricing section of the form, read from `details.spec` (contract 3.1):
 * - `{ pricing: "per_room" }` — per-room rows (flat or by class);
 * - `{ pricing: "whole" }` — `price.base` maps to flat-rate (fixed /
 *   per-duration) or per-person form rows.
 */
export const mapAccommodationPricingFromBackend = (
	details?: HousingDetailsOutput | null,
	roomsList: TRoomsList = []
): TAccommodationPricingSchema => {
	if (!details || isInheritedHousingDetails(details)) {
		return getDefaultAccommodationPricing(roomsList);
	}

	const spec = details.spec;
	const defaults = getDefaultAccommodationPricing(roomsList);

	if (!spec) {
		return defaults;
	}

	if (spec.pricing === "per_room") {
		if (isClassPricedHousingSpec(spec)) {
			const rooms = alignPerRoomByClassPriceRows(
				roomsList.length,
				[],
				spec.categories
			);
			const categories = rooms.flatMap(
				(room) =>
					room[ENUM_ACCOMMODATION_PER_ROOM_EXPENSES_FIELD.CATEGORIES]
			);
			return {
				...defaults,
				pricing_type: ENUM_ACCOMMODATION_PRICING_TYPE.PER_ROOM,
				price_based_on_class: true,
				add_margin_separately: hasAnyMarkup(categories),
				expenses: {
					typ: ENUM_ACCOMMODATION_EXPENSE_TYP.PER_ROOM_CATEGORY,
					[ENUM_ACCOMMODATION_PER_ROOM_EXPENSES_FIELD.ROOMS]: rooms
				}
			};
		}

		const rooms = alignPerRoomPriceRows(
			roomsList.length,
			[],
			spec.categories[0]?.rooms
		);
		return {
			...defaults,
			pricing_type: ENUM_ACCOMMODATION_PRICING_TYPE.PER_ROOM,
			price_based_on_class: false,
			add_margin_separately: hasAnyMarkup(rooms),
			expenses: {
				typ: ENUM_ACCOMMODATION_EXPENSE_TYP.PER_ROOM,
				[ENUM_ACCOMMODATION_PER_ROOM_EXPENSES_FIELD.ROOMS]: rooms
			}
		};
	}

	const base = spec.price?.base;
	if (!base) {
		return defaults;
	}

	if (base.typ === "fixed") {
		const markup = mapMarkupFromBackend(base.markup);
		return {
			...defaults,
			pricing_type: ENUM_ACCOMMODATION_PRICING_TYPE.FLAT_RATE,
			[ENUM_ACCOMMODATION_PRICING_FIELD.CHARGE_TYP]:
				ENUM_ACCOMMODATION_CHARGE.FIXED,
			add_margin_separately: Boolean(markup?.value),
			[ENUM_ACCOMMODATION_PRICING_FIELD.MARKUP]: markup,
			...(base.cost?.val != null && {
				total_price: base.cost.val
			}),
			[ENUM_ACCOMMODATION_PRICING_FIELD.FEES]: mapFeesFromBackend(
				base.fees
			),
			...(base.cost?.currency && {
				currency: base.cost.currency
			})
		};
	}

	if (base.typ === "per_duration") {
		const { cost, currency } = mapCostFromDurationRate(base);
		const markup = mapMarkupFromBackend(base.markup);
		return {
			...defaults,
			pricing_type: ENUM_ACCOMMODATION_PRICING_TYPE.FLAT_RATE,
			[ENUM_ACCOMMODATION_PRICING_FIELD.CHARGE_TYP]:
				ENUM_ACCOMMODATION_CHARGE.PER_DURATION,
			add_margin_separately: Boolean(markup?.value),
			[ENUM_ACCOMMODATION_PRICING_FIELD.MARKUP]: markup,
			...(cost != null && { total_price: cost }),
			[ENUM_ACCOMMODATION_PRICING_FIELD.FEES]: mapFeesFromBackend(
				base.fees
			),
			...(currency && { currency })
		};
	}

	const perPersonMarkup = mapMarkupFromBackend(base.markup);
	return {
		...defaults,
		pricing_type: ENUM_ACCOMMODATION_PRICING_TYPE.PER_PERSON,
		add_margin_separately: Boolean(perPersonMarkup?.value),
		[ENUM_ACCOMMODATION_PRICING_FIELD.MARKUP]: perPersonMarkup,
		...(base.cost_per_person?.val != null && {
			total_price: base.cost_per_person.val
		}),
		[ENUM_ACCOMMODATION_PRICING_FIELD.FEES]: mapFeesFromBackend(base.fees),
		...(base.cost_per_person?.currency && {
			currency: base.cost_per_person.currency
		})
	};
};

/**
 * Rooms without a price of their own (part-of-package stays, or pricing
 * left untouched): a per-room spec whose rooms carry a zero-valued fixed
 * rate — the 3.1 contract requires a rate per room, so the old "rooms with
 * no expenses" intent is bridged with an explicit zero.
 */
const mapRoomsOnlySpec = (
	roomsList: TRoomsList
): THousingSpecInputBackend | undefined =>
	roomsList.length
		? {
				pricing: "per_room",
				categories: [
					{
						name: null,
						rooms: roomsList.map((room) => ({
							...(room[ENUM_FORM_ROOMS.ID]
								? { id: room[ENUM_FORM_ROOMS.ID] }
								: {}),
							typ: DEFAULT_ROOM_TYP,
							pax: DEFAULT_ROOM_PAX,
							name: room.room_name || null,
							description: room.description || null,
							rate: { base: zeroFixedCharge(undefined) }
						}))
					}
				]
			}
		: undefined;

/**
 * Write-side housing spec for `supply.inline.spec` (contract 3.1). The
 * descriptive fields (location / stars / amenities) are merged in by the
 * event converter. When no price is constructible the rooms are still
 * stated (zero-rated) rather than dropped; with no rooms either, no spec
 * is returned and the caller omits `supply` so the backend keeps the
 * current one.
 */
export const mapAccommodationPricingToBackend = (
	pricing?: TAccommodationPricingSchema,
	roomsList: TRoomsList = []
): { spec?: THousingSpecInputBackend } => {
	if (
		!pricing ||
		pricing.invoicing !== ENUM_ACCOMMODATION_PRICING_INVOICING.INDIVIDUAL
	) {
		return { spec: mapRoomsOnlySpec(roomsList) };
	}

	if (pricing.pricing_type === ENUM_ACCOMMODATION_PRICING_TYPE.PER_ROOM) {
		const addMargin = pricing.add_margin_separately;
		const aligned = alignAccommodationPerRoomExpenses({
			priceBasedOnClass: pricing.price_based_on_class,
			roomsListLength: roomsList.length,
			current: pricing.expenses
		});

		if (pricing.price_based_on_class) {
			const rows =
				aligned.typ === ENUM_ACCOMMODATION_EXPENSE_TYP.PER_ROOM_CATEGORY
					? aligned[ENUM_ACCOMMODATION_PER_ROOM_EXPENSES_FIELD.ROOMS]
					: [];

			return {
				spec: {
					pricing: "per_room",
					categories: roomsList.map((room, index) => ({
						...(room[ENUM_FORM_ROOMS.ID]
							? { id: room[ENUM_FORM_ROOMS.ID] }
							: {}),
						name: room.room_name || null,
						rooms: (
							rows[index]?.[
								ENUM_ACCOMMODATION_PER_ROOM_EXPENSES_FIELD
									.CATEGORIES
							] ?? []
						).map((category) => {
							const rowCurrency =
								category[
									ENUM_ACCOMMODATION_CATEGORY_ROW_FIELD
										.CURRENCY
								];
							const categoryName =
								category[
									ENUM_ACCOMMODATION_CATEGORY_ROW_FIELD.NAME
								];
							return {
								typ:
									(isHousingRoomType(categoryName)
										? housingRoomTypeConverter.to(
												categoryName
											)
										: undefined) ?? DEFAULT_ROOM_TYP,
								pax: DEFAULT_ROOM_PAX,
								rate: {
									base:
										mapToFixedCharge(
											category[
												ENUM_ACCOMMODATION_CATEGORY_ROW_FIELD
													.COST
											],
											category[
												ENUM_ACCOMMODATION_CATEGORY_ROW_FIELD
													.FEES
											],
											rowCurrency,
											mapMarkupToBackend(
												category[
													ENUM_ACCOMMODATION_CATEGORY_ROW_FIELD
														.MARKUP
												],
												rowCurrency,
												addMargin
											)
										) ?? zeroFixedCharge(rowCurrency)
								}
							};
						})
					}))
				}
			};
		}

		const rows =
			aligned.typ === ENUM_ACCOMMODATION_EXPENSE_TYP.PER_ROOM
				? aligned[ENUM_ACCOMMODATION_PER_ROOM_EXPENSES_FIELD.ROOMS]
				: [];

		return {
			spec: {
				pricing: "per_room",
				...(roomsList.length
					? {
							categories: [
								{
									name: null,
									rooms: roomsList.map((room, index) => {
										const priceRow =
											rows[index] ??
											createEmptyPerRoomPriceRow();
										const rowCurrency =
											priceRow[
												ENUM_ACCOMMODATION_PRICE_ROW_FIELD
													.CURRENCY
											];
										return {
											...(room[ENUM_FORM_ROOMS.ID]
												? {
														id: room[
															ENUM_FORM_ROOMS.ID
														]
													}
												: {}),
											typ: DEFAULT_ROOM_TYP,
											pax: DEFAULT_ROOM_PAX,
											name: room.room_name || null,
											description:
												room.description || null,
											rate: {
												base:
													mapToFixedCharge(
														priceRow[
															ENUM_ACCOMMODATION_PRICE_ROW_FIELD
																.COST
														],
														priceRow[
															ENUM_ACCOMMODATION_PRICE_ROW_FIELD
																.FEES
														],
														rowCurrency,
														mapMarkupToBackend(
															priceRow[
																ENUM_ACCOMMODATION_PRICE_ROW_FIELD
																	.MARKUP
															],
															rowCurrency,
															addMargin
														)
													) ??
													zeroFixedCharge(rowCurrency)
											}
										};
									})
								}
							]
						}
					: {})
			}
		};
	}

	const totalPrice = pricing[ENUM_ACCOMMODATION_PRICING_FIELD.TOTAL_PRICE];
	const currency = pricing[ENUM_ACCOMMODATION_PRICING_FIELD.CURRENCY];
	const fees = mapFeesToBackend(
		pricing[ENUM_ACCOMMODATION_PRICING_FIELD.FEES]
	);

	if (totalPrice == null || !currency) {
		return { spec: mapRoomsOnlySpec(roomsList) };
	}

	const cost = {
		val: totalPrice,
		currency: currencyConverter.to(currency) ?? Currency.USD
	};
	const markup = mapMarkupToBackend(
		pricing[ENUM_ACCOMMODATION_PRICING_FIELD.MARKUP] ?? null,
		currency,
		pricing.add_margin_separately
	);
	const categories = roomsList.length
		? [
				{
					name: null,
					rooms: roomsList.map((room) => ({
						...(room[ENUM_FORM_ROOMS.ID]
							? { id: room[ENUM_FORM_ROOMS.ID] }
							: {}),
						typ: DEFAULT_ROOM_TYP,
						pax: DEFAULT_ROOM_PAX,
						name: room.room_name || null,
						description: room.description || null
					}))
				}
			]
		: undefined;

	if (pricing.pricing_type === ENUM_ACCOMMODATION_PRICING_TYPE.FLAT_RATE) {
		if (
			pricing[ENUM_ACCOMMODATION_PRICING_FIELD.CHARGE_TYP] ===
			ENUM_ACCOMMODATION_CHARGE.PER_DURATION
		) {
			return {
				spec: {
					pricing: "whole",
					price: {
						base: {
							typ: "per_duration",
							rate: { typ: "fixed", cost },
							fees,
							markup
						}
					},
					...(categories && { categories })
				}
			};
		}

		return {
			spec: {
				pricing: "whole",
				price: { base: { typ: "fixed", cost, fees, markup } },
				...(categories && { categories })
			}
		};
	}

	return {
		spec: {
			pricing: "whole",
			price: {
				base: { typ: "per_person", cost_per_person: cost, fees, markup }
			},
			...(categories && { categories })
		}
	};
};

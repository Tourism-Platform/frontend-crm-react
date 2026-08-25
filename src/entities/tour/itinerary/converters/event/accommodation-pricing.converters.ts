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
	type TCustomHousingDetailsInputBackend,
	type TDurationChargeBackend,
	type TFixedChargeBackend,
	type TFixedExpenseInputBackend,
	type THousingDetailsBackend,
	type THousingRoomCategoryBackend,
	type THousingRoomCategoryExpensesBackend,
	type THousingRoomChargeInputBackend,
	type THousingRoomExpensesBackend,
	type TPerRoomCategoryExpensesBackend,
	type TPerRoomExpensesBackend,
	type TRoomsSchema
} from "../../types";

import { mapFeesFromBackend, mapFeesToBackend } from "./fees.converters";
import { isInheritedHousingDetails } from "./housing-details.helpers";
import { housingRoomTypeConverter } from "./housing-room-type.converters";

type TRoomsList = TRoomsSchema[typeof ENUM_FORM_ROOMS.ROOMS_LIST];

type THousingRoomChargeBackend = TFixedChargeBackend | TDurationChargeBackend;

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
	charge: TDurationChargeBackend
): {
	cost: number | null;
	currency: ENUM_CURRENCY_OPTIONS_TYPE | undefined;
} => {
	const rate = charge.rate;
	if (rate && "tiers" in rate) {
		const tier = rate.tiers?.[0];
		return {
			cost: tier?.cost?.val ?? null,
			currency: currencyConverter.from(tier?.cost?.currency)
		};
	}
	if (rate && "cost" in rate) {
		return {
			cost: rate.cost?.val ?? null,
			currency: currencyConverter.from(rate.cost?.currency)
		};
	}
	return { cost: null, currency: undefined };
};

const mapPriceRowFromCharge = (
	charge?: THousingRoomChargeBackend | null
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

	if (charge.typ === "per_duration" || "rate" in charge) {
		const duration = charge as TDurationChargeBackend;
		const { cost, currency } = mapCostFromDurationRate(duration);
		return {
			[ENUM_ACCOMMODATION_PRICE_ROW_FIELD.COST]: cost,
			[ENUM_ACCOMMODATION_PRICE_ROW_FIELD.FEES]: mapFeesFromBackend(
				duration.fees
			),
			[ENUM_ACCOMMODATION_PRICE_ROW_FIELD.CURRENCY]: currency
		};
	}

	const fixed = charge as TFixedChargeBackend;
	return {
		[ENUM_ACCOMMODATION_PRICE_ROW_FIELD.COST]: fixed.cost?.val ?? null,
		[ENUM_ACCOMMODATION_PRICE_ROW_FIELD.FEES]: mapFeesFromBackend(
			fixed.fees
		),
		[ENUM_ACCOMMODATION_PRICE_ROW_FIELD.CURRENCY]: currencyConverter.from(
			fixed.cost?.currency
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
	room: THousingRoomExpensesBackend
): IAccommodationPerRoomPriceRow => ({
	...mapPriceRowFromCharge(room.expenses),
	[ENUM_ACCOMMODATION_PRICE_ROW_FIELD.MARKUP]: mapMarkupFromBackend(
		room.expenses?.markup
	)
});

const mapCategoryRowFromBackend = (
	room?: THousingRoomCategoryBackend | null
): IAccommodationCategoryPriceRow => ({
	[ENUM_ACCOMMODATION_CATEGORY_ROW_FIELD.NAME]:
		housingRoomTypeConverter.from(room?.typ) ?? "",
	...mapPriceRowFromCharge(room?.expenses),
	[ENUM_ACCOMMODATION_CATEGORY_ROW_FIELD.MARKUP]: mapMarkupFromBackend(
		room?.expenses?.markup
	)
});

const mapPerRoomByClassPriceFromBackend = (
	category?: THousingRoomCategoryExpensesBackend | null
): IAccommodationPerRoomByClassPriceRow => ({
	[ENUM_ACCOMMODATION_PER_ROOM_EXPENSES_FIELD.CATEGORIES]: category?.rooms
		?.length
		? category.rooms.map((room) => mapCategoryRowFromBackend(room))
		: [createEmptyCategoryRow()]
});

const alignPerRoomPriceRows = (
	roomsListLength: number,
	existing: IAccommodationPerRoomPriceRow[] = [],
	apiRows?: THousingRoomExpensesBackend[] | null
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
	apiRows?: THousingRoomCategoryExpensesBackend[] | null
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
): TFixedExpenseInputBackend | undefined => {
	if (amount == null || !Number.isFinite(amount) || !amount || !currency) {
		return undefined;
	}
	return {
		typ: "fixed",
		cost: {
			val: amount,
			currency: currencyConverter.to(currency)!
		}
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
			currency: currencyConverter.to(rowCurrency)!
		}
	};
};

const mapToFixedCharge = (
	cost: number | null,
	fees: IFeeFormRow[],
	currency: ENUM_CURRENCY_OPTIONS_TYPE | undefined,
	markup: TCommissionMarkupInputBackend | null
): Extract<THousingRoomChargeInputBackend, { typ: "fixed" }> | undefined => {
	const costExpense = mapAmountToFixedExpense(cost, currency);
	if (!costExpense) return undefined;

	const result: Extract<THousingRoomChargeInputBackend, { typ: "fixed" }> = {
		typ: "fixed",
		cost: costExpense.cost,
		fees: mapFeesToBackend(fees),
		markup
	};
	return result;
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

export const mapAccommodationPricingFromBackend = (
	details?: THousingDetailsBackend | null,
	roomsList: TRoomsList = []
): TAccommodationPricingSchema => {
	if (!details || isInheritedHousingDetails(details)) {
		return getDefaultAccommodationPricing(roomsList);
	}

	const expenses = details.expenses;
	const defaults = getDefaultAccommodationPricing(roomsList);

	if (!expenses) {
		return defaults;
	}

	if (expenses.typ === "per_room") {
		const perRoom = expenses as TPerRoomExpensesBackend;
		const rooms = alignPerRoomPriceRows(
			roomsList.length,
			[],
			perRoom.rooms
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

	if (expenses.typ === "per_room_category") {
		const perRoomCategory = expenses as TPerRoomCategoryExpensesBackend;
		const rooms = alignPerRoomByClassPriceRows(
			roomsList.length,
			[],
			perRoomCategory.categories
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

	if (expenses.typ === "fixed") {
		const markup = mapMarkupFromBackend(expenses.markup);
		return {
			...defaults,
			pricing_type: ENUM_ACCOMMODATION_PRICING_TYPE.FLAT_RATE,
			[ENUM_ACCOMMODATION_PRICING_FIELD.CHARGE_TYP]:
				ENUM_ACCOMMODATION_CHARGE.FIXED,
			add_margin_separately: Boolean(markup?.value),
			[ENUM_ACCOMMODATION_PRICING_FIELD.MARKUP]: markup,
			...(expenses.cost?.val != null && {
				total_price: expenses.cost.val
			}),
			[ENUM_ACCOMMODATION_PRICING_FIELD.FEES]: mapFeesFromBackend(
				expenses.fees
			),
			...(expenses.cost?.currency && {
				currency: expenses.cost.currency
			})
		};
	}

	if (expenses.typ === "per_duration") {
		const duration = expenses as TDurationChargeBackend;
		const { cost, currency } = mapCostFromDurationRate(duration);
		const markup = mapMarkupFromBackend(duration.markup);
		return {
			...defaults,
			pricing_type: ENUM_ACCOMMODATION_PRICING_TYPE.FLAT_RATE,
			[ENUM_ACCOMMODATION_PRICING_FIELD.CHARGE_TYP]:
				ENUM_ACCOMMODATION_CHARGE.PER_DURATION,
			add_margin_separately: Boolean(markup?.value),
			[ENUM_ACCOMMODATION_PRICING_FIELD.MARKUP]: markup,
			...(cost != null && { total_price: cost }),
			[ENUM_ACCOMMODATION_PRICING_FIELD.FEES]: mapFeesFromBackend(
				duration.fees
			),
			...(currency && { currency })
		};
	}

	const perPersonMarkup = mapMarkupFromBackend(expenses.markup);
	return {
		...defaults,
		pricing_type: ENUM_ACCOMMODATION_PRICING_TYPE.PER_PERSON,
		add_margin_separately: Boolean(perPersonMarkup?.value),
		[ENUM_ACCOMMODATION_PRICING_FIELD.MARKUP]: perPersonMarkup,
		...(expenses.cost_per_person?.val != null && {
			total_price: expenses.cost_per_person.val
		}),
		[ENUM_ACCOMMODATION_PRICING_FIELD.FEES]: mapFeesFromBackend(
			expenses.fees
		),
		...(expenses.cost_per_person?.currency && {
			currency: expenses.cost_per_person.currency
		})
	};
};

export const mapAccommodationPricingToBackend = (
	pricing?: TAccommodationPricingSchema,
	roomsList: TRoomsList = []
): { details?: Pick<TCustomHousingDetailsInputBackend, "expenses"> } => {
	if (
		!pricing ||
		pricing.invoicing !== ENUM_ACCOMMODATION_PRICING_INVOICING.INDIVIDUAL
	) {
		return {};
	}

	if (pricing.pricing_type === ENUM_ACCOMMODATION_PRICING_TYPE.PER_ROOM) {
		const addMargin = pricing.add_margin_separately;
		const aligned = alignAccommodationPerRoomExpenses({
			priceBasedOnClass: pricing.price_based_on_class,
			roomsListLength: roomsList.length,
			current: pricing.expenses
		});

		if (pricing.price_based_on_class) {
			const rooms =
				aligned.typ === ENUM_ACCOMMODATION_EXPENSE_TYP.PER_ROOM_CATEGORY
					? aligned[ENUM_ACCOMMODATION_PER_ROOM_EXPENSES_FIELD.ROOMS]
					: [];

			return {
				details: {
					expenses: {
						typ: "per_room_category",
						categories: roomsList.map((room, index) => ({
							name: room.room_name || null,
							rooms: (
								rooms[index]?.[
									ENUM_ACCOMMODATION_PER_ROOM_EXPENSES_FIELD
										.CATEGORIES
								] ?? []
							).map((category) => {
								const rowCurrency =
									category[
										ENUM_ACCOMMODATION_CATEGORY_ROW_FIELD
											.CURRENCY
									];
								return {
									typ:
										housingRoomTypeConverter.to(
											category[
												ENUM_ACCOMMODATION_CATEGORY_ROW_FIELD
													.NAME
											] as ENUM_HOUSING_ROOM_TYPE_TYPE
										) ?? null,
									expenses: mapToFixedCharge(
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
									)
								};
							})
						}))
					}
				}
			};
		}

		const rooms =
			aligned.typ === ENUM_ACCOMMODATION_EXPENSE_TYP.PER_ROOM
				? aligned[ENUM_ACCOMMODATION_PER_ROOM_EXPENSES_FIELD.ROOMS]
				: [];

		return {
			details: {
				expenses: {
					typ: "per_room",
					rooms: roomsList.map((room, index) => {
						const priceRow =
							rooms[index] ?? createEmptyPerRoomPriceRow();
						const rowCurrency =
							priceRow[
								ENUM_ACCOMMODATION_PRICE_ROW_FIELD.CURRENCY
							];
						return {
							...(room[ENUM_FORM_ROOMS.ID]
								? { id: room[ENUM_FORM_ROOMS.ID] }
								: {}),
							name: room.room_name || null,
							description: room.description || null,
							expenses: mapToFixedCharge(
								priceRow[
									ENUM_ACCOMMODATION_PRICE_ROW_FIELD.COST
								],
								priceRow[
									ENUM_ACCOMMODATION_PRICE_ROW_FIELD.FEES
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
							)
						};
					})
				}
			}
		};
	}

	const totalPrice = pricing[ENUM_ACCOMMODATION_PRICING_FIELD.TOTAL_PRICE];
	const currency = pricing[ENUM_ACCOMMODATION_PRICING_FIELD.CURRENCY];
	const fees = mapFeesToBackend(
		pricing[ENUM_ACCOMMODATION_PRICING_FIELD.FEES]
	);

	if (totalPrice == null || !currency) {
		return {};
	}

	const cost = {
		val: totalPrice,
		currency: currencyConverter.to(currency)!
	};
	const markup = mapMarkupToBackend(
		pricing[ENUM_ACCOMMODATION_PRICING_FIELD.MARKUP] ?? null,
		currency,
		pricing.add_margin_separately
	);

	if (pricing.pricing_type === ENUM_ACCOMMODATION_PRICING_TYPE.FLAT_RATE) {
		if (
			pricing[ENUM_ACCOMMODATION_PRICING_FIELD.CHARGE_TYP] ===
			ENUM_ACCOMMODATION_CHARGE.PER_DURATION
		) {
			return {
				details: {
					expenses: {
						typ: "per_duration",
						rate: { typ: "fixed", cost },
						fees,
						markup
					}
				}
			};
		}

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

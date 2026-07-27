import { Currency } from "@/shared/api";

import {
	ENUM_ACCOMMODATION_CATEGORY_ROW_FIELD,
	ENUM_ACCOMMODATION_EXPENSE_TYP,
	ENUM_ACCOMMODATION_MARKUP_TYP,
	ENUM_ACCOMMODATION_PER_ROOM_EXPENSES_FIELD,
	ENUM_ACCOMMODATION_PRICE_ROW_FIELD,
	ENUM_ACCOMMODATION_PRICING_FIELD,
	ENUM_ACCOMMODATION_PRICING_INVOICING,
	ENUM_ACCOMMODATION_PRICING_TYPE,
	ENUM_FORM_ROOMS,
	type IAccommodationCategoryPriceRow,
	type IAccommodationPerRoomByClassPriceRow,
	type IAccommodationPerRoomCategoryExpenses,
	type IAccommodationPerRoomExpenses,
	type IAccommodationPerRoomPriceRow,
	type IAccommodationPriceRowMarkup,
	type TAccommodationPricingSchema,
	type TCommissionMarkupBackend,
	type TCommissionMarkupInputBackend,
	type TFixedChargeBackend,
	type TFixedChargeInputBackend,
	type TFixedExpenseInputBackend,
	type THousingDetailsBackend,
	type THousingRoomCategoryBackend,
	type THousingRoomCategoryExpensesBackend,
	type THousingRoomExpensesBackend,
	type TPerRoomCategoryExpensesBackend,
	type TPerRoomExpensesBackend,
	type TRoomsSchema
} from "../../types";

import { mapRoomNameToHousingType } from "./accommodation-rooms.converters";

type TRoomsList = TRoomsSchema[typeof ENUM_FORM_ROOMS.ROOMS_LIST];

const createEmptyPerRoomPriceRow = (): IAccommodationPerRoomPriceRow => ({
	[ENUM_ACCOMMODATION_PRICE_ROW_FIELD.COST]: null,
	[ENUM_ACCOMMODATION_PRICE_ROW_FIELD.FEES]: null,
	[ENUM_ACCOMMODATION_PRICE_ROW_FIELD.CURRENCY]: Currency.USD,
	[ENUM_ACCOMMODATION_PRICE_ROW_FIELD.MARKUP]: null
});

const createEmptyCategoryRow = (): IAccommodationCategoryPriceRow => ({
	[ENUM_ACCOMMODATION_CATEGORY_ROW_FIELD.NAME]: "",
	[ENUM_ACCOMMODATION_CATEGORY_ROW_FIELD.COST]: null,
	[ENUM_ACCOMMODATION_CATEGORY_ROW_FIELD.FEES]: null,
	[ENUM_ACCOMMODATION_CATEGORY_ROW_FIELD.CURRENCY]: Currency.USD,
	[ENUM_ACCOMMODATION_CATEGORY_ROW_FIELD.MARKUP]: null
});

const createEmptyPerRoomByClassPriceRow =
	(): IAccommodationPerRoomByClassPriceRow => ({
		[ENUM_ACCOMMODATION_PER_ROOM_EXPENSES_FIELD.CATEGORIES]: [
			createEmptyCategoryRow()
		]
	});

const mapPriceRowFromFixedCharge = (
	charge?: TFixedChargeBackend | null
): Pick<
	IAccommodationPerRoomPriceRow,
	| typeof ENUM_ACCOMMODATION_PRICE_ROW_FIELD.COST
	| typeof ENUM_ACCOMMODATION_PRICE_ROW_FIELD.FEES
	| typeof ENUM_ACCOMMODATION_PRICE_ROW_FIELD.CURRENCY
> => ({
	[ENUM_ACCOMMODATION_PRICE_ROW_FIELD.COST]: charge?.cost?.val ?? null,
	[ENUM_ACCOMMODATION_PRICE_ROW_FIELD.FEES]: charge?.fees?.cost?.val ?? null,
	[ENUM_ACCOMMODATION_PRICE_ROW_FIELD.CURRENCY]:
		charge?.cost?.currency ?? charge?.fees?.cost?.currency ?? ""
});

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
	...mapPriceRowFromFixedCharge(room.expenses),
	[ENUM_ACCOMMODATION_PRICE_ROW_FIELD.MARKUP]: mapMarkupFromBackend(
		room.expenses?.markup
	)
});

const mapCategoryRowFromBackend = (
	category: THousingRoomCategoryBackend
): IAccommodationCategoryPriceRow => ({
	[ENUM_ACCOMMODATION_CATEGORY_ROW_FIELD.NAME]: category.name ?? "",
	...mapPriceRowFromFixedCharge(category.expenses),
	[ENUM_ACCOMMODATION_CATEGORY_ROW_FIELD.MARKUP]: mapMarkupFromBackend(
		category.expenses?.markup
	)
});

const mapPerRoomByClassPriceFromBackend = (
	room: THousingRoomCategoryExpensesBackend
): IAccommodationPerRoomByClassPriceRow => ({
	[ENUM_ACCOMMODATION_PER_ROOM_EXPENSES_FIELD.CATEGORIES]: room?.categories
		?.length
		? room.categories.map(mapCategoryRowFromBackend)
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
	markup: IAccommodationPriceRowMarkup | null,
	rowCurrency: string,
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
	current?: TAccommodationPricingSchema["expenses"] | null;
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
	package_type: ""
});

export const mapAccommodationPricingFromBackend = (
	details?: THousingDetailsBackend | null,
	roomsList: TRoomsList = []
): TAccommodationPricingSchema => {
	const expenses = details?.expenses;
	const feesVal =
		expenses && (expenses.typ === "fixed" || expenses.typ === "per_person")
			? (expenses.fees?.cost?.val ?? null)
			: null;
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
			perRoomCategory.rooms
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
		return {
			...defaults,
			pricing_type: ENUM_ACCOMMODATION_PRICING_TYPE.FLAT_RATE,
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
		pricing_type: ENUM_ACCOMMODATION_PRICING_TYPE.PER_PERSON,
		...(expenses.cost_per_person?.val != null && {
			total_price: expenses.cost_per_person.val
		}),
		...(feesVal != null && { taxes: feesVal }),
		...(expenses.cost_per_person?.currency && {
			currency: expenses.cost_per_person.currency
		})
	};
};

export const mapAccommodationPricingToBackend = (
	pricing?: TAccommodationPricingSchema,
	roomsList: TRoomsList = []
): { details?: Pick<THousingDetailsBackend, "expenses"> } => {
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
						rooms: roomsList.map((room, index) => ({
							typ: mapRoomNameToHousingType(room.room_name),
							description: room.description || null,
							categories: (
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
									name: category[
										ENUM_ACCOMMODATION_CATEGORY_ROW_FIELD
											.NAME
									],
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
							typ: mapRoomNameToHousingType(room.room_name),
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
	const taxes = pricing[ENUM_ACCOMMODATION_PRICING_FIELD.TAXES];

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

	if (pricing.pricing_type === ENUM_ACCOMMODATION_PRICING_TYPE.FLAT_RATE) {
		return {
			details: {
				expenses: { typ: "fixed", cost, fees }
			}
		};
	}

	return {
		details: {
			expenses: { typ: "per_person", cost_per_person: cost, fees }
		}
	};
};

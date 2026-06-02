import type {
	FixedExpenseInput,
	FixedExpenseOutput,
	HousingDetailsSchemaOutput,
	HousingRoomCategoryExpensesSchemaOutput,
	HousingRoomCategorySchemaOutput,
	HousingRoomExpensesSchemaOutput,
	PerRoomCategoryExpensesOutput,
	PerRoomExpensesOutput
} from "@/shared/api";
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
	type IAccommodationCategoryPriceRow,
	type IAccommodationPerRoomByClassPriceRow,
	type IAccommodationPerRoomCategoryExpenses,
	type IAccommodationPerRoomExpenses,
	type IAccommodationPerRoomPriceRow,
	type IAccommodationPriceRowMarkup,
	type TAccommodationPricingSchema
} from "../../types";
import { ENUM_FORM_ROOMS, type TRoomsSchema } from "../../types";

import { mapRoomNameToHousingType } from "./accommodation-rooms.converters";

type TRoomsList = TRoomsSchema[typeof ENUM_FORM_ROOMS.ROOMS_LIST];

type THousingDetailsWithFees = HousingDetailsSchemaOutput & {
	fees?: FixedExpenseOutput | null;
};

const createEmptyPerRoomPriceRow = (): IAccommodationPerRoomPriceRow => ({
	[ENUM_ACCOMMODATION_PRICE_ROW_FIELD.COST]: null,
	[ENUM_ACCOMMODATION_PRICE_ROW_FIELD.FEES]: null,
	[ENUM_ACCOMMODATION_PRICE_ROW_FIELD.CURRENCY]: "",
	[ENUM_ACCOMMODATION_PRICE_ROW_FIELD.MARKUP]: null
});

const createEmptyCategoryRow = (): IAccommodationCategoryPriceRow => ({
	[ENUM_ACCOMMODATION_CATEGORY_ROW_FIELD.NAME]: "",
	[ENUM_ACCOMMODATION_CATEGORY_ROW_FIELD.COST]: null,
	[ENUM_ACCOMMODATION_CATEGORY_ROW_FIELD.FEES]: null,
	[ENUM_ACCOMMODATION_CATEGORY_ROW_FIELD.CURRENCY]: "",
	[ENUM_ACCOMMODATION_CATEGORY_ROW_FIELD.MARKUP]: null
});

const createEmptyPerRoomByClassPriceRow =
	(): IAccommodationPerRoomByClassPriceRow => ({
		[ENUM_ACCOMMODATION_PER_ROOM_EXPENSES_FIELD.CATEGORIES]: [
			createEmptyCategoryRow()
		]
	});

const mapPriceRowFromFixedExpenses = (
	expenses?: FixedExpenseOutput | null,
	fees?: FixedExpenseOutput | null
): Pick<
	IAccommodationPerRoomPriceRow,
	| typeof ENUM_ACCOMMODATION_PRICE_ROW_FIELD.COST
	| typeof ENUM_ACCOMMODATION_PRICE_ROW_FIELD.FEES
	| typeof ENUM_ACCOMMODATION_PRICE_ROW_FIELD.CURRENCY
> => ({
	[ENUM_ACCOMMODATION_PRICE_ROW_FIELD.COST]: expenses?.cost?.val ?? null,
	[ENUM_ACCOMMODATION_PRICE_ROW_FIELD.FEES]: fees?.cost?.val ?? null,
	[ENUM_ACCOMMODATION_PRICE_ROW_FIELD.CURRENCY]:
		expenses?.cost?.currency ?? fees?.cost?.currency ?? ""
});

const mapMarkupFromBackend = (
	markup?: HousingRoomExpensesSchemaOutput["markup"]
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
	room: HousingRoomExpensesSchemaOutput
): IAccommodationPerRoomPriceRow => ({
	...mapPriceRowFromFixedExpenses(room.expenses, room.fees),
	[ENUM_ACCOMMODATION_PRICE_ROW_FIELD.MARKUP]: mapMarkupFromBackend(
		room.markup
	)
});

const mapCategoryRowFromBackend = (
	category: HousingRoomCategorySchemaOutput
): IAccommodationCategoryPriceRow => ({
	[ENUM_ACCOMMODATION_CATEGORY_ROW_FIELD.NAME]: category.name ?? "",
	...mapPriceRowFromFixedExpenses(category.expenses, category.fees),
	[ENUM_ACCOMMODATION_CATEGORY_ROW_FIELD.MARKUP]: mapMarkupFromBackend(
		category.markup
	)
});

const mapPerRoomByClassPriceFromBackend = (
	room: HousingRoomCategoryExpensesSchemaOutput
): IAccommodationPerRoomByClassPriceRow => ({
	[ENUM_ACCOMMODATION_PER_ROOM_EXPENSES_FIELD.CATEGORIES]: room?.categories
		?.length
		? room.categories.map(mapCategoryRowFromBackend)
		: [createEmptyCategoryRow()]
});

const alignPerRoomPriceRows = (
	roomsListLength: number,
	existing: IAccommodationPerRoomPriceRow[] = [],
	apiRows?: HousingRoomExpensesSchemaOutput[] | null
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
	apiRows?: HousingRoomCategoryExpensesSchemaOutput[] | null
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
	markup: IAccommodationPriceRowMarkup | null,
	rowCurrency: string,
	addMarginSeparately: boolean
): HousingRoomExpensesSchemaOutput["markup"] => {
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
	details?: HousingDetailsSchemaOutput | null,
	roomsList: TRoomsList = []
): TAccommodationPricingSchema => {
	const detailsWithFees = details as
		| THousingDetailsWithFees
		| null
		| undefined;
	const expenses = detailsWithFees?.expenses;
	const feesVal = detailsWithFees?.fees?.cost?.val ?? null;
	const defaults = getDefaultAccommodationPricing(roomsList);

	if (!expenses) {
		return defaults;
	}

	if (expenses.typ === "per_room") {
		const perRoom = expenses as PerRoomExpensesOutput;
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
		const perRoomCategory = expenses as PerRoomCategoryExpensesOutput;
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
): { details?: THousingDetailsWithFees } => {
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
									expenses: mapAmountToFixed(
										category[
											ENUM_ACCOMMODATION_CATEGORY_ROW_FIELD
												.COST
										],
										rowCurrency
									),
									fees: mapAmountToFixed(
										category[
											ENUM_ACCOMMODATION_CATEGORY_ROW_FIELD
												.FEES
										],
										rowCurrency
									),
									markup: mapMarkupToBackend(
										category[
											ENUM_ACCOMMODATION_CATEGORY_ROW_FIELD
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
							expenses: mapAmountToFixed(
								priceRow[
									ENUM_ACCOMMODATION_PRICE_ROW_FIELD.COST
								],
								rowCurrency
							),
							fees: mapAmountToFixed(
								priceRow[
									ENUM_ACCOMMODATION_PRICE_ROW_FIELD.FEES
								],
								rowCurrency
							),
							markup: mapMarkupToBackend(
								priceRow[
									ENUM_ACCOMMODATION_PRICE_ROW_FIELD.MARKUP
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
		taxes != null && currency
			? {
					typ: "fixed" as const,
					cost: { val: taxes, currency: currency as Currency }
				}
			: undefined;

	if (pricing.pricing_type === ENUM_ACCOMMODATION_PRICING_TYPE.FLAT_RATE) {
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

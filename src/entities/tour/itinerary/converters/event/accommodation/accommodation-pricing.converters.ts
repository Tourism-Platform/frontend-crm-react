import { Currency } from "@/shared/api";
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
} from "../../../types";
import { getPoolMember } from "../common/event-pool.helpers";
import {
	mapFeesFromBackend,
	mapFeesToBackend
} from "../common/fees.converters";

import { isClassPricedHousingSpec } from "./accommodation-rooms.converters";
import { isInheritedHousingDetails } from "./housing-details.helpers";
import { resolveRoomPax, resolveRoomTyp } from "./housing-room-pax.helpers";
import { housingRoomTypeConverter } from "./housing-room-type.converters";

type TRoomsList = TRoomsSchema[typeof ENUM_FORM_ROOMS.ROOMS_LIST];

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
	...(room?.id
		? { [ENUM_ACCOMMODATION_CATEGORY_ROW_FIELD.ID]: room.id }
		: {}),
	[ENUM_ACCOMMODATION_CATEGORY_ROW_FIELD.PAX]: room?.pax ?? null,
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
 * Pricing section of the form, read from the selected pool member spec:
 * - `{ pricing: "per_room" }` — per-room rows (flat or by class);
 * - `{ pricing: "whole" }` — `price.base` maps to flat-rate (fixed /
 *   per-duration) or per-person form rows.
 */
export const mapAccommodationPricingFromBackend = (
	details?: HousingDetailsOutput | null,
	roomsList: TRoomsList = [],
	supplyId?: string | null
): TAccommodationPricingSchema => {
	if (!details || isInheritedHousingDetails(details, supplyId)) {
		return getDefaultAccommodationPricing(roomsList);
	}

	const spec = getPoolMember(details, supplyId)?.spec;
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

/** Descriptive room node: id echoed (photos survive), type and pax checked by the backend (fe6.4 §5, §12). */
const mapRoomBase = (room: TRoomsList[number]) => {
	const typ = resolveRoomTyp(room[ENUM_FORM_ROOMS.TYP]);
	return {
		...(room[ENUM_FORM_ROOMS.ID] ? { id: room[ENUM_FORM_ROOMS.ID] } : {}),
		typ,
		pax: resolveRoomPax(typ, room[ENUM_FORM_ROOMS.PAX]),
		name: room.room_name || null,
		description: room.description || null
	};
};

/**
 * Write-side housing spec for `supply.inline.spec` (contract 3.1). The
 * descriptive fields (location / stars / amenities) are merged in by the
 * event converter.
 *
 * A per-room spec needs a rate on every room and `0` means "free" (fe6.4 §6,
 * §14), so when a rate is missing no spec is returned and the member is not
 * written — the backend keeps the current one.
 */
export const mapAccommodationPricingToBackend = (
	pricing?: TAccommodationPricingSchema,
	roomsList: TRoomsList = []
): { spec?: THousingSpecInputBackend } => {
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

		const toRate = (row: IAccommodationPerRoomPriceRow) => {
			const rowCurrency =
				row[ENUM_ACCOMMODATION_PRICE_ROW_FIELD.CURRENCY];
			return mapToFixedCharge(
				row[ENUM_ACCOMMODATION_PRICE_ROW_FIELD.COST],
				row[ENUM_ACCOMMODATION_PRICE_ROW_FIELD.FEES],
				rowCurrency,
				mapMarkupToBackend(
					row[ENUM_ACCOMMODATION_PRICE_ROW_FIELD.MARKUP],
					rowCurrency,
					addMargin
				)
			);
		};

		if (pricing.price_based_on_class) {
			const rows =
				aligned.typ === ENUM_ACCOMMODATION_EXPENSE_TYP.PER_ROOM_CATEGORY
					? aligned[ENUM_ACCOMMODATION_PER_ROOM_EXPENSES_FIELD.ROOMS]
					: [];

			// Form "room" = backend category; its class rows = backend rooms.
			const categories = roomsList.map((room, index) => ({
				...(room[ENUM_FORM_ROOMS.ID]
					? { id: room[ENUM_FORM_ROOMS.ID] }
					: {}),
				name: room.room_name || null,
				rooms: (
					rows[index]?.[
						ENUM_ACCOMMODATION_PER_ROOM_EXPENSES_FIELD.CATEGORIES
					] ?? []
				).map((category) => {
					const categoryName =
						category[ENUM_ACCOMMODATION_CATEGORY_ROW_FIELD.NAME];
					const typ = resolveRoomTyp(
						isHousingRoomType(categoryName)
							? housingRoomTypeConverter.to(categoryName)
							: undefined
					);
					const classId =
						category[ENUM_ACCOMMODATION_CATEGORY_ROW_FIELD.ID];
					return {
						...(classId ? { id: classId } : {}),
						typ,
						pax: resolveRoomPax(
							typ,
							category[ENUM_ACCOMMODATION_CATEGORY_ROW_FIELD.PAX]
						),
						rate: { base: toRate(category) }
					};
				})
			}));

			const isPriced = categories.every((category) =>
				category.rooms.every((room) => room.rate.base)
			);
			return isPriced
				? {
						spec: {
							pricing: "per_room",
							categories
						} as THousingSpecInputBackend
					}
				: {};
		}

		const rows =
			aligned.typ === ENUM_ACCOMMODATION_EXPENSE_TYP.PER_ROOM
				? aligned[ENUM_ACCOMMODATION_PER_ROOM_EXPENSES_FIELD.ROOMS]
				: [];
		const rooms = roomsList.map((room, index) => ({
			...mapRoomBase(room),
			rate: { base: toRate(rows[index] ?? createEmptyPerRoomPriceRow()) }
		}));

		if (!rooms.every((room) => room.rate.base)) {
			return {};
		}

		return {
			spec: {
				pricing: "per_room",
				...(rooms.length ? { categories: [{ name: null, rooms }] } : {})
			} as THousingSpecInputBackend
		};
	}

	const totalPrice = pricing[ENUM_ACCOMMODATION_PRICING_FIELD.TOTAL_PRICE];
	const currency = pricing[ENUM_ACCOMMODATION_PRICING_FIELD.CURRENCY];
	const fees = mapFeesToBackend(
		pricing[ENUM_ACCOMMODATION_PRICING_FIELD.FEES]
	);

	// `whole` requires its price (fe6.4 §8): without it the member is not written.
	if (totalPrice == null || !currency) {
		return {};
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
		? [{ name: null, rooms: roomsList.map(mapRoomBase) }]
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

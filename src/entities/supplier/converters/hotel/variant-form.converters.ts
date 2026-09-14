import {
	DEFAULT_EVENT_CURRENCY,
	type ENUM_CURRENCY_OPTIONS_TYPE
} from "@/entities/commission";

import {
	ENUM_FORM_HOTEL_ROOMS,
	ENUM_FORM_HOTEL_VARIANT,
	ENUM_FORM_HOTEL_VARIANT_ROOM,
	ENUM_FORM_HOTEL_VARIANT_ROOM_SEASON,
	ENUM_HOTEL_ROOM_CHARGE,
	type ENUM_HOTEL_ROOM_CHARGE_TYPE,
	type ENUM_HOTEL_ROOM_TYPE_TYPE,
	ENUM_SUPPLIER_SURCHARGE,
	type IHotelVariant,
	type IHotelVariantWrite,
	type ISupplierFeeFormRow,
	type THotelRoomCharge,
	type THotelVariantFormSchema,
	type THotelVariantRoomFormSchema,
	type THotelVariantRoomSeasonFormSchema
} from "../../types";

type TChargeFormFields = Pick<
	THotelVariantRoomFormSchema,
	| typeof ENUM_FORM_HOTEL_VARIANT_ROOM.CHARGE_TYP
	| typeof ENUM_FORM_HOTEL_VARIANT_ROOM.COST
	| typeof ENUM_FORM_HOTEL_VARIANT_ROOM.CURRENCY
	| typeof ENUM_FORM_HOTEL_VARIANT_ROOM.FEES
>;

const chargeToFormFields = (
	expenses: THotelRoomCharge | null | undefined
): TChargeFormFields => {
	if (!expenses) {
		return {
			[ENUM_FORM_HOTEL_VARIANT_ROOM.CHARGE_TYP]:
				ENUM_HOTEL_ROOM_CHARGE.FIXED,
			[ENUM_FORM_HOTEL_VARIANT_ROOM.COST]: null,
			[ENUM_FORM_HOTEL_VARIANT_ROOM.CURRENCY]: DEFAULT_EVENT_CURRENCY,
			[ENUM_FORM_HOTEL_VARIANT_ROOM.FEES]: []
		};
	}

	const money =
		expenses.typ === ENUM_HOTEL_ROOM_CHARGE.PER_DURATION
			? expenses.rate.cost
			: expenses.cost;

	return {
		[ENUM_FORM_HOTEL_VARIANT_ROOM.CHARGE_TYP]: expenses.typ,
		[ENUM_FORM_HOTEL_VARIANT_ROOM.COST]: money?.val ?? null,
		[ENUM_FORM_HOTEL_VARIANT_ROOM.CURRENCY]:
			money?.currency ?? DEFAULT_EVENT_CURRENCY,
		[ENUM_FORM_HOTEL_VARIANT_ROOM.FEES]: expenses.fees ?? []
	};
};

const mapChargeFormToExpenses = (
	chargeTyp: ENUM_HOTEL_ROOM_CHARGE_TYPE,
	cost: number | null,
	currency: ENUM_CURRENCY_OPTIONS_TYPE,
	fees: ISupplierFeeFormRow[]
): THotelRoomCharge => {
	const money = {
		val: cost ?? 0,
		currency: currency || DEFAULT_EVENT_CURRENCY
	};
	const feesOrNull = fees.length ? fees : null;

	if (chargeTyp === ENUM_HOTEL_ROOM_CHARGE.PER_DURATION) {
		return {
			typ: ENUM_HOTEL_ROOM_CHARGE.PER_DURATION,
			rate: {
				typ: ENUM_SUPPLIER_SURCHARGE.FIXED,
				cost: money
			},
			fees: feesOrNull,
			markup: null
		};
	}

	return {
		typ: ENUM_HOTEL_ROOM_CHARGE.FIXED,
		cost: money,
		fees: feesOrNull,
		markup: null
	};
};

export const emptyHotelVariantRoomSeason =
	(): THotelVariantRoomSeasonFormSchema => ({
		[ENUM_FORM_HOTEL_VARIANT_ROOM_SEASON.FROM_DATE]: "",
		[ENUM_FORM_HOTEL_VARIANT_ROOM_SEASON.TO_DATE]: "",
		...chargeToFormFields(null)
	});

export const emptyHotelVariantRoom = (): THotelVariantRoomFormSchema => ({
	[ENUM_FORM_HOTEL_VARIANT_ROOM.ID]: undefined,
	[ENUM_FORM_HOTEL_VARIANT_ROOM.TYP]: "",
	...chargeToFormFields(null),
	[ENUM_FORM_HOTEL_VARIANT_ROOM.SEASONS]: []
});

export const emptyHotelVariantForm = (): THotelVariantFormSchema => ({
	[ENUM_FORM_HOTEL_VARIANT.NAME]: "",
	[ENUM_FORM_HOTEL_VARIANT.ROOMS]: [emptyHotelVariantRoom()]
});

const mapHotelVariantRoomSeasonToForm = (
	rate: NonNullable<IHotelVariant["rooms"][number]["rates"]>[number]
): THotelVariantRoomSeasonFormSchema => ({
	[ENUM_FORM_HOTEL_VARIANT_ROOM_SEASON.FROM_DATE]: rate.fromDate,
	[ENUM_FORM_HOTEL_VARIANT_ROOM_SEASON.TO_DATE]: rate.toDate,
	...chargeToFormFields(rate.expenses)
});

const mapHotelVariantRoomToForm = (
	room: IHotelVariant["rooms"][number]
): THotelVariantRoomFormSchema => ({
	[ENUM_FORM_HOTEL_VARIANT_ROOM.ID]: room.id,
	[ENUM_FORM_HOTEL_VARIANT_ROOM.TYP]: room.typ ?? "",
	...chargeToFormFields(room.expenses),
	[ENUM_FORM_HOTEL_VARIANT_ROOM.SEASONS]: (room.rates ?? []).map(
		mapHotelVariantRoomSeasonToForm
	)
});

export const mapHotelVariantToForm = (
	variant?: IHotelVariant | null
): THotelVariantFormSchema => {
	if (!variant) return emptyHotelVariantForm();

	return {
		[ENUM_FORM_HOTEL_VARIANT.NAME]: variant.name,
		[ENUM_FORM_HOTEL_VARIANT.ROOMS]: variant.rooms.length
			? variant.rooms.map(mapHotelVariantRoomToForm)
			: [emptyHotelVariantRoom()]
	};
};

const mapSeasonFormToRate = (
	season: THotelVariantRoomSeasonFormSchema,
	fallbackCost: number | null
) => {
	const fromDate =
		season[ENUM_FORM_HOTEL_VARIANT_ROOM_SEASON.FROM_DATE].trim();
	const toDate = season[ENUM_FORM_HOTEL_VARIANT_ROOM_SEASON.TO_DATE].trim();

	if (!fromDate || !toDate) return null;

	return {
		fromDate,
		toDate,
		expenses: mapChargeFormToExpenses(
			season[ENUM_FORM_HOTEL_VARIANT_ROOM_SEASON.CHARGE_TYP],
			season[ENUM_FORM_HOTEL_VARIANT_ROOM_SEASON.COST] ?? fallbackCost,
			season[ENUM_FORM_HOTEL_VARIANT_ROOM_SEASON.CURRENCY],
			season[ENUM_FORM_HOTEL_VARIANT_ROOM_SEASON.FEES]
		)
	};
};

export const mapHotelVariantFormToWrite = (
	values: THotelVariantFormSchema
): IHotelVariantWrite => ({
	name: values[ENUM_FORM_HOTEL_VARIANT.NAME].trim(),
	rooms: values[ENUM_FORM_HOTEL_VARIANT.ROOMS]
		.filter((room) => room[ENUM_FORM_HOTEL_VARIANT_ROOM.TYP])
		.map((room) => {
			const typ = room[
				ENUM_FORM_HOTEL_VARIANT_ROOM.TYP
			] as ENUM_HOTEL_ROOM_TYPE_TYPE;
			const expenses = mapChargeFormToExpenses(
				room[ENUM_FORM_HOTEL_VARIANT_ROOM.CHARGE_TYP],
				room[ENUM_FORM_HOTEL_VARIANT_ROOM.COST],
				room[ENUM_FORM_HOTEL_VARIANT_ROOM.CURRENCY],
				room[ENUM_FORM_HOTEL_VARIANT_ROOM.FEES]
			);
			const rates = room[ENUM_FORM_HOTEL_VARIANT_ROOM.SEASONS].flatMap(
				(season) => {
					const rate = mapSeasonFormToRate(
						season,
						room[ENUM_FORM_HOTEL_VARIANT_ROOM.COST]
					);
					return rate ? [rate] : [];
				}
			);
			const roomId = room[ENUM_FORM_HOTEL_VARIANT_ROOM.ID];

			return {
				...(roomId ? { [ENUM_FORM_HOTEL_ROOMS.ID]: roomId } : {}),
				typ,
				expenses,
				rates: rates.length ? rates : null
			};
		})
});

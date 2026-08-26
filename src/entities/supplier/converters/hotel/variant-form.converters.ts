import {
	DEFAULT_EVENT_CURRENCY,
	type ENUM_CURRENCY_OPTIONS_TYPE
} from "@/entities/commission";

import {
	ENUM_FORM_HOTEL_VARIANT,
	ENUM_FORM_HOTEL_VARIANT_ROOM,
	type THotelVariantFormSchema,
	type THotelVariantRoomFormSchema
} from "../../schema/hotel-variant.schema";
import {
	ENUM_FORM_HOTEL_ROOMS,
	ENUM_HOTEL_ROOM_CHARGE,
	type ENUM_HOTEL_ROOM_CHARGE_TYPE,
	type ENUM_HOTEL_ROOM_TYPE_TYPE,
	ENUM_SUPPLIER_SURCHARGE,
	type IHotelVariant,
	type IHotelVariantWrite,
	type ISupplierFeeFormRow,
	type THotelRoomCharge
} from "../../types";

const chargeToFormFields = (
	expenses: THotelRoomCharge | null | undefined
): Pick<
	THotelVariantRoomFormSchema,
	| typeof ENUM_FORM_HOTEL_VARIANT_ROOM.CHARGE_TYP
	| typeof ENUM_FORM_HOTEL_VARIANT_ROOM.COST
	| typeof ENUM_FORM_HOTEL_VARIANT_ROOM.CURRENCY
	| typeof ENUM_FORM_HOTEL_VARIANT_ROOM.FEES
> => {
	if (!expenses) {
		return {
			[ENUM_FORM_HOTEL_VARIANT_ROOM.CHARGE_TYP]:
				ENUM_HOTEL_ROOM_CHARGE.FIXED,
			[ENUM_FORM_HOTEL_VARIANT_ROOM.COST]: "",
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
		[ENUM_FORM_HOTEL_VARIANT_ROOM.COST]:
			money != null ? String(money.val) : "",
		[ENUM_FORM_HOTEL_VARIANT_ROOM.CURRENCY]:
			money?.currency ?? DEFAULT_EVENT_CURRENCY,
		[ENUM_FORM_HOTEL_VARIANT_ROOM.FEES]: expenses.fees ?? []
	};
};

const mapChargeFormToExpenses = (
	chargeTyp: ENUM_HOTEL_ROOM_CHARGE_TYPE,
	cost: string,
	currency: ENUM_CURRENCY_OPTIONS_TYPE,
	fees: ISupplierFeeFormRow[]
): THotelRoomCharge => {
	const money = {
		val: Number(cost) || 0,
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

export const emptyHotelVariantRoom = (): THotelVariantRoomFormSchema => ({
	[ENUM_FORM_HOTEL_VARIANT_ROOM.ID]: undefined,
	[ENUM_FORM_HOTEL_VARIANT_ROOM.TYP]: "",
	[ENUM_FORM_HOTEL_VARIANT_ROOM.CHARGE_TYP]: ENUM_HOTEL_ROOM_CHARGE.FIXED,
	[ENUM_FORM_HOTEL_VARIANT_ROOM.COST]: "",
	[ENUM_FORM_HOTEL_VARIANT_ROOM.CURRENCY]: DEFAULT_EVENT_CURRENCY,
	[ENUM_FORM_HOTEL_VARIANT_ROOM.FEES]: [],
	[ENUM_FORM_HOTEL_VARIANT_ROOM.FROM_DATE]: "",
	[ENUM_FORM_HOTEL_VARIANT_ROOM.TO_DATE]: "",
	[ENUM_FORM_HOTEL_VARIANT_ROOM.SEASON_CHARGE_TYP]:
		ENUM_HOTEL_ROOM_CHARGE.FIXED,
	[ENUM_FORM_HOTEL_VARIANT_ROOM.SEASON_COST]: "",
	[ENUM_FORM_HOTEL_VARIANT_ROOM.SEASON_CURRENCY]: DEFAULT_EVENT_CURRENCY,
	[ENUM_FORM_HOTEL_VARIANT_ROOM.SEASON_FEES]: []
});

export const emptyHotelVariantForm = (): THotelVariantFormSchema => ({
	[ENUM_FORM_HOTEL_VARIANT.NAME]: "",
	[ENUM_FORM_HOTEL_VARIANT.ROOMS]: [emptyHotelVariantRoom()]
});

const mapHotelVariantRoomToForm = (
	room: IHotelVariant["rooms"][number]
): THotelVariantRoomFormSchema => {
	const base = chargeToFormFields(room.expenses);
	const rate = room.rates?.[0];
	const season = chargeToFormFields(rate?.expenses);

	return {
		[ENUM_FORM_HOTEL_VARIANT_ROOM.ID]: room.id,
		[ENUM_FORM_HOTEL_VARIANT_ROOM.TYP]: room.typ ?? "",
		...base,
		[ENUM_FORM_HOTEL_VARIANT_ROOM.FROM_DATE]: rate?.fromDate ?? "",
		[ENUM_FORM_HOTEL_VARIANT_ROOM.TO_DATE]: rate?.toDate ?? "",
		[ENUM_FORM_HOTEL_VARIANT_ROOM.SEASON_CHARGE_TYP]:
			season[ENUM_FORM_HOTEL_VARIANT_ROOM.CHARGE_TYP],
		[ENUM_FORM_HOTEL_VARIANT_ROOM.SEASON_COST]:
			season[ENUM_FORM_HOTEL_VARIANT_ROOM.COST],
		[ENUM_FORM_HOTEL_VARIANT_ROOM.SEASON_CURRENCY]:
			season[ENUM_FORM_HOTEL_VARIANT_ROOM.CURRENCY],
		[ENUM_FORM_HOTEL_VARIANT_ROOM.SEASON_FEES]:
			season[ENUM_FORM_HOTEL_VARIANT_ROOM.FEES]
	};
};

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

			const fromDate =
				room[ENUM_FORM_HOTEL_VARIANT_ROOM.FROM_DATE].trim();
			const toDate = room[ENUM_FORM_HOTEL_VARIANT_ROOM.TO_DATE].trim();
			const hasRate = Boolean(fromDate && toDate);
			const seasonCostRaw =
				room[ENUM_FORM_HOTEL_VARIANT_ROOM.SEASON_COST].trim();
			const seasonCost =
				seasonCostRaw !== ""
					? room[ENUM_FORM_HOTEL_VARIANT_ROOM.SEASON_COST]
					: room[ENUM_FORM_HOTEL_VARIANT_ROOM.COST];
			const rates = hasRate
				? [
						{
							fromDate,
							toDate,
							expenses: mapChargeFormToExpenses(
								room[
									ENUM_FORM_HOTEL_VARIANT_ROOM
										.SEASON_CHARGE_TYP
								],
								seasonCost,
								room[
									ENUM_FORM_HOTEL_VARIANT_ROOM.SEASON_CURRENCY
								],
								room[ENUM_FORM_HOTEL_VARIANT_ROOM.SEASON_FEES]
							)
						}
					]
				: null;
			const roomId = room[ENUM_FORM_HOTEL_VARIANT_ROOM.ID];

			return {
				...(roomId ? { [ENUM_FORM_HOTEL_ROOMS.ID]: roomId } : {}),
				typ,
				expenses,
				rates
			};
		})
});

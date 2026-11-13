import { formatMoney } from "@/shared/utils";

import {
	ENUM_HOTEL_ROOM_CHARGE,
	type THotelRoomCharge
} from "@/entities/supplier";

/** Цена сезона: за ночь — из `rate`, за весь срок — из `cost` */
export const formatSeasonRatePrice = (expenses: THotelRoomCharge): string => {
	const { val, currency } =
		expenses.typ === ENUM_HOTEL_ROOM_CHARGE.PER_DURATION
			? expenses.rate.cost
			: expenses.cost;

	return formatMoney(val, { currency, compact: false });
};

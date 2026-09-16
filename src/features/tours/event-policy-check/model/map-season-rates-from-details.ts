import type { RoomSeasonOutput } from "@/shared/api";

import {
	type IHotelRoomRate,
	mapHotelRoomChargeFromBackend
} from "@/entities/supplier";
import {
	type TEventDetailsBackend,
	getPoolMember,
	isProductPoolMember
} from "@/entities/tour";

export interface IProductSeasonRateRow {
	roomLabel: string;
	rates: IHotelRoomRate[];
}

const mapSeasonToRate = (season: RoomSeasonOutput): IHotelRoomRate => ({
	fromDate: season.from_date,
	toDate: season.to_date,
	expenses: mapHotelRoomChargeFromBackend(season.charge)
});

/**
 * Season rates of the linked product for the policy-check view.
 *
 * Contract 6: the pool member `spec` is already scoped by the backend — read the
 * scoped per-room spec directly, never re-filter units by scope here.
 */
export const mapSeasonRatesFromHousingDetails = (
	details: TEventDetailsBackend | undefined
): IProductSeasonRateRow[] => {
	const member = getPoolMember(details);
	if (!isProductPoolMember(member)) {
		return [];
	}

	const spec = member.spec;
	if (!spec || !("pricing" in spec) || spec.pricing !== "per_room") {
		return [];
	}

	return spec.categories
		.flatMap((category) => category.rooms ?? [])
		.map((room) => ({
			roomLabel: room.name ?? room.typ ?? "Room",
			rates: (room.rate?.seasons ?? []).map(mapSeasonToRate)
		}))
		.filter((row) => row.rates.length > 0);
};

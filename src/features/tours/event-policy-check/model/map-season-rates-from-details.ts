import type { RoomSeasonOutput } from "@/shared/api";

import {
	type IHotelRoomRate,
	mapHotelRoomChargeFromBackend
} from "@/entities/supplier";
import type { TEventDetailsBackend } from "@/entities/tour";

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
 * Contract 3.1: `details.spec` is already scoped by the backend — read the
 * scoped per-room spec directly, never re-filter units by scope here.
 */
export const mapSeasonRatesFromHousingDetails = (
	details: TEventDetailsBackend | undefined
): IProductSeasonRateRow[] => {
	if (details?.supply.source !== "product") {
		return [];
	}

	const spec = details.spec;
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

import { mapHotelRoomChargeFromBackend } from "@/entities/supplier";

import {
	ENUM_HOUSING_ROOM_TYPE,
	type ENUM_HOUSING_ROOM_TYPE_TYPE,
	type IProductSeasonRate,
	type TEventDetailsBackend,
	type TPricedRoomOutputBackend,
	type TRoomSeasonOutputBackend
} from "../../../types";
import {
	getPoolMember,
	isProductPoolMember
} from "../common/event-pool.helpers";
import { mapExtraCostsFromBackend } from "../common/extra-costs.converters";

import { housingRoomTypeConverter } from "./housing-room-type.converters";

const mapSeasonToRate = (
	room: TPricedRoomOutputBackend,
	season: TRoomSeasonOutputBackend
): IProductSeasonRate => ({
	id: `${room.id}-${season.from_date}`,
	roomType: housingRoomTypeConverter.from(room.typ) ?? null,
	roomName: room.name ?? null,
	fromDate: season.from_date,
	toDate: season.to_date,
	expenses: mapHotelRoomChargeFromBackend(season.charge),
	extraCosts: mapExtraCostsFromBackend(season.charge.extra_costs)
});

const ROOM_TYPE_ORDER = Object.values(ENUM_HOUSING_ROOM_TYPE);

/** Номер без типа — в конец */
const getRoomTypeOrder = (type: ENUM_HOUSING_ROOM_TYPE_TYPE | null) =>
	type ? ROOM_TYPE_ORDER.indexOf(type) : ROOM_TYPE_ORDER.length;

/** Тип номера (по порядку enum) → название → начало сезона */
const compareSeasonRates = (a: IProductSeasonRate, b: IProductSeasonRate) =>
	getRoomTypeOrder(a.roomType) - getRoomTypeOrder(b.roomType) ||
	(a.roomName ?? "").localeCompare(b.roomName ?? "") ||
	a.fromDate.localeCompare(b.fromDate);

/**
 * Season rates of the linked product for the accommodation pricing view:
 * one row per room × season, pre-sorted by room type, name and season start.
 *
 * Contract 6: the pool member `spec` is already scoped by the backend — read the
 * scoped per-room spec directly, never re-filter units by scope here.
 */
export const mapHousingSeasonRatesToFrontend = (
	details: TEventDetailsBackend | undefined
): IProductSeasonRate[] => {
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
		.flatMap((room) =>
			(room.rate?.seasons ?? []).map((season) =>
				mapSeasonToRate(room, season)
			)
		)
		.sort(compareSeasonRates);
};

import type {
	ActivityOverrideOutput,
	BusOverrideOutput,
	HotelOverrideOutput,
	RouteOverrideOutput,
	TransferOverrideOutput
} from "@/shared/api";

import type {
	TEventDetailsBackend,
	TEventOverrideInputBackend
} from "../../types";

import { mapHousingOverrideFromBackend } from "./accommodation/housing-override.converters";
import { mapActivityOverrideFromBackend } from "./activity/activity-override.converters";
import { getPoolMember, isProductPoolMember } from "./event-pool.helpers";
import { mapBusOverrideFromBackend } from "./transport/bus-override.converters";
import { mapRouteOverrideFromBackend } from "./transport/route-override.converters";
import { mapTransferOverrideFromBackend } from "./transport/transfer-override.converters";

/**
 * Reads the override from a pool member's product supply (contract 6).
 * Dispatch is by the backend `override.typ`; every arm reads through
 * Output → Input so the dialog edits the same shape the PATCH takes.
 */
export const mapEventOverrideFromDetails = (
	details: TEventDetailsBackend | undefined,
	supplyId?: string | null
): TEventOverrideInputBackend | null => {
	const member = getPoolMember(details, supplyId);
	if (!isProductPoolMember(member)) {
		return null;
	}

	const override = member.supply.override;
	if (!override) {
		return null;
	}

	switch (override.typ) {
		case "housing":
			return mapHousingOverrideFromBackend(
				override as HotelOverrideOutput
			);
		case "train":
		case "flight":
			return mapRouteOverrideFromBackend(override as RouteOverrideOutput);
		case "bus":
			return mapBusOverrideFromBackend(override as BusOverrideOutput);
		case "transfer":
			return mapTransferOverrideFromBackend(
				override as TransferOverrideOutput
			);
		case "activity":
			return mapActivityOverrideFromBackend(
				override as ActivityOverrideOutput
			);
	}

	// Unreachable for known types; guards future backend typ additions.
	return null;
};

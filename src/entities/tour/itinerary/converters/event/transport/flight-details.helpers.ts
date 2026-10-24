import type { TFlightDetailsOutputBackend } from "../../../types";
import {
	getPoolMember,
	isProductPoolMember
} from "../common/event-pool.helpers";

export const isInheritedFlightDetails = (
	details: TFlightDetailsOutputBackend | null | undefined,
	supplyId?: string | null
): boolean => isProductPoolMember(getPoolMember(details, supplyId));

export const isCustomFlightDetails = (
	details: TFlightDetailsOutputBackend | null | undefined,
	supplyId?: string | null
): details is TFlightDetailsOutputBackend =>
	details != null && !isInheritedFlightDetails(details, supplyId);

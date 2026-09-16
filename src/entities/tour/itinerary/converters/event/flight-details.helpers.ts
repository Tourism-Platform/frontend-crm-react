import type { FlightDetailsOutput } from "@/shared/api";

import { getPoolMember, isProductPoolMember } from "./event-pool.helpers";

export const isInheritedFlightDetails = (
	details: FlightDetailsOutput | null | undefined,
	supplyId?: string | null
): boolean => isProductPoolMember(getPoolMember(details, supplyId));

export const isCustomFlightDetails = (
	details: FlightDetailsOutput | null | undefined,
	supplyId?: string | null
): details is FlightDetailsOutput =>
	details != null && !isInheritedFlightDetails(details, supplyId);

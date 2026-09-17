import type { BusDetailsOutput } from "@/shared/api";

import {
	getPoolMember,
	isProductPoolMember
} from "../common/event-pool.helpers";

export const isInheritedBusDetails = (
	details: BusDetailsOutput | null | undefined,
	supplyId?: string | null
): boolean => isProductPoolMember(getPoolMember(details, supplyId));

export const isCustomBusDetails = (
	details: BusDetailsOutput | null | undefined,
	supplyId?: string | null
): details is BusDetailsOutput =>
	details != null && !isInheritedBusDetails(details, supplyId);

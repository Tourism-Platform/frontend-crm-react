import type { TBusDetailsOutputBackend } from "../../../types";
import {
	getPoolMember,
	isProductPoolMember
} from "../common/event-pool.helpers";

export const isInheritedBusDetails = (
	details: TBusDetailsOutputBackend | null | undefined,
	supplyId?: string | null
): boolean => isProductPoolMember(getPoolMember(details, supplyId));

export const isCustomBusDetails = (
	details: TBusDetailsOutputBackend | null | undefined,
	supplyId?: string | null
): details is TBusDetailsOutputBackend =>
	details != null && !isInheritedBusDetails(details, supplyId);

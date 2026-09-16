import type { TActivityEventDetailsBackend } from "../../../types";
import { getPoolMember, isProductPoolMember } from "../event-pool.helpers";

export const isInheritedActivityDetails = (
	details: TActivityEventDetailsBackend | null | undefined,
	supplyId?: string | null
): boolean => isProductPoolMember(getPoolMember(details, supplyId));

export const isCustomActivityDetails = (
	details: TActivityEventDetailsBackend | null | undefined,
	supplyId?: string | null
): boolean => details != null && !isInheritedActivityDetails(details, supplyId);

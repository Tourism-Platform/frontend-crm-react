import type { THousingDetailsOutputBackend } from "../../../types";
import {
	getPoolMember,
	isProductPoolMember
} from "../common/event-pool.helpers";

export const isInheritedHousingDetails = (
	details: THousingDetailsOutputBackend | null | undefined,
	supplyId?: string | null
): boolean => isProductPoolMember(getPoolMember(details, supplyId));

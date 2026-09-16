import type { HousingDetailsOutput } from "@/shared/api";

import { getPoolMember, isProductPoolMember } from "../event-pool.helpers";

/**
 * Contract 6: a stay is product-linked when the selected (or first) pool
 * member has `supply.source === "product"`.
 */
export const isInheritedHousingDetails = (
	details: HousingDetailsOutput | null | undefined,
	supplyId?: string | null
): boolean => isProductPoolMember(getPoolMember(details, supplyId));

import type { TTrainDetailsOutputBackend } from "../../../types";
import {
	getPoolMember,
	isProductPoolMember
} from "../common/event-pool.helpers";

export const isInheritedTrainDetails = (
	details: TTrainDetailsOutputBackend | null | undefined,
	supplyId?: string | null
): boolean => isProductPoolMember(getPoolMember(details, supplyId));

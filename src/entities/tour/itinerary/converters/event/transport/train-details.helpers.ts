import type { TrainDetailsOutput } from "@/shared/api";

import {
	getPoolMember,
	isProductPoolMember
} from "../common/event-pool.helpers";

export const isInheritedTrainDetails = (
	details: TrainDetailsOutput | null | undefined,
	supplyId?: string | null
): boolean => isProductPoolMember(getPoolMember(details, supplyId));

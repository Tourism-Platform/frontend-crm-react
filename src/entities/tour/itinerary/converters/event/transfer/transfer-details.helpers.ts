import type { TTransferEventDetailsBackend } from "../../../types";
import {
	getPoolMember,
	isProductPoolMember
} from "../common/event-pool.helpers";

export const isInheritedTransferDetails = (
	details: TTransferEventDetailsBackend | null | undefined,
	supplyId?: string | null
): boolean => isProductPoolMember(getPoolMember(details, supplyId));

export const isCustomTransferDetails = (
	details: TTransferEventDetailsBackend | null | undefined,
	supplyId?: string | null
): boolean => details != null && !isInheritedTransferDetails(details, supplyId);

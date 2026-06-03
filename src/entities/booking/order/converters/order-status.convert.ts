import { BookingStatus, BookingTransition } from "@/shared/api";
import { createEnumMapper } from "@/shared/utils";

import { ENUM_ORDER_STATUS, type ENUM_ORDER_STATUS_TYPE } from "../types";

const MAP_ORDER_STATUS_TO_TRANSITION: Partial<
	Record<ENUM_ORDER_STATUS_TYPE, BookingTransition>
> = {
	[ENUM_ORDER_STATUS.IN_PROCESSING]: BookingTransition.MoveToPending,
	[ENUM_ORDER_STATUS.BOOKING]: BookingTransition.MoveToConfirmed
};

export const mapOrderStatusToTransition = (
	targetStatus: ENUM_ORDER_STATUS_TYPE
): BookingTransition | undefined =>
	MAP_ORDER_STATUS_TO_TRANSITION[targetStatus];

const MAP_ORDER_STATUS: Partial<Record<ENUM_ORDER_STATUS_TYPE, BookingStatus>> =
	{
		[ENUM_ORDER_STATUS.NEW]: BookingStatus.New,
		[ENUM_ORDER_STATUS.IN_PROCESSING]: BookingStatus.Pending,
		[ENUM_ORDER_STATUS.BOOKING]: BookingStatus.Confirmed,
		[ENUM_ORDER_STATUS.IN_PROGRESS]: BookingStatus.InProgress,
		[ENUM_ORDER_STATUS.COMPLETED]: BookingStatus.Completed,
		[ENUM_ORDER_STATUS.CANCELLED]: BookingStatus.Cancelled
	};

export const orderStatusMapper = createEnumMapper<
	ENUM_ORDER_STATUS_TYPE,
	BookingStatus
>(MAP_ORDER_STATUS);

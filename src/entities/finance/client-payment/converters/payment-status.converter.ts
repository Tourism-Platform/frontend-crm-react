import { ClientPaymentStatus } from "@/shared/api";
import { createEnumMapper } from "@/shared/utils";

import { ENUM_PAYMENT_STATUS, type ENUM_PAYMENT_STATUS_TYPE } from "../types";

const MAP_PAYMENT_STATUS: Partial<
	Record<ENUM_PAYMENT_STATUS_TYPE, ClientPaymentStatus>
> = {
	[ENUM_PAYMENT_STATUS.ASSIGNED]: ClientPaymentStatus.Confirmed,
	[ENUM_PAYMENT_STATUS.NOT_ASSIGNED]: ClientPaymentStatus.NotConfirmed
};

export const paymentStatusConverter = createEnumMapper<
	ENUM_PAYMENT_STATUS_TYPE,
	ClientPaymentStatus
>(MAP_PAYMENT_STATUS);

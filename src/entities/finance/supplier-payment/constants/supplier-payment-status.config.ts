import { type TSupplierPaymentsPageKeys } from "@/shared/config";

import {
	ENUM_SUPPLIER_PAYMENT_STATUS,
	type ENUM_SUPPLIER_PAYMENT_STATUS_TYPE
} from "../types";

export const SUPPLIER_PAYMENT_STATUS_LABELS: Record<
	ENUM_SUPPLIER_PAYMENT_STATUS_TYPE,
	TSupplierPaymentsPageKeys
> = {
	[ENUM_SUPPLIER_PAYMENT_STATUS.RECORDED]: "table.statuses.recorded",
	[ENUM_SUPPLIER_PAYMENT_STATUS.CONFIRMED]: "table.statuses.confirmed"
};
